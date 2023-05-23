const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const message = {
        to: email,
        from: "sanjeevkushwahasatna@gmail.com",
        subject: "Forget password link",
        html: `Here is the link to reset password it will expire in 15 min ${link}`,
    };

    const response = await transporter.sendMail(message);
    return response;
};

async function getJwtToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
}

module.exports = { sendEmail, getJwtToken }