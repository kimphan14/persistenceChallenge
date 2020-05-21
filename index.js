const express = require('express')
const bodyParser = require('body-parser')
//const db = require('./queries')
const db = require('./students')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/student', db.getStudents)
app.get('/students/:id', db.getStudentById)
app.get('/grades/:id', db.getStudentGrades)
app.post('/grades', db.postGrade)
app.post('/users', db.createUser)





app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})