import React, { useEffect, useRef } from 'react';

// 默认配置项
const defaultConfig = {
    text: "Muliminey",          // 默认文本
    fontSize: 128,             // 默认字体大小
    fontStyle: "bold",         // 默认字体样式
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", // 默认字体
    pointCount: 1000,          // 默认粒子数量
    particleColor: "#95a5a6",  // 默认粒子颜色
    backgroundColor: "#000",  // 默认背景色
    textColor: "#fff",        // 默认文本颜色
};

const ParticleTextCanvas = ({
    text = defaultConfig.text,
    fontSize = defaultConfig.fontSize,
    fontStyle = defaultConfig.fontStyle,
    fontFamily = defaultConfig.fontFamily,
    pointCount = defaultConfig.pointCount,
    particleColor = defaultConfig.particleColor,
    backgroundColor = defaultConfig.backgroundColor,
    textColor = defaultConfig.textColor,
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const c = canvasRef.current;
        const ctx = c.getContext("2d");
        let mask;
        const fontStr = `${fontStyle} ${fontSize}pt ${fontFamily}`;

        ctx.font = fontStr;
        ctx.textAlign = "center";
        c.width = ctx.measureText(text).width;
        c.height = fontSize; // Set height to font size

        let whitePixels = [];
        let points = [];

        function point(x, y, vx, vy) {
            this.x = x;
            this.y = y;
            this.vx = vx || 1;
            this.vy = vy || 1;
        }

        point.prototype.update = function () {
            ctx.beginPath();
            ctx.fillStyle = particleColor;
            ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            // Change direction if running into black pixel
            if (this.x + this.vx >= c.width || this.x + this.vx < 0 || mask.data[coordsToI(this.x + this.vx, this.y, mask.width)] !== 255) {
                this.vx *= -1;
                this.x += this.vx * 2;
            }
            if (this.y + this.vy >= c.height || this.y + this.vy < 0 || mask.data[coordsToI(this.x, this.y + this.vy, mask.width)] !== 255) {
                this.vy *= -1;
                this.y += this.vy * 2;
            }

            for (let k = 0, m = points.length; k < m; k++) {
                if (points[k] === this) continue;

                const d = Math.sqrt(Math.pow(this.x - points[k].x, 2) + Math.pow(this.y - points[k].y, 2));
                if (d < 5) {
                    ctx.lineWidth = .2;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(points[k].x, points[k].y);
                    ctx.stroke();
                }
                if (d < 20) {
                    ctx.lineWidth = .1;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(points[k].x, points[k].y);
                    ctx.stroke();
                }
            }

            this.x += this.vx;
            this.y += this.vy;
        }

        function loop() {
            ctx.clearRect(0, 0, c.width, c.height);
            for (let k = 0, m = points.length; k < m; k++) {
                points[k].update();
            }
        }

        function init() {
            // Draw background
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, c.width, c.height);

            // Draw text
            ctx.beginPath();
            ctx.fillStyle = textColor;
            ctx.font = fontStr;
            ctx.textAlign = "left";
            ctx.fillText(text, 0, c.height / 2 + (c.height / 2));
            ctx.closePath();

            // Save mask
            mask = ctx.getImageData(0, 0, c.width, c.height);

            // Save all white pixels in an array
            for (let i = 0; i < mask.data.length; i += 4) {
                if (mask.data[i] === 255 && mask.data[i + 1] === 255 && mask.data[i + 2] === 255 && mask.data[i + 3] === 255) {
                    whitePixels.push([iToX(i, mask.width), iToY(i, mask.width)]);
                }
            }

            for (let k = 0; k < pointCount; k++) {
                addPoint();
            }
        }

        function addPoint() {
            const spawn = whitePixels[Math.floor(Math.random() * whitePixels.length)];

            const p = new point(spawn[0], spawn[1], Math.floor(Math.random() * 2 - 1), Math.floor(Math.random() * 2 - 1));
            points.push(p);
        }

        function iToX(i, w) {
            return ((i % (4 * w)) / 4);
        }

        function iToY(i, w) {
            return (Math.floor(i / (4 * w)));
        }

        function coordsToI(x, y, w) {
            return ((mask.width * y) + x) * 4;
        }

        const interval = setInterval(loop, 50);

        init();

        return () => {
            clearInterval(interval);
        };
    }, [text, fontSize, fontStyle, fontFamily, pointCount, particleColor, backgroundColor, textColor]);

    return <canvas ref={canvasRef}></canvas>;
};

// 默认配置项
ParticleTextCanvas.defaultProps = defaultConfig;

export default ParticleTextCanvas;
