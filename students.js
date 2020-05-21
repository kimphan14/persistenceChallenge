const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})


const getStudents = (request, response) => {
  console.log(request.query.search)
  if(!request.query.search)
  {
    //GET student - returns a list of all students
    pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else{
    //GET student?search= - returns a list of students filtered on name matching the given query
    const name = request.query.search
    pool.query('SELECT * FROM students WHERE name LIKE $1 ORDER BY id ASC', [name],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

   
  }

//GET students/:studentId - returns details of a specific student by student id
const getStudentById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }



//GET grades/:studentId - returns all grades for a given student by student id
const getStudentGrades = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM grades WHERE studentId = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//POST grade - records a new grade, returns success status in JSON response and stores the new grade in the database
const postGrade = (request, response) => {
  const { studentId, grade, classname } = request.body
  pool.query('INSERT INTO grades (studentId, grade, classname) VALUES ($1, $2, $3)', [studentId, grade, classname], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`New grade added`)
  })
}

//POST register - creates a new user, returns success status in JSON response and stores the new user in the database
const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Success! New User added`)
    })
  }



  module.exports = {
    getStudents,
    getStudentById,
    getStudentGrades,
    postGrade,
    createUser,

  }