const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())


//ROUTES
app.use('/api', require('./routes/userRoutes'))
app.use('/api', require('./routes/todoRoutes'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`app started on port ${PORT}`))