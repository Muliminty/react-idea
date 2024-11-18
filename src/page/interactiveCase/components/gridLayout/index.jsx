import styles from './style.module.scss'
const GridLayout = () => {
    return <>
        <h2>基本使用</h2>
        <div className={styles['grid-content']}>
            {[...new Array(8).fill(0)].map((e, i) => {
                return <div className={styles['grid-item']} key={i}>
                    <div className={styles['grid-item-content']}>{i}</div>
                </div>
            })}
        </div>

        <h2>grid-template-areas</h2>
        <div className={styles['grid-content2']}>
            <div className={styles['header']}>header</div>
            <div className={styles['sidebar']}>sidebar</div>
            <div className={styles['content']}>content</div>
            <div className={styles['footer']}>footer</div>
            <div className={styles['footer']}>footer</div>
        </div>

        <h2>grid-column 和 grid-row</h2>
        <div className={styles['grid-content3']}>
            {[...new Array(24).fill(0)].map((e, i) => {
                return <div className={styles['grid-item']} key={i}>
                    <div className={styles['grid-item-content']}>{i}</div>
                </div>
            })}
        </div>
    </>
}


export default GridLayout