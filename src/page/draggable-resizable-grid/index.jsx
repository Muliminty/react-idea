// src/components/GridStackComponent.jsx

import React, { useState, useEffect, useRef } from 'react';
import 'gridstack/dist/gridstack.min.css';  // 引入 GridStack 样式
import styles from './draggableResizableGrid.module.scss';
import { GridStack } from 'gridstack';      // 导入 GridStack

// 单个 Item 组件
const Item = ({ id }) => <div>{id}</div>;

// 控制式堆栈（受控组件）
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
        items.forEach(({ id }) => grid.makeWidget(refs.current[id].current));
        grid.batchUpdate(false);
    }, [items]);

    return (
        <div>
            <button onClick={addItem}>添加新组件</button>
            <div
                // className="grid-stack controlled"
                className={`${styles['grid-stack']} controlled`}
            >
                {items.map((item) => (
                    <div ref={refs.current[item.id]} key={item.id} className={styles['grid-stack-item']}>
                        <div className={styles['grid-stack-item-content']}>
                            <Item {...item} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 控制式堆栈示例
const ControlledExample = () => {
    const [items, setItems] = useState([{ id: 'item-1' }, { id: 'item-2' }]);

    return (
        <ControlledStack
            items={items}
            addItem={() => setItems([...items, { id: `item-${items.length + 1}` }])}
        />
    );
};

// 非控制式堆栈（非受控组件）
const UncontrolledExample = () => {
    const gridRef = useRef();
    const [state, setState] = useState({
        count: 0,
        info: '',
        items: [
            { x: 2, y: 1, h: 2 },
            { x: 2, y: 4, w: 3 },
            { x: 4, y: 2 },
            { x: 3, y: 1, h: 2 },
            { x: 0, y: 6, w: 2, h: 2 },
        ],
    });

    useEffect(() => {
        // 初始化 GridStack 实例
        gridRef.current = gridRef.current || GridStack.init({ float: true, cellHeight: '70px', minRow: 1 }, '.uncontrolled');
        const grid = gridRef.current;

        // 监听拖拽事件
        grid.on('dragstop', (event, element) => {
            const node = element.gridstackNode;
            setState((prevState) => ({
                ...prevState,
                info: `你刚刚将节点 #${node.id} 拖拽到 ${node.x},${node.y} – 做得好！`,
            }));

            let timerId;
            window.clearTimeout(timerId);
            timerId = window.setTimeout(() => {
                setState((prevState) => ({
                    ...prevState,
                    info: '',
                }));
            }, 2000);
        });
    }, []);

    return (
        <div>
            <button
                onClick={() => {
                    const grid = gridRef.current;
                    const node = state.items[state.count] || {
                        x: Math.round(12 * Math.random()),
                        y: Math.round(5 * Math.random()),
                        w: Math.round(1 + 3 * Math.random()),
                        h: Math.round(1 + 3 * Math.random()),
                    };
                    node.id = node.content = String(state.count);
                    setState((prevState) => ({
                        ...prevState,
                        count: prevState.count + 1,
                    }));
                    grid.addWidget(node);
                }}
            >
                添加组件
            </button>
            <div>{JSON.stringify({ count: state.count, info: state.info })}</div> {/* 只序列化 count 和 info */}
            <section className="grid-stack uncontrolled"></section>
        </div>
    );
};

const GridStackComponent = () => {
    return (
        <div style={{ border: '1px solid pink' }}>
            <h1>在 React 中使用 GridStack.js</h1>
            <p>
                本示例展示了如何将 GridStack.js 与 React 集成。它演示了受控堆栈和非受控堆栈的实现。
            </p>
            <h2>受控堆栈</h2>
            <ControlledExample />
            <h2>非受控堆栈</h2>
            <UncontrolledExample />
        </div>
    );
};

export default GridStackComponent;
