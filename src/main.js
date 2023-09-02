'use strict'

const axios = require("axios");

const API_KEY = `fbabe817c9dcd1562fc5dc778dee45e27e5ebdb176a4bd1303621b367420e62f`; //API KEY
const API_URL = `https://labs.goo.ne.jp/api/hiragana`;
var SENTECE = process.argv[2];
const OUTPUT_TYPE = `katakana`; //or `hiragana`

var options = {
    method: 'post',
    url: API_URL,
    headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'Content-Type': `application/json`
    },
    data: {
        app_id: API_KEY,
        sentence: SENTECE,
        output_type: OUTPUT_TYPE
    }
};

axios(options).then((res) => {
    console.log(res.data);
})
.catch((err) => {
    console.log(err);
});