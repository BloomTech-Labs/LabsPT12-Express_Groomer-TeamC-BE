const express = require('express')
const SearchController = require('./searchController')
const authRequired = require('./../middleware/authRequired')

const router = express.Router();

router.get('/groomers', SearchController.searchGroomers.bind(SearchController));

module.exports = router;