const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


//新增餐廳的頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//新增餐廳
router.post('/', (req, res) => {
  const data = req.body // 從 req.body 拿出表單裡的資料
  Restaurant.create(data)  // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//瀏覽餐廳詳細資料
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

//編輯餐廳的頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//儲存編輯完的頁面
router.put('/:id', (req, res) => {
  const id = req.params.id
  const data = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant = data
      return restaurant.save() //<----超奇怪
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//刪除頁面
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router