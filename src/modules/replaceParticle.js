/**
 * 助詞「は」を「ワ」に置き換える
 * @param {string} text 
 * @returns {string}
 */
export default function replaceParticle(text){
    return text.replace(/ハ /g,"ワ").replace(/ハ　/g,"ワ");
}
