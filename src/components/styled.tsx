import styled, { StyledComponent } from "styled-components";
import { wordPropertyType } from "../data/ES4K";
import React from "react";

const top: string = "20px";
// 容器
export const Beam = styled.div`
  height: ${top};
`;

const spanBase = styled.span``;
interface Position {
  w?: string;
  h?: string;

  mt?: string;
  ml?: string;
  mr?: string;
  mb?: string;

  pt?: string;
  pl?: string;
  pr?: string;
  pb?: string;

  lt?: string;
}

export const StySpan = styled(spanBase).attrs<Position>({})`
  width: ${(p: any) => p.w};
  height: ${(p: any) => p.h};

  margin-top: ${(p: any) => p.mt};
  margin-left: ${(p: any) => p.ml};
  margin-right: ${(p: any) => p.mr};
  margin-bottom: ${(p: any) => p.mb};

  padding-top: ${(p: any) => p.pt};
  padding-left: ${(p: any) => p.pl};
  padding-right: ${(p: any) => p.pr};
  padding-bottom: ${(p: any) => p.pb};

  line-height: ${(p: any) => p.lt};
`;

export const StyDiv = styled.div.attrs<Position>({})`
  width: ${(p: any) => p.w};
  height: ${(p: any) => p.h};

  margin-top: ${(p: any) => p.mt};
  margin-left: ${(p: any) => p.ml};
  margin-right: ${(p: any) => p.mr};
  margin-bottom: ${(p: any) => p.mb};

  padding-top: ${(p: any) => p.pt};
  padding-left: ${(p: any) => p.pl};
  padding-right: ${(p: any) => p.pr};
  padding-bottom: ${(p: any) => p.pb};

  line-height: ${(p: any) => p.lt};
`;

export const Center = styled.div`
  margin: auto;
  text-align: center;
`;
export const CenterTitle = styled(Center)`
  font-size: 2rem;
`;
export const CenterParagraph = styled(Center)`
  font-size: 1.5rem;
`;

const xing = styled.span`
  width: 50px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  border-radius: 10px;
  color: white;
  text-align: center;
  border: 1px solid white;
`;
export const noun = styled(xing)`
  background-color: #99cc66;
  box-shadow: 2px 2px 2px 1px #99cc66;
`;
export const adj = styled(xing)`
  background-color: rgb(66, 174, 252);
  box-shadow: 2px 2px 2px 1px #42aefc;
`;
export const conj = styled(xing)`
  background-color: #ff99cc;
  box-shadow: 2px 2px 2px 1px #ff99cc;
`;
export const pron = styled(xing)`
  background-color: #6666cc;
  box-shadow: 2px 2px 2px 1px #6666cc;
`;
export const verb = styled(xing)`
  background-color: #ff9900;
  box-shadow: 2px 2px 2px 1px #ff9900;
`;
export const adv = styled(xing)`
  background-color: #ff6666;
  box-shadow: 2px 2px 2px 1px #ff6666;
`;
export const art = styled(xing)`
  background-color: #006699;
  box-shadow: 2px 2px 2px 1px #006699;
`;
export const prep = styled(xing)`
  background-color: #000;
  box-shadow: 2px 2px 2px 1px #000;
`;

export const Stronger = styled.strong`
font-size:1.1rem;
`

export const MarginBottom20 = styled.div`
margin-bottom: 20px;
`

export const BodyWhite = styled.div`
width:100%;
height:100%;
background:white;
`
export const H1=styled.h1`
text-align:center;
`