import React, { useRef, useEffect, useState } from 'react';
import './style.scss'; // 外部样式文件，或者你可以将样式写到 JSX 内部

const Button02 = ({ children='1111111' }) => {
    const linkRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (linkRef.current) {
            const { offsetWidth, offsetHeight } = linkRef.current;
            setDimensions({ width: offsetWidth, height: offsetHeight });
        }
    }, [children]);

    return (
        <a href="#" className="hand-drawn-link" ref={linkRef}>
            {children}
            {/* 不规则的手绘风格圆圈 */}
            <svg
                className="circle-svg"
                width={dimensions.width}
                height={dimensions.height}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    className="hand-drawn-circle"
                    d={`
              M10,${dimensions.height / 2} 
              C20,${-dimensions.height / 8} ${dimensions.width - 20},${-dimensions.height / 8} 
              ${dimensions.width - 10},${dimensions.height / 2} 
              C${dimensions.width - 20},${dimensions.height * 1.1} 20,${dimensions.height * 1.1} 
              10,${dimensions.height / 2}`}
                />
            </svg>
        </a>
    );
};

export default Button02;
