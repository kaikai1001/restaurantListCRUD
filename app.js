// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()


// 載入 method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//啟用body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extented: true }))

//啟用 Handlebars
const exphbs = require('express-handlebars')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//使用靜態檔案
app.use(express.static('public'))

// 引用路由器
const routes = require('./routes')
// 將 request 導入路由器
app.use(routes)

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

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})


