var punto = 0

const sumar = async (req, res) => {
    var pto = parseInt(req.params.punto);
    punto = punto + pto;
    res.status(200).json(punto);
};

const webvj = async (req, res) =>{
    res.render('../Juego/index.ejs');
};

const webdatos = async (req, res) =>{
    res.render('index.ejs', {
        puntos: punto
    });
};

module.exports = {
    webvj,
    sumar,
    webdatos
};
