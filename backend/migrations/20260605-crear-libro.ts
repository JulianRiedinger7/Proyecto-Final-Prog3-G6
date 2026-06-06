import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
  await queryInterface.createTable('libros', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: Sequelize.STRING, allowNull: false },
    autor: { type: Sequelize.STRING, allowNull: false },
    anio: { type: Sequelize.INTEGER, allowNull: false },
    portada: { type: Sequelize.STRING, allowNull: true },
    estado: { type: Sequelize.ENUM('por leer', 'leyendo', 'leido'), defaultValue: 'por leer' },
    puntaje: { type: Sequelize.DECIMAL(3,1), allowNull: true },
    resenia: { type: Sequelize.TEXT, allowNull: true },
    generoId: { type: Sequelize.INTEGER, allowNull: true },
    usuarioId: {type: Sequelize.INTEGER, allowNull: true},
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('libros');
}
