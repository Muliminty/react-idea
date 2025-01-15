import React, { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
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
    const [targetIndex, setTargetIndex] = useState(null); // 用来存储当前目标位置的索引

    const handleDragStart = (event) => {
        const { active } = event;
        setDraggingItem(active.id); // 记录开始拖拽的元素
    };

    const handleDragMove = (event) => {
        const { active, over } = event;
        if (over) {
            // 获取当前拖拽目标的索引位置
            const overIndex = items.indexOf(over.id);
            if (overIndex !== targetIndex) {
                setTargetIndex(overIndex); // 更新目标位置
            }
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setDraggingItem(null); // 结束拖拽时清空当前拖拽项
        setTargetIndex(null); // 清空目标位置

        if (active.id !== over.id) {
            setItems((prevItems) => {
                const oldIndex = prevItems.indexOf(active.id);
                const newIndex = prevItems.indexOf(over.id);
                return arrayMove(prevItems, oldIndex, newIndex); // 交换位置
            });
        }
    };

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className={styles.grid}>
                    {items.map((item, index) => (
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

            {/* 添加目标栅格移动效果 */}
            {targetIndex !== null && (
                <div
                    className={styles.targetOverlay}
                    style={{
                        top: `${targetIndex * 80}px`, // 设置目标位置，调整为栅格的高度
                    }}
                />
            )}
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
