/**
 * 空白を削除する
 * @param {string} text 
 * @returns {string}
 */
export default function removeSpace(text){
    return text.replace(/　/g,"").replace(/ /g,"");
}
