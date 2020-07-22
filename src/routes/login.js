const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../modelobd/modelbd');
const router = express.Router();


router.post('/', async(req, res) => {

    let body = req.body;

    await User.findOne({ email: body.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {

            return res.status(400).json({

                ok: false,
                err: { message: '(user) or password invalid' }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {

            return res.status(400).json({

                ok: false,
                err: { message: 'user or (password) invalid' }
            });
        }

        let token = jwt.sign({

            user: userDB //payload

        }, process.env.SEED, { expiresIn: process.env.TOKEN_EXP });

        res.json({
            ok: true,
            user: userDB,
            token
        });
    });
});


module.exports = router;