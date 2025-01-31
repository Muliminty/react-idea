import { useState } from "react";
import { Puck, DropZone, Render } from "@measured/puck";
import "@measured/puck/puck.css";
import styles from "./style.module.scss";

// 初始数据
const initialData = {
  "my-content": [
    { id: "1", type: "Card", text: "Card 1", spanCol: 2, spanRow: 1 },
    { id: "2", type: "Card", text: "Card 2", spanCol: 1, spanRow: 2 },
  ],
};

export default function PuckEditor() {
  const [data, setData] = useState(initialData);

  // 处理数据变化
  const handleDataChange = (newData) => {
    console.log("更新数据:", newData);
    setData(newData);
  };

  // 组件配置
  const config = {
    components: {
      Example: {
        render: ({ puck }) => (
          <DropZone
            zone="my-content"
            accepts={["Card"]}
            {...puck.droppableProps} // 确保 DropZone 能接收拖拽元素
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(4, 1fr)",
              gap: 16,
              minHeight: "200px",
              border: "1px dashed #ccc",
              padding: "10px",
            }}
          />
        ),
      },
      Card: {
        inline: true, // 允许拖放
        render: ({ text, spanCol, spanRow, puck }) => (
          <div
            ref={puck.dragRef}
            {...puck.draggableProps} // 只保留 draggableProps
            style={{
              gridColumn: `span ${spanCol}`,
              gridRow: `span ${spanRow}`,
              background: "#f0f0f0",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
              cursor: "grab",
              userSelect: "none",
            }}
          >
            {text}
          </div>
        ),
      },
    },
  };

  return (
    <div className={styles["puck-editor"]}>
      {/* Puck 组件必须在 Render 组件前，否则交互可能异常 */}
      <Puck config={config} data={data} onChange={handleDataChange} />
      <Render config={config} data={data} />
    </div>
  );
}
