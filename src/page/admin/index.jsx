import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import style from './style.module.scss';
import DemoCard from './components/DemoCard'
import TileLayout from './components/TileLayout'
import HomeLayout from './components/homeLayout'

import ButtonDemo from './components/ButtonDemo';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


// 导航菜单数据
const menuData = [
  {
    key: '1',
    icon: <UserOutlined />,
    title: '主页项目卡片demo',
    content: <DemoCard />,
  },
  {
    key: '2',
    title: '按钮',
    content: <ButtonDemo />,
  },
  {
    key: '2',
    title: '布局',
    content: 'Media management content goes here',
    subMenu: [
      {
        key: '1231',
        icon: '',
        title: '磁贴布局',
        content: <TileLayout />,
      },
      {
        key: '2-2',
        title: '首页布局',
        content: <HomeLayout />,
      },
    ],
  },

];

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [content, setContent] = useState(() => {
    return <DemoCard />
  }); // 动态内容区域

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
