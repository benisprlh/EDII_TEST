const { Biodata, Education } = require('../models');

async function authorization(req, res, next) {
  try {
    const biodata = await Biodata.findByPk(req.params.id);
    if (!biodata) {
      throw { name: 'not found' };
    }
    if (req.user.role === 'admin') {
      return next();
    }
    if (biodata.userId !== req.user.id) throw { name: 'forbidden' };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authorization,
};
