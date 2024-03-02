const {Work} = require("../models");

class WorkController {
    static async create(req, res, next) {
        const {name, lastPosition, lastSalary, period} = req.body;
        try {
          const newWork = await Work.create({name, lastPosition, lastSalary, period, biodataId: req.params.id});
          res.status(201).json(newWork);
        } catch (error) {
          next(error);
        }
      }
    
      static async update(req, res, next) {
        const {name, lastPosition, lastSalary, period} = req.body;
        try {
          const WorkCheck = await Work.findByPk(req.params.id);
          if(!WorkCheck) {
            throw {name: "not found"}
          }
          const newWork = await WorkCheck.update({name, lastPosition, lastSalary, period});
          res.status(200).json(newWork);
        } catch (error) {
          next(error);
        }
      }
    
      static async delete(req, res, next) {
        try {
          const work = await Work.findByPk(req.params.id);
          if (!work) throw { name: 'not found' };
          await work.destroy();
          res.status(200).json({ message: `${work.name} success to delete` });
        } catch (error) {
          next(error);
        }
      }

      static async getWork(req, res, next) {
        try {
            let dataWork = await Work.findByPk(req.params.id);
            if (!dataWork) throw { name: 'not found' };
            res.status(200).json({ dataWork });
        } catch (error) {
            next(error)
        }
      }
}

module.exports = WorkController