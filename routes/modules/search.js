const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//搜尋餐廳
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  if (!keyword) return res.redirect('/')
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(
        rest => {
          return rest.name.toLowerCase().includes(keyword.toLowerCase()) || rest.category.toLowerCase().includes(keyword.toLowerCase())
        }
      )
      res.render('index', { restaurants: filterRestaurants, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router