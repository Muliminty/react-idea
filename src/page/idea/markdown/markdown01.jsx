// https://github.com/uiwjs/react-md-editor

import React from "react";
import MDEditor from '@uiw/react-md-editor';


let txt = `[源码地址](https://github.com/uiwjs/react-md-editor)
# test
+ 222
---
`

export default function Markdown01() {
  const [value, setValue] = React.useState(txt);
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={setValue}
      />

      <br />
      <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
    </div>
  );
}