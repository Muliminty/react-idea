import { useState } from 'react';
import { Card, Modal } from 'antd';
import AnimatedTreeMenu from './components/AnimatedTreeMenu'
import InteractiveSphere from './components/InteractiveSphere'
import Arborist from './components/reactArborist'
import ParticleTextCanvas from './components/ParticleTextCanvas'
import Directory from './components/directory'
import './style.scss'
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
    },
    {
        title: 'react-arborist',
        key: 'Arborist',
        description: 'react-arborist 3k start 树组件',
        content: <Arborist />,
    },
    {
        title: '粒子文字',
        key: 'ParticleTextCanvas',
        description: '粒子文字',
        content: <ParticleTextCanvas />,
    },
    {
        title: '目录',
        key: 'Directory',
        description: '目录',
        content: <Directory />,
    }
    // 你可以继续添加更多的卡片
];

export default function CollectionBox(props) {
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
                destroyOnClose={true}
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
