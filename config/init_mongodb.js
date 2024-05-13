const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('mongodb connected.')
}).catch((err) => console.log(err.message))

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to '+process.env.DB_NAME+' db')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.')
})

/** onPress 'ctrl + c' event will call */
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})

//new code 