require('dotenv').config()
const mongoose = require('mongoose')
exports.dbConnection= ()=>{
mongoose.Promise = global.Promise

// connecting to the database
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('Successfully connected to the database')
}).catch(err => {
  console.log('could not connect to the database.Exiting now..', err)
  process.exit()
})
return mongoose.connection
}