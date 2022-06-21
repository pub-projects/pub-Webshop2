const Coding = {};

/*
    Function b64EncodeUnicode code from 
    https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
*/
/**
 * 
 * @param {string to be encoded} str 
 * @returns {encoded string}
 */
Coding.b64EncodeUnicode = (str) => {
    return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}


