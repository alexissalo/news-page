const express = require("express");
const app = express();
const cors=require("cors")
const port = 3000;
const noticiasRoutes=require("./routes/noticias.routes.js")
const comentariosRoutes=require("./routes/comentarios.routes.js")
const mailRoutes=require("./routes/mail.routes.js")

app.use(express.json());
app.use(cors())

app.use(noticiasRoutes)
app.use(comentariosRoutes)
app.use(mailRoutes)

app.listen(port, () => {
  console.log(`Server funcionando en el puesto ${port}`);
});
