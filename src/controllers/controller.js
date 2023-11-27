const pool = require('../db')
const bcrypt = require('bcrypt')

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

const newUser = async (req, res, next) => {
    const {mail, password} = req.body

    //console.log('Datos recibidos:', mail, password);
    const hashedPassword = await bcrypt.hash(password, 10)

    try {

        const result = await pool.query("INSERT INTO users (mail, password) VALUES ($1, $2) RETURNING *", [
            mail, 
            hashedPassword
        ]);
    
        //console.log(result)
        res.json(result.rows[0]);

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

module.exports = {
    getUsers,
    getSingleUser,
    newUser,
    deleteUser,
    updatingUser
}