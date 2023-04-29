// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()

//啟用body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extented: true }))

//啟用 Handlebars
const exphbs = require('express-handlebars')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//使用靜態檔案
app.use(express.static('public'))

//載入 Restaurant model 
const Restaurant = require('./models/restaurant')

// 載入 mongoose
const mongoose = require('mongoose')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//process.env.MONGODB_URI
mongoose.connect('mongodb+srv://alpha:camp@cluster0.rdlqvcs.mongodb.net/restaurant-list?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定首頁路由
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//新增餐廳的頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//新增餐廳
app.post('/restaurants', (req, res) => {
  const data = req.body // 從 req.body 拿出表單裡的資料
  Restaurant.create(data)  // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})


