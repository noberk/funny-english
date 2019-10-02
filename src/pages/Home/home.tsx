import StudentList from "../StudentList/Student";
import StudenetInfo from "../StudenetInfo/StudenetInfo";
import AddVocabulary from "../AddVocabulary/addVocabulary";
import WordList from "../WordList/WordList";
import Login from "../Aumsement/aumsement";
import TOEFL from "../TOEFL/toelf";
import About from "../About/about";
import Help from "../Help/help";
import WordListening from "../WordListening/wordListening";
import EssentialWord4k from "../EssentialWord4k/essentialWord4k";
import IELTS from "../IELTS/ielts";
import GWeAreCouple from "../GWeAreCouple/gWeAreCouple";
import { WrappedDemo } from "../AddArticle/addArticle";
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Dropdown } from "antd";
import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import { checkMonkUser } from "../Login/login";
import { IconLanguage } from "../../components/svg";

import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { DispatchT } from "../../store/storeType";
import { Lang } from "../../lib/i18n/language";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const onlineStyle = ["#30da30", "gray"];

const emoji = (emoji: string) => <span className="emojiSize">{emoji}️</span>;

const langMenu = (changeLang: any) => {
  return (
    <Menu>
      <Menu.Item key="cn" onClick={changeLang}>
        简体中文
      </Menu.Item>
      <Menu.Item key="en" onClick={changeLang}>
        English
      </Menu.Item>
      <Menu.Item key="jp" onClick={changeLang}>
        日本語
      </Menu.Item>
    </Menu>
  );
};

const Home: React.FC = () => {
  const state = useSelector( (state:any) => state.langReducer);
  const [isSideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [isLogin] = useState(false);
  const dispatch = useDispatch();
 
  // componentDidMount() {
  //   if (checkMonkUser()) {
  //     this.setState({ isLogin: checkMonkUser() });
  //   }
  // }
  const onCollapse = () => {
    setSideBarCollapsed(!isSideBarCollapsed);
  };
  const changeLang = (e: any) => {
     switch (e.key) {
       case "jp": dispatch({ type: DispatchT.jp, payload: e.key }); return;
       case "en": dispatch({ type: DispatchT.en, payload: e.key }); return;
       case "cn": dispatch({ type: DispatchT.cn, payload: e.key }); return;
       default: break;
     }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={250}
        collapsible
        collapsed={isSideBarCollapsed}
        onCollapse={onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultOpenKeys={["sub1", "sub2"]} mode="inline">
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon component={() => emoji("👪")} spin />
                <span className="emojiSize">Student</span>
              </span>
            }
          >
            <Menu.Item key="101">
              <Link to="/">Student List</Link>
            </Menu.Item>
            <Menu.Item key="102">
              <Link to="/StudentInfo">Student Info</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon component={() => emoji("✍️")} />
                <span className="emojiSize">Write</span>
              </span>
            }
          >
            <Menu.Item key="201">
              <Link to="/addVocabulary">Vocabulary</Link>
            </Menu.Item>
            <Menu.Item key="202">
              <Link to="/addArticle">Article</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon component={() => emoji("🗂️")} />
                <span className="emojiSize">Statistic</span>
              </span>
            }
          >
            <Menu.Item key="301">
              <Link to="/WordList">Word List</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon component={() => emoji("📈")} />
                <span className="emojiSize">Charts</span>
              </span>
            }
          >
            <Menu.Item key="401">Popularity words(coming soon)</Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub5"
            title={
              <span>
                <Icon component={() => emoji("🕹️")} />
                <span className="emojiSize">Games</span>
              </span>
            }
          >
            <Menu.Item key="501">2048(coming soon)</Menu.Item>
            <Menu.Item key="502">
              <Link to="/GWeAreCouple">GWeAreCouple</Link>
            </Menu.Item>
            <Menu.Item key="503">
              <Link to="/amuse">Amuse</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub6"
            title={
              <span>
                <Icon component={() => emoji("📚")} />
                <span className="emojiSize">Vocabulary</span>
              </span>
            }
          >
            <Menu.Item key="601">
              <Link to="/EssentialWord4k/default">EssentialWord</Link>
            </Menu.Item>
            <Menu.Item key="602">
              <Link to="/ielts/a">IELTS</Link>
            </Menu.Item>
            <Menu.Item key="603">
              <Link to="/TOEFL">TOEFL</Link>
            </Menu.Item>
            <Menu.Item key="604">
              <Link to="/WordListening">Dictation</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ background: "white" }}>
        <Header id="homeHeader">
          <Row>
            <Col span={8}>
              <div className="homeUlLeft">
                <li>
                  <Link to="/WordListening">{Lang[state.lang].nav[0]}</Link>
                </li>
                <li>{Lang[state.lang].nav[1]}</li>
                <li>
                  {" "}
                  <Link to="/help">{Lang[state.lang].nav[2]}</Link>
                </li>
                <li>{Lang[state.lang].nav[3]}</li>
                <li>{Lang[state.lang].nav[4]}</li>
                <li>
                  <Link to="/about">{Lang[state.lang].nav[5]}</Link>
                </li>
              </div>
            </Col>
            <Col span={8} offset={8}>
              <div className="homeUIRight">
                <Link to="/login">
                  <Icon
                    type="user"
                    theme="outlined"
                    className="homeIconStyle"
                    style={isLogin ? { color: onlineStyle[0] } : {}}
                  />
                </Link>
                <Dropdown overlay={langMenu(changeLang)}>
                  <Icon component={IconLanguage} className="homeIconStyle" />
                </Dropdown>
                <a
                  target="blank"
                  href="https://github.com/noberk/funny-english"
                >
                  <Icon
                    type="github"
                    theme="filled"
                    className="homeIconStyle"
                  />
                </a>
              </div>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Route path="/" exact component={StudentList} />
          <Route path="/StudentInfo" exact component={StudenetInfo} />
          <Route path="/addVocabulary" exact component={AddVocabulary} />
          <Route path="/addArticle" exact component={WrappedDemo} />
          <Route path="/WordList" exact component={WordList} />
          <Route path="/amuse" exact component={Login} />
          <Route path="/GWeAreCouple" exact component={GWeAreCouple} />
          <Route
            path="/EssentialWord4k/:id"
            exact
            component={EssentialWord4k}
          />
          <Route path="/ielts/:id" exact component={IELTS} />
          <Route path="/TOEFL" exact component={TOEFL} />
          <Route path="/help" exact component={Help} />
          <Route path="/about" exact component={About} />
          <Route path="/WordListening" exact component={WordListening} />
        </Content>
        <Footer
          id="homeFooter"
          className="home_grass"
          style={{ textAlign: "center" }}
        >
          🚀 All CopyRight Reserved Andrew Lee ©2019 🚀
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
