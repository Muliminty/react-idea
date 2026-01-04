import { useCallback, useEffect, useRef, useState } from "react";

export function useFullscreen(elementRef) {
  const [isSupported, setIsSupported] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 获取全屏元素（支持浏览器前缀）
  const getFullscreenElement = () => {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  };

  // 判断是否支持 Fullscreen API
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const supported =
      !isIOS &&
      (document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled);

    setIsSupported(!!supported);
  }, []);

  // 全屏变化监听
  useEffect(() => {
    if (!isSupported) return;

    const handleChange = () => {
      const fullscreenElement = getFullscreenElement();
      const targetElement = elementRef?.current;
      const next = !!fullscreenElement && fullscreenElement === targetElement;

      setIsFullscreen(next);
    };

    // 监听各种浏览器前缀的事件
    document.addEventListener("fullscreenchange", handleChange);
    document.addEventListener("webkitfullscreenchange", handleChange);
    document.addEventListener("mozfullscreenchange", handleChange);
    document.addEventListener("MSFullscreenChange", handleChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
      document.removeEventListener("webkitfullscreenchange", handleChange);
      document.removeEventListener("mozfullscreenchange", handleChange);
      document.removeEventListener("MSFullscreenChange", handleChange);
    };
  }, [isSupported, elementRef]);

  // 进入全屏（支持浏览器前缀）
  const enter = useCallback(async () => {
    if (!isSupported) return false;

    const target = elementRef?.current;
    if (!target) {
      console.error("未提供要全屏的元素");
      return false;
    }

    try {
      if (target.requestFullscreen) {
        await target.requestFullscreen();
      } else if (target.webkitRequestFullscreen) {
        await target.webkitRequestFullscreen();
      } else if (target.mozRequestFullScreen) {
        await target.mozRequestFullScreen();
      } else if (target.msRequestFullscreen) {
        await target.msRequestFullscreen();
      } else {
        console.error("浏览器不支持全屏 API");
        return false;
      }
      return true;
    } catch (err) {
      console.error("进入全屏失败:", err);
      return false;
    }
  }, [isSupported, elementRef]);

  // 退出全屏（支持浏览器前缀）
  const exit = useCallback(async () => {
    if (!getFullscreenElement()) return true;

    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      } else {
        console.error("浏览器不支持退出全屏 API");
        return false;
      }
      return true;
    } catch (err) {
      console.error("退出全屏失败:", err);
      return false;
    }
  }, []);

  // 切换全屏
  const toggleFullscreen = useCallback(async () => {
    if (getFullscreenElement()) {
      return exit();
    }
    return enter();
  }, [enter, exit]);

  return {
    // 状态
    isSupported,
    isFullscreen,
    // 方法
    enter,
    exit,
    toggleFullscreen,
  };
}
