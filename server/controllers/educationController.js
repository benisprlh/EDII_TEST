const {Education} = require("../models");

class EducationController {
    static async create(req, res, next) {
        const {level, name, major, graduateDate, ipk} = req.body;
        try {
          const newEducation = await Education.create({level, name, major, graduateDate, ipk, biodataId: req.params.id});
          res.status(201).json(newEducation);
        } catch (error) {
          next(error);
        }
      }
    
      static async update(req, res, next) {
        const {level, name, major, graduateDate, ipk} = req.body;
        try {
          const EducationCheck = await Education.findByPk(req.params.id);
          if(!EducationCheck) {
            throw {name: "not found"}
          }
          const newEducation = await EducationCheck.update({level, name, major, graduateDate, ipk});
          res.status(200).json(newEducation);
        } catch (error) {
          next(error);
        }
      }
    
      static async delete(req, res, next) {
        try {
          const education = await Education.findByPk(req.params.id);
          if (!education) throw { name: 'not found' };
          await education.destroy();
          res.status(200).json({ message: `${education.name} success to delete` });
        } catch (error) {
          next(error);
        }
      }

      static async getEducation(req, res, next) {
        try {
            let dataEducation = await Education.findByPk(req.params.id);
            if (!dataEducation) throw { name: 'not found' };
            res.status(200).json({ dataEducation });
        } catch (error) {
            next(error)
        }
      }
}

module.exports = EducationController