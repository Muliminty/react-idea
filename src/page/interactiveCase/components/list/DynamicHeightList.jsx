import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VariableSizeList as List } from 'react-window';
import 'animate.css'; // 引入 animate.css 样式

// 不定高度的虚拟列表
const DynamicHeightListDemo = ({ items }) => {
    const listRef = useRef();
    const [heightMap, setHeightMap] = useState({});

    // 更新高度映射表并重置列表布局
    const updateHeight = useCallback((index, size) => {
        setHeightMap((prev) => {
            if (prev[index] === size) return prev; // 如果高度未改变，不更新状态
            const newMap = { ...prev, [index]: size };
            return newMap;
        });

        if (listRef.current) {
            listRef.current.resetAfterIndex(index); // 重置列表布局
        }
    }, []);

    // 获取每行的高度
    const getItemSize = useCallback((index) => {
        return heightMap[index] || 100; // 默认高度为 50px
    }, [heightMap]);

    // 渲染每一行
    const Row = ({ index, style }) => {
        const rowRef = useRef();

        useEffect(() => {
            if (rowRef.current) {
                const newHeight = rowRef.current.getBoundingClientRect().height;
                console.log('rowRef.current', rowRef.current);
                if (newHeight !== heightMap[index]) {
                    updateHeight(index, newHeight); // 更新高度
                }
            }
        }, [index, heightMap, updateHeight]);

        return (
            <div ref={rowRef} style={{ ...style, padding: '10px', boxSizing: 'border-box', overflow: 'hidden', height: 'unset' }}>
                <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
                    <p>Item {index + 1}: {items[index]}</p>
                    <p style={{ fontSize: '12px' }}>Random height content: {Math.random().toFixed(2)}</p>
                    {index === 3 && <p style={{ fontSize: '12px' }}>Random height content: {Math.random().toFixed(2)}</p>}
                    {index === 3 && <p style={{ fontSize: '12px' }}>Random height content: {Math.random().toFixed(2)}</p>}
                    {index === 3 && <p style={{ fontSize: '12px' }}>Random height content: {Math.random().toFixed(2)}</p>}
                    {index === 3 && <p style={{ fontSize: '12px' }}>Random height content: {Math.random().toFixed(2)}</p>}
                </div>
            </div>
        );
    };

    return (
        <List
            ref={listRef}
            height={500} // 列表容器高度
            width={400} // 列表容器宽度
            itemCount={items.length}
            itemSize={getItemSize}
            style={{ border: '1px solid #ccc', borderRadius: '4px' }}
        >
            {Row}
        </List>
    );
};

// mockData.js
const mockGetPosts = (count = 100) => {
    return new Array(count).fill(null).map((_, index) => ({
        id: index + 1,
        content: `Post ${index + 1}`,
    }));
};
// 不定高度加动画的虚拟列表
const DynamicHeightListDemo2 = ({ items }) => {
    const listRef = useRef();
    const [heightMap, setHeightMap] = useState({});

    // 更新高度映射表并重置列表布局
    const updateHeight = useCallback((index, size) => {
        setHeightMap((prev) => {
            if (prev[index] === size) return prev;
            const newMap = { ...prev, [index]: size };
            return newMap;
        });

        if (listRef.current) {
            listRef.current.resetAfterIndex(index);
        }
    }, []);

    // 获取每行的高度
    const getItemSize = useCallback(
        (index) => {
            return heightMap[index] || 100; // 默认高度为 100px
        },
        [heightMap]
    );

    const Row = ({ index, style }) => {
        const rowRef = useRef();
        const animatedRef = useRef(false); // 使用 `useRef` 来保持每个项的动画状态
        const post = items[index];

        // 更新高度逻辑
        useEffect(() => {
            if (rowRef.current) {
                const newHeight = rowRef.current.getBoundingClientRect().height;
                if (newHeight !== heightMap[index]) {
                    updateHeight(index, newHeight);
                }
            }
        }, [index, heightMap, updateHeight]);

        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !animatedRef.current) {
                            const targetElement = entry.target;

                            // 动画逻辑
                            const aaa = targetElement.querySelector('#aaa');
                            if (aaa) {
                                aaa.style.animationDuration = '2s';
                                aaa.classList.add('animate__fadeInRight', 'animate__animated');
                            }

                            const bbb = targetElement.querySelector('#bbb');
                            if (bbb) {
                                bbb.classList.add('animate__fadeInLeft', 'animate__animated');
                            }

                            targetElement.classList.add('animate__fadeInUp', 'animate__animated');

                            animatedRef.current = true; // 标记当前项动画触发
                        }
                    });
                },
                {
                    rootMargin: '0px',
                    threshold: 0.5, // 提高触发阈值
                }
            );

            const currentRef = rowRef.current;
            if (currentRef) observer.observe(currentRef);

            return () => {
                if (currentRef) observer.unobserve(currentRef);
            };
        }, []); // 依赖数组为空，确保只在组件挂载时设置一次 observer

        return (
            <div
                ref={rowRef}
                style={{
                    ...style,
                    padding: '10px',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    height: 'unset',
                }}
            >
                <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
                    <p id="aaa">Item {index + 1}: {post.content}</p>
                    <p id="bbb">Item {index + 1}: {post.content}</p>
                    {index === 8 && <p>Random height content: {Math.random().toFixed(2)}</p>}
                    {index === 8 && <p>Random height content: {Math.random().toFixed(2)}</p>}
                    {index === 8 && <p>Random height content: {Math.random().toFixed(2)}</p>}
                    {index === 8 && <p>Random height content: {Math.random().toFixed(2)}</p>}
                    {index === 8 && <p>Random height content: {Math.random().toFixed(2)}</p>}
                    {index === 11 && <p>Random height content: {Math.random().toFixed(2)}</p>}
                    {index === 11 && <p>Random height content: {Math.random().toFixed(2)}</p>}
                    {index === 11 && <p>Random height content: {Math.random().toFixed(2)}</p>}
                </div>
            </div>
        );
    };

    return (
        <List
            ref={listRef}
            height={500} // 列表容器高度
            width={400} // 列表容器宽度
            itemCount={items.length}
            itemSize={getItemSize}
            style={{ border: '1px solid #ccc', borderRadius: '4px' }}
        >
            {Row}
        </List>
    );
};


// 示例数据
const DynamicHeightList = () => {
    const items = Array.from({ length: 100 }, (_, i) => `Content for item ${i + 1}`);
    return (
        <div style={{ padding: '20px' }}>
            <h2>不定高度的虚拟列表</h2>
            <DynamicHeightListDemo items={items} />

            <h2>不定高度加动画的虚拟列表</h2>
            <DynamicHeightListDemo2 items={mockGetPosts()} />
        </div>
    );
};

export default DynamicHeightList;
