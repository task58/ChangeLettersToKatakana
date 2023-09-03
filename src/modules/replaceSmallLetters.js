/**
 * ァ、ィ、ゥなどを大文字に置き換える
 * @param {string} text 
 * @returns {string}
 */
export default function replaceSmallLetters(text){
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