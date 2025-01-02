import styles from './link.module.scss';
import Button01 from './components/Button01';

import { Card } from 'antd';

const LinkButton = () => {
    return (
        <>
            <h2>LinkButton</h2>

            <div className={styles['container']}>

                <Card hoverable={true}>
                    <Button01 />
                </Card>
            </div>
        </>
    );
};

export default LinkButton;