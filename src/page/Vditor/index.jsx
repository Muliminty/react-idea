import { useEffect, useRef, useState } from 'react';
import Vditor from 'vditor';
import "vditor/dist/index.css";

import './index.css'


const MdEditor = () => {
  // eslint-disable-next-line react/prop-types
  const editorRef = useRef(null);

  const [value, setValue] = useState('# Hello, Vditor!');

  const onChange = (value) => {

    setValue(value)
  }

  useEffect(() => {
    new Vditor(editorRef.current, {
      value, // 初始值，通常是Markdown文本
      input: (value) => onChange(value), // 输入回调函数，当编辑器的内容发生变化时调用
      cache: { id: 'vditor' }, // 缓存设置，id用于区分不同的Vditor实例
      height: '100%', // 编辑器的高度
      counter: { enable: true }, // 是否启用字数统计
      toolbarConfig: { // 工具栏配置
        // pin: true, // 是否固定工具栏
      },
      mode: 'sv', // 编辑器模式，可选值有 'wysiwyg' (所见即所得), 'ir' (即时渲染), 'sv' (分屏预览)
      preview: { // 预览配置
        delay: 5, // 预览延迟时间，单位为毫秒
        mode: 'both', // 预览模式，可选值有 'both' (编辑器和预览同时显示), 'editor' (只显示编辑器), 'preview' (只显示预览)
        // actions: []
      },
      resize: { // 编辑器大小调整配置
        enable: true, // 是否允许调整编辑器大小
        position: 'bottom', // 调整大小的位置，可选值有 'bottom' (底部), 'top' (顶部)
      },
      // hint: { // 提示配置
      //   delay: 200, // 提示延迟时间，单位为毫秒
      // },
      upload: { // 上传配置
        url: '/api/v3/upload', // 上传接口地址
        max: 10 * 1024 * 1024, // 最大上传文件大小，单位为字节
        linkToImgUrl: '/api/v3/upload/url', // 将链接转换为图片的接口地址
      },
    })
  }, []) // 空依赖数组，确保Vditor只在组件挂载时初始化一次


  return (

    <div style={{
      witdh: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ height: '500px', width: '500px' }}>
        <div className="markdown-editor" ref={editorRef}>
        </div>
      </div>

      <MarkdownPreviewer markdown={value} />
    </div>

  )
}


// eslint-disable-next-line react/prop-types
function MarkdownPreviewer({ markdown }) {
  console.log('markdown: ', markdown);
  const ref = useRef();
  const vditorRef = useRef();

  useEffect(() => {
    if (ref.current) {
      vditorRef.current = new Vditor(ref.current, {
        mode: 'ir', // 编辑器模式，可选值有 'wysiwyg' (所见即所得), 'ir' (即时渲染), 'sv' (分屏预览)
        cache: {
          id: 'my-vditor', // 添加这一行
        },
        toolbar: [],
        after: () => {
          vditorRef.current.setValue(markdown);
          vditorRef.current.disabled();// 禁用 
        },

      });
    }
    // 设置预览模式
  }, [markdown]);



  return <div style={{ width: '500px', height: '500px', margin: '15px', overflow: 'scroll' }} >
    <div ref={ref} />
  </div>;
}

export default MdEditor;
