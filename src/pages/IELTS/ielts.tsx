import React from "react";
import "./index.css";
import { Sound, playSound } from "../../components/common";
import { Button, Popover } from "antd";
import { gradientColor } from "../../commom/colors";
import { guidGenerator } from "../../commom/id";
import { Link } from "react-router-dom";
import * as _ from "lodash";
import { Stronger, MarginBottom20 } from "../../components/styled";

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
type IELTSWordType = {
  word: string;
  attr: string;
  syn: string[];
  definition: string[];
};

const LevelLength = Object.getOwnPropertyNames(Level).length;
interface IIELTEState {
  data: IELTSWordType[];
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
  convertAttr = (attr: string) => {
    switch (attr) {
      case "n.":
        return "noun";
      case "a.":
        return "adj";
      case "ad.":
        return "adv";
      case "v.":
        return "verb";
      default:
        return attr;
    }
  };
  decompose = (s: string) => {
    let res: string[] = [];
    s.split("\n").forEach(line => {
      if (line.length > 1) {
        res.push(line);
      }
    });
    let arr = [];
    for (let i = 0; i < res.length / 3; i++) {
      arr.push(res.slice(i * 3, (i + 1) * 3));
    }
    let Obj = [];
    for (let i = 0; i < arr.length; i++) {
      let wordObj: any = Object.create(null);
      Obj.push(wordObj);
      wordObj.word = arr[i][0];
      if (arr[i][1].includes("Syn.")) {
        let cixingAndSyn = arr[i][1].split("Syn.");
        wordObj.attr = this.convertAttr(cixingAndSyn[0].trim());
        if (cixingAndSyn[1].includes(";")) {
          wordObj.syn = cixingAndSyn[1].split(";").map(i => i.trim());
        } else {
          wordObj.syn = [];
          wordObj.syn.push(cixingAndSyn[1]);
        }
      } else {
        wordObj.attr = this.convertAttr(arr[i][1].trim());
        wordObj.syn = [];
      }
      if (arr[i][2].includes(";")) {
        wordObj.definition = arr[i][2].split(";").map(i => i.trim());
      } else {
        wordObj.definition = [];
        wordObj.definition.push(arr[i][2]);
      }
    }

    return Obj;
  };
  loadword = async (letters: string) => {
    const { pureData } = await import(`../../data/IELTS/pure`);
    let filteredData: Array<{
      word: string;
      attr: string;
      syn: string[];
      definition: string[];
      type?: string[];
    }> = [];

    for (let letter of letters) {
      let d = pureData.filter(w => w.word.startsWith(letter.toLowerCase()));
      filteredData = filteredData.concat(d);
    }

    // let list = this.decompose(IELTSString);
    // console.log(JSON.stringify(list));

    this.setState({
      data: filteredData
    });
  };
  syn = (syn: string[]) => {
    if (syn.length === 0) {
      return undefined;
    } else {
      return(<div>
        <Stronger>syn : </Stronger>
        {syn.map((synonmy,i) => (
          <div style={{marginRight : 10}}>{`${++i}. `}{synonmy}</div>
        ))}
      </div>)
    }
  };
  render() {
    let { data, intId, LinkButtonNames } = this.state;

    return (
      <div className="ielts_container">
        <div className="ielts_aside">
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

        <div className="ielts_right">
          <h1 className="ielts_h1">
            {" "}
            🔥The 4000 Essential IETLS Word🔥
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
                content={
                  <>
                    <h1> {item.word}</h1>
                    <p>
                      <span
                        className={`e_${item.attr} e_span`}
                      >{`${item.attr}.`}</span>
                    </p>
                    <div>
                      <Stronger>definition</Stronger> :{" "}
                      {item.definition.map((d,i) => (
                        <div key={guidGenerator()}>{`${i+1}. `}{d}</div>
                      ))}
                    </div>
                    {this.syn(item.syn)}
                  </>
                }
              >
                <Button
                  onClick={() => {
                    playSound(item.word);
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
                  {item.word} &nbsp;
                  <Sound word={item.word} />
                </Button>
              </Popover>
            ))}
          </div>

          {/* here is definition of word list */}
          <div className="ielts">
            {data.map(item => (
              <div key={guidGenerator()}>
                <div>
                  <span className="">{item.word} </span>
                  <div className={`e_${item.attr} e_span`}>{`${item.attr}.`}</div>
                  <span> &nbsp;</span>
                  <Sound word={item.word} />
                </div>
                <div><Stronger>definition : </Stronger></div>
                  {item.definition.map((d,i)=> <div>{`${i+1}. ` }{d}</div>)} 
                  {this.syn(item.syn)}
                  <MarginBottom20/>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
