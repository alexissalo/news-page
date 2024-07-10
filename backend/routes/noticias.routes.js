const funciones=require("../controllers/noticias.js")
const express=require("express")
const router = express.Router();

router.get("/noticias", funciones.getNoticias);
router.get("/noticias/:categoria", funciones.getNoticiasPorCategoria);
router.get("/noticia/:id", funciones.getNoticia);
router.get("/noticiasRelacionadas/:id",funciones.getNoticiasRelacionadas)
router.get("/buscador",funciones.buscador)


module.exports=router;