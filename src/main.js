'use strict'

const axios = require("axios");

const API_KEY = `fbabe817c9dcd1562fc5dc778dee45e27e5ebdb176a4bd1303621b367420e62f`; //API KEY
const API_URL = `https://labs.goo.ne.jp/api/hiragana`;

const optionsTemp = {
    method: 'post',
    url: API_URL,
    headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'Content-Type': `application/json`
    },
    data: {
        app_id: API_KEY,
        sentence: null,
        output_type: null
    }
};

var inputElement = document.getElementById("input_text"); //入力用テキストエリア
var inputButton = document.getElementById("input_button"); //変換ボタン
var inputClipboardButton = document.getElementById("input_clipboard_button");//クリップボードの内容を変換するためのボタン
var outputCripboardButton = document.getElementById("output_clipboard_button");//クリップボードコピー用ボタン
var outputElement = document.getElementById("output_text"); //出力用テキストエリア

//オプション類
var isRemoveSpaceElement = document.getElementById("isRemoveSpace");
var isReplaceSmallLettersElement = document.getElementById("isReplaceSmallLetters");
var isReplaceParticleElement = document.getElementById("isReplaceParticle");
var isChangeToHiraganaElement = document.getElementById("isChangeToHiragana");
var isRemovePhoneticSymbolsElement = document.getElementById("isRemovePhoneticSymbols");
var isCopyToCripboardElement = document.getElementById("isCopyToCripboard");

//各種テキスト処理に扱う関数のインポート
import removePhoneticSymbols from "./modules/removePhoneticSymbols"
import removeSpace from "./modules/removeSpace";
import replaceSmallLetters from "./modules/replaceSmallLetters";
import replaceParticle from "./modules/replaceParticle";

//変換
function convert(){

    //各種オプション情報を取得
    var isChangeToHiragana = isChangeToHiraganaElement.checked;
    var isRemoveSpace = isRemoveSpaceElement.checked;
    var isReplaceSmallLetters = isReplaceSmallLettersElement.checked;
    var isReplaceParticle = isReplaceParticleElement.checked;
    var isRemovePhoneticSymbols = isRemovePhoneticSymbolsElement.checked;
    var isCopyToCripboard = isCopyToCripboardElement.checked;

    /**
     * @type {string}
     */
    var input = inputElement.value;   
    var text = isRemovePhoneticSymbols ? removePhoneticSymbols(input) : input;
    console.log(text);
    
    var options = optionsTemp;
    options.data.sentence = text;
    options.data.output_type = isChangeToHiragana ? "hiragana" : "katakana";

    axios(options).then((res) => {
        /**
         * @type {string}
         */
        var converted = res.data.converted;    
        var outputText = converted;
        outputText = isReplaceParticle ? replaceParticle(outputText) : outputText;
        outputText = isRemoveSpace ? removeSpace(outputText) : outputText;
        outputText = isReplaceSmallLetters ? replaceSmallLetters(outputText) : outputText;

        outputElement.value = outputText;

        if(isCopyToCripboard)writeCripboard(outputText);
    })
    .catch((err) => {
        console.log(err);
        outputElement.value = toString(err);
    });
}

function writeCripboard(text){
    if(navigator.clipboard){
        navigator.clipboard.writeText(text);
    }else{
        alert("お使いの環境はクリップボードボタンに対応していません...(´;ω;｀)")
    }
}

inputButton.addEventListener("click",convert)
outputCripboardButton.addEventListener("click",()=>{
    writeCripboard(outputElement.value)
});

inputClipboardButton.addEventListener("click",()=>{
    if(navigator.clipboard){
        navigator.clipboard.readText().then((str)=>{
            inputElement.value = str;
            convert()
        }).catch((e)=>{
            console.error(e);
            alert("クリップボードの読み取りに失敗しました...(´・ω・｀)")
        })
    }else{
        alert("お使いの環境はクリップボードボタンに対応していません...(´;ω;｀)")
    }
})