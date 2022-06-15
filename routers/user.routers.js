const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../models/db.model');
const { Op } = require('sequelize');
const UserModel = db.User;

const jsonParser = bodyParser.json();

// get all user
router.get('/',async (req, res) => {
    try {
        // find all user and show for client
        const users = await UserModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Error Server..."});
    }
})

// get one user
router.get('/:id',async (req, res) => {
    const {id} = req.params;
    try {
        // find user with id params
        const user = await UserModel.findOne({
            where: { id, }
        });
        // check database have user ?
        if(user) {
            res.status(200).json(user);
        }else {
            res.status(404).json({message: "Not found!"})
        }
    } catch (error) {
        res.status(500).json({message: 'Error Server...'});
    }
});
// create new user
router.post('/',jsonParser, async (req, res) => {
    const data = req.body;
    try {
        // find user exist in database
        const findUser = await UserModel.findOne({
            where:{
                [Op.or]: [
                    {
                        username: data.username
                    },
                    {
                        email: data.email
                    }
                ]
            }
        });
        console.log(findUser);
        // check user exist
        if(!findUser) {
            await UserModel.create(data); 
            res.status(201).json({message: "Add user successfully!"});
        }else {
            res.status(401).json({message: "username or email is exist, please choose different username or email"});
        }
    } catch (error) {
        res.status(500).json({message: "Server Error!"});
    }
})

// update user
router.put('/:id', jsonParser, async (req, res) => {
    const {id} = req.params;
    const {username, email,pwd} = req.body;

    // find user to update
    const userFind = await UserModel.findOne({
        where: {
            id,
        }
    })
        try {
            if(userFind) {
                await UserModel.update({ 
                    username,
                    email, 
                    pwd 
                }, 
                {
                    where: 
                        {
                            id,
                        } 
                });
                res.send({message:'Update user succsessfully!'});
            }else {
                res.status(404).json({message: "User not found!"})
            }
        } catch (error) {
            res.status(500).json({message: "Server is fail..."})
        }

    
});

// delete user
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const userFind = await UserModel.findOne({
            where: {
                id,
            }
        });
        if(userFind){
            await UserModel.destroy({
                where : {
                    id,
                }
            });
            res.status(200).json({message: "Delete user successfully!"});
        }else {
            res.status(404).json({message: "Not Found!"});
        }
    } catch (error) {
        res.status(500).json({message: "Server Error!"});
    }
});

module.exports = router;