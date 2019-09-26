import React, { useState, useEffect } from "react";
import { BodyWhite } from "../../components/styled";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
import "./index.css";
const clientId =
  "656701571546-e9k0u6ujehdbhe1sijbpbjqevfotfisb.apps.googleusercontent.com";
const clientCesret = "PN1bawLOwKjHI5EpOHO23DSV";
 
function useCheckOnline() {
    const [cur, setOnline] = useState(false);
    useEffect(() => { 
          setOnline(true);
          console.log(cur);
          
          return ()=>{
            setOnline(false);
            console.log("I will exited");
            
          }
    });   
    return cur;
  }
const Login: React.FC = (props: any) => {
      
    const isOnline = useCheckOnline();

  return (
    <BodyWhite>
      <div className="login_header_project">
        <Link to="/">🚀 Back to Home to Study 🚀</Link>
      </div>

      <div className="loginbox">
        <h1 className="login_header">Sign in</h1>
        <p className="login_small_header">strength your English </p>

        <div style={{ textAlign: "center" }}>
          <button id="login-google" className="login_social_login_btn">
            <span>Google</span>
          </button>
        </div>

        <p className="login_separator">
          <span>or</span>
        </p>

        <Form layout="inline"></Form>
      </div>
      <Button type={isOnline? "primary" :"danger" } htmlType="submit">
        Log in{" "}
      </Button>
    </BodyWhite>
  );
};
export default Login;
