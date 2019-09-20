import React from "react";
import { IELTSString } from "../../data/IELTS";
import "./index.css";
import { Sound, playSound } from "../../components/common";
import { Button, Popover } from "antd";
import { gradientColor } from "../../commom/colors";
import { guidGenerator } from "../../commom/id";
import { Link } from "react-router-dom";
import * as _ from "lodash";
import { TWordList } from "../../data/essential_2";

const Level: any = {
  1: ["#ffcb52", "#ff7b02", "#da7c14"], //sweet orange 🍊
  2: ["#7bbfea", "#2585a6", "#40a9ff"], //iceberg  🥶
  3: ["#c165dd", "#5c27f1", "#7a21b9"], //mistery purple
  4: ["#2afeb7", "#08c792", "#28a98d"], //mistery purple
  5: ["#5581f1", "#1153fc", "#295bda"], //mistery purple
  6: ["#facd68", "#fc76b3", "#786388"], //mistery purple
  7: ["#00f7a7", "#04f5ed", "#05c184"], //mistery purple
  8: ["#1de5e2", "#b588f7", "#7a21b9"], //mistery purple
  9: ["#ffe324", "#ffb553", "#bd8c2d"] //mistery purple
};
const LevelLength = Object.getOwnPropertyNames(Level).length;
interface IIELTEState {
  data: TWordList;
  intId: number;
  LinkButtonNames: string[];
}
interface IIELTEProps {
  pageSize: number;
  match?: any;
}
export default class IELTS extends React.Component<IIELTEProps, IIELTEState> {
  static defaultProps = {
    pageSize: 100
  };
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      intId: 1,
      LinkButtonNames: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "JKL",
        "M",
        "NO",
        "P",
        "QR",
        "S",
        "T",
        "UVWYZ"
      ]
    };
  }
  componentDidMount = async () => {
    let id: string = this.props.match.params.id;
    let intId = Number.parseInt(id);
    if (Number.isNaN(intId) || intId > 9) intId = 1;
    const ess = await import("../../data/essential_2");

    let lbCount = ess.essential4k.length / this.props.pageSize;
    let lbCountArr: number[] = [];
    console.log(lbCount);

    for (let i = 1; i <= lbCount; i++) {
      lbCountArr.push(i);
    }
    this.setState({
      data: _.cloneDeep(ess.essential4k).splice(0, this.props.pageSize)
    });
  };

  highlight = (text: string, word: string) => {
    let words = text.split(" ");
    return words.map(w =>
      w.toUpperCase().includes(word.toUpperCase()) ? (
        <s key={guidGenerator()}>{w} </s>
      ) : (
        <i key={guidGenerator()}>{w} </i>
      )
    );
  };
  highLightArticle = (paragraph: string, plainWord: string[]) => {
    let words = paragraph.split(" ");
    let arr = [];
    return words.map(w => {
      console.log(w.toString());
      console.log(plainWord.toString());
      words.forEach(w => {
        plainWord.forEach(pw => {
          if (w !== " " && w !== "") {
            if (w.includes(pw)) {
              arr.push(<s key={guidGenerator()}>{w} </s>);
            } else {
              arr.push(<i key={guidGenerator()}>{w} </i>);
            }
          }
        });
      });
    });
    return arr;
  };

  loadword = async (letter: string) => {
    const { A } = await import(`../../data/IELTS/A`);
    let res: string[] = [];
    A.split("\n").forEach(line => {
      if (line.length > 1) {
        res.push(line);
      }
    });
    let arr = [];
    for (let i = 0; i < res.length / 3; i++) {
      arr.push(res.slice(i * 3, (i + 1) * 3));
      // arr.push(res.slice(i*3+1,(i+1)*3-1))
    }
    console.log(arr);
    let Obj = [];
    for (let i = 0; i < arr.length; i++) {
      let wordObj: any = Object.create(null);
      Obj.push(wordObj);
      wordObj.word = arr[i][0];
      if (arr[i][1].includes("Syn.")) {
        let cixingAndSyn = arr[i][1].split("Syn.");
        wordObj.cixing = cixingAndSyn[0].trim();
        if (cixingAndSyn[1].includes(";")) {
          wordObj.syn = cixingAndSyn[1].split(";").map(i=>i.trim());
        } else {
          wordObj.syn = [];
          wordObj.syn.push(cixingAndSyn[1]);
        }
      } else {
        wordObj.cixing = arr[i][1];
        wordObj.syn = [];
      }
      if (arr[i][2].includes(";")) {
        wordObj.definition = arr[i][2].split(";").map(i=>i.trim());;
      } else {
        wordObj.definition = [];
        wordObj.definition.push(arr[i][2]);
      }
    }

    console.log(Obj);
    this.setState({
      data: []
    });
  };

  render() {
    let { data, intId, LinkButtonNames } = this.state;

    return (
      <div className="essentialWord4k_container">
        <canvas id="canvas"></canvas>
        <div className="essentialWord4k_aside">
          <h1>IELTS WORDS</h1>
          <div style={{ boxSizing: "border-box" }}>
            {LinkButtonNames.map(item => (
              <div key={guidGenerator()} className="box shadow">
                <Link
                  to={`./${item}`}
                  onClick={() => {
                    this.loadword(item);
                  }}
                >
                  {item}
                </Link>
                <div className="circle"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="essentialWord4k_right">
          <h1 className="essentialWord4k_h1">
            {" "}
            🎊The key Essential words that you have to know🎊
          </h1>
          <h2>
            IELTS academic test is widely accepted in English countries. Its
            score is one of keys for university or college admission. This 4000
            IELTS vocabulary is to help you own a strong words list in future
            IELTS academic test.
          </h2>
          {/* here is words button list */}
          <div style={{ marginBottom: "1rem" }}>
            {data.map((item, index) => (
              <Popover
                key={guidGenerator()}
                title={`${item[0]}`}
                content={
                  <>
                    <p>pron : {item[1]}</p>
                    <p>
                      type :{" "}
                      <span
                        className={`e_${item[2]} e_span`}
                      >{`${item[2]}.`}</span>
                    </p>
                    <p>definition : {item[3]}</p>
                    <p>example : {item[4]}</p>
                  </>
                }
              >
                <Button
                  onClick={() => {
                    playSound(item[0]);
                  }}
                  size="large"
                  style={{
                    borderColor: `${Level[(intId % LevelLength) + 1][2]}`,
                    backgroundColor: gradientColor(
                      Level[(intId % LevelLength) + 1],
                      data.length
                    )[index]
                  }}
                  type="primary"
                >
                  {item[0]} &nbsp;
                  <Sound word={item[0]} />
                </Button>
              </Popover>
            ))}
          </div>

          {/* here is definition of word list */}
          <div className="essentialWord4k">
            {data.map(item => (
              <div key={guidGenerator()}>
                <div>
                  <span className="img3">{item[0]} </span>
                  <span>{item[1]} </span>
                  <span>{item[2]} </span>
                  <Sound word={item[0]} />
                </div>
                <div className="essentialWord4k_highlight">
                  {" "}
                  {this.highlight(item[3], item[0])}{" "}
                </div>
                <div style={{ marginBottom: "20px" }}>{item[4]} </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
