import DayNight from './dayNight'
import styles from './card.module.scss'

const CardContent = () => {
    return (
        <>
            <h2>创意小卡片</h2>
            <div className={styles['card-content']}>
                <div style={{ width: '300px', height: '300px' }}>
                    <DayNight />
                </div>
            </div>
        </>
    );
};

export default CardContent;