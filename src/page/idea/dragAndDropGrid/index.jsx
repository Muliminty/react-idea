import React, { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core'; // 这部分导入保持不变
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import styles from './GridLayout.module.scss'; // 导入 SCSS 模块化样式




// 定义栅格项组件
const GridItem = ({ id }) => {
    const { setNodeRef, attributes, listeners, isDragging } = useSortable({ id });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={`${styles.gridItem} ${isDragging ? styles.isDragging : ''}`}
        >
            {id}
        </div>
    );
};

// 栅格布局组件
const GridLayout = () => {
    const [items, setItems] = useState(Array.from({ length: 12 }, (_, index) => index + 1)); // 12个项目
    const [draggingItem, setDraggingItem] = useState(null);

    const handleDragStart = (event) => {
        const { active } = event;
        setDraggingItem(active.id); // 记录开始拖拽的元素
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setDraggingItem(null); // 结束拖拽时清空当前拖拽项

        if (active.id !== over.id) {
            setItems((prevItems) => {
                const oldIndex = prevItems.indexOf(active.id);
                const newIndex = prevItems.indexOf(over.id);
                return arrayMove(prevItems, oldIndex, newIndex); // 交换位置
            });
        }
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className={styles.grid}>
                    {items.map((item) => (
                        <GridItem key={item} id={item} />
                    ))}
                </div>
            </SortableContext>

            {/* 添加拖拽时的浮动效果 */}
            <DragOverlay>
                {draggingItem ? (
                    <div className={styles.draggingItem}>
                        {draggingItem} {/* 显示正在拖拽的项 */}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

const DragAndDropGrid = () => {
    return (
        <div>
            <h1>拖拽栅格</h1>
            <GridLayout />
        </div>
    );
};

export default DragAndDropGrid;