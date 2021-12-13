const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
      user: process.env.USER_LOGIN,
      pass: process.env.USER_PASSWORD,
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

module.exports = {
sendMail: (req, res) => {
  const { subject, text, email } = req.body;
  const mailData = {
      from: process.env.USER_LOGIN,
      to: email,
      subject: 'Account-Confirmaton (Do-Not-Reply)',
      text: text,
      attachments: [
        {
          filename: 'helpmeout_logo.png',
          path: __dirname + '/static/helpmeout_logo.png'
        }
      ],
      html: `<b>Howdy!</b>This is an email confirming your account with HelpMeOut! Excited to have you on the platform.<br/> Is grandma needing someone to clean out her gutters, or perhaps someone to inspect dem pipes? Or perhaps you need someone to do some type of remodel? No matter the job, I look forward to providing the bridge to a network of contractors who can get the job done! <br/>Founder and CEO,<br/>Mr. Wayne Jones<br/><br/><br/><br/>`
  };

  transporter.sendMail(mailData, (error, info) => {
      if (error) {
          return console.log(error);
      }
      res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
}}