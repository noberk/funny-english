import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../types";
import { Button } from "antd";



const Help :  React.FC = () => {
    const dispatch = useDispatch()
    let state = useSelector((state :RootState) => state);

    const withdraw = ()=>{
        dispatch({type:"withdraw",payload: 10})
    }
    return (
      <>
        <h1>{`this is my balance  ${state.balance}`}</h1>
        <Button onClick={withdraw}>withdraw</Button>
      </>
    );
  };

export default Help;