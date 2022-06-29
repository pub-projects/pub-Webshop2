
//** Use exclusion to exclude data that shouldn't be sent to the client. */
export const userObjectToClientProjection = {
    "login.uuid": 0,
    "login.salt": 0,
    "login.md5": 0,
    "login.sha1": 0,
    "login.sha256": 0
}

export const removeNonClientLoginProperties = [
    "uuid",
    "salt",
    "md5",
    "sha1",
    "sha256"
]

export class UserUpdateClass {
    constructor(newObject, oldObject) {
        this.oldObj = oldObject;
        this.newObj = newObject;
        this.calls = 0;
    }

    compareObjects(newObj, oldObj) {

    }

    * compare(newObj, oldObj) {
        console.log("IN: compare newObj", newObj);
        // console.log("compare oldObj", oldObj);
        const keys = newObj && Object.keys(newObj) || [];
        let comp;
        let genResponse;
        let tmpStr, tmpArr = [], resValArr = [];
        let baseStr;
        this.calls++;
        for (let i = 0; i < keys.length; i++) {
            tmpStr = "";
            baseStr = keys[i];
            tmpArr = [];
            // console.log("tmpStr start:", tmpStr || "nothing");
            if (typeof newObj[keys[i]] === 'object') {
                comp = this.compare(newObj[keys[i]], oldObj[keys[i]]);

                do {
                    genResponse = comp.next();
                    resValArr = genResponse.value;
                    if (genResponse.value && !genResponse.done) {
                        for (let j = 0; j < resValArr.length; j++) {
                            tmpArr.push(`${baseStr}.${resValArr[j]}`);
                        }
                    }

                } while (!genResponse.done && this.calls < 1000)
            } else {
                if (newObj[keys[i]] !== oldObj[keys[i]]) {
                    tmpArr.push(`${baseStr}:${newObj[keys[i]]}`);
                }
            }

            //console.log(`keys[${i}]: ${keys[i]}, tmpStr.length: ${tmpStr.length}, tmpStr: ${tmpStr || "empty"}`);
            if (tmpArr.length > 0) {
                console.log("OUT: tmpArr:", tmpArr);
                yield tmpArr;
            }
        }
    }

    createUpdateObject() {
        if (this.oldObj._id !== this.newObj._id) return { 'error': { 'message': "Ids don't match error" } };

        const updateArray = [];
        let response, resArr = [];
        // console.log("newObjKeys", newObjKeys);

        const compare = this.compare(this.newObj, this.oldObj);
        do {
            response = compare.next();
            resArr = response.value;
            if (!response.done) {
                for (let i = 0; i < resArr.length; i++) {
                    updateArray.push(resArr[i]);
                }
            }
        } while (!response.done)
        console.log("objectsAndClasses - UserUpdateClass - createUpdateObject - updateArray", updateArray);
        return updateArray;
    }
}