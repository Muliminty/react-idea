import { useState } from 'react';
import DayNight from './dayNight'
import styles from './card.module.scss'
import ControlledStack from './ControlledStack'

const CardContent = () => {
    const [items, setItems] = useState([
        {
            id: 'item-1',
            component: <DayNight />,
            width: 3, height: 3, // 默认宽高
            maxWidth: 4, minWidth: 2, maxHeight: 4, minHeight: 2 // 最大最小宽高
        },
        {
            id: 'item-2',
            component: '333',
            width: 2, height: 2, // 默认宽高
            maxWidth: 3, minWidth: 2, maxHeight: 3, minHeight: 2 // 最大最小宽高
        }
    ]);

    return (
        <>
            <h2>创意小卡片</h2>
            <div className={styles['card-content']}>
                <ControlledStack
                    items={items}
                    addItem={() => setItems([...items, { id: `item-${items.length + 1}`, width: 2, height: 2, maxWidth: 3, minWidth: 2, maxHeight: 3, minHeight: 2 }])}
                />
            </div>
        </>
    );
};

export default CardContent;
