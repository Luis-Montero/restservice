const express = require('express');
const router = express.Router();

const User = require('../modelobd/modelbd');


router.get('/', async(req, res) => {

    const user = await User.find();
    //console.log(user);

    return res.status(200).send(user)


});

router.get('/:id', async(req, res) => {

    const user = await User.findById(req.params.id);

    return res.status(200).send(user);


});


router.post('/', async(req, res) => {

    let body = req.body;


    const user = new User({

        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
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

router.put('/:id', async(req, res) => {

    const { id } = req.params;

    const user = {

        name: req.body.name,
        email: req.body.email,
        password: req.params.password,
    };

    await User.findByIdAndUpdate(id, { $set: user }, { new: true });

    res.json({ status: 'updated user' })


});

router.delete('/:id', async(req, res) => {

    const user = await User.findByIdAndDelete(req.params.id);

    res.json({ status: 'Deleted' });


});

module.exports = router;