// JavaScript Summer Quiz:

/*We have the class UserUpdateClass as defined below if we initiate it with two objects called newObject and OldObject where
*/
newObject = {
    _id: "1234asdf",
    "name": "John",
    "address": {
        "street": "Broadway",
        "number": "1234"
    }
}

and

oldObject = {
    _id: "1234asdf",
    "name": "Ben",
    "address": {
        "street": "High Street",
        "number": "1234"
    }
}

/*
    What will then be the output of the function createUpdateArray() in the UserUpdateClass be ?????
    You don't need to run the code just go through the logic and see what you can come up with. Any guess is better than no guess and there are no stupid guesses.
    If you are interested I'll be happy to go through the code with you.

    Have a great summer, Ha kul i sommar.
*/

class UserUpdateClass {
    constructor(newObject, oldObject) {
        this.oldObj = oldObject;
        this.newObj = newObject;
        this.calls = 0;
    }

    /**
     * Generator function that will find all fields that are different 
     * in the newObj object compared to the oldObj object.
     * 
     * @param {The new object to compare against the old} newObj 
     * @param {The old object that serves as reference} oldObj 
     */
    * compare(newObj, oldObj) {
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


            if (tmpArr.length > 0) {
                yield tmpArr;
            }
        }
    }
    /**
     * The function uses the two objects defined in the constructor and compares their fields.
     * If a field is different then the newObj's value will be entered into the updateArray 
     *  together with the path.
     * @returns The updateArray to be used in mongoDB update.
     */
    createUpdateArray() {
        if (this.oldObj._id !== this.newObj._id) return { 'error': { 'message': "Ids don't match error" } };

        const updateArray = [];
        let response, resArr = [];

        const compare = this.compare(this.newObj, this.oldObj);
        do {
            // Iterate through the first level of fields in the objects
            // by using the generator function compare().
            response = compare.next();
            resArr = response.value;
            if (!response.done) {
                for (let i = 0; i < resArr.length; i++) {
                    updateArray.push(resArr[i]);
                }
            }
        } while (!response.done)
        // The question here is what does the array updateArray contain.
        return updateArray;
    }
} 