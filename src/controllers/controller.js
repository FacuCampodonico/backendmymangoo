const pool = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

const getUsers = async (req, res, next) => {
    try {

        const allusers = await pool.query('SELECT * FROM users')

        res.json(allusers.rows)
        
    } catch (error) {
        next(error)
    }
}

const getSingleUser = async (req, res, next) => {
    try {

        const {id} = req.params

        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: "user not found",
        })

        return res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }
}

const newUser =  async (req, res, next) => {
    try {
        const {mail, password} = req.body

        console.log('Datos recibidos:', mail, password);
    
        const user = await pool.query("SELECT * FROM users WHERE mail = $1",[
            mail
        ]);
    
        if(user.rows.length !== 0){
            return res.status(401).send("user already exist")
        }
    
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, salt)

        const result = await pool.query("INSERT INTO users (mail, password) VALUES ($1, $2) RETURNING *", [
            mail, 
            bcryptPassword
        ]);
    
        const token = jwtGenerator(result.rows[0].id)

        res.json({ token })

    } catch (error) {
        next(error)
    }
}

const deleteUser =  async (req, res, next) => {
    try {

        const {id} = req.params

        const result = await pool.query("DELETE FROM users WHERE id = $1", [id])

        if (result.rowCount === 0) return res.status(404).json({
            message: "user not found",
        })

        return res.sendStatus(204);

    } catch (error) {
        next(error)
    }
}

const updatingUser = async (req, res, next) => {

    try {

        const { id } = req.params;
        const {mail, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const result = await pool.query("UPDATE users SET mail = $1, password = $2 WHERE id = $3 RETURNING *",
         [mail, hashedPassword, id]
        );
    
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "user not found"
            });
    
        return res.json(result.rows[0]);
        
    } catch (error) {

        next(error)
    }
}

const logUser = async (req, res, next) => {
    try {
    
        const {mail, password} = req.body

        const user = await pool.query("SELECT * FROM users WHERE mail = $1",[
            mail
        ])

        if (user.rows.length === 0){
            return res.status(401).json("email is incorrect")
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password)

        if (!validPassword){
            return res.status(401).json("password is incorrect")
        }
        
        const token = jwtGenerator(user.rows[0].id)

        res.json({ token })

    } catch (error) {
        next(error)
    }
}

const verify = async (req, res, next) => {
    try {
        res.json(true)
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    getSingleUser,
    newUser,
    deleteUser,
    updatingUser,
    logUser,
    verify
}