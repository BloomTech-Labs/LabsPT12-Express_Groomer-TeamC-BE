class Repository {
  constructor() {
    this.model = null;
  }

  /**
   * Retrieve all rows in the table
   * @param {object} param request context and other needed param in the repo
   */
  async get({ context, ...rest }) {
    return await this.model.findAll();
  }

  /**
   * Retrieve on row by primary key
   * @param {string} id table primary key
   * @param {object} param1 request context and other needed param in the repo
   */
  async getOne(id, { context, ...rest }) {
    return await this.model.findById(id);
  }

  /**
   * This method is called before the data to be persist, can be used handle
   * data before to save to the database
   * @param {object} payload data to persist
   * @param {object} param  request context and other needed param in the repo
   */
  async beforeCreate(payload, { context, ...rest }) {
    return payload;
  }

  /**
   * Save data in the database
   * @param {object} payload data to persist
   * @param {object} param1 request context and other needed param in the repo
   */
  async create(payload, { context, ...rest }) {
    const data = await this.beforeCreate(payload, { context, ...rest });
    const result = await this.model.create(data);
    return await this.afterCreate(result, { context, ...rest });
  }

  /**
   * Called after data has been saved to the database
   * @param {*} result result returning by the database create method
   * @param {*} param1 request context and other needed param in the repo
   */
  async afterCreate(result, { context, ...rest }) {
    return result;
  }

  /**
   * Called before data to be updated
   * @param {string} id ref primary key to be updated
   * @param {object} payload data to save
   * @param {object} param2 request context and other needed param in the repo
   */
  async beforeUpdate(id, payload, { context, ...rest }) {
    return payload;
  }

  /**
   * Update the data in database corresponding  to the specified [id]
   * @param {string} id ref primary key to be updated
   * @param {object} payload data to save
   * @param {object} param2 request context and other needed param in the repo
   */
  async update(id, payload, { context, ...rest }) {
    const data = await this.beforeUpdate(id, payload, { context, ...rest });
    const result = await this.model.update(id, data);
    return await this.afterUpdate(id, result, { context, ...rest });
  }

  /**
   * Called after data has been updated
   * @param {*} id ref primary key updated
   * @param {*} payload data to save
   * @param {*} param2 request context and other needed param in the repo
   */
  async afterUpdate(id, result, { context, ...rest }) {
    return result;
  }

  /**
   * Called before row deletion
   * @param {*} id row ref to be deleted
   * @param {*} param1 request context and other needed param in the repo
   */
  async beforeRemove(id, { context, ...rest }) {
    return id;
  }

  /**
   * delete data
   * @param {*} id row ref to be deleted
   * @param {*} param1 request context and other needed param in the repo
   */
  async remove(id, { context, ...rest }) {
    const pk = await this.beforeRemove(id, { context, ...rest });
    const result = await this.model.remove(pk);
    return await this.afterRemove(result, { context, ...rest });
  }

  /**
   * Called after has been deleted
   * @param {*} id row ref to be deleted
   * @param {*} param1 request context and other needed param in the repo
   */
  async afterRemove(result, { context, ...rest }) {
    return result;
  }
}

module.exports = Repository;
