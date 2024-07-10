const pool= require("../db.js")

const getComentarios = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT id, nombre, comentario, idNoticia, DATE_FORMAT(fecha, '%d/%m/%Y') AS fecha_formateada FROM comentarios WHERE idNoticia=? ORDER BY id DESC",[
      req.params.id
    ]);
    res.json(result);
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
};

const postComentarios = async (req, res) => {
  const { nombre, comentario, idNoticia }=req.body;
  const fecha= new Date()
  try {
    const [result] = await pool.query(
      "INSERT INTO comentarios (nombre,comentario,idNoticia,fecha) VALUES(?,?,?,?)",
      [nombre, comentario, idNoticia,fecha], 
    );
  } catch (error) {
    console.error("Error al subir el comentario:", error);
    res.status(500).json({ error: "Error al subir el comentario" });
  }
};


module.exports = {getComentarios, postComentarios};
