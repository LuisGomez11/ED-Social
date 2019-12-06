const { Publication } = require('../Models/Publication.model');

const PublicationCtrl = {};

// Obtener publicaciones
PublicationCtrl.getPublications = async (req, res) => {
    const publications = await Publication.find();
    res.json(publications);
}

// Crear publicacion
PublicationCtrl.postPublication = async (req, res) => {
    const publication = new Publication (req.body);
    await publication.save();
    res.json({
        'status': 'Publication Saved'
    });
}

module.exports = PublicationCtrl;