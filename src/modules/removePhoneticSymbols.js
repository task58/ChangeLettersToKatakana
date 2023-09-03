/**
 * YMMの発音記号を削除する
 * @param {string} text 
 */
export default function removePhoneticSymbols(text){
    var output = text.replace("/","").replace("'","").replace("_","");
    return output;
}

