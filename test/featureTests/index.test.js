const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./../../src/app/index.js')
const assert = require('assert')


describe('API Suite test', () => {

    describe('/car', () => {
        it('should request the contact page and return HTTP Status 200', async () => {

            const payload = {
                "customer": {
                    "id": "df3da95b-3e5b-4182-a65b-0c0560ecab4d",
                    "name": "Larry Mertz",
                    "age": 19
                },
                "carCategory": {
                    "id": "b76c7185-1cf4-4033-a352-915e2be8086c",
                    "name": "Minivan",
                    "carIds": [
                        "8d445ae9-c599-4113-8e01-8419b1cd0b4b", 
                        "b3ad3657-765b-4dd8-9fab-a6b036d95675", 
                        "951a6326-1af0-4483-be5c-d557f118d265"],
                    "price": "27.51"
                },
                "numberOfDays": 10
            }
            
            const expected = JSON.stringify({
                "customer": {
                  "id": "df3da95b-3e5b-4182-a65b-0c0560ecab4d",
                  "name": "Larry Mertz",
                  "age": 19
                },
                "car": {
                  "id": "b3ad3657-765b-4dd8-9fab-a6b036d95675",
                  "name": "Countach",
                  "releaseYear": 2021,
                  "available": true,
                  "gasAvailable": true
                },
                "amount": "R$ 302,61",
                "dueDate": "12 de outubro de 2021"
            })
            
            const response = await request(app)
                .post("/car")
                .send(payload)
                    .expect(200);
            
            assert.deepStrictEqual(response.text, expected);
        })
    })
})