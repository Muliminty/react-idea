import { useState, useRef, useEffect, useCallback } from 'react';
import { Layout, Button, Select, Row, Col, Input } from 'antd';
import * as monaco from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';

const { Header, Content } = Layout;
const { Option } = Select;

const MonacoEditorComponent = () => {
    const [editorContent, setEditorContent] = useState(`
function greet() {
  console.log('Hello, Monaco Editor!');
}
greet();
    `);

    const [consoleOutput, setConsoleOutput] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [theme, setTheme] = useState('vs-dark');

    const [leftWidth, setLeftWidth] = useState('50vw'); // 编辑器的宽度
    const [dragging, setDragging] = useState(false); // 是否正在拖拽

    const draggerRef = useRef(null);
    const editorModelRef = useRef(null); // 存储编辑器模型

    // 编辑器的配置
    const editorOptions = {
        selectOnLineNumbers: true,
        minimap: {
            enabled: false,
        },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        wrappingIndent: 'same',
        autoIndent: 'full',
        renderLineHighlight: 'all',
        lineNumbers: 'on',
        lineNumbersMinChars: 3,
        folding: true,
        foldingStrategy: 'auto',
        quickSuggestions: true,
        parameterHints: true,
        autoClosingBrackets: true,
        autoClosingQuotes: true,
        formatOnType: true,
        colorDecorators: true,
        glyphMargin: true,
        errorSquiggles: 'on',
    };

    // 监听编辑器内容变化
    const onChange = (newValue) => {
        setEditorContent(newValue);
    };

    // 改变语言和主题
    const handleLanguageChange = useCallback((value) => setLanguage(value), []);
    const handleThemeChange = useCallback((value) => setTheme(value), []);

    // 动态加载语言支持
    useEffect(() => {
        if (language === 'python') {
            import('monaco-editor/esm/vs/basic-languages/python/python').then(() => {
                console.log('Python language is ready');
            });
        } else if (language === 'typescript') {
            import('monaco-editor/esm/vs/basic-languages/typescript/typescript').then(() => {
                console.log('TypeScript language is ready');
            });
        } else if (language === 'html') {
            import('monaco-editor/esm/vs/basic-languages/html/html').then(() => {
                console.log('HTML language is ready');
            });
        } else if (language === 'css') {
            import('monaco-editor/esm/vs/basic-languages/css/css').then(() => {
                console.log('CSS language is ready');
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

            // 清除错误标记
            if (editorModelRef.current) {
                monaco.editor.setModelMarkers(editorModelRef.current, 'owner', []);
            }
        } catch (error) {
            setConsoleOutput((prevOutput) => prevOutput + 'Error: ' + error.message + '\n');
            // 在编辑器中显示错误标记
            if (editorModelRef.current) {
                monaco.editor.setModelMarkers(editorModelRef.current, 'owner', [{
                    severity: monaco.MarkerSeverity.Error,
                    message: error.message,
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1,
                }]);
            }
        }
    };

    // 格式化代码
    const handleFormatCode = () => {
        if (editorModelRef.current) {
            monaco.editor.getModels()[0].format();
        }
    };

    // 自动保存功能
    useEffect(() => {
        const savedCode = localStorage.getItem('monaco-editor-code');
        if (savedCode) {
            setEditorContent(savedCode);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('monaco-editor-code', editorContent);
    }, [editorContent]);

    // 处理拖拽过程
    const handleMouseDown = (e) => {
        setDragging(true);
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            const newWidth = e.clientX / window.innerWidth * 100; // 计算新的宽度（百分比）
            setLeftWidth(`${newWidth}vw`);
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    // 监听鼠标事件
    useEffect(() => {
        if (dragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    return (
        <Layout style={{ height: '100vh' }}>
            <Header style={{ padding: '0 10px', background: '#fff' }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button
                            type="primary"
                            onClick={handleRunCode}
                            style={{ marginRight: '10px' }}
                        >
                            Run Code
                        </Button>
                        <Button
                            onClick={handleFormatCode}
                            style={{ marginRight: '10px' }}
                        >
                            Format Code
                        </Button>
                    </Col>
                    <Col>
                        <Select
                            defaultValue={language}
                            style={{ width: 120, marginRight: '10px' }}
                            onChange={handleLanguageChange}
                        >
                            <Option value="javascript">JavaScript</Option>
                            <Option value="typescript">TypeScript</Option>
                            <Option value="python">Python</Option>
                            <Option value="html">HTML</Option>
                            <Option value="css">CSS</Option>
                        </Select>
                        <Select
                            defaultValue={theme}
                            style={{ width: 120 }}
                            onChange={handleThemeChange}
                        >
                            <Option value="vs-dark">Dark</Option>
                            <Option value="vs-light">Light</Option>
                        </Select>
                    </Col>
                </Row>
            </Header>

            <Content style={{ padding: '24px', background: '#fff', minHeight: 280 }}>
                <Row gutter={24} style={{ height: 'calc(100vh - 64px)' }}>
                    <Col span={24} style={{ display: 'flex', height: '100%' }}>
                        <div
                            style={{
                                width: leftWidth,
                                height: '100%',
                                backgroundColor: '#f4f4f4',
                                overflow: 'auto',
                            }}
                        >
                            <MonacoEditor
                                height="100%"
                                language={language}  // 根据选择的语言动态设置
                                theme={theme}  // 根据选择的主题动态设置
                                value={editorContent}  // 绑定外部状态
                                options={editorOptions}  // 配置编辑器功能
                                onChange={onChange}  // 编辑器内容变化时更新外部状态
                                editorDidMount={(editor) => {
                                    editorModelRef.current = editor.getModel(); // 获取编辑器模型
                                }}
                            />
                        </div>

                        {/* 拖拽分隔线 */}
                        <div
                            ref={draggerRef}
                            style={{
                                width: '5px',
                                backgroundColor: '#ccc',
                                cursor: 'ew-resize',
                                height: '100%',
                                margin: '0 10px',
                            }}
                            onMouseDown={handleMouseDown}
                        ></div>

                        <div
                            style={{
                                width: `calc(100vw - ${leftWidth})`,
                                height: '100%',
                                backgroundColor: '#1e1e1e',
                                color: '#fff',
                                padding: '20px',
                                overflowY: 'auto',
                            }}
                        >
                            <h3>Console Output:</h3>
                            <Input.TextArea
                                id="console-output"
                                value={consoleOutput}
                                rows={16}
                                readOnly
                                style={{
                                    backgroundColor: '#1e1e1e',
                                    color: '#fff',
                                    borderRadius: '4px',
                                    border: 'none',
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default MonacoEditorComponent;
