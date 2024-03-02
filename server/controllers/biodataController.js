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
      noHP,
      guardian,
      skill,
      relocate,
      salary,
    } = req.body;
    console.log(req.user.id, "<<<")
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
        noHP,
        guardian,
        skill,
        relocate,
        salary: Number(salary),
        userId: req.user.id
      });
      console.log(newBiodata)
      res.status(201).json(newBiodata);
    } catch (error) {
      console.log(error)
      // next(error);
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
      const newBiodata = await Biodatacheck.update({
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
        console.log(req.user.role ===  'admin')
        if(req.user.role === 'admin'){
            dataBiodata = await Biodata.findAll({attributes: ['id', 'name', 'birth', 'position']});
            console.log(dataBiodata)
        } else {
            dataBiodata = await Biodata.findAll({
                where: { userId: req.user.id },
                attributes: ['id', 'name', 'birth', 'position']
            })
        }
        res.status(200).json({ dataBiodata });
    } catch (error) {
        next(error)
    }
  }

  static async getBiodataById(req, res, next) {
    try {
        let dataBiodata = await Biodata.findOne({
            where: {
              id: req.params.id
            },
            include: ["Education", "Trainings", "Works"]
        });
        if (!dataBiodata) throw { name: 'not found' };
        res.status(200).json({ dataBiodata });
    } catch (error) {
      console.log(error)
        next(error)
    }
  }
}

module.exports = BiodataController;
