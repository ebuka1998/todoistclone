require('dotenv').config()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userController = {
    async createUser(req, res) {
        const {email, user_password} = req.body 

        const secret = process.env.SECRET
        try {

            if(email.length === 0 ){
                return res.status(401).json({message: 'email cannot be empty'})
            }

            if(user_password.length === 0 ){
                return res.status(401).json({message: 'password cannot be empty'})
            }
            //check if user exists

            let user = await pool.query("SELECT * FROM users WHERE email = $1", [
                email
            ])

            if (user.rows.length > 0) {
                return res.status(401).json({message: 'user already exist'})
            }
            
            if(!validateEmail(email)){
                return res.status(400).json({message: 'invalid email, please put in correct email'})
            }

            const salt = await bcrypt.genSalt(10)

            const passwordHash = await bcrypt.hash(user_password, salt)

            user = await pool.query("INSERT INTO users (email, user_password ) VALUES ($1, $2) RETURNING *", 
                [email, passwordHash]
            
            )

            const token = jwt.sign(user.rows[0].user_id, secret)
         
            res.status(201).header('auth-token').send({success: true, message: 'created successfully', token, user: user.rows})
        } catch (error) {
            res.status(401).send(error.message)
        }

    },

    async loginUser(req, res) {
        const { email, user_password } = req.body
        const secret = process.env.SECRET
        try {
            if(email.length === 0 ){
                return res.status(401).json({message: 'email cannot be empty'})
            }

            if(user_password.length === 0 ){
                return res.status(401).json({message: 'password cannot be empty'})
            }

            if(!validateEmail(email)){
                return res.status(400).json({message: 'invalid email, please put in correct email'})
            }

            let user = await pool.query("SELECT * FROM users WHERE email = $1", [email])

            if(user.rows.length === 0) {
                return res.status(401).json({message: 'invalid credentials'})
            }

            const password = await bcrypt.compare(user_password, user.rows[0].user_password)
        
            if(!password) return res.status(404).json({message: 'invalid password'})

            const token = jwt.sign(user.rows[0].user_id, secret)

            res.status(201).header('auth-token').send({success: true, message: 'signed successfully', token, user: user.rows})
       
        } catch (error) {
            res.status(401).send(error.message)
        }
    },

    async getUser(req, res) {
        try {
            let user = await pool.query("SELECT user_id, email, created_at FROM users WHERE user_id = $1", [req.user])
            res.status(200).send(user.rows[0])
        } catch (error) {
            res.status(401).send(error.message)
        }
    },
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {userController}