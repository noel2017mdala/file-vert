const nodemailer = require("nodemailer");
const path = require("path");
// const hbs = require("nodemailer-express-handlebars");
const ejs = require("ejs");

const sendMail = async (sender, subject, message, userName) => {
  const templatePath = path.join(__dirname, "../templates/welcomeEmail.ejs");

  try {
    const data = await ejs.renderFile(templatePath, {
      userName,
    });
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ab9c431d93832c",
        pass: "7644deb96484de",
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER_CLIENT,
      to: sender,
      subject,
      html: data,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("failed to sent email");
      } else {
        console.log("The email was sent");
      }
    });
  } catch (error) {
    console.log("failed to sent email");
  }
};

module.exports = sendMail;
