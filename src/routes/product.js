const express = require('express');
const router = express.Router();

const Product = require('../modelobd/productbd');
const { checkToken } = require('../middlewares/authentication');


router.get('/', checkToken, async(req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 20;
    limite = Number(limite);


    await Product.find({ available: true })
        .skip(desde)
        .limit(limite)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, product) => {

            if (err) {
                return res.json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product
            });
        });
});

router.get('/:id', checkToken, async(req, res) => {

    let id = req.params.id

    await Product.findById(id, {})
        .populate('user', 'name')
        .populate('category', 'description')
        .exec((err, product) => {

            if (err) {
                res.json({
                    ok: false,
                    err
                });
            }

            if (!product) {
                res.json({
                    ok: false,
                    message: 'product does not exist'
                });
            }

            res.json({
                ok: true,
                product
            });


        });
});

//------------
//Servicio para buscar en la base de datos por categorias
//--------------

router.get('/search/:termino', checkToken, async(req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    await Product.find({ name: regex })
        .populate('category', 'name')
        .exec((err, product) => {

            if (err) {
                res.json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product
            });
        });
});

//---------------


router.post('/', checkToken, async(req, res) => {

    let body = req.body;

    const product = new Product({

        user: req.user._id,
        name: body.name,
        uniPrice: body.uniPrice,
        description: body.description,
        available: body.available,
        category: req.category

    });

    await product.save((err, productbd) => {

        if (err) {

            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            product: productbd
        });
    })
});


router.put('/:id', checkToken, async(req, res) => {

    let { id } = req.params;

    const product = {

        name: req.body.name,
        uniPrice: req.body.uniPrice,
        description: req.body.description,
        available: req.body.available
    }

    await Product.findByIdAndUpdate(id, { $set: product }, { new: true }, (err, product) => {

        if (err) {
            res.json({
                ok: false,
                err
            });
        }

        if (!product) {

            res.json({
                ok: false,
                message: 'product not found'
            });
        }

        res.json({

            ok: true,
            product
        });
    });

});


router.delete('/:id', checkToken, async(req, res) => {

    let id = req.params.id;

    Product.findById(id, (err, productBD) => {

        if (err) {

            return res.json({

                ok: false,
                err
            });
        }

        if (!productBD) {

            return res.json({

                ok: false,
                message: 'product not found'
            });
        }

        productBD.available = false;

        productBD.save((err, productDeleted) => {

            if (err) {

                return res.json({

                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product: productDeleted
            });
        });
    });
});



module.exports = router;