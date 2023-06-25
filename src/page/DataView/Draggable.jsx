import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        // eslint-disable-next-line react/prop-types
        id: props.id,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        zIndex: 100,
    };

    return (
        // eslint-disable-next-line react/prop-types
        <div className={`draggable_box ${props.className || ''}`} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </div>
    );
}




export default Draggable
