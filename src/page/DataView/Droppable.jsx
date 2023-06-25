import { useDroppable } from '@dnd-kit/core';

function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        // eslint-disable-next-line react/prop-types
        id: props.id,
    });

    const style = {
        opacity: !isOver ? 1 : 0.1,
        transition: 'all 0.3s',
        transform: isOver ? 'translateY(2)' : 'translateY(0)'
    };

    return (
        // eslint-disable-next-line react/prop-types
        <div className={props.className || ''} ref={setNodeRef} style={style}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </div>
    );
}




export default Droppable
