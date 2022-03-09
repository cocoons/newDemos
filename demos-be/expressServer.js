import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import { Sequelize } from "sequelize"
//db models
import { dbTblAuth, dbTblPerks, dbTblEmployees, dbTblUserToDos, dbTblOfferts } from './sequalize/Models.js'
//db table specifics
import { initAuthTable, authenticate } from './sequalize/AuthQueries.js'
import { initPerksTable, getPerksList } from './sequalize/PerksQueries.js'
import { initEmployeesTable, getEmployeesList } from './sequalize/EmployeesQueries.js'
import { initUserToDosTable, getUserToDosListByUserId, getUsersToDosList, updateUserToDosList } from './sequalize/UserToDosQueries.js'
import { initOffertsTable, getUserOffertsListByUserId, getUsersOffertsList, addUserOffert } from './sequalize/OffertQueries.js'
import { getHashToken, getHashPassword } from './utils/utils.js'

const app = express()
app.use(cors())

dotenv.config()
const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_URL, BE_PORT, BE_HOST } = process.env
console.log(`POSTGRES_URL is: ${POSTGRES_URL}`)

const port = BE_PORT
const serverIP = BE_HOST

// configure bodyParser for URL data and POST/PUT/DELETE request data
//Parse request POST data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//init sequelize DB connection
const sequelize = new Sequelize(POSTGRES_URL, {
	logging: console.log
})

sequelize.authenticate()
.then(() => {
	console.log("Success!")
  })
  .catch((err) => {
	console.log(err)
  });

//db table models init
var Auth = dbTblAuth(sequelize)
var Perks = dbTblPerks(sequelize)
var Employees = dbTblEmployees(sequelize)
var UserToDos = dbTblUserToDos(sequelize)
var Offerts = dbTblOfferts(sequelize)

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next();
});

app.get('/valtech/initDb', (req, res) => {
	initAuthTable(Auth)
	initPerksTable(Perks)
	initEmployeesTable(Employees)
	initUserToDosTable(UserToDos)
	initOffertsTable(Offerts)

	res.send("Added data to database!")
})

app.post('/valtech/getHashPassword', (req, res) => {
	console.log("received req.body is: ", req.body.password);
	res.send(getHashPassword(req.body.password))
})

app.post('/valtech/authenticate', async function (req, res) {
	//console.log("received req.body is: ", req.body);
	const ost = await authenticate(Auth, req.body)
	res.send(ost)
})

app.get('/valtech/getLists', async function (req, res) {
	const perksList = await getPerksList(Perks)
	const employeesList = await getEmployeesList(Employees)
	res.send({'perksList': perksList, 'employeesList': employeesList})
})

app.get('/valtech/getUsersToDos', async function (req, res) {
	const usersToDos = await getUsersToDosList(UserToDos)
	res.send(usersToDos)
})
app.post('/valtech/getUserToDosByUserId', async function (req, res) {
	console.log("received req.body is: ", req.body);
	const userToDos = await getUserToDosListByUserId(UserToDos, req.body)
	res.send(userToDos)
})
app.post('/valtech/updateUserTodos', async function (req, res) {
	//needs toDo table id
	console.log("received req.body is: ", req.body);
	const userToDos = await updateUserToDosList(UserToDos, req.body)
	res.send(userToDos)
})

app.get('/valtech/getUsersOfferts', async function (req, res) {
	const usersOfferts = await getUsersOffertsList(Offerts)
	res.send( usersOfferts)
})
app.post('/valtech/getUserOffertsByUserId', async function (req, res) {
	console.log("received req.body is: ", req.body);
	const userOfferts = await getUserOffertsListByUserId(Offerts, req.body)
	res.send(userOfferts)
})
app.post('/valtech/addUserOffert', async function (req, res) {
	console.log("received req.body is: ", req.body);
	const userOfferts = await addUserOffert(Offerts, req.body)
	res.send(userOfferts)
})

app.listen(port, serverIP, () => console.log(`express server PORT: ${port}, IP: ${serverIP}!`))



