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
