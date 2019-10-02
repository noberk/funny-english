import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../types";
import { Button } from "antd";



const About: React.FC = () => {
  const dispatch = useDispatch()
  let state = useSelector((state :RootState) => state);

  const deposit = ()=>{
    dispatch({type:"deposit",payload: 10})
}
  return (
    <>
      <h1>{`this is my balance  ${state.balance}`}</h1>
      <Button onClick={deposit}>Deposit</Button>
    </>
  );
};

export default About;
