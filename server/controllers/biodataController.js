const { Biodata } = require("../models");

class BiodataController {
  static async create(req, res, next) {
    const {
      position,
      name,
      idCardNumber,
      birth,
      gender,
      religion,
      status,
      addressCard,
      address,
      email,
      noHp,
      guardian,
      skill,
      relocate,
      salary,
    } = req.body;
    try {
      const newBiodata = await Biodata.create({
        position,
        name,
        idCardNumber,
        birth,
        gender,
        religion,
        status,
        addressCard,
        address,
        email,
        noHp,
        guardian,
        skill,
        relocate,
        salary,
      });
      res.status(201).json(newBiodata);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const {
      position,
      name,
      idCardNumber,
      birth,
      gender,
      religion,
      status,
      addressCard,
      address,
      email,
      noHp,
      guardian,
      skill,
      relocate,
      salary,
    } = req.body;
    try {
      const Biodatacheck = await Biodata.findByPk(req.params.id);
      if(!Biodatacheck) {
        throw {name: "not found"}
      }
      const newBiodata = await Biodata.update({
        position,
        name,
        idCardNumber,
        birth,
        gender,
        religion,
        status,
        addressCard,
        address,
        email,
        noHp,
        guardian,
        skill,
        relocate,
        salary,
      });
      res.status(200).json(newBiodata);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const biodata = await Biodata.findByPk(req.params.id);
      if (!biodata) throw { name: 'not found' };
      await biodata.destroy();
      res.status(200).json({ message: `${biodata.title} success to delete` });
    } catch (error) {
      next(error);
    }
  }

  static async getBiodata(req, res, next) {
    try {
        let dataBiodata;
        if(req.user.role === 'admin'){
            dataBiodata = await Biodata.findAll({attributes: ['name', 'birth', 'position']});
        } else {
            dataBiodata = await Biodata.findOne({
                where: { userId: req.user.id },
                attributes: ['name', 'birth', 'position']
            })
        }
        res.status(200).json({ dataBiodata });
    } catch (error) {
        next(error)
    }
  }

  static async getBiodataById(req, res, next) {
    try {
        let dataBiodata = Biodata.findByPk(req.params.id, {
            include: [
                {
                  association: 'Education',
                },
                {
                  association: 'Work',
                },
                {
                  association: 'Training',
                },
              ]
        });
        if (!dataBiodata) throw { name: 'not found' };
        res.status(200).json({ dataBiodata });
    } catch (error) {
        next(error)
    }
  }
}

module.exports = BiodataController;
