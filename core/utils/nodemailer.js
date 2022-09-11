import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // 587
  secure: "ssl", // tls
  auth: {
    user: "bakirovartem69@gmail.com",
    pass: "fjdysygltoaeiomn",
  },
});

let mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log("Email sent succesfully");
  });
};

export default mailer;
