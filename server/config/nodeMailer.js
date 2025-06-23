import nodemailer from 'nodemailer'

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});


const sendEmail = async({to, subject, body}) => {
    const response = await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        html: body,
    })

    return response
}

export default sendEmail