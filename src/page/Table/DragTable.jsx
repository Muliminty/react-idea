
import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';

import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { Table } from 'antd';
import { useState } from 'react';

// ```
// 下载以下5个依赖：    
//    npm install @dnd-kit/core
//    npm install @dnd-kit/sortable
//    npm install @dnd-kit/modifiers
//    npm install @dnd-kit/utilities
// ```

function DragTable() {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: "点击",
            key: "updateTime",
            dataIndex: "updateTime",
            hideInSearch: true,
            width: "20%",
            render: () => <button onClick={() => { console.log(111); }}>点击</button>
        },
    ];
    const [dataSource, setDataSource] = useState([
        {
            key: '11',
            name: '1-John Brown',
            age: 32,
            address:
                'Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text',
        },
        {
            key: '12',
            name: '2-Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '13',
            name: '3-Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ]);

    const onDragEnd = ({ active, over }) => {
        console.log('over: ', over);
        console.log('active: ', active);
        if (active.id !== over?.id) {
            setDataSource((prev) => {
                const activeIndex = prev.findIndex((i) => i.key === active.id);
                const overIndex = prev.findIndex((i) => i.key === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };

    const Row = (props) => {
        const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
            // eslint-disable-next-line react/prop-types
            id: props['data-row-key'],
        });
        const style = {
            // eslint-disable-next-line react/prop-types
            ...props.style,
            transform: CSS.Transform.toString(
                transform && {
                    ...transform,
                    scaleY: 1,
                },
            ),
            transition,
            cursor: 'move',
            ...(isDragging
                ? {
                    position: 'relative',
                    zIndex: 9999,
                }
                : {}),
        };
        return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
    };

    // 解决拖拽带来的点击事件失效
    // 出现原因：
    // 1、点击事件onClick和拖拽事件的onPointerDown有部分重叠，导致点击的时候系统无法准确的知道你是click还是pointerDown

    //    解决办法：
    // 1、添加sensor传感器，增加一个延迟，如下：解决办法：
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            delay: 200, // 长按0.2s拖拽
            tolerance: 0,
        }
    }))


    return <>
        <h1>表格可拖拽</h1>
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd} sensors={sensors}>
            <SortableContext
                // rowKey array
                items={dataSource.map((i) => i.key)}
                strategy={verticalListSortingStrategy}
            >
                <Table
                    components={{
                        body: {
                            row: Row,
                        },
                    }}
                    rowKey="key"
                    columns={columns}
                    dataSource={dataSource}
                />
            </SortableContext>
        </DndContext></>
}





export default DragTable


