import React from 'react';

// 读取模板文件函数
export const readTemplateFile = async () => {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      search: true
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      search: true

    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];


  const jsxCode = `
  import { Button, Checkbox, Form, Input } from 'antd';
  import React from 'react';
  
  const Template = () => {
    const  dataSource = ${JSON.stringify(dataSource)}
    const  columns = ${JSON.stringify(columns)}
    return (
      <div>
      {inputNode}
      <Table dataSource={dataSource} columns={columns} />;
      </div>
      );
    }  
    `;

  Generator({
    template: jsxCode,
    props: {
      dataSource, columns
    }
  })
};
const getSearch = (columns = []) => {
  let c = columns.filter((i) => i.search)

  let t = `
  <Form
  name="basic"
  initialValues={{ remember: true }}
  onFinish={onFinish}
>

${c.map((e) => {
    return `
    <Form.Item
      label={'${e.title}'}
      name='${e.key}'
      rules={[{ required: true, message: 'Please input your ${e.title}!' }]}
    >
      <Input />
    </Form.Item>
`
  })}

  <Form.Item>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>
</Form>
`

  return {
    formTem: t,
    searchArr: c
  }
}

const replaceInputNode = ({ jsxCode, formTem, target }) => {
  return jsxCode.replace(target, `{${formTem}}`);
};
const Generator = ({ template, props }) => {
  const { columns } = props
  const { formTem, searchArr } = getSearch(columns)

  let res = ''
  if (searchArr.length > 0) {
    res = replaceInputNode({ jsxCode: template, formTem, target: '{inputNode}' })
  } else {
    res = replaceInputNode({ jsxCode: template, formTem: '', target: '{inputNode}' })
  }

  console.log('res: ', res);

}