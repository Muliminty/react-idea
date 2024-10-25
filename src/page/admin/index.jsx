import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import style from './style.module.scss';
import DemoCard from './components/DemoCard'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


// 导航菜单数据
const menuData = [
  {
    key: '1',
    icon: <UserOutlined />,
    title: 'demo卡片',
    content: <DemoCard />,
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    title: 'Media',
    content: 'Media management content goes here',
    subMenu: [
      {
        key: '2-1',
        title: 'Video Management',
        content: 'Video management section',
      },
      {
        key: '2-2',
        title: 'Audio Management',
        content: 'Audio management section',
      },
    ],
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    title: 'Upload',
    content: 'Upload management content goes here',
  },
];

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [content, setContent] = useState('Select a menu to display its content'); // 动态内容区域

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // 渲染菜单项
  const renderMenuItems = (data) => {
    return data.map((menu) => {
      if (menu.subMenu) {
        return (
          <SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
            {menu.subMenu.map((sub) => (
              <Menu.Item
                key={sub.key}
                onClick={() => setContent(sub.content)}
              >
                {sub.title}
              </Menu.Item>
            ))}
          </SubMenu>
        );
      }

      return (
        <Menu.Item
          key={menu.key}
          icon={menu.icon}
          onClick={() => setContent(menu.content)}
        >
          {menu.title}
        </Menu.Item>
      );
    });
  };

  return (
    <Layout className={style.layout}>
      {/* 左侧导航 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {renderMenuItems(menuData)}
        </Menu>
      </Sider>

      <Layout>
        {/* 顶部导航 */}
        <Header className={style.header} style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: style.trigger,
            onClick: toggle,
          })}
        </Header>

        {/* 面包屑导航 */}
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
        </Breadcrumb> */}

        {/* 主内容区域 */}
        <Content
          className={style.content}
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <p>{content}</p>
        </Content>
      </Layout>
    </Layout>
  );
}



export default Admin;
