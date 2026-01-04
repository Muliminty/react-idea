/**
 * @fileoverview useFullscreen Hook - 全屏状态管理 Hook
 * @description 提供跨浏览器兼容的全屏功能，支持进入、退出和切换全屏状态
 * @module hooks/useFullscreen
 * @author Your Name
 * @created 2024-01-04
 */

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * @typedef {Object} UseFullscreenOptions
 * @description useFullscreen Hook 的配置选项
 * @property {(isFullscreen: boolean, element?: Element) => void} [onFullscreenChange] - 全屏状态变化时的回调函数
 * @property {(error: Error) => void} [onError] - 发生错误时的回调函数
 */

/**
 * @typedef {Object} UseFullscreenReturn
 * @description useFullscreen Hook 的返回值对象
 * @property {boolean} isFullscreen - 当前是否处于全屏状态
 * @property {boolean} isSupported - 浏览器是否支持全屏 API
 * @property {Error|null} error - 错误对象，如果没有错误则为 null
 * @property {React.RefObject<HTMLElement>} elementRef - DOM 元素引用，用于绑定要全屏的元素
 * @property {(element?: HTMLElement) => Promise<boolean>} enterFullscreen - 进入全屏的方法
 * @property {() => Promise<boolean>} exitFullscreen - 退出全屏的方法
 * @property {() => Promise<boolean>} toggleFullscreen - 切换全屏状态的方法
 * @property {(element: HTMLElement) => boolean} isElementFullscreen - 检查指定元素是否处于全屏状态
 */

/**
 * useFullscreen Hook
 *
 * 一个方便管理全屏状态的自定义 React Hook，提供跨浏览器兼容的全屏功能。
 * 支持进入全屏、退出全屏、切换全屏状态以及检查元素全屏状态。
 *
 * @description
 * 该 Hook 封装了浏览器的 Fullscreen API，提供了统一的接口来管理全屏状态。
 * 它自动处理不同浏览器的兼容性问题（Webkit、Moz、MS 前缀），
 * 并提供了丰富的状态和回调机制。
 *
 * @example
 * // 基础用法
 * function MyComponent() {
 *   const { isFullscreen, toggleFullscreen, elementRef } = useFullscreen();
 *
 *   return (
 *     <div>
 *       <div ref={elementRef}>要全屏的内容</div>
 *       <button onClick={toggleFullscreen}>
 *         {isFullscreen ? '退出全屏' : '进入全屏'}
 *       </button>
 *     </div>
 *   );
 * }
 *
 * @example
 * // 带回调的高级用法
 * function AdvancedComponent() {
 *   const { isFullscreen, toggleFullscreen, elementRef } = useFullscreen({
 *     onFullscreenChange: (isFull, element) => {
 *       console.log('全屏状态变化:', isFull);
 *       if (isFull) {
 *         document.body.style.overflow = 'hidden';
 *       } else {
 *         document.body.style.overflow = '';
 *       }
 *     },
 *     onError: (error) => {
 *       console.error('全屏错误:', error.message);
 *     }
 *   });
 *
 *   return (
 *     <div ref={elementRef} className={isFullscreen ? 'fullscreen' : ''}>
 *       内容
 *       <button onClick={toggleFullscreen}>切换全屏</button>
 *     </div>
 *   );
 * }
 *
 * @param {UseFullscreenOptions} [options={}] - Hook 配置选项
 * @returns {UseFullscreenReturn} 全屏状态和控制方法的对象
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API MDN Fullscreen API}
 */
export function useFullscreen(options = {}) {
  /**
   * @type {UseFullscreenOptions}
   * @description 从 options 中解构出回调函数
   */
  const {
    /**
     * @type {(isFullscreen: boolean, element?: Element) => void}
     * @description 全屏状态变化时的回调函数
     * @param {boolean} isFullscreen - 是否处于全屏状态
     * @param {Element} [element] - 当前全屏的元素
     */
    onFullscreenChange,

    /**
     * @type {(error: Error) => void}
     * @description 发生错误时的回调函数
     * @param {Error} error - 错误对象
     */
    onError,
  } = options;

  /**
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   * @description 全屏状态，true 表示当前处于全屏状态
   */
  const [isFullscreen, setIsFullscreen] = useState(false);

  /**
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   * @description 浏览器支持状态，true 表示浏览器支持全屏 API
   */
  const [isSupported, setIsSupported] = useState(true);

  /**
   * @type {[Error | null, React.Dispatch<React.SetStateAction<Error | null>>]}
   * @description 错误状态，存储最近发生的错误，如果没有错误则为 null
   */
  const [error, setError] = useState(null);

  /**
   * @type {React.RefObject<HTMLElement>}
   * @description DOM 元素引用，用于绑定要全屏的元素
   * 可以将此 ref 绑定到任何需要全屏的 DOM 元素上
   */
  const elementRef = useRef(null);

  /**
   * @description 检测浏览器是否支持全屏 API
   *
   * 该 effect 在组件挂载时执行一次，检查当前浏览器是否支持全屏功能。
   * 支持的浏览器包括：
   * - 标准 Fullscreen API
   * - Webkit 前缀（Safari、旧版 Chrome）
   * - Moz 前缀（Firefox）
   * - MS 前缀（Edge/IE）
   *
   * @effect
   * @returns {void}
   */
  useEffect(() => {
    /**
     * @type {boolean}
     * @description 浏览器是否支持全屏 API
     */
    const supported = !!(
      document.requestFullscreen ||
      document.webkitRequestFullscreen ||
      document.mozRequestFullScreen ||
      document.msRequestFullscreen
    );
    setIsSupported(supported);

    if (!supported) {
      /**
       * @type {Error}
       * @description 浏览器不支持全屏 API 的错误
       */
      const err = new Error("您的浏览器不支持全屏 API");
      setError(err);
      onError?.(err);
    }
  }, [onError]);

  /**
   * @description 监听全屏状态变化
   *
   * 该 effect 监听浏览器的全屏状态变化事件，并更新内部状态。
   * 支持多种浏览器的前缀事件名，确保跨浏览器兼容性。
   * 当全屏状态变化时，会调用 onFullscreenChange 回调函数。
   *
   * @effect
   * @returns {() => void} 清理函数，用于移除事件监听器
   */
  useEffect(() => {
    if (!isSupported) return;

    /**
     * @description 处理全屏状态变化的回调函数
     * @returns {void}
     */
    const handleFullscreenChange = () => {
      /**
       * @type {Element | null}
       * @description 当前全屏的元素对象
       */
      const fullscreenElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      /**
       * @type {boolean}
       * @description 新的全屏状态
       */
      const newState = !!fullscreenElement;
      setIsFullscreen(newState);
      onFullscreenChange?.(newState, fullscreenElement);
    };

    // 添加事件监听器（兼容各种浏览器）
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    /**
     * @description 清理函数，移除所有事件监听器
     * @returns {void}
     */
    return () => {
      // 清理事件监听器
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, [isSupported, onFullscreenChange]);

  /**
   * 进入全屏
   *
   * @description
   * 将指定元素或通过 elementRef 绑定的元素设置为全屏显示。
   * 如果不传入 element 参数，则使用 elementRef.current 作为目标元素。
   *
   * @async
   * @param {HTMLElement} [element=null] - 要全屏的元素，如果不提供则使用 elementRef
   * @returns {Promise<boolean>} 是否成功进入全屏，成功返回 true，失败返回 false
   *
   * @example
   * // 使用 elementRef 绑定的元素
   * const { enterFullscreen, elementRef } = useFullscreen();
   * return <div ref={elementRef}><button onClick={enterFullscreen}>全屏</button></div>;
   *
   * @example
   * // 直接传入元素
   * const { enterFullscreen } = useFullscreen();
   * const handleClick = () => {
   *   const element = document.getElementById('my-element');
   *   enterFullscreen(element);
   * };
   */
  const enterFullscreen = useCallback(
    async (element = null) => {
      if (!isSupported) {
        const err = new Error("浏览器不支持全屏功能");
        setError(err);
        onError?.(err);
        return false;
      }

      /**
       * @type {HTMLElement | null}
       * @description 要全屏的目标元素
       */
      const targetElement = element || elementRef.current;
      if (!targetElement) {
        const err = new Error("未找到要全屏的元素");
        setError(err);
        onError?.(err);
        return false;
      }

      try {
        // 使用对应浏览器的 API 进入全屏
        if (targetElement.requestFullscreen) {
          await targetElement.requestFullscreen();
        } else if (targetElement.webkitRequestFullscreen) {
          await targetElement.webkitRequestFullscreen();
        } else if (targetElement.mozRequestFullScreen) {
          await targetElement.mozRequestFullScreen();
        } else if (targetElement.msRequestFullscreen) {
          await targetElement.msRequestFullscreen();
        }
        return true;
      } catch (err) {
        setError(err);
        onError?.(err);
        return false;
      }
    },
    [isSupported, onError]
  );

  /**
   * 退出全屏
   *
   * @description
   * 退出当前的全屏状态，恢复到正常显示模式。
   * 如果当前没有处于全屏状态，则直接返回 true。
   *
   * @async
   * @returns {Promise<boolean>} 是否成功退出全屏，成功返回 true，失败返回 false
   *
   * @example
   * const { exitFullscreen } = useFullscreen();
   * return <button onClick={exitFullscreen}>退出全屏</button>;
   */
  const exitFullscreen = useCallback(async () => {
    if (!isFullscreen) return true;

    try {
      // 使用对应浏览器的 API 退出全屏
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
      return true;
    } catch (err) {
      setError(err);
      onError?.(err);
      return false;
    }
  }, [isFullscreen, onError]);

  /**
   * 切换全屏状态
   *
   * @description
   * 在全屏和正常显示模式之间切换。
   * 如果当前是全屏状态，则退出全屏；
   * 如果当前不是全屏状态，则进入全屏。
   *
   * @async
   * @returns {Promise<boolean>} 操作是否成功，成功返回 true，失败返回 false
   *
   * @example
   * const { isFullscreen, toggleFullscreen } = useFullscreen();
   * return (
   *   <button onClick={toggleFullscreen}>
   *     {isFullscreen ? '退出全屏' : '进入全屏'}
   *   </button>
   * );
   */
  const toggleFullscreen = useCallback(async () => {
    if (isFullscreen) {
      return await exitFullscreen();
    } else {
      return await enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  /**
   * 检查元素是否处于全屏状态
   *
   * @description
   * 检查指定的 DOM 元素是否当前处于全屏显示状态。
   * 可以用于判断特定元素是否是全屏元素。
   *
   * @param {HTMLElement} element - 要检查的 DOM 元素
   * @returns {boolean} 如果该元素当前是全屏元素则返回 true，否则返回 false
   *
   * @example
   * const { isElementFullscreen } = useFullscreen();
   * const element = document.getElementById('my-element');
   * if (isElementFullscreen(element)) {
   *   console.log('该元素正处于全屏状态');
   * }
   */
  const isElementFullscreen = useCallback((element) => {
    /**
     * @type {Element | null}
     * @description 当前全屏的元素
     */
    const fullscreenElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    if (!element) return false;
    return element === fullscreenElement;
  }, []);

  /**
   * @description Hook 的返回值，包含状态和控制方法
   * @type {UseFullscreenReturn}
   */
  return {
    // ============ 状态属性 ============

    /**
     * @type {boolean}
     * @description 当前是否处于全屏状态
     * @readonly
     */
    isFullscreen,

    /**
     * @type {boolean}
     * @description 浏览器是否支持全屏 API
     * @readonly
     */
    isSupported,

    /**
     * @type {Error | null}
     * @description 错误对象，如果没有错误则为 null
     * @readonly
     */
    error,

    /**
     * @type {React.RefObject<HTMLElement>}
     * @description DOM 元素引用，用于绑定要全屏的元素
     * @readonly
     */
    elementRef,

    // ============ 方法 ============

    /**
     * @type {(element?: HTMLElement) => Promise<boolean>}
     * @description 进入全屏的方法
     */
    enterFullscreen,

    /**
     * @type {() => Promise<boolean>}
     * @description 退出全屏的方法
     */
    exitFullscreen,

    /**
     * @type {() => Promise<boolean>}
     * @description 切换全屏状态的方法
     */
    toggleFullscreen,

    /**
     * @type {(element: HTMLElement) => boolean}
     * @description 检查指定元素是否处于全屏状态的方法
     */
    isElementFullscreen,
  };
}

export function useFullscreen(options = {}) {
  const {
    onFullscreenChange, // 全屏状态变化回调
    onError, // 错误回调
  } = options;

  // 全屏状态
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState(null);

  // DOM 元素引用
  const elementRef = useRef(null);

  // 检测浏览器是否支持全屏 API
  useEffect(() => {
    const supported = !!(
      document.requestFullscreen ||
      document.webkitRequestFullscreen ||
      document.mozRequestFullScreen ||
      document.msRequestFullscreen
    );
    setIsSupported(supported);

    if (!supported) {
      const err = new Error("您的浏览器不支持全屏 API");
      setError(err);
      onError?.(err);
    }
  }, [onError]);

  // 监听全屏状态变化
  useEffect(() => {
    if (!isSupported) return;

    const handleFullscreenChange = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      const newState = !!fullscreenElement;
      setIsFullscreen(newState);
      onFullscreenChange?.(newState, fullscreenElement);
    };

    // 添加事件监听器（兼容各种浏览器）
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      // 清理事件监听器
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, [isSupported, onFullscreenChange]);

  // 进入全屏
  const enterFullscreen = useCallback(
    async (element = null) => {
      if (!isSupported) {
        const err = new Error("浏览器不支持全屏功能");
        setError(err);
        onError?.(err);
        return false;
      }

      const targetElement = element || elementRef.current;
      if (!targetElement) {
        const err = new Error("未找到要全屏的元素");
        setError(err);
        onError?.(err);
        return false;
      }

      try {
        if (targetElement.requestFullscreen) {
          await targetElement.requestFullscreen();
        } else if (targetElement.webkitRequestFullscreen) {
          await targetElement.webkitRequestFullscreen();
        } else if (targetElement.mozRequestFullScreen) {
          await targetElement.mozRequestFullScreen();
        } else if (targetElement.msRequestFullscreen) {
          await targetElement.msRequestFullscreen();
        }
        return true;
      } catch (err) {
        setError(err);
        onError?.(err);
        return false;
      }
    },
    [isSupported, onError]
  );

  // 退出全屏
  const exitFullscreen = useCallback(async () => {
    if (!isFullscreen) return true;

    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
      return true;
    } catch (err) {
      setError(err);
      onError?.(err);
      return false;
    }
  }, [isFullscreen, onError]);

  // 切换全屏状态
  const toggleFullscreen = useCallback(async () => {
    if (isFullscreen) {
      return await exitFullscreen();
    } else {
      return await enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // 检查元素是否处于全屏状态
  const isElementFullscreen = useCallback((element) => {
    const fullscreenElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    if (!element) return false;
    return element === fullscreenElement;
  }, []);

  return {
    // 状态
    isFullscreen,
    isSupported,
    error,
    elementRef,

    // 方法
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isElementFullscreen,
  };
}
