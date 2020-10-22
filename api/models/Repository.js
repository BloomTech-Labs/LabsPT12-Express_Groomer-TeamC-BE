const NotFound = require('../errors/NotFound');

class Repository {
  constructor() {
    this.model = null;
    this.properties = []
  }

  /**
   * Retrieve all rows in the table
   * @param {object} param request context and other needed param in the repo
   */
  async get() {
    return await this.model.findAll();
  }

  /**
   * Retrieve on row by primary key
   * @param {string} id table primary key
   * @param {object} param1 request context and other needed param in the repo | optional
   */
  async getOne(id) {
    const row = await this.getOne(id);
    // find model class name
    const modelName = this.model.constructor.name.toLowerCase();
    // throw error if specified does not exists
    if (!row)
      throw new NotFound(`Could not find "${modelName}" with id [${id}]`);
    // return row if founded
    return row;
  }

  /**
   * This method is called before the data to be persist, can be used handle
   * data before to save to the database
   * @param {object} payload data to persist
   * @param {object} param  request context and other needed param in the repo | optional
   */
  async beforeCreate(payload) {
    return payload;
  }

  /**
   * Save data in the database
   * @param {object} payload data to persist
   * @param {object} param1 request context and other needed param in the repo | optional
   */
  async create(payload, param) {
    const data = await this.beforeCreate(payload, param);
    const result = await this.model.create(data);
    return await this.afterCreate(result, param);
  }

  /**
   * Called after data has been saved to the database
   * @param {*} result result returning by the database create method
   * @param {*} param1 request context and other needed param in the repo | optional
   */
  async afterCreate(result) {
    return result;
  }

  /**
   * Called before data to be updated
   * @param {string} id ref primary key to be updated
   * @param {object} payload data to save
   * @param {object} param2 request context and other needed param in the repo | optional
   */
  async beforeUpdate(id, payload) {
    const row = await this.model.findById(id);
    if (!row)
      throw new NotFound(`Could not update ${this.model.constructor.name.toLowerCase()} with the specified ID. [id: ${id}] not found.`)
    return {
      ...row,
      ...payload,
    };
  }

  /**
   * Update the data in database corresponding  to the specified [id]
   * @param {string} id ref primary key to be updated
   * @param {object} payload data to save
   * @param {object} param2 request context and other needed param in the repo | optional
   */
  async update(id, payload, param) {
    const data = await this.beforeUpdate(id, payload, param);
    const result = await this.model.update(id, data);
    return await this.afterUpdate(result, param);
  }

  /**
   * Called after data has been updated
   * @param {*} id ref primary key updated
   * @param {*} payload data to save
   * @param {*} param2 request context and other needed param in the repo | optional
   */
  async afterUpdate(result) {
    return result;
  }

  /**
   * Called before row deletion
   * @param {*} id row ref to be deleted
   * @param {*} param1 request context and other needed param in the repo | optional
   */
  async beforeRemove(id) {
    const row = await this.getOne(id);
    return row.id;
  }

  /**
   * delete data
   * @param {*} id row ref to be deleted
   * @param {*} param1 request context and other needed param in the repo | optional
   */
  async remove(id, param) {
    const pk = await this.beforeRemove(id, param);
    const result = await this.model.remove(pk);
    return await this.afterRemove(result, param);
  }

  /**
   * Called after has been deleted
   * @param {*} id row ref to be deleted
   * @param {*} param1 request context and other needed param in the repo | optional
   */
  async afterRemove(result) {
    return result;
  }

  /**
   * Return alls related as specifies in properties var
   * @param {string} ref table and row ref ex. table.id
   * @param {string} related foreign key on the current model
   * @param {string} type relationship type
   */
  async relatedAll(ref, related, type="hasOne") {
    return await this._related(ref, related, type)
  }

  /**
   * Return the first row as specified if the filer
   * @param {string} ref table and row ref ex. table.id
   * @param {string} related foreign key on the current model
   * @param {function} filter function used to filter the data 
   * @param {string} type relationship type
   */
  async relatedOne(ref, related, filter, type="hasOne") {
    return (await this._related(ref, related, type)).find(filter)
  }


  async _related(ref, related, type="hasOne") {
    if (type === "hasOne") 
        return await this.model.query()
          .join(ref.split(".")[0], ref, `${this.model.tableName}.${related}`)
          .select(...this.properties)
  }
}

module.exports = Repository;
