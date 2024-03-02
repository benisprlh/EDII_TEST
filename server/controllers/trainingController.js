const {Training} = require("../models");

class TrainingController {
    static async create(req, res, next) {
        const {name, certificate, period} = req.body;
        try {
          const newTraining = await Training.create({name, certificate, period, biodataId: req.params.id});
          res.status(201).json(newTraining);
        } catch (error) {
          next(error);
        }
      }
    
      static async update(req, res, next) {
        const {name, certificate, period} = req.body;
        try {
          const trainingCheck = await Training.findByPk(req.params.id);
          if(!trainingCheck) {
            throw {name: "not found"}
          }
          const newTraining = await trainingCheck.update({name, certificate, period});
          res.status(200).json(newTraining);
        } catch (error) {
          next(error);
        }
      }
    
      static async delete(req, res, next) {
        try {
          const training = await Training.findByPk(req.params.id);
          if (!training) throw { name: 'not found' };
          await training.destroy();
          res.status(200).json({ message: `${training.name} success to delete` });
        } catch (error) {
          next(error);
        }
      }

      static async getTraining(req, res, next) {
        try {
            let dataTraining = await Training.findByPk(req.params.id);
            if (!dataTraining) throw { name: 'not found' };
            res.status(200).json({ dataTraining });
        } catch (error) {
            next(error)
        }
      }
}

module.exports = TrainingController