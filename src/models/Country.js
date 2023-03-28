
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize y los datatypes para que todo lo referente a sequelize quede en bd.js
module.exports = (Sequelize, DataTypes) => {
  // defino el modelo
  const Country = Sequelize.define(
    'Country',
    {
      id: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        validate: {
          len: [3]
        }
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen_bandera: {
        type: DataTypes.STRING,
        allowNull: false
      },
      continente: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.STRING,
      },
      poblacion: {
        type: DataTypes.INTEGER,
      }
    },
    {
      tableName: 'Country',
      timestamps: false
    }
  );

  Country.associate = (models) => {
    Country.belongsToMany(
      models.Activity,
      {
        through: 'CountriesActivities',
        timestamps: false
      }
    );
  }
};
