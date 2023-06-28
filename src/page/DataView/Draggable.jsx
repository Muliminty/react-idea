import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function Draggable(props) {
    console.log('props: ', props);
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        // eslint-disable-next-line react/prop-types
        id: props.id,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        // eslint-disable-next-line react/prop-types
        <div className={`${props.className || ''} DraggableBox`} ref={setNodeRef} style={style}  {...attributes}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
            <div
                // listeners 在哪个元素 ，哪个元素就可拖拽
                {...listeners}
                className='handle'
                style={isDragging ? { background: 'rgb(229, 255, 0)' } : {}}>
            </div>
        </div>
    );
}




export default Draggable
