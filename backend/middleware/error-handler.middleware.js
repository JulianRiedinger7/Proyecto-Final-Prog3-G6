const errorHandler = (err, req, res, next) => {
  console.error(`[SERVER ERROR] ${err.message}`);

  //Error de Sequelize
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Error de validacion en la base de datos",
      detalles: err.errors.map((e) => e.message),
    });
  }

  //Cualquier otro error
  return res.status(500).json({
    error: "Error interno del servidor",
  });
};

module.exports = errorHandler;
