import React, { useRef, useState, useEffect } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";

const WhiteboardTool = () => {
    const [firstBoardData, setFirstBoardData] = useState({
        elements: [],
        appState: { viewBackgroundColor: "#fff" },
    });

    const [key, SetKey] = useState(0)
    const [secondBoardData, setSecondBoardData] = useState(firstBoardData);

    // 防止无限递归更新
    const handleFirstBoardChange = (elements, appState) => {
        const newBoardData = { elements, appState };
        if (
            JSON.stringify(newBoardData.elements) !==
            JSON.stringify(firstBoardData.elements) ||
            JSON.stringify(newBoardData.appState) !==
            JSON.stringify(firstBoardData.appState)
        ) {
            setFirstBoardData(newBoardData);
        }
    };

    // 鼠标离开白板时同步数据到第二个白板
    const handlePointerUp = () => {
        setSecondBoardData(firstBoardData);
        SetKey(key + 1)
    };

    return (
        <div>
            <h1 onClick={handlePointerUp}>点击数据同步</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    <h2>第一个白板（可编辑）</h2>
                    <Whiteboard
                        onChange={handleFirstBoardChange}
                        initialData={firstBoardData}
                    />

                </div>

                <div style={{ flex: 1 }}>
                    <h2>第二个白板（受控）</h2>
                    <Whiteboard key={key} initialData={secondBoardData} readOnly={true} />
                </div>

            </div>
        </div>
    );
};

const Whiteboard = React.forwardRef(({ onChange, onPointerUp, ...props }, ref) => {
    const excalidrawRef = useRef(null);

    useEffect(() => {
        if (ref) {
            ref.current = excalidrawRef.current;
        }
    }, [ref]);

    const handleExport = () => {
        if (excalidrawRef.current) {
            const scene = excalidrawRef.current.getSceneElements();
            console.log("Exported Scene:", scene);
        }
    };

    return (
        <div style={{ height: "80vh", width: "100%" }}>
            <Excalidraw
                ref={excalidrawRef}
                onChange={(elements, appState) => {
                    if (onChange) {
                        onChange(elements, appState);
                    }
                }}
                onPointerUp={() => {
                    if (onPointerUp) {
                        onPointerUp();
                    }
                }}
                {...props}
            />
            <button onClick={handleExport}>Export Data</button>
        </div>
    );
});

export default WhiteboardTool;
