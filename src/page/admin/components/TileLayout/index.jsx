import styles from './style.module.scss';
const randomImages = [
  'https://via.placeholder.com/200/FF5733/FFFFFF?text=1',
  'https://via.placeholder.com/200/33FF57/FFFFFF?text=2',
  'https://via.placeholder.com/200/3357FF/FFFFFF?text=3',
  'https://via.placeholder.com/200/FF33A1/FFFFFF?text=4',
  'https://via.placeholder.com/200/FFC300/FFFFFF?text=5',
  'https://via.placeholder.com/200/DAF7A6/FFFFFF?text=6',
];

const createTile = (imageSrc, title, height) => (
  <div className={styles.tile} key={title} style={{ height: `${height}px` }}>
    <img src={imageSrc} alt={title} />
    <h3>{title}</h3>

  </div>

);

const getRandomHeight = () => Math.floor(Math.random() * (300 - 150 + 1)) + 150; // 随机生成150到300之间的高度

const TileLayout = () => {
  return (
    <div className={styles['grid-container']}>
      {randomImages.map((imageSrc, index) => createTile(imageSrc, `磁贴 ${index + 1}`, getRandomHeight()))}
    </div>

  );
};

export default TileLayout;