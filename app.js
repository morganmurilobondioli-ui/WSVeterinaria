require('dotenv').config();

const express = require('express'); //Framework
const pool = require('./db'); //Acceso BD

//Framework
const app = express();

//Configuración comunicación JSON
app.use(express.json());

//Configuración puerto
const port = process.env.PORT || 3000;

//Middleware gestionar los errores
const handDbError = (res, error) => {
  console.error('Error en la base de datos: ', error);
  res.status(500).json({error: 'Error interno en el servicio'})
};

//Verbos:
//ENDPOINT

//GET - CONSULTA TODOS LOS DATOS
app.get('/mascotas', async (req, res) => {
  try{
    const [rows] = await pool.query('SELECT * FROM mascotas ORDER BY id DESC');
    res.status(200).json(rows);
  }catch(error){
    handDbError(res, error);
  }
});

//*** PENDIENTE *** //
//GET - BUSCADOR POR ID
app.get('/mascotas/:id', async (req, res) => {
  const {id} = req.params
  try{
    const [rows] = await pool.query('SELECT * FROM mascotas WHERE id = ?', [id])
    if(rows.length === 0){
      return res.status(404).json({message: 'mascota no encontrado'})
    }
    return res.status(200).json(rows[0])
  }catch(error){
    handDbError(res, error)
  }
});

//POST (registrar)
app.post('/mascotas', async (req, res) => {   
  const {nombre, tipo, raza, color, peso, genero} = req.body;

  if (!nombre || !tipo || !raza || !color || !peso || !genero){
    return res.status(400).json({error: "Todos los campos son obligatorios"});
  }

  //Insertar nuevo registro
  try{
    const [result] = await pool.query("INSERT INTO mascotas (nombre, tipo, raza, color, peso, genero) VALUES (?,?,?,?,?,?)", [nombre, tipo, raza, color, peso, genero]);
    const nuevoRegistro = { id: result.insertId };
    res.status(201).json(nuevoRegistro);
  }catch(error){
    //Error por UNIQUE (duplicado)
    if (error.code === "ER_DUP_ENTRY"){
      return res.status(409).json({error: "La mascota ya existe"});
    }
    handDbError(res, error);
  }
});

//PUT
app.put('/mascotas/:id', async (req, res) => {
  //ID (PK) viene como parte del ENDPOINT
  const { id } = req.params;
  
  //Campos viene en JSON
  const { nombre, tipo, raza, color, peso, genero } = req.body;

  if (!nombre || !tipo || !raza || !color || !peso || !genero){
    return res.status(400).json({error: "Todos los campos son obligatorios"});
  }

  try{
    const [result] = await pool.query(
      "UPDATE vehiculos SET nombre = ?, tipo = ?, raza = ?, color = ?, peso = ?, genero = ? WHERE id = ?", 
      [ nombre, tipo, raza, color, peso, genero, id]);
    
    //No hubo cambios en la BD 
    if (result.affectedRows === 0){
      return res.status(404).json({message: "Mascota no encontrado"});
    }

    //Si llegamos hasta aquí, se logró realizar un cambio
    return res.status(200).json({message:"Mascota actualizado correctamente"});

  }catch(error){
    if (error.code === "ER_DUP_ENTRY"){
      return res.status(409).json({error: "La Mascota ya existe"});
    }
    handDbError(res, error);
  }

});

//DELETE (eliminación física)
app.delete('/mascotas/:id', async (req, res) => {
  const { id } = req.params;

  try{
    const [result] = await pool.query("DELETE FROM vehiculos WHERE id = ?", [id]);

    if (result.affectedRows === 0){
      return res.status(404).json({message: "Mascota no encontrado para eliminar"});
    }

    return res.status(200).json({message: "Mascota eliminado correctamente"})
  }catch(error){
    handDbError(res, error);
  }

});

//Ejecutar
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
