const funciones= require("../controllers/comentarios.js")
const express=require("express")
const router = express.Router();

router.get("/comentarios/:id", funciones.getComentarios);
router.post("/comentarios", funciones.postComentarios);


module.exports=router;