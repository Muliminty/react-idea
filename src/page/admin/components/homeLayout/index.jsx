import { useState, useEffect, useRef } from 'react';
import './HomePage.scss'; // 引入样式文件

function HomeLayout() {
  const [animation, setAnimation] = useState('animate--none');
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const wrapRef = useRef(null);

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.style.transform = `translateX(${posX * 100}%) translateY(${posY * 100}%)`;
    }
  }, [posX, posY]);

  const moveUp = () => setPosY((y) => y + 1);
  const moveDown = () => setPosY((y) => y - 1);
  const moveLeft = () => setPosX((x) => x + 1);
  const moveRight = () => setPosX((x) => x - 1);

  const toggleZoom = () => {
    setIsZoomedOut(!isZoomedOut);
  };

  const setPanelAndZoom = (x, y) => {
    if (!isZoomedOut) return;
    setPosX(x);
    setPosY(y);
    setIsZoomedOut(false);
  };

  return (
    <div className="HomeLayout">
      <div className={`site-wrap ${isZoomedOut ? 'show-all' : ''}`}>
        <div className={`panel-wrap ${animation}`} ref={wrapRef}>
          <Panel
            xPos={0}
            yPos={0}
            label="Main"
            onMoveUp={moveUp}
            onMoveDown={moveDown}
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            onZoom={toggleZoom}
            // onAnimationChange={setAnimation}
            onSetPanelAndZoom={setPanelAndZoom}
          />
          <Panel xPos={0} yPos={1} label="Up" onMoveDown={moveDown} onSetPanelAndZoom={setPanelAndZoom} />
          <Panel Reverser={true} xPos={-1} yPos={1} label="Up Left" onMoveDown={moveDown} onSetPanelAndZoom={setPanelAndZoom} />
          <Panel Reverser={true} xPos={1} yPos={1} label="Up Right" onMoveDown={moveDown} onSetPanelAndZoom={setPanelAndZoom} />
          <Panel Reverser={true} xPos={-1} yPos={0} label="Left" onMoveRight={moveRight} onSetPanelAndZoom={setPanelAndZoom} />
          <Panel Reverser={true} xPos={-1} yPos={-1} label="Down Left" onMoveUp={moveUp} onSetPanelAndZoom={setPanelAndZoom} />
          <Panel Reverser={true} xPos={1} yPos={-1} label="Down Right" onMoveUp={moveUp} onSetPanelAndZoom={setPanelAndZoom} />
          <Panel Reverser={true} xPos={1} yPos={0} label="Right" onMoveLeft={moveLeft} onSetPanelAndZoom={setPanelAndZoom} />
          <Panel xPos={0} yPos={-1} label="Down" onMoveUp={moveUp} onSetPanelAndZoom={setPanelAndZoom} />
        </div>
      </div>
    </div>
  );
}

function Panel({
  xPos,
  yPos,
  label,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
  onZoom,
  onAnimationChange,
  onSetPanelAndZoom,
  ...props
}) {
  const handleAnimationChange = (anim) => {
    if (onAnimationChange) {
      onAnimationChange(anim);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    if (onSetPanelAndZoom) {
      if (props.Reverser) {
        onSetPanelAndZoom(-xPos, yPos);

      } else {

        onSetPanelAndZoom(xPos, yPos);
      }
    }
  };

  return (
    <div className="panel" data-x-pos={xPos} data-y-pos={yPos} onClick={handleClick}>
      {onMoveUp && (
        <span className="panel__nav panel__nav--up" onClick={onMoveUp}>
          up
        </span>
      )}
      {onMoveRight && (
        <span className="panel__nav panel__nav--right" onClick={onMoveRight}>
          right
        </span>
      )}
      {onMoveLeft && (
        <span className="panel__nav panel__nav--left" onClick={onMoveLeft}>
          left
        </span>
      )}
      {onMoveDown && (
        <span className="panel__nav panel__nav--down" onClick={onMoveDown}>
          down
        </span>
      )}
      {onZoom && (
        <span className="panel__zoom" onClick={onZoom}>
          View All
        </span>
      )}
      <h1>{label}</h1>
      {onAnimationChange && (
        <div className="panel__animation-list">
          <span
            className="js-animation"
            onClick={() => handleAnimationChange('animate--none')}
          >
            None
          </span>
          <span
            className="js-animation"
            onClick={() => handleAnimationChange('animate--shrink')}
          >
            Shrink
          </span>
          <span
            className="js-animation"
            onClick={() => handleAnimationChange('animate--tilt')}
          >
            Tilt
          </span>
          <span
            className="js-animation"
            onClick={() => handleAnimationChange('animate--tilt2')}
          >
            Tilt-2
          </span>
        </div>
      )}
    </div>
  );
}

export default HomeLayout;
