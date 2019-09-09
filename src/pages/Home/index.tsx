import StudentList from "../StudentList/Student";
import StudenetInfo from "../StudenetInfo/StudenetInfo";
import { Layout, Menu, Breadcrumb } from 'antd';
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
      <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultOpenKeys={['sub1','sub2']}  mode="inline">
            <SubMenu key="sub1"title={<span>👨‍🏫 (Student)学员</span>}>
              <Menu.Item key="1">
              <Link to="/">Student List</Link>
              </Menu.Item>
              <Menu.Item key="11">
              <Link to="/StudentInfo">Student Info</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span>✍️ (Write)录入</span> }>
              <Menu.Item key="2">Vocabulary</Menu.Item>
              <Menu.Item key="3">Article</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span>📊 (Statistics)录入</span> }>
              <Menu.Item key="4">Age</Menu.Item>
              
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{background: 'white'}}>
          <Header style={{ padding: 0 }} >
            Funny English
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
        <Route path="/" exact component={StudentList} />
        <Route path="/StudentInfo" component={StudenetInfo} />
        
           
          </Content>
          <Footer style={{ textAlign: 'center' }}>😍 Funny English ©2019 😍</Footer>
        </Layout>
      </Layout>
      </Router>
    );
  }
}