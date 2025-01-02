import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';

const MonacoEditorComponent = () => {
    // 初始化编辑器内容
    const [editorContent, setEditorContent] = useState(`
function greet() {
  console.log('Hello, Monaco Editor!');
}
greet();
    `);

    // 用于存储终端输出
    const [consoleOutput, setConsoleOutput] = useState('');

    // 设置编辑器的配置
    const editorOptions = {
        selectOnLineNumbers: true,
        minimap: {
            enabled: true,  // 启用迷你地图
        },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        wrappingIndent: 'same',
        autoIndent: 'full',
        renderLineHighlight: 'all',  // 高亮当前行
        lineNumbers: 'on',  // 显示行号
        lineNumbersMinChars: 3, // 行号最小长度
        folding: true,  // 启用代码折叠
        foldingStrategy: 'auto',  // 自动折叠
        quickSuggestions: true,  // 启用快速建议
        parameterHints: true,  // 参数提示
        autoClosingBrackets: true,  // 自动闭合括号
        autoClosingQuotes: true,  // 自动闭合引号
        formatOnType: true,  // 输入时格式化代码
    };

    // 监听编辑器内容变化
    const onChange = (newValue) => {
        setEditorContent(newValue);
    };

    // 语言和主题的设置
    const [language, setLanguage] = useState('javascript');
    const [theme, setTheme] = useState('vs-dark');

    // 改变语言和主题
    const handleLanguageChange = (event) => setLanguage(event.target.value);
    const handleThemeChange = (event) => setTheme(event.target.value);

    useEffect(() => {
        // 这里可以根据需要动态加载更多语言
        if (language === 'python') {
            import('monaco-editor/esm/vs/basic-languages/python/python').then(() => {
                console.log('Python language is ready');
            });
        }
    }, [language]);

    // 执行代码并捕获 console.log 输出
    const handleRunCode = () => {
        try {
            // 捕获 console.log 输出
            const originalConsoleLog = console.log;
            console.log = (...args) => {
                setConsoleOutput((prevOutput) => prevOutput + args.join(' ') + '\n');
                originalConsoleLog(...args);
            };

            // 使用 eval 执行编辑器中的代码
            eval(editorContent);

            // 恢复原始的 console.log
            console.log = originalConsoleLog;
        } catch (error) {
            setConsoleOutput((prevOutput) => prevOutput + 'Error: ' + error.message + '\n');
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Select Language:
                    <select onChange={handleLanguageChange} value={language}>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                    </select>
                </label>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>
                    Select Theme:
                    <select onChange={handleThemeChange} value={theme}>
                        <option value="vs-dark">Dark</option>
                        <option value="vs-light">Light</option>
                    </select>
                </label>
            </div>

            <MonacoEditor
                height="500px"
                language={language}  // 根据选择的语言动态设置
                theme={theme}  // 根据选择的主题动态设置
                value={editorContent}  // 绑定外部状态
                options={editorOptions}  // 配置编辑器功能
                onChange={onChange}  // 编辑器内容变化时更新外部状态
            />

            {/* 执行按钮 */}
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleRunCode} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Run Code
                </button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h3>Console Output:</h3>
                <pre style={{ backgroundColor: '#1e1e1e', color: '#fff', padding: '10px', borderRadius: '4px' }}>
                    {consoleOutput}
                </pre>
            </div>
        </div>
    );
};

export default MonacoEditorComponent;
