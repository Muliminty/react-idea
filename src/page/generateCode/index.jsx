// import React from 'react'
import { readTemplateFile } from './js/index.js'
import React, { useState, useRef } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd';

export default function GenerateCode() {
  const node = useRef(null)

  const handleRead = () => {
    readTemplateFile();
    console.log('data: ', data);
  }

  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Doe',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'Jane Smith',
      age: 28,
      address: '20 Downing Street',
    },
  ]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleAdd = () => {
    const newData = {
      key: (data.length + 1).toString(),
      name: '',
      age: 0,
      address: '',
    };
    setData([...data, newData]);
  };

  const handleSave = (row) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    console.log('newData: ', newData);
    setData(newData);
  };

  const editableCell = ({
    title,
    editable,
    children,
    dataIndex,
    // record,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editable ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `${title} is required.`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  return (
    <div>
      <h1>代码生成器</h1>
      <button
        onClick={handleRead}>
        读取模板文件函数</button>

      <div>
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          添加数据
        </Button>
        <Table
          components={{
            body: {
              cell: editableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={columns.map((col) => ({
            ...col,
            onCell: (record) => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: handleSave,
            }),
          }))}
        />
      </div>
    </div>
  )
}


