const faker = require('faker')
const knex = require('./../../data/db-config');
const Groomer = require('./../../api/models/groomer');
const Profile = require('./../../api/models/profile');
const Validator = require('./../../api/models/Validator');

describe('testing model "Groomer"', () => {

    describe("persist data", () => {
        it("should successful create new groomer", async () => {
            const profile = (await Profile.findAll())[1]
            const data = {
                profile_id: profile.id,
                travel: true,
                travel_distance: 50,
                bio: faker.lorem.sentence()
            }

            const result = await Groomer.create(data)

            expect(result).toHaveLength(1)
            expect(result[0]).toEqual(expect.objectContaining(data))
        })

        it("should successful update groomer entry corresponding to the specified ID", async () => {
            const groomer = (await Groomer.findAll())[0]

            const result = await Groomer.update(groomer.id, {
                ...groomer,
                travel: false,
                travel_distance: 100,
                bio: "Pets lover"
            })

            expect(result).toHaveLength(1)
            expect(result[0].travel).toBe(false)
            expect(result[0].travel_distance).toBe(100)
            expect(result[0].bio).toBe("Pets lover")
        })
    })

    describe('retrieve data', () => {
        it("findAll: should return all entries in the database table", async () => {
            expect((await Groomer.findAll()).length).toBe(2)
        })
        it("findById: should return row entry corresponding to the specified ID in this case 'undefined'", async () => {
            const groomer = (await Groomer.findAll())[0]
            expect((await Groomer.findById(groomer.id))).toEqual(groomer)
        })
    })

    describe("delete data", () => {
        it("should delete row in the database table corresponding with the specified ID", async () => {
            const groomer = (await Groomer.findAll())[0]
            // console.log(groomer)
            const result = await Groomer.remove(groomer.id);

            expect((await Groomer.findById(groomer.id))).toBeUndefined()
            expect((await Groomer.findAll()).length).toBe(1)
        })
    })

    describe("data type validation", () => {
        it("should failed if not required fields", async () => {
            const result = await Groomer.create({})
            
            expect(result.length).toBe(3)
            expect(result[0].message).toBe('requires property "profile_id"')
            expect(result[1].message).toBe('requires property "travel"')
            expect(result[2].message).toBe('requires property "travel_distance"')
        })

        it("should failed if invalid data type", async () => {
            const data = {
                profile_id: 5,
                travel: "true",
                travel_distance: "kjd",
                bio: 50
            }
            Groomer.validator = new Validator(knex) // rest validator
            const result = await Groomer.create(data)
            
            expect(result.length).toBe(4)
            expect(result[0].message).toBe('is not of a type(s) string')
            expect(result[1].message).toBe('is not of a type(s) boolean')
            expect(result[2].message).toBe('is not of a type(s) integer')
            expect(result[3].message).toBe('is not of a type(s) string')
        })
    })

    describe("check if data exist in the database", () => {
        it("should failed if incorrect profile_id", async () => {
            const data = {
                profile_id: "585",
                travel: true,
                travel_distance: 50,
                bio: faker.lorem.sentence()
            }
            Groomer.validator = new Validator(knex)
            const result = await Groomer.create(data)

            expect(result.length).toBe(1)
            expect(result[0].detail).toBe('[profile_id] with value: [585] does not exists in table: [profiles], column: [id]')
        })
    })
})