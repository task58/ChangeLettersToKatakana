/**
 * YMMの発音記号を削除する
 * @param {string} text 
 */
export default function removePhoneticSymbols(text){
    var removeSymbols = [
        new RegExp("/","g"),
        new RegExp("'","g"),
        new RegExp("_","g"),
        new RegExp("。","g"),
        new RegExp("、","g"),
        new RegExp("？","g"),
        new RegExp(/\?/,"g"),
        new RegExp(":","g"),
        new RegExp(/\?/,"g")
    ]
    var output = text
    for(var lit of removeSymbols){
        output = output.replace(lit,"")
    }
    return output;
}

