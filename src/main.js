'use strict'

const axios = require("axios");

const API_KEY = `fbabe817c9dcd1562fc5dc778dee45e27e5ebdb176a4bd1303621b367420e62f`; //API KEY
const API_URL = `https://labs.goo.ne.jp/api/hiragana`;

var optionsTemp = {
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

var inputElement = document.getElementById("input_text")
var inputButton = document.getElementById("input_button")
var outputElement = document.getElementById("output_text")

var isRemoveSpaceElement = document.getElementById("isRemoveSpace")
var isReplaceSmallLettersElement = document.getElementById("isReplaceSmallLetters")

/**
 * YMMの発音記号を削除する
 * @param {string} text 
 */
function removePhoneticSymbols(text){
    var output = text.replace("/","").replace("'","").replace("_","");
    return output;
}

/**
 * 
 * @param {string} text 
 * @returns {string}
 */
function removeSpace(text){
    return text.replace(/　/g,"").replace(/ /g,"");
}

/**
 * 
 * @param {string} text 
 * @returns {string}
 */
function replaceSmallLetters(text){
    var replaceLetters = {
        "ァ" : "ア",
        "ィ" : "イ",
        "ゥ" : "ウ",
        "ェ" : "エ",
        "ォ" : "オ"
    }
    for (const key in replaceLetters) {
        text = text.replace(new RegExp(key,"g"),replaceLetters[key])
    }
    return text;
}

function convert(){

    var isRemoveSpace = isRemoveSpaceElement.checked;
    var isReplaceSmallLetters = isReplaceSmallLettersElement.checked;

    /**
     * @type {string}
     */
    var input = inputElement.value;
    console.log(input);
    var text = removePhoneticSymbols(input)
    

    var options = optionsTemp;
    options.data.sentence = text;
    options.data.output_type = "katakana";

    axios(options).then((res) => {
        /**
         * @type {string}
         */
        var converted = res.data.converted;    
        var outputText = converted;    
        outputText = isRemoveSpace ? removeSpace(converted) : outputText;
        outputText = isReplaceSmallLetters ? replaceSmallLetters(outputText) : outputText;

        outputElement.value = outputText;
    })
    .catch((err) => {
        console.log(err);
    });

}



inputButton.addEventListener("click",convert)

