import { map, uniq, unionWith, isEqual, pull, cloneDeep, uniqBy, } from 'lodash'
import { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import BorderBox1 from '@jiaminghi/data-view-react/es/borderBox1'
import BorderBox2 from '@jiaminghi/data-view-react/es/borderBox2'

function Draggable(props) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        // eslint-disable-next-line react/prop-types
        id: props.id,
    });
    const style = {
        color: 'red',
        transform: CSS.Translate.toString(transform),
    };

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </button>
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

    const [DroppableList, setDroppableList] = useState([
        { id: 'aa', title: '盒子a', children: [], BorderNode: (props) => <BorderBox1>{props}</BorderBox1> },
        { id: 'bb', title: '盒子b', children: [], BorderNode: (props) => <BorderBox2>{props}</BorderBox2> },
    ]);

    const [DraggableObj, setDraggableObj] = useState([
        { id: '11', title: '11' },
        { id: '22', title: '22' },
        { id: '33', title: '33' },
        { id: '44', title: '44' },
    ]);





    function handleDragEnd({ active, over }) {

        const activeId = active.id
        const overId = over?.id

        const newDroppableList = map(DroppableList, (e) => {
            e.children = pull(e.children, activeId)
            if (e.id === overId) e.children = uniq([...e.children, activeId])
            return e
        })
        setDroppableList(newDroppableList)

        if (!overId) { pushDraggableObj(activeId); console.log(11); return }


        const list = map(DroppableList, 'children')
        const onlyIdList = unionWith(list[0], list[1], isEqual);
        const newDraggableObj = map(DraggableObj, (e) => { if (!onlyIdList.includes(e.id)) return e })
        setDraggableObj(newDraggableObj.filter(Boolean))


    }

    const pushDraggableObj = (id) => {
        let cloneData = cloneDeep(DraggableObj)
        cloneData = [...cloneData, { id: id, title: id }]
        console.log('cloneData: ', cloneData);
        const newDraggableObj = uniqBy(cloneData, 'id')
        console.log('newDraggableObj: ', newDraggableObj);
        setDraggableObj(newDraggableObj)
    }


    return (
        <DndContext onDragEnd={handleDragEnd} >
            <div style={{ margin: '15px', height: '15px' }}>
                {map(DraggableObj, (e) => {
                    return <Draggable id={e.id}>
                        {e.title}
                    </Draggable>
                })}
            </div>

            {map(DroppableList, (e) => {

                return <>
                    {e.BorderNode(
                        <Droppable id={e.id}>
                            <div style={{ width: '300px', height: '300px', background: 'pink', marginTop: '15px', color: '#000', padding: '15px' }}>
                                <p>{e.title}</p>

                                <div>
                                    {map(e.children, (v) => {
                                        return <Draggable id={v}>
                                            {v}
                                        </Draggable>
                                    })}
                                </div>
                            </div>
                        </Droppable>
                    )}

                </>
            })}
        </DndContext>
    );


}





function DragDemo() {


    return <Example />
}



export default DragDemo
