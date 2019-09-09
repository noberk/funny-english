import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React from "react";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface HomeState{
  collapsed:boolean;
}
export class Home extends React.Component<any,HomeState> {
  state = {
    collapsed: false,
  };

  onCollapse = () => {
    this.setState({ collapsed: this.state.collapsed===false ? true: false });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultOpenKeys={['sub1','sub2']}  mode="inline">
            <SubMenu key="sub1"title={<span>👨‍🏫 (Student)学员</span>}>
              <Menu.Item key="1">Students List</Menu.Item>
          
            </SubMenu>
            <SubMenu key="sub2" title={<span>✍️ (Write)录入</span> }>
              <Menu.Item key="2">Vocabulary</Menu.Item>
              <Menu.Item key="3">Article</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span>📊 (Statistics)录入</span> }>
              <Menu.Item key="4">Age</Menu.Item>
              
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: 'red', padding: 0 }} >
            Funny English
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}