const Ketoprac = require('../models/Ketoprac');

module.exports = {
  landingPage: async (req, res) => {
    try {
      const item = await Ketoprac.find()
      .select('_id name city price imageUrl')
      res.status(200).json({item})
    } catch (error) {
      res.status(500).json({message: 'internal server error'})
    }
  }
}