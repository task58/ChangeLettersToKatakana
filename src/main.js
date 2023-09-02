'use strict'

const axios = require("axios");

const API_KEY = `fbabe817c9dcd1562fc5dc778dee45e27e5ebdb176a4bd1303621b367420e62f`; //API KEY
const API_URL = `https://labs.goo.ne.jp/api/hiragana`;
const OUTPUT_TYPE = `katakana`; 

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
        output_type: OUTPUT_TYPE
    }
};

var inputElement = document.getElementById("input_text")
var inputButton = document.getElementById("input_button")
var outputElement = document.getElementById("output_text")

console.log(document.getElementById("output_text"))

/**
 * 
 * @param {string} text 
 */
function removePhoneticSymbols(text){
    console.log(output)
    var output = text.replace("/","").replace("'","").replace("_","");
    console.log(output)
    return output;
}

function convert(){

    /**
     * @type {string}
     */
    var input = inputElement.value;
    console.log(input);
    var text = removePhoneticSymbols(input)
    

    var options = optionsTemp;
    options.data.sentence = text;

    axios(options).then((res) => {
        /**
         * @type {string}
         */
        var converted = res.data.converted;
        console.log(converted)
        outputElement.value = converted.replace(/　/g,"").replace(/ /g,"")
        console.log(converted)
    })
    .catch((err) => {
        console.log(err);
    });

}



inputButton.addEventListener("click",convert)

