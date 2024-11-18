import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import interactive_case from '@/routes/interactive-case';
import style from './style.module.scss';

const { Header, Sider, Content } = Layout;

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [path, setPath] = useState('');
  const navigate = useNavigate();

  const toggle = () => setCollapsed(!collapsed);

  // 使用 items 属性生成菜单
  const generateMenuItems = (menuList) =>
    menuList.map((menu) => {
      if (menu.children) {
        // 子菜单配置
        return {
          key: menu.path,
          icon: menu.icon,
          label: menu.title,
          children: generateMenuItems(menu.children),
        };
      }
      // 单独菜单配置
      return {
        key: menu.path,
        icon: menu.icon,
        label: menu.title,
      };
    });

  const menuItems = generateMenuItems(interactive_case);

  return (
    <Layout className={style.layout}>
      {/* 左侧导航栏 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems} // 使用 items 属性配置菜单
          onClick={({ key }) => {
            console.log(key)
            navigate(key)
            setPath(key);
          }} // 菜单点击后跳转到对应路由
        />
      </Sider>

      <Layout>
        {/* 顶部导航栏 */}
        <Header className={style.header} style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: style.trigger,
              onClick: toggle,
            }
          )}
        </Header>

        {/* 主内容区域 */}
        <Content
          className={style.content}
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {interactive_case.map((menu) =>
            menu.children
              ?
              menu.children.map((sub, i) => {
                console.log(sub, i);
                if (sub.path === path) {
                  return <sub.component key={sub.path} />;
                }
              })
              :
              333
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
