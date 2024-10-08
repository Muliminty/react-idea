import { map, uniq, flatten, cloneDeep, uniqBy, find, filter as _filter } from 'lodash'
import { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
// import Charts from '@jiaminghi/data-view-react/es/Charts'

import MyLine from '../DataView/materialsComponents/Line'

function Draggable(props) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        // eslint-disable-next-line react/prop-types
        id: props.id,
    });
    const style = {
        color: 'red',
        cursor: 'point',
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </div>
    );
}

function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        // eslint-disable-next-line react/prop-types
        id: props.id,

    });

    const style = {
        opacity: isOver ? 1 : 0.5,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </div>
    );
}

function Example() {
    const option = {
        title: {
            text: '剩余油量表',
            style: {
                fill: '#fff'
            }
        },
        series: [
            {
                type: 'gauge',
                data: [{ name: 'itemA', value: 55 }],
                center: ['50%', '55%'],
                axisLabel: {
                    formatter: '{value}%',
                    style: {
                        fill: '#fff'
                    }
                },
                axisTick: {
                    style: {
                        stroke: '#fff'
                    }
                },
                animationCurve: 'easeInOutBack'
            }
        ]
    }
    const Materials = [
        { id: '11', title: '11', node: <MyLine /> },
        { id: '22', title: '22', node: <span>node22</span> },
        // { id: '33', title: '33', node: <Charts style={{ minWidth: '300px', height: '300px' }} option={option} /> },
        { id: '44', title: '44', node: <span>node44</span> },
    ]

    const [DroppableList, setDroppableList] = useState([
        { id: 'aa', title: '盒子a', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'bb', title: '盒子b', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'cc', title: '盒子c', children: [], BorderNode: (props) => <>{props}</> },
    ]);

    const [DraggableObj, setDraggableObj] = useState([...Materials]);

    function handleDragEnd({ active, over }) {

        const activeId = active.id
        const overId = over?.id

        // 1.将拖拽物料添加到盒子
        const newDroppableList = AddItemChildrenListByID(activeId, overId, DroppableList)
        setDroppableList(newDroppableList)


        /**
         * 如果模板盒子里面有数据，就过滤物料盒的项
         * */

        const List = map(DroppableList, 'children')
        const flattenList = flatten([...List])
        const flattenIDList = map(flattenList, 'id')
        const res = []
        Materials.forEach((e) => { if (!flattenIDList.includes(e.id)) res.push(e) })
        setDraggableObj(res)


        // 物料挪出盒子就将物料添加到物料库
        if (!overId) {
            const newDraggableObj = AddItemByID(activeId, DraggableObj);
            setDraggableObj(newDraggableObj)
        }
    }

    /**
     * 基于id添加元素到指定项的children数组
     * */
    const AddItemChildrenListByID = (id, overId, arr) => {
        const item = getItemByID(id, Materials)
        const newDroppableList = map(arr, (e) => {
            e.children = _filter(e.children, (o) => o.id !== id)

            // 是否多个
            if (e.id === overId) e.children = uniq([item])
            // if (e.id === overId) e.children = uniq([...e.children, item])

            e.children = uniqBy(e.children, 'id')  // 去重
            return e
        })
        return newDroppableList
    }


    /**
     *  基于id在数组后面添加指定元素，并去重
     * */
    const AddItemByID = (id, arr) => {
        const item = getItemByID(id, Materials)
        let cloneData = cloneDeep(arr)
        cloneData = [...cloneData, item]
        // 根据id进行去重
        const newDraggableObj = uniqBy(cloneData, 'id')
        return newDraggableObj
    }

    /**
     * 根据ID返回指定元素
    */
    const getItemByID = (id, arr) => find(arr, ['id', id])


    return (
        <DndContext onDragEnd={handleDragEnd} >
            <div style={{ margin: '15px', display: 'flex', height: '100px' }}>
                {map(DraggableObj, (e) => {
                    return <Draggable key={e.id} id={e.id}>
                        {e.node || e.title}
                    </Draggable>
                })}
            </div>

            <div style={{ display: 'flex' }}>
                {map(DroppableList, (e) => {
                    return <div key={e.id}>
                        {e.BorderNode(
                            <Droppable id={e.id}>
                                <div style={{ minWidth: '100px', background: '#fff', marginTop: '15px', color: '#000', padding: '15px', overflow: 'hidden', marginLeft: '15px' }}>
                                    <p> {e.title} </p>

                                    <div>
                                        {map(e.children, (v) => {
                                            return <Draggable key={v.id} id={v.id}>
                                                {v.node || v.title}
                                            </Draggable>
                                        })}
                                    </div>
                                </div>
                            </Droppable>
                        )}
                    </div>
                })}
            </div>

        </DndContext >
    );


}





function DragDemo() {


    return <div>
        <Example />

    </div>
}



export default DragDemo
