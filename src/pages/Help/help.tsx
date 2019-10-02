import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { Button } from "antd";
import { DispatchT } from "../../store/storeType";



const Help :  React.FC = () => {
    const dispatch = useDispatch()
    let state = useSelector((state :any) => state.balanceReducer);

    const withdraw = ()=>{
        dispatch({type:DispatchT.withdraw,payload: 10})
    }
    return (
      <>
        <h1>{`this is my balance  ${state.balance}`}</h1>
        <Button onClick={withdraw}>withdraw</Button>
      </>
    );
  };

export default Help;