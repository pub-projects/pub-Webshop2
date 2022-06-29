import axios from 'axios';

class UserClass {
    constructor() {
        this.userData = null;
        this.updateUserEvent = new Event("updateUser", { bubbles: true, cancelable: true });
    }

    /** Class functions */
    _getData() {
        const token = localStorage.getItem('token');
        const encodedPayload = token.split('.',)[1];
        return JSON.parse(this.b64DecodeUnicode(encodedPayload));
    }

    getUpdateUserEvent() {
        return this.updateUserEvent;
    }

    async updateUserName(newUserName) {
        // console.log("UserClass - updateUserName", newUserName);
        const user = await UserClass.getUser();
        const tmpUser = JSON.parse(JSON.stringify(user));
        const token = localStorage.getItem('token');

        tmpUser.login.username = newUserName;
        // console.log("UserClass - updateUserName - data", tmpUser);

        const data = await UserClass.b64EncodeUnicode(JSON.stringify(tmpUser));

        try {
            const response = await axios.put(`/api/users/update/username/${tmpUser._id}`, { data }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { token: newToken } = await response.data;
            // console.log("UserClass - updateUserName - newToken", newToken);
            localStorage.setItem('token', newToken);
            // console.log("UserClass - updateUserEvent B4 Dispatched");
            document.dispatchEvent(this.updateUserEvent);
            // document.dispatchEvent(newTokenEvent);
            // console.log("UserClass - updateUserEvent Dispatched", this.updateUserEvent);
        } catch (err) {
            console.log("ProfilePage - handleUpdate - error", err);
        }

        return false;
    }

    /** Static functions */
    /*
      Function b64EncodeUnicode code from 
      https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
      */
    // decoding base64 encoded data keeping all bytes as original encoded.
    static b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return str ? decodeURIComponent(atob(str).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')) : null;
    }

    /*
   Function b64EncodeUnicode code from 
   https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
   */
    static b64EncodeUnicode(str) {
        return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }

    static userExists() {
        return localStorage.getItem('token') ? true : false;
    }


    static getUser() {
        if (!this.userExists()) return null;
        // return this._getData();
        const token = localStorage.getItem('token');
        const encodedPayload = token.split('.',)[1];
        return JSON.parse(this.b64DecodeUnicode(encodedPayload));
    }

    static logOutUser() {
        // console.log("useLogOut");
        localStorage.removeItem('token');
    }

    static addNewUserEvent(element) {
        element.removeEventListener("updateUser");
        element.addEventListener("updateUser");
    }
}


export default UserClass;