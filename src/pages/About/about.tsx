import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { DispatchT } from "../../store/storeType";



const About: React.FC = () => {
  const dispatch = useDispatch()
  let state = useSelector((state :any) => state.balanceReducer);

  const deposit = ()=>{
    dispatch({type:DispatchT.deposit,payload: 10})
}
  return (
    <>
      <h1>{`this is my balance  ${state.balance}`}</h1>
      <Button onClick={deposit}>Deposit</Button>
    </>
  );
};

export default About;
