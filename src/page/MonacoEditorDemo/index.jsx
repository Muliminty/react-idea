import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const MonacoEditorComponent = () => {
    const editorOptions = {
        selectOnLineNumbers: true,
        minimap: {
            enabled: false,
        },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        wrappingIndent: 'same',
    };

    const onChange = (newValue: string, e: any) => {
        console.log(newValue);
    };

    return (
        <MonacoEditor
            height="500px"
            language="javascript"
            theme="vs-dark"
            value="// Start typing your code here..."
            options={editorOptions}
            onChange={onChange}
        />
    );
};

export default MonacoEditorComponent;
