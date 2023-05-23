const app = require('./app')
require('dotenv').config()
const { connectDB } = require('./config/db')

// Connecting to databse
connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port http://localhost:${process.env.PORT}`
  );
});