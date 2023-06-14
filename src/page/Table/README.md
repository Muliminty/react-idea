# Table 相关demo

## 拖拽


基于 [dnd-kit](https://github.com/clauderic/dnd-kit) 来实现antd table拖拽排序。

```
下载以下5个依赖：    
   npm install @dnd-kit/core
   npm install @dnd-kit/sortable
   npm install @dnd-kit/modifiers
   npm install @dnd-kit/utilities
```

```JSX
import { DndContext } from '@dnd-kit/core';
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


    return <>
        <h1>表格可拖拽</h1>
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
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
```