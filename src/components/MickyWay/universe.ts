interface Point {
  x: number;
  y: number;
}
interface wordProps {
  word: string;
  fontSize: string;
  color?: string;
  originalPos?: Point;
  distance?: Point;
  lifeSpan: number;
  opacity: number;
  curFrame: number;
  fullFrames?: number;
  wordLen?: number;
  scale?: number;
}

class Clouds {
  readonly frame = 60;
  private root: HTMLDivElement;
  private centerPoint: Point;
  readonly colors = ["#5182E4", "#9BCC66", "#3FB27E", "#F7CB4A", "#F88D48"];
  constructor(public id: string) {
    this.root = document.getElementById(id) as HTMLDivElement;
    this.centerPoint = {
      x: this.root.offsetWidth / 2,
      y: this.root.offsetHeight / 2
    };

    setInterval(() => {
      this.generateCloud({
        word: this.pickEmoji(1),
        fontSize: "30px",
        color: this.pickcolor(),
        opacity: 1,
        lifeSpan: 5,
        curFrame: 1
      });
    }, 100);
  }
  pickcolor() {
    return this.colors[Math.floor(Math.random() * this.colors.length) - 1];
  }
  pickEmoji(count: number) {
    let pickedEmojis = "";
    for (let i = 0; i < count; i++) {
      pickedEmojis += emoji2[Math.floor(Math.random() * emoji2.length) - 1];
    }

    return pickedEmojis;
  }
  spwan(): Point {
    let x = this.root.offsetWidth * Math.random();
    let y = this.root.offsetHeight * Math.random();

    return { x, y };
  }
  generateCloud(props: wordProps) {
    let wordSpan = document.createElement("span");

    props.fullFrames = this.frame * props.lifeSpan;
    props.originalPos = this.spwan();
    props.wordLen = props.word.length;

    wordSpan.innerHTML = props.word;
    wordSpan.style.color = props.color;
    wordSpan.style.fontSize = props.fontSize;
    wordSpan.style.position = "absolute";
    wordSpan.style.left = props.originalPos.x + "px";
    wordSpan.style.top = props.originalPos.y + "px";
    this.root.appendChild(wordSpan);

    const playAniamtion = () => {
      this.reachSingularity(props);
      this.fade(props);
      this.scale(props, 0.2);
      props.curFrame++;

      wordSpan.style.left = props.distance.x + "px";
      wordSpan.style.top = props.distance.y + "px";
      wordSpan.style.opacity = props.opacity as any;
      wordSpan.style.transform = `scale(${props.scale})`;

      if (props.fullFrames + 1 === props.curFrame) {
        cancelAnimationFrame(closeHandle);
        this.root.removeChild(wordSpan);
      }
      closeHandle = requestAnimationFrame(playAniamtion);
    };

    let closeHandle = requestAnimationFrame(playAniamtion);
  }

  reachSingularity(word: wordProps) {
    let disX: number, disY: number;
    // if object X is less than center point X
    if (word.originalPos.x <= this.centerPoint.x) {
      disX =
        ((this.centerPoint.x - word.originalPos.x) / word.fullFrames) *
          word.curFrame +
        word.originalPos.x;
    }
    if (word.originalPos.y <= this.centerPoint.y) {
      disY =
        ((this.centerPoint.y - word.originalPos.y) / word.fullFrames) *
          word.curFrame +
        word.originalPos.y;
    }

    // if object X is great than center point X
    if (word.originalPos.x > this.centerPoint.x) {
      disX =
        word.originalPos.x -
        ((word.originalPos.x - this.centerPoint.x) / word.fullFrames) *
          word.curFrame;
    }
    if (word.originalPos.y > this.centerPoint.y) {
      disY =
        word.originalPos.y -
        ((word.originalPos.y - this.centerPoint.y) / word.fullFrames) *
          word.curFrame;
    }
    word.distance = { x: disX - (word.wordLen * 24) / 2, y: disY - 24 / 2 };
  }
  fade(word: wordProps) {
    word.opacity = 1 - (1 / word.fullFrames) * word.curFrame;
  }
  scale(word: wordProps, min: number = 0) {
    word.scale = 1 - (1 / word.fullFrames) * word.curFrame + min;
  }
}

new Clouds("cloud");

function drawText() {
  document.querySelector("div").textContent += "#\n";
  window.requestAnimationFrame(drawText);
}

var emoji2  =[
  '学校986',
  '工作996',
  '维权404',
  '劝退035',
  '维权404',
  '月薪20000'
]
