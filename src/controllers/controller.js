const pool = require('../db')

const getUsers = async (req, res) => {
    try {

        const allusers = await pool.query('SELECT * FROM users')

        res.json(allusers.rows)
        
    } catch (error) {
        console.log(error.message);
    }
}

const getSingleUser = async (req, res) => {
    try {

        const {id} = req.params

        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: "user not found",
        })

        return res.json(result.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
}

const newUser = async (req, res) => {
    const {mail, password} = req.body

    console.log('Datos recibidos:', mail, password);

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

const deleteUser =  async (req, res) => {
    try {

        const {id} = req.params

        const result = await pool.query("DELETE FROM users WHERE id = $1", [id])

        if (result.rowCount === 0) return res.status(404).json({
            message: "user not found",
        })

        return res.sendStatus(204);

    } catch (error) {
        console.log(error.message);
    }
}

const updatingUser = async (req, res) => {

    try {

        const { id } = req.params;
        const {mail, password} = req.body;
    
        const result = await pool.query("UPDATE users SET mail = $1, password = $2 WHERE id = $3 RETURNING *",
         [mail, password, id]
        );
    
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "user not found"
            });
    
        return res.json(result.rows[0]);
        
    } catch (error) {

        console.log(error.message);
    }
}

module.exports = {
    getUsers,
    getSingleUser,
    newUser,
    deleteUser,
    updatingUser
}