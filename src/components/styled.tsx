import styled from 'styled-components'

const top: string = '20px'
// 容器
export const Beam = styled.div`
  height: ${top};
`

const spanBase = styled.span``
interface Position {
  w?: string
  h?: string

  mt?: string
  ml?: string
  mr?: string
  mb?: string

  pt?: string
  pl?: string
  pr?: string
  pb?: string

  lt?: string
}

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
`

export const Center = styled.div`
  margin: auto;
  text-align: center;
`

const xing = styled.span`
  width: 50px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  border-radius: 10px;
  color: white;
  text-align: center;
  border: 1px solid white;
`

export const Stronger = styled.strong`
  font-size: 1.1rem;
`

export const MarginBottom20 = styled.div`
  margin-bottom: 20px;
`

export const BodyWhite = styled.div`
  width: 100%;
  height: 100%;
  background: white;
`
export const H1 = styled.h1`
  text-align: center;
`
