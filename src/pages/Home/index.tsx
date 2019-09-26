import StudentList from "../StudentList/Student";
import StudenetInfo from "../StudenetInfo/StudenetInfo";
import addVocabulary from "../AddVocabulary/addVocabulary";
import WordList from "../WordList/WordList";
import Login from "../Aumsement/aumsement";
import TOEFL from "../TOEFL/toelf";
import EssentialWord4k from "../EssentialWord4k/essentialWord4k";
import IELTS from "../IELTS/ielts";
import GWeAreCouple from "../GWeAreCouple/gWeAreCouple";
import {WrappedDemo} from "../AddArticle/addArticle";

import "./home.css"
import { Layout, Menu, Breadcrumb,Icon } from 'antd';
import React from "react";
import {  Route, Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const onlineStyle= ["#30da30","gray"];

 

const emoji = (emoji:string) => (<span className="emojiSize">{emoji}️</span>)

export class Home extends React.Component<any,{collapsed:boolean}> {
  state = {
    collapsed: false,
  };

  onCollapse = () => {
    this.setState({ collapsed: this.state.collapsed===false ? true: false });
  };

  render() {
    return (
      
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={250} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultOpenKeys={['sub1','sub2']}  mode="inline">

          <SubMenu key="sub1" title={  
            <span>
              <Icon component={()=> emoji("👪") } spin/>
              <span className="emojiSize">Student</span>
            </span>}>
              <Menu.Item key="101"><Link to="/">Student List</Link></Menu.Item>
              <Menu.Item key="102"><Link to="/StudentInfo">Student Info</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={  
            <span>
              <Icon component={()=> emoji("✍️") }  />
              <span className="emojiSize">Write</span>
            </span>
            }>
              <Menu.Item key="201"><Link to="/addVocabulary">Vocabulary</Link></Menu.Item>
              <Menu.Item key="202"><Link to="/addArticle">Article</Link></Menu.Item>  
            </SubMenu>
            <SubMenu key="sub3" title={  
            <span>
              <Icon component={()=> emoji("🗂️") }  />
              <span className="emojiSize">Statistic</span>
            </span>
            }>
           <Menu.Item key="301"><Link to="/WordList">Word List</Link></Menu.Item>
      
            </SubMenu>
            
            <SubMenu key="sub4" title={  
            <span>
              <Icon component={()=> emoji("📈") }  />
              <span className="emojiSize">Charts</span>
            </span>
            }>
              <Menu.Item key="401">Popularity words(coming soon)</Menu.Item>
              
            </SubMenu>

            <SubMenu key="sub5" title={  
            <span>
              <Icon component={()=> emoji("🕹️") }  />
              <span className="emojiSize">Games</span>
            </span>
            }>
              <Menu.Item key="501">2048(coming soon)</Menu.Item>
              <Menu.Item key="502"><Link to="/GWeAreCouple">GWeAreCouple</Link></Menu.Item>
              <Menu.Item key="503"><Link to="/amuse">Amuse</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" title={  
            <span>
              <Icon component={()=> emoji("📚") }  />
              <span className="emojiSize">Vocabulary</span>
            </span>
            }>
               <Menu.Item key="601"><Link to="/EssentialWord4k/default">EssentialWord</Link></Menu.Item>
               <Menu.Item key="602"><Link to="/ielts/a">IELTS</Link></Menu.Item>
               <Menu.Item key="603"><Link to="/TOEFL">TOEFL</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{background: 'white'}}>
          <Header id="homeHeader" >
           <div className="homeUlLeft">
             <li>Exam</li>
             <li>Home</li>
             <li>Help</li>
             <li>Privacy</li>
             <li>Support</li>
             <li>Sign On</li> 
           </div>
           <div  className="homeUIRight">
           
          <Link to="login"><Icon type="user" theme="outlined" className="homeIconStyle" /></Link> 
    
           </div> 
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
        <Route path="/" exact component={StudentList} />
        <Route path="/StudentInfo" exact component={StudenetInfo} />
        <Route path="/addVocabulary" exact component={addVocabulary} />
        <Route path="/addArticle" exact component={WrappedDemo} />
        <Route path="/WordList" exact component={WordList} />
        <Route path="/amuse" exact component={Login} />
        <Route path="/GWeAreCouple" exact component={GWeAreCouple} />
        <Route path="/EssentialWord4k/:id" exact component={EssentialWord4k} />
        <Route path="/ielts/:id" exact component={IELTS} />
        <Route path="/TOEFL" exact component={TOEFL} />
        
          </Content>
          <Footer id="homeFooter"  className="home_grass" style={{ textAlign: 'center' }}>🚀 All CopyRight Reserved Andrew Lee  ©2019 🚀</Footer>
        </Layout>
      </Layout>
    );
  }
}