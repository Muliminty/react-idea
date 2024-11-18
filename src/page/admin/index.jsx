import React, { useState } from 'react';
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
  const toggle = () => setCollapsed(!collapsed);

  // 动态生成菜单项
  const generateMenuItems = (menuList) => {
    return menuList.map((menu) => {
      if (menu.children) {
        return {
          key: menu.path,
          icon: menu.icon,
          label: menu.title,
          children: generateMenuItems(menu.children),
        };
      }
      return {
        key: menu.path,
        icon: menu.icon,
        label: menu.title,
      };
    });
  };

  // 默认选中的菜单项
  const menuItems = generateMenuItems(interactive_case[0].children);



  // 菜单点击后的处理
  const handleMenuClick = ({ key }) => {
    setSelectedPath(key);
    navigate(key);
  };

  // 动态渲染内容
  const renderContent = (menuList = interactive_case) => {
    for (const menu of menuList) {
      for (const sub of menu.children || []) {
        // 如果找到了匹配的 path，渲染对应的 component
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
    return null; // 默认返回空，防止未匹配到内容时出现错误
  };


  return (
    <Layout className={style.layout}>
      {/* 左侧导航栏 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[defaultSelectedPath]} // 默认选中第一个菜单项
          items={menuItems} // 使用 items 属性配置菜单
          onClick={handleMenuClick} // 菜单点击后跳转到对应路由
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
          {renderContent()} {/* 渲染内容 */}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
