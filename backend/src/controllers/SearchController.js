const Dev = require('../models/Dev');
const parseStrinAsArray = require('../utils/parseStrgAsArray');

module.exports = {
  async index(request, response) {    
    //Buscar todos os Devs num raio de 10km
    //Filtar por tecnologias
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStrinAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude,latitude],
          },
          $maxDistance: 10000,
        }
      }
    });

    return response.json({ devs });
  }
}