let reg =`英 /ə'ber(ə)nt/ 美 /æ'bɛrənt/ adj. 异常的；畸变的；脱离常轨的；迷乱的`;
let reg2= `英 /ə'bɔːd/ 美 /ə'bɔrd/ prep. 在 （船或飞机）上 adv. 在（飞机、火车、船）上；骑在（马）上；（喻）新入伙；（棒球）在垒上`

class Word {
    word
    pronunciationAmerica
    pronunciationEnglish
    base64PNG
    base64JPG
    v
    n
    vt
    vi
    adj
    adv
}

var word= new Word()

let eng = /(?<=英).*?(?=美)/;
let eng = /\//;
 