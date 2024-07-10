const {Resend}=require("resend")
const pool= require("../db.js")
const {apiKeyResend}=require("../config.js")

const resend = new Resend(apiKeyResend);

async function enviarMail(req,res){
    const {nombre,mail,asunto,mensaje}=req.body
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['alexissalomon31@gmail.com'],
        subject: `${asunto}`,
        html: `<div>
                <h3>Nombre: ${nombre}</h3>
                <h3>Mail: <a href="mailto:${mail}">${mail}</a></h3>
                <h3>Mensaje: ${mensaje}</h3>
            </div>`,
      });
    
      if (error) {
        return console.error({ error });
      }
    
      console.log({ data });
}

async function subscripcion(req,res){
  const { email}=req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO subscriptores (email) VALUES(?)",
      [email]
    );

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [`${email}`],
      subject: `Subscripcion a Noticias de Chivilcoy`,
      html: `<div>
                <h3>Te subscribiste a Noticias de Chivilcoy!!</h3>
                <h3>Enterate de las ultimas novedades y mantenete informado!!</h3>
            </div>`
    });
  
    if (error) {
      return console.error({ error });
    }
  
    console.log({ data });
  } catch (error) {
    console.error("Error al subscribirse:", error);
    res.status(500).json({ error: "Error al subscribrise" });
  }
}

const anularSubscripcion = async (req, res) => {
  const { email}=req.body;
  try {
    const [result] = await pool.query("DELETE FROM subscriptores WHERE email = ?", [
        email
      ]);
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Subscripcion no encontrada" });

      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [`${email}`],
        subject: `Cancelacion de subscripcion`,
        html: `<div>
                <h3>Has anulado tu subscripcion a Noticias de Chivilcoy!!</h3>
            </div>`,
      });
    
      if (error) {
        return console.error({ error });
      }
    
      console.log({ data });
  
      return res.sendStatus(204);
      
  } catch (error) {
    console.error("Error al anular la subscripcion:", error);
    res.status(500).json({ error: "Error al anular la subscripcion" });
  }
};

module.exports={enviarMail,subscripcion,anularSubscripcion}
