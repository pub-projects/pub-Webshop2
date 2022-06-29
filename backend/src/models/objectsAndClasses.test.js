import { UserUpdateClass } from './objectsAndClasses';

const userOld = {
    _id: '12345asd',
    "gender": "male",
    "name": {
        "title": "Mr",
        "first": "Alex",
        "last": "James"
    },
    "location": {
        "street": {
            "number": 7016,
            "name": "Broadway"
        },
        "city": "Birmingham",
        "state": "Warwickshire",
        "country": "United Kingdom",
        "postcode": "MY5 4DZ",
        "timezone": "+11:00"
    },
    "email": [
        {
            "name": "Private",
            "emailaddress": "alex.james@example.com",
            "isVerified": true
        }
    ],
    "login": {
        "username": "bluewolf222"
    },
    "dob": {
        "date": "1959-10-04",
        "age": 63
    },
    "registered": {
        "date": "2018-01-06T08:28:10.112Z",
        "updated": "2022-04-26T10:57:33.365Z"
    },
    "phone": [
        {
            "name": "Home",
            "number": "019467 08687"
        },
        {
            "name": "Mobile",
            "number": "0789-966-602"
        }
    ],
    "avatar": {
        "large": "https://randomuser.me/api/portraits/men/52.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/52.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/52.jpg"
    },
    "lang": "en-GB",
    "lastUpdated": "2022-06-22T15:21:46.645Z",
    "iat": 1655911306,
    "exp": 1656084106
}

const userNew = {
    _id: '12345asd',
    "gender": "female",
    "name": {
        "title": "Sir",
        "first": "Alex",
        "last": "James"
    },
    "location": {
        "street": {
            "number": 8812,
            "name": "High Street"
        },
        "city": "Birmingham",
        "state": "Warwickshire",
        "country": "United Kingdom",
        "postcode": "MY5 6IP",
        "timezone": "+11:00"
    },
    "email": [
        {
            "name": "Private",
            "emailaddress": "alex.james@example.com",
            "isVerified": true
        }
    ],
    "login": {
        "username": "bluewolf222"
    },
    "dob": {
        "date": "1959-10-04",
        "age": 63
    },
    "registered": {
        "date": "2018-01-06T08:28:10.112Z",
        "updated": "2022-04-26T10:57:33.365Z"
    },
    "phone": [
        {
            "name": "Home",
            "number": "019467 3837"
        },
        {
            "name": "Mobile",
            "number": "0789-966-602"
        }
    ],
    "avatar": {
        "large": "https://randomuser.me/api/portraits/men/52.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/52.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/52.jpg"
    },
    "lang": "en-GB"
}

describe("Testing the UserUpdateClass function createUpdateObject()", () => {
    test("testing first level", async () => {
        const uuc = new UserUpdateClass(userNew, userOld);
        const result = uuc.createUpdateObject();
        expect(result[0]).toBe("gender:female");
    });

    test("testing second level", async () => {
        const uuc = new UserUpdateClass(userNew, userOld);
        const result = uuc.createUpdateObject();
        expect(result[1]).toBe("name.title:Sir");
    });

    test("testing third level - location street number", async () => {
        const uuc = new UserUpdateClass(userNew, userOld);
        const result = uuc.createUpdateObject();
        expect(result[2]).toBe("location.street.number:8812");
    });
    test("testing third level - location street name", async () => {
        const uuc = new UserUpdateClass(userNew, userOld);
        const result = uuc.createUpdateObject();
        expect(result[3]).toBe("location.street.name:High Street");
    });
    test("testing second level - location postcode", async () => {
        const uuc = new UserUpdateClass(userNew, userOld);
        const result = uuc.createUpdateObject();
        expect(result[4]).toBe("location.postcode:MY5 6IP");
    });

    test("testing second level being an array", async () => {
        const uuc = new UserUpdateClass(userNew, userOld);
        const result = uuc.createUpdateObject();
        expect(result[5]).toBe("phone.0.number:019467 3837");
    });
});

//,"testArray": [{ "first": "inArray" }, { "second": "inArray" }, { "third": "inArray" }]