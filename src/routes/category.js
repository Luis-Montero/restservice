const express = require('express');
const router = express.Router();

const Category = require('../modelobd/categorybd');
const { checkToken } = require('../middlewares/authentication');



router.get('/', async(req, res) => {

    await Category.find({})
        .sort('description') // ordenar por la descripcion, por abecedario, primera letra
        .populate('user', 'name email') //de la coleccion user solamente el name y el email
        .exec((err, category) => {

            if (err) {

                return res.status(400).json({

                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                category
            });

        });
});

router.get('/:id', async(req, res) => {

    let category = await Category.findById(req.params.id);

    res.json({

        ok: true,
        category
    });

});

router.post('/', checkToken, async(req, res) => {

    let body = req.body;

    const category = new Category({

        description: body.description,
        user: req.user._id
    });

    await category.save((err, categoryBd) => {

        if (err) {

            return res.status(500).json({

                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            category: categoryBd
        });
    });
});

router.put('/:id', async(req, res) => {

    let { id } = req.params;

    const category = {

        description: req.body.description
    };

    await Category.findByIdAndUpdate(id, { $set: category }, { new: true });

    res.json({ status: 'updated category' });
});

router.delete('/:id', checkToken, async(req, res) => {

    let id = req.params.id;

    await Category.findByIdAndRemove(id, (err, categoryDelete) => {

        if (err) {

            return res.status(404).json({

                ok: false,
                err
            });
        }

        if (!categoryDelete) {

            return res.status(404).json({

                ok: false,
                err: { message: 'category not found' }
            });
        }

        res.json({
            ok: true,
            category: { message: 'Deleted category!!!' }
        });
    });
});



module.exports = router;