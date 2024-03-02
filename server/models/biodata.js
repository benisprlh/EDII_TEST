'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Biodata.belongsTo(models.User, {foreignKey: 'userId'});
      Biodata.hasMany(models.Education, {foreignKey: 'biodataId'});
      Biodata.hasMany(models.Training, {foreignKey: 'biodataId'});
      Biodata.hasMany(models.Work, {foreignKey: 'biodataId'})
    }
  }
  Biodata.init({
    position: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Posisi tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Posisi tidak boleh kosong',
        },
      }
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Nama tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Nama tidak boleh kosong',
        },
      }
    },
    idCardNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'No Ktp tidak boleh kosong',
        },
        notEmpty: {
          msg: 'No Ktp tidak boleh kosong',
        },
      }
    },
    birth: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Tempat tanggal lahir tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Tempat tanggal lahir tidak boleh kosong',
        },
      }
    },
    gender: {
      type : DataTypes.ENUM("L", "P"),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Jenis Kelamin tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Jenis Kelamin tidak boleh kosong',
        },
      }
    },
    religion: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Agama tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Agama tidak boleh kosong',
        },
      }
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Status tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Status tidak boleh kosong',
        },
      }
    },
    addressCard: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Alamat KTP tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Alamat KTP tidak boleh kosong',
        },
      }
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Alamat tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Alamat tidak boleh kosong',
        },
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Email tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Email tidak boleh kosong',
        },
      }
    },
    noHP: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'No HP Tidak boleh kosong',
        },
        notEmpty: {
          msg: 'No HP Tidak boleh kosong',
        },
      }
    },
    guardian: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Orang yang bisa dihubungi Tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Orang yang bisa dihubungi Tidak boleh kosong',
        },
      }
    },
    skill: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Skill tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Skill tidak boleh kosong',
        },
      }
    },
    relocate: {
      type: DataTypes.ENUM("Y", "T"),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'field ini wajib diisi',
        },
        notEmpty: {
          msg: 'field ini wajib diisi',
        },
      }
    },
    salary: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Penghasilan yang diharapkan tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Penghasilan yang diharapkan tidak boleh kosong',
        },
      }
    },
    userId: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Penghasilan yang diharapkan tidak boleh kosong',
        },
        notEmpty: {
          msg: 'Penghasilan yang diharapkan tidak boleh kosong',
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Biodata',
  });
  return Biodata;
};