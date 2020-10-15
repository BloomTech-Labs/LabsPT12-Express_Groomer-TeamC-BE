const faker = require('faker');
const knex = require('./../../data/db-config');
const Profile = require('./../../api/models/profile');
const UserType = require('../../api/models/userType');
const Validator = require('./../../api/models/Validator');

describe('testing model "Profile"', () => {
  describe('retrieve data', () => {
    it("findAll: should return all entries", async() => {
      const result = await Profile.findAll();

      expect(result).toHaveLength(5)
      expect(result[1].name).toBeDefined()
      expect(result[1].user_type).toBeDefined()
      expect(result[1].email).toBeDefined()
      expect(result[1].avatarUrl).toBeDefined()
    });
    
    it("findById: should return one entry with specific id",  async () => {
      const profiles = await Profile.findAll()
      const expectedData = profiles[0];
     
      const result = await Profile.findById(expectedData.id);
      
      expect(result).toEqual(expectedData)
    })

    it("where close: should return entries where the column corresponds to the given value", async () => {
      const profiles = await Profile.findAll()
      const expectedData = profiles[2];
      const result = await Profile.query().where({email: expectedData.email});

      expect(result).toEqual([expectedData])
    }) 
  });

  describe("data persistance", () => {
    it("should successful create new entry", async() => {
      const userTypes = await UserType.findAll()
      const data = {
        user_type: userTypes[0].id,
        email: faker.internet.email(),
        avatarUrl: faker.image.avatar(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`
      }

      const result = await Profile.create(data)

      expect(result).toHaveLength(1)
      expect(result[0].id).toBeDefined()
      expect(result[0].user_type).toEqual(data.user_type)
      expect(result[0].name).toEqual(data.name)
      expect(result[0].email).toEqual(data.email)
      expect(result[0].avatarUrl).toEqual(data.avatarUrl)
    })
    
    it("should successful update a row corresponding to a given ID", async () => {
      const profiles = await Profile.findAll();

      const result = await Profile.update(profiles[4].id, {
        ...profiles[4],
        phone: "+1 (446)-478-9650",
        address: "202 Miami St",
        city: "Raleigh",
        state: "NC",
        zip_code: 29802,
      })

      expect(result).toHaveLength(1)
      expect(result[0].phone).toEqual("+1 (446)-478-9650")
      expect(result[0].address).toEqual("202 Miami St")
    })
  })

  describe("data deletion", () => {
    it("should delete row in database table corresponding to the specified ID", async () => {
      const toDelete = (await Profile.findAll())[0]
      const result = await Profile.remove(toDelete.id)
      const expectedData = await Profile.findById(toDelete.id)
      
      expect(expectedData).toBeUndefined()
      expect((await Profile.findAll()).length).toBe(5)
    })

    it("should not delete if the specified ID does not corresponding to any row in database table", async () => {
      await Profile.remove(10)

      expect((await Profile.findAll()).length).toBe(5)
    })
  })

  describe("data type validation",  () => {
    it("should failed if invalid data type", async () => { 
      const data = { email: "add", address: 5, city: 6, state: 4, zip_code: "8888" }
      const result = await Profile.create(data)

      expect(result).toHaveLength(7)
      expect(result[0].message).toEqual('requires property "name"');
      expect(result[1].message).toEqual('requires property "user_type"');
      expect(result[2].message).toEqual('does not conform to the "email" format');
      expect(result[3].message).toEqual('is not of a type(s) string');
      expect(result[4].message).toEqual('is not of a type(s) string');
      expect(result[5].message).toEqual('is not of a type(s) string');
      expect(result[6].message).toEqual('is not of a type(s) integer');
    })
  })

  describe("check if data exist in the database", () => {
    it("should failed if incorrect user_type ID", async () => {
      const data = {
        user_type: "10",
        email: faker.internet.email(),
        avatarUrl: faker.image.avatar(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`
      }
      Profile.validator = new Validator(knex) // rest validator

      const result = await Profile.create(data)

      expect(result).toHaveLength(1)
      expect(result[0].detail).toEqual(expect.stringContaining("does not exists in table: [user_types], column: [id]"))
    })
    
    it("should failed if email already exists", async () => {
      const profile = (await Profile.findAll())[0]
      const data = {
        user_type: "10",
        email: profile.email,
        avatarUrl: faker.image.avatar(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`
      }
      Profile.validator = new Validator(knex) // rest validator

      const result = await Profile.create(data)

      
      expect(result[0].detail).toEqual(expect.stringContaining("already exists."))
    })
  })
});
