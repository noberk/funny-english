import React, { useState, useEffect } from "react";
import { BodyWhite } from "../../components/styled";
import { Link, Redirect } from "react-router-dom";
import { Form,  Input, Button,message  } from "antd";
import "./index.css";
import { MeshRun, unMeshRun } from "../../animation/DynamicPointMesh/dynPointMesh";
const clientId =
  "656701571546-e9k0u6ujehdbhe1sijbpbjqevfotfisb.apps.googleusercontent.com";
const clientCesret = "PN1bawLOwKjHI5EpOHO23DSV";
const intrinsic= {
    account: "noberk",
    password: "123"
}

function useLogin(account:any,password:any) {
    const [cur, setOnline] = useState(false);
    useEffect(() => { 

        if(account=== intrinsic.account && password=== intrinsic.password){
            setOnline(true);
        }else{
          message.warning("incorrent")
        }
          return ()=>{setOnline(false);}
    });   
    return cur;
  }
export function checkMonkUser(){
  if(localStorage.getItem("account")=== intrinsic.account && localStorage.getItem("password")=== intrinsic.password)
    return true
  else
  return false
}
const Login: React.FC = (props: any) => {

  let onSubmitClicked= (e:any)=>{
    if(checkMonkUser()){
      message.success("corrent")
      unMeshRun();
      setValid(true);
    }else
      message.warning("incorrent")
  }
    const isOnline =useLogin(localStorage.getItem("account"), localStorage.getItem("password"))
    const [valid,setValid] =  useState(false);
   
    useEffect(()=>{
      MeshRun()
        return ()=>{
            unMeshRun()
            console.log("clear");   
        }
    })

    if(valid)
    return (<Redirect to="/" />)

  return (
    <BodyWhite>
      <canvas id="canvas" style={{background:"#2c364e"}}></canvas>
      <div className="login_header_project">
        <Link className="login_nav_a" to="/">🚀 Back to Home to Study 🚀</Link>
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

        <Form layout="inline">
      ACCOUNT  <Input placeholder="noberk" onChange={e=>{
             localStorage.setItem("account",e.target.value);
      }} />
      passwrod <Input placeholder="123" onChange={
          e=> {
              localStorage.setItem("password",e.target.value);
          }
      } />
        </Form>
         <Button type={isOnline? "primary" :"danger"} onClick={onSubmitClicked}  className="login-btn" >
         {isOnline? "Success": "Log in"}
      </Button>
      </div>
     
    </BodyWhite>
  );
};
export default Login;
