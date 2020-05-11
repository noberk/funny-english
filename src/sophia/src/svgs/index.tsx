import React from 'react'
export type SVGBlockSize = {
  width: number | string
  height?: number | string
}
export const Field = (props: SVGBlockSize) => (
  <svg style={{ width: props.width }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path style={{ opacity: 0, fill: '#2d2d30' }} d="M16 16H0V0h16v16z" id="canvas" /> <path style={{ fill: '#2d2d30' }} d="M0 10.736V4.5L9 0l7 3.5v6.236l-9 4.5-7-3.5z" id="outline" />
    <path style={{ fill: '#75beff' }} d="M9 1L1 5v5l6 3 8-4V4L9 1zM7 6.882L3.236 5 9 2.118 12.764 4 7 6.882z" id="iconBg" />
    <path style={{ fill: '#2b282e' }} d="M9 2.118L12.764 4 7 6.882 3.236 5 9 2.118z" id="iconFg" />
  </svg>
)
export const Function = (props: SVGBlockSize) => (
  <svg style={{ width: props.width }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path style={{ opacity: 0, fill: '#2d2d30' }} d="M16 16H0V0h16v16z" id="canvas" />
    <path style={{ fill: '#2b282e' }} d="M15 3.349v8.403L8.975 16H8.07L1 11.582V3.327L7.595 0h1.118L15 3.349z" id="outline" />
    <path style={{ fill: '#2b282e' }} d="M12.715 4.398L8.487 7.02 3.565 4.272l4.578-2.309 4.572 2.435zM3 5.102l5 2.792v5.705l-5-3.125V5.102zm6 8.434V7.878l4-2.48v5.317l-4 2.821z" id="iconFg" />
    <path style={{ fill: '#b180d7' }} d="M8.156.837L2 3.942v7.085L8.517 15.1 14 11.233V3.95L8.156.837zm4.559 3.561L8.487 7.02 3.565 4.272l4.578-2.309 4.572 2.435zM3 5.102l5 2.792v5.705l-5-3.125V5.102zm6 8.434V7.878l4-2.48v5.317l-4 2.821z" id="iconBg" />
  </svg>
)

export const Default = (props: SVGBlockSize) => (
  <svg style={{ width: props.width }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path style={{ opacity: 0, fill: '#2d2d30' }} d="M16 16H0V0h16v16z" id="canvas" /> <path style={{ fill: '#2d2d30' }} d="M0 10.736V4.5L9 0l7 3.5v6.236l-9 4.5-7-3.5z" id="outline" />
    <path style={{ fill: '#75beff' }} d="M9 1L1 5v5l6 3 8-4V4L9 1zM7 6.882L3.236 5 9 2.118 12.764 4 7 6.882z" id="iconBg" />
    <path style={{ fill: '#2b282e' }} d="M9 2.118L12.764 4 7 6.882 3.236 5 9 2.118z" id="iconFg" />
  </svg>
)
export const Event = (props: SVGBlockSize) => (
  <svg style={{ width: props.width }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path
      stroke="#2d2d30"
      transform="rotate(-26.08420181274414 3.5993790626525866,7.017385959625244) "
      id="svg_1"
      d="m5.526748,0.770262l-4.711464,4.397442l0.101916,2.144886l-4.383673,5.95192c3.292694,-1.880792 8.352833,-4.229337 11.645527,-6.110129c-0.761491,-0.358477 -2.082571,-0.988088 -2.844062,-1.346565l5.330239,-2.58302l-5.138484,-2.454535z"
      fill="#e8ab53"
    />
  </svg>
)
export const Object = (props: SVGBlockSize) => (
  <svg style={{ width: props.width }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path style={{ opacity: 0, fill: '#3c3c3c' }} d="M16 16H0V0h16v16z" id="canvas" />
    <path
      style={{ fill: '#787878' }}
      d="M9.26 11.984l.978-.021a.962.962 0 0 0 .09-.006c.011-.063.026-.179.026-.361V9.688c0-.679.185-1.257.53-1.707-.346-.452-.53-1.03-.53-1.705V4.35c0-.167-.021-.259-.034-.302L9.26 4.02V.973l1.011.011c2.167.024 3.409 1.156 3.409 3.105v1.962c0 .351.071.461.072.462l.936.06.053.927v1.936l-.936.061c-.076.016-.125.146-.125.424v2.017c0 .914-.332 3.043-3.408 3.078l-1.012.011v-3.043zm-3.521 3.032c-3.089-.035-3.422-2.164-3.422-3.078V9.921c0-.327-.066-.432-.067-.433l-.937-.06-.063-.929V6.563l.942-.06c.058 0 .125-.114.125-.452V4.09c0-1.949 1.248-3.081 3.422-3.105L6.75.973V4.02l-.975.023a.572.572 0 0 0-.093.01c.006.021-.019.115-.019.297v1.928c0 .675-.186 1.253-.534 1.705.348.45.534 1.028.534 1.707v1.907c0 .175.014.291.027.363.023.002 1.06.025 1.06.025v3.043l-1.011-.012z"
      id="outline"
    />
    <path
      style={{ fill: '#787878' }}
      d="M5.75 14.016c-1.623-.019-2.434-.711-2.434-2.078V9.921c0-.902-.355-1.376-1.066-1.422v-.998c.711-.045 1.066-.529 1.066-1.449V4.09c0-1.385.811-2.087 2.434-2.105v1.06c-.725.017-1.087.453-1.087 1.305v1.928c0 .92-.454 1.488-1.36 1.702V8c.907.201 1.36.763 1.36 1.688v1.907c0 .488.081.835.243 1.042.162.208.443.316.844.325v1.054zm7.99-5.517c-.706.045-1.06.52-1.06 1.422v2.017c0 1.367-.807 2.06-2.42 2.078v-1.053c.396-.009.678-.118.844-.328.167-.21.25-.556.25-1.039V9.688c0-.925.449-1.488 1.347-1.688v-.021c-.898-.214-1.347-.782-1.347-1.702V4.35c0-.852-.364-1.288-1.094-1.306v-1.06c1.613.018 2.42.72 2.42 2.105v1.962c0 .92.354 1.404 1.06 1.449v.999z"
      id="iconBg"
    />
  </svg>
)

export const Array = (props: SVGBlockSize) => (
  <svg style={{ width: props.width }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path style={{ opacity: 0, fill: '#2d2d30' }} d="M16 16H0V0h16v16z" id="canvas" />
    <path style={{ fill: '#2d2d30' }} d="M14.414 1L16 2.586v5.828L14.414 10H10v3.416L8.414 15H1.586L0 13.416v-5.83L1.586 6H6V2.586L7.586 1h6.828z" id="outline" />
    <path style={{ fill: '#2b282e' }} d="M2 13h6V8H2v5zm1-4h4v1H3V9zm0 2h4v1H3v-1zm11-5V3H8v3h.414L9 6.586V6h4v1H9.414l.586.586V8h4V6zm-1-1H9V4h4v1z" id="iconFg" />
    <path style={{ fill: '#e8ab53' }} d="M3 11h4.001v1H3v-1zm0-1h4.001V9H3v1zm6-2v5l-1 1H2l-1-1V8l1-1h6l1 1zM8 8H2v5h6V8zm1-2l1 1h3V6H9zm0-1h4V4H9v1zm5-3H8L7 3v3h1V3h6v5h-4v1h4l1-1V3l-1-1z" id="iconBg" />
  </svg>
)

export const Wrench = (props: SVGBlockSize) => (
  <svg style={{ width: props.width }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path style={{ opacity: 0, fill: '#2d2d30' }} d="M16 16H0V0h16v16z" id="canvas" />
    <path
      style={{ fill: '#2d2d30' }}
      d="M16 5.5a5.5 5.5 0 0 1-5.5 5.5c-.275 0-.543-.027-.807-.066l-.079-.012a5.429 5.429 0 0 1-.81-.192l-4.537 4.537c-.472.473-1.1.733-1.767.733s-1.295-.26-1.768-.732a2.502 2.502 0 0 1 0-3.535l4.537-4.537a5.452 5.452 0 0 1-.191-.812c-.005-.025-.008-.051-.012-.077A5.503 5.503 0 0 1 5 5.5a5.5 5.5 0 1 1 11 0z"
      id="outline"
    />
    <path
      style={{ fill: '#c5c5c5' }}
      d="M15 5.5a4.5 4.5 0 0 1-4.5 4.5c-.693 0-1.342-.17-1.929-.45l-5.01 5.01c-.293.294-.677.44-1.061.44s-.768-.146-1.061-.439a1.5 1.5 0 0 1 0-2.121l5.01-5.01A4.483 4.483 0 0 1 6 5.5 4.5 4.5 0 0 1 10.5 1c.693 0 1.342.17 1.929.45L9.636 4.243l2.121 2.121 2.793-2.793c.28.587.45 1.236.45 1.929z"
      id="iconBg"
    />
  </svg>
)
