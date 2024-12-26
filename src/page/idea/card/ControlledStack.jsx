import React, { useEffect, useRef } from 'react';
import 'gridstack/dist/gridstack.min.css';  // 引入 GridStack 样式
import { GridStack } from 'gridstack';      // 导入 GridStack
import styles from './draggableResizableGrid.module.scss';

const ControlledStack = ({ items, addItem }) => {
    const refs = useRef({});
    const gridRef = useRef();

    // 初始化 item 引用
    if (Object.keys(refs.current).length !== items.length) {
        items.forEach(({ id }) => {
            refs.current[id] = refs.current[id] || React.createRef();
        });
    }

    useEffect(() => {
        // 初始化 GridStack 实例
        gridRef.current = gridRef.current || GridStack.init({ float: true }, '.controlled');
        const grid = gridRef.current;
        grid.batchUpdate();
        grid.removeAll(false); // 清空已有的元素

        items.forEach(({ id, width, height, maxWidth, minWidth, maxHeight, minHeight }) => {
            const item = refs.current[id].current;
            // 设置宽高限制
            item.setAttribute('gs-w', width);
            item.setAttribute('gs-h', height);
            item.setAttribute('gs-max-w', maxWidth);   // 最大宽度
            item.setAttribute('gs-min-w', minWidth);   // 最小宽度
            item.setAttribute('gs-max-h', maxHeight);  // 最大高度
            item.setAttribute('gs-min-h', minHeight);  // 最小高度
            grid.makeWidget(item); // 将 item 加入到 gridstack 中
        });

        grid.batchUpdate(false);
    }, [items]);

    return (
        <div>
            <button onClick={addItem}>添加新组件</button>
            <div className={`${styles['grid-stack']} controlled`}>
                {items.map(({ id, component }) => (
                    <div ref={refs.current[id]} key={id} className={styles['grid-stack-item']}>
                        <div className={styles['grid-stack-item-content']}>
                            {component}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ControlledStack;
