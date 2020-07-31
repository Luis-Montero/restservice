const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { checkToken } = require('../middlewares/authentication');

const User = require('../modelobd/modelbd');

// router.get('/', async(req, res) => {

//     const user = await User.find();
//     //console.log(user);

//     return res.status(200).send(user)
// });

//------------------------------------------

//Servicio para obtener usuarios de mongo de forma paginada

router.get('/', checkToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //con este parametro 'name email' le estoy pididiendo que solo me muestre esos parametrs de la base de datos

    User.find({}, 'name email')
        .skip(desde)
        .limit(limite)
        .exec((err, user) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            User.count({}, (err, conteo) => {

                res.json({

                    ok: true,
                    user,
                    quantity: conteo
                });
            });
        });
});

router.get('/:id', checkToken, async(req, res) => {

    const user = await User.findById(req.params.id);

    return res.status(200).send(user)
});

router.post('/', checkToken, async(req, res) => {

    let body = req.body;


    const user = new User({

        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    await user.save((err, userStored) => {

        if (err) {


            return res.status(400).json({

                ok: false,
                err
            });
        }

        res.json({

            ok: true,
            user: userStored
        });
    });
});

router.put('/:id', checkToken, async(req, res) => {

    const { id } = req.params;

    const user = {

        name: req.body.name,
        email: req.body.email,
        password: req.params.password
    };

    await User.findByIdAndUpdate(id, { $set: user }, { new: true });

    res.json({ status: 'updated user' })


});

router.delete('/:id', checkToken, async(req, res) => {

    const id = req.params.id;

    await User.findByIdAndRemove(id, (err, userDelete) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!userDelete) {

            return res.status(404).json({

                ok: false,
                err: { message: 'user not found' }
            });
        }

        res.json({
            ok: true,
            user: {

                message: 'Deleted user!!!'

            }
        });
    });
});

module.exports = router;