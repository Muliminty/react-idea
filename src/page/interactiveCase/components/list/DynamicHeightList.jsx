import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VariableSizeList as List } from 'react-window';

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

// 示例数据
const DynamicHeightList = () => {
    const items = Array.from({ length: 100 }, (_, i) => `Content for item ${i + 1}`);
    return (
        <div style={{ padding: '20px' }}>
            <h2>不定高度的虚拟列表</h2>
            <DynamicHeightListDemo items={items} />
        </div>
    );
};

export default DynamicHeightList;
