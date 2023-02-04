import nodemailer from 'nodemailer';

/*  */
/*
{
  host: 'mail.rakhaa.om',
  port: 465,
  secureConnection: false, 
  auth: {
      user:process.env.G_email2,
      pass: process.env.G_pass2,
  },
}

 {
  host: 'smtp-mail.outlook.com',
  port: 587,
  secureConnection: false, 
  auth: {
      user:process.env.G_email2,
      pass: process.env.G_pass2,
  },
  tls: {
      ciphers:'SSLv3'
  }
}

  {
        host: 'mail.rakhaa.om',
        port: 465,
        secureConnection: false,
        auth: {
            user: process.env.G_email2,
            pass: process.env.G_pass2,
        },
        tls: {
            rejectUnauthorized: false,
        }
    }
 */
const transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 465,
        secureConnection: false,
        auth: {
            user: process.env.G_email2,
            pass: process.env.G_pass2,
        },
        tls: {
            rejectUnauthorized: false,
        }
    }
);

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});
async function contact(mailObj) {
    try {
        const response = await transporter.sendMail({
            from: 'Rakhaa Platform <noreply@rakhaa.om>', // sender address
            to: mailObj.to, // list of receivers
            subject: mailObj.subject, // Subject line
            html: mailObj.HTML, // html body
        });
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}
export default contact;
