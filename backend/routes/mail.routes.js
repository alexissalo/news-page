const funciones=require("../controllers/mail.js")
const express=require("express")
const router = express.Router();

router.post("/enviarMail", funciones.enviarMail);
router.post("/subscripcion", funciones.subscripcion)
router.delete("/subscripcion", funciones.anularSubscripcion)


module.exports=router;