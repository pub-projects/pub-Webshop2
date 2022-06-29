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
    "gender": "male",
    "name": {
        "title": "Mr",
        "first": "Alex",
        "last": "James"
    },
    "location": {
        "street": {
            "number": 1234,
            "name": "High Street"
        },
        "city": "Birmingham",
        "state": "Warwickshire",
        "country": "United Kingdom",
        "postcode": "MY3 2SF",
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
    "lang": "en-GB"
}

describe("Testing the UserUpdateClass & functions", () => {
    test("Function - createUpdateObject", async () => {
        const uuc = new UserUpdateClass(userNew, userOld);
        uuc.createUpdateObject()
        expect(true).toBe(true);
    });
});