import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform, isDragging, } = useDraggable({
        // eslint-disable-next-line react/prop-types
        id: props.id,
        disabled: false, // 是否允许拖拽
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        // eslint-disable-next-line react/prop-types
        <div className={`${props.className || ''} DraggableBox`} ref={setNodeRef} style={style} id={props.id} {...attributes}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
            <div
                {...listeners}
                className={`handle ${isDragging ? 'isHover' : ''}`}
            >
            </div>
        </div>
    );
}




export default Draggable
