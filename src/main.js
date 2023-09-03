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
var outputElement = document.getElementById("output_text"); //出力用テキストエリア

//オプション類
var isRemoveSpaceElement = document.getElementById("isRemoveSpace");
var isReplaceSmallLettersElement = document.getElementById("isReplaceSmallLetters");
var isReplaceParticleElement = document.getElementById("isReplaceParticle");
var isChangeToHiraganaElement = document.getElementById("isChangeToHiragana");

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

    /**
     * @type {string}
     */
    var input = inputElement.value;
    console.log(input);
    var text = removePhoneticSymbols(input)
    
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
    })
    .catch((err) => {
        console.log(err);
    });
}

inputButton.addEventListener("click",convert)