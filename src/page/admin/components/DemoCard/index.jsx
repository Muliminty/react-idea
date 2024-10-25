import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import AnimatedTreeMenu from '../DemoItem/AnimatedTreeMenu'
import InteractiveSphere from '../DemoItem/InteractiveSphere'

const demos = [
    {
        title: '树结构目录',
        key: 'toc',
        description: 'tree',
        content: <AnimatedTreeMenu />,
    },
    {
        title: '星球效果',
        key: 'InteractiveSphere',
        description: 'WebGL实现星球效果',
        content: <InteractiveSphere />,
    }
    // 你可以继续添加更多的卡片
];

export default function DemoCard(props) {
    const { className } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(''); // 当前展示的Modal内容
    const [modalTitle, setModalTitle] = useState(''); // 当前展示的Modal标题

    const handleCardClick = (item) => {
        // 打开Modal，并设置内容和标题
        setModalContent(item.content);
        setModalTitle(item.title);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        // 关闭Modal
        setIsModalVisible(false);
    };

    return (
        <div className={`demo-card ${className}`}>
            {demos.map((item) => (
                <Card
                    title={item.title}
                    key={item.key}
                    className='demo-card-item'
                    onClick={() => handleCardClick(item)} // 点击卡片时触发事件
                >
                    {item.description}
                </Card>
            ))}

            {/* Modal 部分 */}
            <Modal
                title={modalTitle}
                open={isModalVisible}
                onOk={handleModalClose}
                onCancel={handleModalClose}
                footer={null}
            >
                <p>{modalContent}</p>
            </Modal>
        </div>
    );
}


const TreeDemo = () => {

    const treeData = [
        {
            key: '0',
            title: 'Root',
            defaultOpen: true,
            children: [
                {
                    key: '0-0',
                    title: 'Child 1',
                    children: [
                        { key: '0-0-0', title: 'Subchild 1' },
                        { key: '0-0-1', title: 'Subchild 2' },
                    ],
                },
                {
                    key: '0-1',
                    title: 'Child 2',
                    children: [
                        { key: '0-1-0', title: 'Subchild 1' },
                        { key: '0-1-1', title: 'Subchild 2' },
                    ],
                },
            ],
        },
    ];

    const handleNodeClick = (label) => {
        console.log(`Node clicked: ${label}`);
    };

    return (
        <Tree
            data={treeData}
            onNodeClick={handleNodeClick}
            customIcon={(isOpen) => (isOpen ? '↓' : '→')} // 自定义箭头符号
        />
    );
};
