const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'b3ee48a1837c477496cca2645bfd5174'
   });

const handleApiCall = (req, res) => {
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (db) => (req, res) => {
    const { id } = req.body;
   db('users').where('id', '=', id)
   .increment('entries')
   .returning('entries')
   .then(entries => res.json(entries[0]))
   .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {handleImage, handleApiCall};