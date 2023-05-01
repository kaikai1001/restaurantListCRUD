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


require('./config/mongoose')


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})


