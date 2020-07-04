var Clouds = /** @class */ (function () {
    function Clouds(id) {
        var _this = this;
        this.id = id;
        this.frame = 60;
        this.colors = ["#5182E4", "#9BCC66", "#3FB27E", "#F7CB4A", "#F88D48"];
        this.root = document.getElementById(id);
        this.centerPoint = {
            x: this.root.offsetWidth / 2,
            y: this.root.offsetHeight / 2
        };
        setInterval(function () {
            _this.generateCloud({
                word: _this.pickEmoji(1),
                fontSize: "30px",
                color: _this.pickcolor(),
                opacity: 1,
                lifeSpan: 5,
                curFrame: 1
            });
        }, 100);
    }
    Clouds.prototype.pickcolor = function () {
        return this.colors[Math.floor(Math.random() * this.colors.length) - 1];
    };
    Clouds.prototype.pickEmoji = function (count) {
        var pickedEmojis = "";
        for (var i = 0; i < count; i++) {
            pickedEmojis += emoji2[Math.floor(Math.random() * emoji2.length) - 1];
        }
        return pickedEmojis;
    };
    Clouds.prototype.spwan = function () {
        var x = this.root.offsetWidth * Math.random();
        var y = this.root.offsetHeight * Math.random();
        return { x: x, y: y };
    };
    Clouds.prototype.generateCloud = function (props) {
        var _this = this;
        var wordSpan = document.createElement("span");
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
        var playAniamtion = function () {
            _this.reachSingularity(props);
            _this.fade(props);
            _this.scale(props, 0.2);
            props.curFrame++;
            wordSpan.style.left = props.distance.x + "px";
            wordSpan.style.top = props.distance.y + "px";
            wordSpan.style.opacity = props.opacity;
            wordSpan.style.transform = "scale(" + props.scale + ")";
            if (props.fullFrames + 1 === props.curFrame) {
                cancelAnimationFrame(closeHandle);
                _this.root.removeChild(wordSpan);
            }
            closeHandle = requestAnimationFrame(playAniamtion);
        };
        var closeHandle = requestAnimationFrame(playAniamtion);
    };
    Clouds.prototype.reachSingularity = function (word) {
        var disX, disY;
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
    };
    Clouds.prototype.fade = function (word) {
        word.opacity = 1 - (1 / word.fullFrames) * word.curFrame;
    };
    Clouds.prototype.scale = function (word, min) {
        if (min === void 0) { min = 0; }
        word.scale = 1 - (1 / word.fullFrames) * word.curFrame + min;
    };
    return Clouds;
}());
new Clouds("cloud");
function drawText() {
    document.querySelector("div").textContent += "#\n";
    window.requestAnimationFrame(drawText);
}
var emoji2 = [
    '学校986',
    '工作996',
    '维权404',
    '劝退035',
    '维权404',
    '月薪20000',
    '程序员',
    'bug!',
    ''
];
