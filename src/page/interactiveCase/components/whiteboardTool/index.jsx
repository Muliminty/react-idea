import React, { useRef, useState, useEffect } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";

// obsidian 测试数据
const data = {
    "type": "excalidraw",
    "version": 2,
    "source": "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/1.8.26",
    "elements": [
        {
            "id": "WpiPWhMca0j_L1s-6c0E-",
            "type": "rectangle",
            "x": -113.43850708007812,
            "y": -216.71964263916016,
            "width": 221.82763671875,
            "height": 175.27122497558594,
            "angle": 0,
            "strokeColor": "#000000",
            "backgroundColor": "transparent",
            "fillStyle": "hachure",
            "strokeWidth": 1,
            "strokeStyle": "solid",
            "roughness": 1,
            "opacity": 100,
            "groupIds": [],
            "roundness": {
                "type": 3
            },
            "seed": 5680960,
            "version": 17,
            "versionNonce": 121859904,
            "isDeleted": false,
            "boundElements": null,
            "updated": 1732604835580,
            "link": null,
            "locked": false
        },
        {
            "id": "hYzwWPg4XbTZN5ozX-8st",
            "type": "ellipse",
            "x": -57.753387451171875,
            "y": 46.187171936035156,
            "width": 101.32867431640625,
            "height": 94.9385986328125,
            "angle": 0,
            "strokeColor": "#000000",
            "backgroundColor": "transparent",
            "fillStyle": "hachure",
            "strokeWidth": 1,
            "strokeStyle": "solid",
            "roughness": 1,
            "opacity": 100,
            "groupIds": [],
            "roundness": {
                "type": 2
            },
            "seed": 60000064,
            "version": 12,
            "versionNonce": 1747686592,
            "isDeleted": false,
            "boundElements": null,
            "updated": 1732604838846,
            "link": null,
            "locked": false
        }
    ],
    "appState": {
        "theme": "dark",
        "viewBackgroundColor": "#ffffff",
        "currentItemStrokeColor": "#000000",
        "currentItemBackgroundColor": "transparent",
        "currentItemFillStyle": "hachure",
        "currentItemStrokeWidth": 1,
        "currentItemStrokeStyle": "solid",
        "currentItemRoughness": 1,
        "currentItemOpacity": 100,
        "currentItemFontFamily": 1,
        "currentItemFontSize": 20,
        "currentItemTextAlign": "left",
        "currentItemStartArrowhead": null,
        "currentItemEndArrowhead": "arrow",
        "scrollX": 379.4262390136719,
        "scrollY": 377.67181396484375,
        "zoom": {
            "value": 1
        },
        "currentItemRoundness": "round",
        "gridSize": null,
        "colorPalette": {},
        "currentStrokeOptions": null,
        "previousGridSize": null
    },
    "files": {}
}
const WhiteboardTool = () => {
    const [firstBoardData, setFirstBoardData] = useState(
        // {
        //     elements: [],
        //     appState: { viewBackgroundColor: "#fff" },
        // }
        data
    );

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
