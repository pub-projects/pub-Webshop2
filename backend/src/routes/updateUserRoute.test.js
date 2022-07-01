import { updateUser } from './updateUserRoute';
import { app } from '../server';
import { request } from 'supertest';

const userOld = {
    _id: '626f89ee3f33b4f01d6cabb9',
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
    _id: '626f89ee3f33b4f01d6cabb9',
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

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZmODllZTNmMzNiNGYwMWQ2Y2FiYjkiLCJnZW5kZXIiOiJtYWxlIiwibmFtZSI6eyJ0aXRsZSI6Ik1yIiwiZmlyc3QiOiJBbGV4IiwibGFzdCI6IkphbWVzIn0sImxvY2F0aW9uIjp7InN0cmVldCI6eyJudW1iZXIiOjcwMTYsIm5hbWUiOiJCcm9hZHdheSJ9LCJjaXR5IjoiQmlybWluZ2hhbSIsInN0YXRlIjoiV2Fyd2lja3NoaXJlIiwiY291bnRyeSI6IlVuaXRlZCBLaW5nZG9tIiwicG9zdGNvZGUiOiJNWTUgNERaIiwidGltZXpvbmUiOiIrMTE6MDAifSwiZW1haWwiOlt7Im5hbWUiOiJQcml2YXRlIiwiZW1haWxhZGRyZXNzIjoiYWxleC5qYW1lc0BleGFtcGxlLmNvbSIsImlzVmVyaWZpZWQiOnRydWV9XSwibG9naW4iOnsidXNlcm5hbWUiOiJibHVld29sZjk5OSJ9LCJkb2IiOnsiZGF0ZSI6IjE5NTktMTAtMDQiLCJhZ2UiOjYzfSwicmVnaXN0ZXJlZCI6eyJkYXRlIjoiMjAxOC0wMS0wNlQwODoyODoxMC4xMTJaIiwidXBkYXRlZCI6IjIwMjItMDYtMzBUMDc6MzY6MTAuODc0WiJ9LCJwaG9uZSI6W3sibmFtZSI6IkhvbWUiLCJudW1iZXIiOiIwMTk0NjcgMDg2ODcifSx7Im5hbWUiOiJNb2JpbGUiLCJudW1iZXIiOiIwNzg5LTk2Ni02MDIifV0sImF2YXRhciI6eyJsYXJnZSI6Imh0dHBzOi8vcmFuZG9tdXNlci5tZS9hcGkvcG9ydHJhaXRzL21lbi81Mi5qcGciLCJtZWRpdW0iOiJodHRwczovL3JhbmRvbXVzZXIubWUvYXBpL3BvcnRyYWl0cy9tZWQvbWVuLzUyLmpwZyIsInRodW1ibmFpbCI6Imh0dHBzOi8vcmFuZG9tdXNlci5tZS9hcGkvcG9ydHJhaXRzL3RodW1iL21lbi81Mi5qcGcifSwibGFuZyI6ImVuLUdCIiwibGFzdFVwZGF0ZWQiOiIyMDIyLTA2LTI3VDA5OjQxOjI4Ljg0MVoiLCJpYXQiOjE2NTY1NzQ1NzAsImV4cCI6MTY1Njc0NzM3MH0.5JtyOXhakVTbR4i9Y7cWza-YCaPeR6vb1RIlVpk4NV0";

describe("Testing the express server's updateUser functionality.", () => {
    test("/api/users/update/user/:userId", async (done) => {
        const data = "";
        try {
            const res = await request(app)
                .put("/api/users/update/user/626f89ee3f33b4f01d6cabb9")
                .set('Authorization', 'Bearer ' + token)
                .expect(200)
                .expect((res) => {
                    console.log(res)
                })
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        } catch (err) {
            console.error(err);
        }
    });
});

//,"testArray": [{ "first": "inArray" }, { "second": "inArray" }, { "third": "inArray" }]
/**
 * describe("Users route", () => {
  test("Get users route", async () => {
    const res = await request(app).get("/users");
    //console.log("Users route", res.status + " : " + res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(["Chris", "John", "Joe"]);
  });
});
 */