import { useState } from 'react';
import { Tree } from 'react-arborist';
import './treeStyles.scss';

const treeData = [
    {
        id: 'section1',
        name: 'Introduction',
        children: [
            { id: 'subsection1-1', name: 'Overview' },
            { id: 'subsection1-2', name: 'Getting Started' }
        ]
    },
    {
        id: 'section2',
        name: 'Chapter 1: Basics',
        children: [
            { id: 'subsection2-1', name: '6666666' },
            { id: 'subsection2-2', name: 'Syntax and Semantics' }
        ]
    },
    {
        id: 'section3',
        name: 'Chapter 2: Advanced Topics',
        children: [
            { id: 'subsection3-1', name: 'Advanced JavaScript' },
            { id: 'subsection3-2', name: 'Asynchronous Programming' }
        ]
    },
    { id: 'section4', name: 'Conclusion' }
];

const Arborist = () => {
    const [selected, setSelected] = useState('section4');
    return (
        <div style={{ width: 300, height: 500, background: '#f0f0f0', padding: '10px' }}>
            <h3 >Document Table of Contents</h3>
            <Tree
                data={treeData}
                rowHeight={50}
                openByDefault={false}
                // onActivate={(node) => {
                //     setSelected('')
                // }}
            // children={(node, style, dragHandle) => <Node node={node} style={style} dragHandle={dragHandle} />}
            >
                {({ node, style, dragHandle }) => <Node
                    node={node}
                    style={style}
                    // onClick={(node) => { setSelected('') }}
                    selected={selected}
                // dragHandle={dragHandle}
                />}
            </Tree>
        </div>

    );
};
function Node({ node, style, dragHandle, selected }) {
    return (
        <div
            className={`tree-label  ${node.isLeaf ? "MD" : ""} ${selected === node.id ? "selected" : ""}`}
            style={style}
            ref={dragHandle}
            onClick={() => { node.toggle(), onClick && onClick(node) }}
        >

            {node.isLeaf ? "MD-" : "+"}
            {node.data.name}
        </div>

    );
}
export default Arborist;



// import { useState, useCallback, createContext, useContext } from 'react';
// import { Tree } from 'react-arborist';
// import './treeStyles.scss';

// // 创建 Context 来共享选中的节点状态
// const SelectedNodeContext = createContext();

// const treeData = [
//     {
//         id: 'section1',
//         name: 'Introduction',
//         children: [
//             { id: 'subsection1-1', name: 'Overview' },
//             { id: 'subsection1-2', name: 'Getting Started' }
//         ]
//     },
//     {
//         id: 'section2',
//         name: 'Chapter 1: Basics',
//         children: [
//             { id: 'subsection2-1', name: '6666666' },
//             { id: 'subsection2-2', name: 'Syntax and Semantics' }
//         ]
//     },
//     {
//         id: 'section3',
//         name: 'Chapter 2: Advanced Topics',
//         children: [
//             { id: 'subsection3-1', name: 'Advanced JavaScript' },
//             { id: 'subsection3-2', name: 'Asynchronous Programming' }
//         ]
//     },
//     { id: 'section4', name: 'Conclusion' }
// ];

// const Arborist = () => {
//     const [selectedId, setSelectedId] = useState('section4');  // 初始选中的 ID

//     const handleSelect = useCallback((id) => {
//         setSelectedId(id);  // 更新选中的节点 ID
//     }, []);

//     return (
//         <SelectedNodeContext.Provider value={{ selectedId, handleSelect }}>
//             <div style={{ width: 300, height: 500, background: '#f0f0f0', padding: '10px' }}>
//                 <h3>Document Table of Contents</h3>
//                 <Tree
//                     data={treeData}
//                     rowHeight={50}
//                     openByDefault={false}
//                 >
//                     {({ node, style, dragHandle }) => (
//                         <Node
//                             key={node.id}  // 使用唯一的 key 来帮助 React 跟踪节点
//                             node={node}
//                             style={style}
//                             dragHandle={dragHandle}
//                         />
//                     )}
//                 </Tree>
//             </div>
//         </SelectedNodeContext.Provider>
//     );
// };

// const Node = React.memo(({ node, style, dragHandle }) => {
//     const { selectedId, handleSelect } = useContext(SelectedNodeContext);  // 从 Context 中获取选中状态

//     const isSelected = selectedId === node.id;  // 判断当前节点是否选中

//     const handleClick = () => {
//         handleSelect(node.id);  // 更新选中的节点
//     };

//     return (
//         <div
//             className={`tree-label ${node.isLeaf ? 'MD' : ''} ${isSelected ? 'selected' : ''}`}
//             style={style}
//             ref={dragHandle}
//             onClick={handleClick}
//         >
//             {node.isLeaf ? 'MD-' : '+'}
//             {node.data.name}
//         </div>
//     );
// });

// export default Arborist;
