const pool = require('../db')

const getUsers = async (req, res) => {
    try {

        const allusers = await pool.query('SELECT * FROM users')

        res.json(allusers.rows)
        
    } catch (error) {
        console.log(error.message);
    }
}

const getSingleUser = (req, res) => {
    res.send('retrieving a single user');
}

const newUser = async (req, res) => {
    const {mail, password} = req.body

    try {

        const result = await pool.query("INSERT INTO users (mail, password) VALUES ($1, $2) RETURNING *", [
            mail, 
            password
        ]);
    
        //console.log(result)
        res.json(result.rows[0]);

    } catch (error) {
        //console.log(error.message);
        res.json({ error: error.message});
    }
}

const deleteUser = (req, res) => {
    res.send('deleting an user');
}

const updatingUser = (req, res) => {
    res.send('updating an user');
}

module.exports = {
    getUsers,
    getSingleUser,
    newUser,
    deleteUser,
    updatingUser
}