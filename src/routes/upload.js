const express = require('express');
const fileUpload = require('express-fileupload');

const router = express();


router.use(fileUpload({ useTempFiles: true }));

router.put('/upload', (req, res) => {

    if (!req.files) {

        return res.status(400)
            .json({
                ok: false,
                err: 'NO se ha seleccionado un archivo'
            });
    }

    let archivo = req.files.archivo;

    archivo.mv('uploads/filename.jpg', (err) => {

        if (!req.files) {

            return res.status(500)
                .json({
                    ok: false,
                    err
                });
        }

        res.json({

            ok: true,
            message: 'Imagen subida con exito'
        });

    });
});





module.exports = router;