import StudentList from "../StudentList/Student";
import StudenetInfo from "../StudenetInfo/StudenetInfo";
import addVocabulary from "../AddVocabulary/addVocabulary";
import WordList from "../WordList/WordList";
import {WrappedDemo} from "../AddArticle/addArticle";
import "./home.css"
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
            <SubMenu key="sub1"  title={<span className="emojiSize">👪 Student</span>}>
              <Menu.Item key="101">
              <Link to="/">Student List</Link>
              </Menu.Item>
              <Menu.Item key="102">
              <Link to="/StudentInfo">Student Info</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span className="emojiSize">✍️ Write</span> }>
              <Menu.Item key="201"><Link to="/addVocabulary">Vocabulary</Link></Menu.Item>
              <Menu.Item key="202"><Link to="/addArticle">Article</Link></Menu.Item>
     
              
            </SubMenu>
            <SubMenu key="sub3" title={<span className="emojiSize">🗃 Statistic</span> }>
              <Menu.Item key="301"><Link to="/WordList">Word List</Link></Menu.Item>
              
            </SubMenu>
            <SubMenu key="sub4" title={<span className="emojiSize">📈 Chart</span> }>
              <Menu.Item key="401">Age</Menu.Item>
              
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
        <Route path="/addVocabulary" component={addVocabulary} />
        <Route path="/addArticle" component={WrappedDemo} />
        <Route path="/WordList" component={WordList} />
 
        
          </Content>
          <Footer style={{ textAlign: 'center' }}>😍 Funny English ©2019 😍</Footer>
        </Layout>
      </Layout>
      </Router>
    );
  }
}