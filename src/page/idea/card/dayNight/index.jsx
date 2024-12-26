import styles from './DayNight.module.scss';

const DayNight = () => {
    return (
        <div className={styles.wrapper} style={{ height: '100%', background: '#fff', borderRadius: "40px" }}>
            <div style={{ height: '100%' }}>
                <input id="switch" type="checkbox" />
                <div className={styles.app} style={{ height: '100%' }}>
                    <div className={styles.body} style={{ height: '100%' }}>
                        <div className={styles.phone} style={{ height: '100%' }}>
                            <div className={styles.menu}>
                                <div className={styles.time}>4:20</div>
                                <div className={styles.icons}>
                                    <div className={styles.network} />
                                    <div className={styles.battery} />
                                </div>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.circle}>
                                    <div className={styles.crescent} />
                                </div>
                                <label htmlFor="switch">
                                    <div className={styles.toggle} />
                                    <div className={styles.names}>
                                        <p className={styles.light}>Light</p>
                                        <p className={styles.dark}>Dark</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DayNight;
