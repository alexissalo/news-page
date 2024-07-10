const pool= require("../db.js")

const getNoticias = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM noticias");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener las noticias:", error);
    res.status(500).json({ error: "Error al obtener las noticias" });
  }
};

const getNoticia = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM noticias WHERE id=?",
        [req.params.id]
    );
    res.json(result);
  } catch (error) {
    console.error("Error al obtener la noticia:", error);
    res.status(500).json({ error: "Error al obtener la noticia" });
  }
};

const getNoticiasPorCategoria = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM noticias WHERE categoria=?",
      [req.params.categoria]
    );
    res.json(result);
  } catch (error) {
    console.error("Error al obtener las noticias:", error);
    res.status(500).json({ error: "Error al obtener las noticias" });
  }
};

const buscador= async (req,res)=>{
  const termino = req.query.q;
  try {
    const [result] = await pool.query(
      "SELECT * FROM noticias WHERE titulo LIKE ?",
      [`%${termino}%`]
    );
    res.json(result);
  } catch (error) {
    console.error("Error al obtener la noticias:", error);
    res.status(500).json({ error: "Error al obtener la noticias" });
  }
}

const getNoticiasRelacionadas = async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM noticias WHERE categoria = (SELECT categoria FROM noticias WHERE id = ?) AND id != ?;`,[req.params.id,req.params.id]);
    res.json(result);
  } catch (error) {
    console.error("Error al obtener las noticias:", error);
    res.status(500).json({ error: "Error al obtener las noticias" });
  }
};


module.exports = { getNoticia, getNoticias, getNoticiasPorCategoria, buscador, getNoticiasRelacionadas};
