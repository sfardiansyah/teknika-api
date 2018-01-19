import nodemailer from "nodemailer";

const from = '"Teknika FTUI" <info@teknikaftui.net>';

function setup() {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

export function sendConfirmationEmail(user) {
    const transport = setup();
    const email = {
        from,
        to: user.email,
        subject: "Selamat Bergabung di Teknika FTUI",
        text: `
        Selamat Bergabung di Teknika FTUI. Mohon konfirmasi email anda.

        ${user.generateConfirmationUrl()}
        `
    };

    transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
    const transport = setup();
    const email = {
        from,
        to: user.email,
        subject: "Reset Your Password",
        text: `
        To reset password, follow this link:

        ${user.generateResetPasswordUrl()}
        `
    };

    transport.sendMail(email);
}
