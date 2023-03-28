
module.exports = (Sequelize, DataTypes) => {
   const Activity = Sequelize.define(
      'Activity',
      {
         nombre: {
            type: DataTypes.STRING,
            allowNull: false
         },
         descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         dificultad: {
            type: DataTypes.INTEGER,
            validate: {
               min: 1,
               max: 5
            }
         },
         duracion: {
            type: DataTypes.FLOAT,
            validate: {
               min: 1,
               max: 48
            }
         },
         temporada: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
         }
      },
      {
         tableName: 'Activity',
         timestamps: false
      }
   );

   Activity.associate = (models) => {
      Activity.belongsToMany(
         models.Country,
         {
            through: 'CountriesActivities',
            timestamps: false
         }
      );
   }
}