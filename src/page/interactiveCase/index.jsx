import React, { useState, useCallback } from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import interactive_case from '@/routes/interactive-case';
import style from './style.module.scss';

const { Header, Sider, Content } = Layout;

function Admin() {
  // 获取默认选中的路径
  const defaultSelectedPath = interactive_case[0]?.children[0]?.path || '';

  const [collapsed, setCollapsed] = useState(false);
  const [selectedPath, setSelectedPath] = useState(defaultSelectedPath);

  const navigate = useNavigate();

  // 切换 Sider 是否收缩
  const toggle = useCallback(() => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  }, []);

  // 动态生成菜单项
  const generateMenuItems = useCallback((menuList) => {
    return menuList.map((menu) => {
      const { path, icon, title, children } = menu;
      const menuItem = {
        key: path,
        icon,
        label: title,
      };

      if (children) {
        menuItem.children = generateMenuItems(children); // 递归生成子菜单项
      }

      return menuItem;
    });
  }, []);

  const menuItems = generateMenuItems(interactive_case[0].children);

  // 菜单点击后的处理
  const handleMenuClick = useCallback(({ key }) => {
    setSelectedPath(key);
    navigate(key);
  }, [navigate]);

  // 动态渲染内容
  const renderContent = (menuList = interactive_case) => {
    for (const menu of menuList) {
      for (const sub of menu.children || []) {
        if (sub.path === selectedPath) {
          return <sub.component key={sub.path} />;
        }

        // 如果有子菜单，递归查找
        if (sub.children) {
          const result = renderContent([sub]); // 递归查找子菜单
          if (result) return result;
        }
      }
    }
    return null;
  };

  return (
    <Layout className={style.layout}>
      {/* 左侧导航栏 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Header className={style.header} style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: style.trigger,
              onClick: toggle,
            }
          )}
        </Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedPath]} // 当前选中的菜单项
          items={menuItems} // 使用 items 属性配置菜单
          onClick={handleMenuClick} // 菜单点击后跳转到对应路由
        />
      </Sider>

      <Layout>
        {/* 顶部导航栏 */}


        {/* 主内容区域 */}
        <Content
          className={style.content}
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {renderContent()} {/* 渲染内容 */}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
