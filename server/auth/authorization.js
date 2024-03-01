const { Biodata } = require('../models');

async function authorization(req, res, next) {
  try {
    if (req.user.role === 'admin') {
      return next();
    }
    const biodata = await Biodata.findByPk(req.params.id);
    if (!biodata) {
      throw { name: 'not found' };
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
