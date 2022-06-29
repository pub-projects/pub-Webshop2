
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
    }

    compareObjects() {

    }

    createUpdateObject() {
        if (this.oldObj._id !== this.newObj._id) return { 'error': { 'message': "Ids don't match error" } };

        const newObjKeys = Object.keys(this.newObj);
        for (let i = 0; i < newObjKeys.length; i++) {
            console.log(`UserUpdateClass - createUpdateObject - key(${i})`, newObjKeys[i]);
            console.log(`UserUpdateClass - createUpdateObject - key(${i}) - value`, this.newObj[newObjKeys[i]]);
        }
    }
}