
//** Use exclusion to exclude data that shouldn't be sent to the client. */
export const userObjectToClientProjection = {
    "login.uuid": 0,
    "login.salt": 0,
    "login.md5": 0,
    "login.sha1": 0,
    "login.sha256": 0,
    "lastUpdated": 0
}

export const userCompareExclusions = {
    ...userObjectToClientProjection,
    "iat": 0,
    "exp": 0,
    "_id": 0
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
        // console.log("UserUpdateClass - constructor - oldObject", oldObject);
        // console.log("UserUpdateClass - constructor - newObject", newObject);
    }

    compareObjects(newObj, oldObj) {

    }

    /**
     * Generator function that will find all fields that are different 
     * in the newObj object compared to the oldObj object.
     * 
     * @param {The new object to compare against the old} newObj 
     * @param {The old object that serves as reference} oldObj 
     */
    * compare(newObj, oldObj) {
        // console.log("IN: compare newObj", newObj);
        // console.log("compare oldObj", oldObj);
        const keys = newObj && Object.keys(newObj) || [];
        let comp;
        let genResponse;
        let tmpArr = [], resValArr = [];
        let baseStr;
        this.calls++;
        for (let i = 0; i < keys.length; i++) {
            baseStr = keys[i];
            tmpArr = [];

            if (typeof newObj[keys[i]] === 'object') {
                // Call self to solve inner/nested objects and arrays.
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
    /**
     * The function takes two objects of the same type and compares the fields.
     * If a field is different then the newObj's value will be entered into the updateArray 
     *  together with the path.
     * @returns The updateArray to be used in mongoDB update.
     */
    createUpdateArray() {
        // if (this.oldObj._id !== this.newObj._id) return { 'error': { 'message': "Ids don't match error" } };

        const updateArray = [];
        let response, resArr = [];
        // console.log("newObjKeys", newObjKeys);

        const compare = this.compare(this.newObj, this.oldObj);
        do {
            // Iterate through the first level of fields in the objects
            // by using the generator function * compare().
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