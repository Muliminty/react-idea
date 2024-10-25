import React, { useState, useEffect, useRef } from 'react';
import './HomePage.scss'; // 引入样式文件

const Panel = ({ xPos, yPos, title, onNavigate }) => {
  return (
    <div className="panel" data-x-pos={xPos} data-y-pos={yPos}>
      <span className="panel__nav panel__nav--up js-up" onClick={() => onNavigate(0, 1)}>up</span>
      <span className="panel__nav panel__nav--right-top js-up js-right" onClick={() => onNavigate(1, 1)}>up/right</span>
      <span className="panel__nav panel__nav--left-top js-up js-left" onClick={() => onNavigate(-1, 1)}>up/left</span>
      <span className="panel__nav panel__nav--left js-left" onClick={() => onNavigate(-1, 0)}>left</span>
      <span className="panel__nav panel__nav--right js-right" onClick={() => onNavigate(1, 0)}>right</span>
      <span className="panel__nav panel__nav--right-down js-down js-right" onClick={() => onNavigate(1, -1)}>down/right</span>
      <span className="panel__nav panel__nav--left-down js-down js-left" onClick={() => onNavigate(-1, -1)}>down/left</span>
      <span className="panel__nav panel__nav--down js-down" onClick={() => onNavigate(0, -1)}>down</span>
      <h1>{title}</h1>
    </div>
  );
};

const PanelWrap = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const wrapRef = useRef(null);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.style.transform = `translateX(${position.x * 100}%) translateY(${position.y * 100}%)`;
    }
  }, [position]);

  const movePanel = (dx, dy) => {
    setAnimationClass('animate');
    setPosition(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
    setTimeout(() => setAnimationClass(''), 600);
  };

  const handleAnimationToggle = (animation) => {
    setAnimationClass(animation);
  };

  const zoomOut = () => {
    document.querySelector('.site-wrap').classList.add('show-all');
  };

  const zoomIn = () => {
    document.querySelector('.site-wrap').classList.remove('show-all');
  };

  return (
    <div className={`panel-wrap ${animationClass}`} ref={wrapRef}>
      <Panel xPos={0} yPos={0} title="Main" onNavigate={movePanel} />
      <Panel xPos={0} yPos={1} title="Up" onNavigate={movePanel} />
      <Panel xPos={-1} yPos={1} title="Up Left" onNavigate={movePanel} />
      <Panel xPos={1} yPos={1} title="Up Right" onNavigate={movePanel} />
      <Panel xPos={-1} yPos={0} title="Left" onNavigate={movePanel} />
      <Panel xPos={-1} yPos={-1} title="Down Left" onNavigate={movePanel} />
      <Panel xPos={1} yPos={-1} title="Down Right" onNavigate={movePanel} />
      <Panel xPos={1} yPos={0} title="Right" onNavigate={movePanel} />
      <Panel xPos={0} yPos={-1} title="Down" onNavigate={movePanel} />
      <Panel xPos={0} yPos={-2} title="Down 2" onNavigate={movePanel} />
      <span className="panel__zoom js-zoom" onClick={zoomOut}>View All</span>
      <div className="panel__animation-list">
        {['animate--none', 'animate--shrink', 'animate--tilt', 'animate--tilt2'].map((animation, index) => (
          <span key={index} className={`js-animation ${animationClass === animation ? 'active' : ''}`} onClick={() => handleAnimationToggle(animation)}>
            {animation.replace('animate--', '')}
          </span>
        ))}
      </div>
    </div>
  );
};

const HomeLayout = () => {
  return (
    <div className="site-wrap">
      <PanelWrap />
    </div>
  );
};

export default HomeLayout;
