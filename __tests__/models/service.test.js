const faker = require('faker')
const knex = require('./../../data/db-config');
const Service = require('./../../api/models/services');
const Validator = require('./../../api/models/Validator');

describe('testing model "Service"', () => {
    afterAll(async () => {
        await Service.query().del()
    })

    describe("persist data", () => {
        it("should successful create new service", async () => {
            const data = {
                name: "Bath & Full Haircut",
                description: faker.lorem.sentence(),
                cost: 19.99
            }
            const result = await Service.create(data)

            expect(result.length).toBe(1)
            expect(result[0].id).toBeDefined()
            expect(result[0]).toEqual(expect.objectContaining(data))
        })

        it("should successful update services table row corresponding to the specified ID", async () => {
            const service = (await Service.findAll())[0]

            const result = await Service.update(service.id, {
                ...service,
                cost: 36.99
            })

            expect(result).toHaveLength(1)
            expect(result[0].cost).toBe(36.99)
        })
    })

    describe("retrieve data", () => {
        it("should return all rows", async () => {
            expect((await Service.findAll()).length).toBe(1)
        })
        it("should return row corresponding to the specified ID", async () => {
            const service = (await Service.findAll())[0]
            expect((await Service.findById(service.id))).toEqual(service)
        })
    })

    describe("delete data", () => {
        it("should delete row corresponding with the specified ID", async () => {
            const service = (await Service.findAll())[0]
            const result = await Service.remove(service.id)

            expect((await Service.findById(service.id))).toBeUndefined()
            expect((await Service.findAll()).length).toBe(0)
        })
    })

    describe("data type validation", () => {
        it("should failed if not required fields", async () => {
            Service.validator = new Validator(knex) // rest validator
            const result = await Service.create({})

            expect(result.length).toBe(2)
            expect(result[0].message).toBe('requires property "name"')
            expect(result[1].message).toBe('requires property "cost"')
        })
        
        it("should failed if incorrect data types", async () => {
            const data = {
                name: 895,
                description: 66,
                cost: "19.99l"
            }
            Service.validator = new Validator(knex) // rest validator
            const result = await Service.create(data)

            expect(result.length).toBe(3)
            expect(result[0].message).toBe('is not of a type(s) string')
            expect(result[1].message).toBe('is not of a type(s) string')
            expect(result[2].message).toBe('is not of a type(s) number')
        })
    })
})