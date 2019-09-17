function getScrollbarWidth() {
  var oP :any= document.createElement("p"),
    styles: any = {
      width: "100px",
      height: "100px",
      overflowY: "scroll"
    },
    i,
    scrollbarWidth;
  for (i in styles) {
    oP.style[i] = styles[i];
  }
  document.body.appendChild(oP);
  scrollbarWidth = oP.offsetWidth - oP.clientWidth;
  oP.remove();
  return scrollbarWidth;
}
const resizeReset = () => {
  w = canvasBody.width = window.innerWidth - getScrollbarWidth();
  h = canvasBody.height = window.innerHeight;
};

const opts = {
  particleColor: "rgb(200,200,200)",
  lineColor: "rgb(200,200,200)",
  particleAmount: 30,
  defaultSpeed: 1,
  variantSpeed: 1,
  defaultRadius: 2,
  variantRadius: 2,
  linkRadius: 200
};

window.addEventListener("resize", function() {
  deBouncer();
});

let deBouncer = function() {
  clearTimeout(tid);
  tid = setTimeout(function() {
    resizeReset();
  }, delay);
};

let checkDistance = function(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

let linkPoints = function(point1: { x: number; y: number }, hubs: any) {
  for (let i = 0; i < hubs.length; i++) {
    let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
    let opacity = 1 - distance / opts.linkRadius;
    if (opacity > 0) {
      drawArea.lineWidth = 0.5;
      drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
      drawArea.beginPath();
      drawArea.moveTo(point1.x, point1.y);
      drawArea.lineTo(hubs[i].x, hubs[i].y);
      drawArea.closePath();
      drawArea.stroke();
    }
  }
};

class Particle {
  x = 0;
  y = 0;
  speed = 0;
  directionAngle = 0;
  color = "";
  radius = 0;
  vector: any;
  constructor(xPos?: any, yPos?: any) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = opts.particleColor;
    this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed
    };
  }
  update = () => {
    this.border();
    this.x += this.vector.x;
    this.y += this.vector.y;
  };
  border = () => {
    if (this.x >= w || this.x <= 0) {
      this.vector.x *= -1;
    }
    if (this.y >= h || this.y <= 0) {
      this.vector.y *= -1;
    }
    if (this.x > w) this.x = w;
    if (this.y > h) this.y = h;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  };
  draw = () => {
    drawArea.beginPath();
    drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    drawArea.closePath();
    drawArea.fillStyle = this.color;
    drawArea.fill();
  };
}

let particles: any[] = [];
function setup() {
  particles = [];
  resizeReset();
  for (let i = 0; i < opts.particleAmount; i++) {
    particles.push(new Particle());
  }
  window.requestAnimationFrame(loop);
}

function loop() {
  window.requestAnimationFrame(loop);
  drawArea.clearRect(0, 0, w, h);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  for (let i = 0; i < particles.length; i++) {
    linkPoints(particles[i], particles);
  }
}
let drawArea: CanvasRenderingContext2D;
let canvasBody: HTMLCanvasElement;
let delay: number;
let tid: number;
let rgb: any;
let w = 0;
let h = 0;
export const MeshRun = () => {
  canvasBody = document.getElementById("canvas") as HTMLCanvasElement;
  drawArea = canvasBody.getContext("2d") as CanvasRenderingContext2D;
  delay = 200;
  tid = 0;
  rgb = opts.lineColor.match(/\d+/g);
  resizeReset();
  setup();
};

export {};
