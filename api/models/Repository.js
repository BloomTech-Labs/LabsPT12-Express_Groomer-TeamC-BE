class Repository {
  constructor() {
    this.model = null;
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
    return await this.model.findById(id);
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
  async beforeUpdate(payload) {
    return payload;
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
    return await this.afterUpdate(id, result, param);
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
    return id;
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
}

module.exports = Repository;
