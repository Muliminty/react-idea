import React, { useState } from "react";
import style from './style.module.scss'; // 使用CSS Modules导入样式

// 树节点组件
const TreeNode = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false); // 控制节点展开/折叠

    return (
        <div className={style["tree-node"]}>
            {/* 点击展开/折叠节点 */}
            <div className={style["tree-label"]} onClick={() => setIsOpen(!isOpen)}>
                <span className={`${style.arrow} ${isOpen ? style.open : ''}`}>
                    {/* 箭头符号 */}
                </span>

                {label}
            </div>

            {/* 子节点 */}
            <div className={`${style["tree-children"]} ${isOpen ? style.open : ''}`}>
                {children}
            </div>

        </div>

    );
};

// 树结构组件
const Tree = () => {
    return (
        <div className={style.tree}>
            <TreeNode label="Root">
                <TreeNode label="Child 1">
                    <TreeNode label="Subchild 1" />
                    <TreeNode label="Subchild 2" />
                </TreeNode>

                <TreeNode label="Child 2">
                    <TreeNode label="Subchild 1" />
                    <TreeNode label="Subchild 2" />
                </TreeNode>

            </TreeNode>

        </div>

    );
};

export default Tree;