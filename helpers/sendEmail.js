import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();
const {META_PASSWORD} = process.env;

// const nodemailerConfog = {
//     host: 'smtp.meta.ua',
//     port: 465,
//     secure: true,
//     auth: {
//         user:'egor.yakovenko@meta.ua',
//         pass: META_PASSWORD
//     }
// };

// const transport = nodemailer.createTransport(nodemailerConfog);

// const email = {
//     to:'sicixa8356@losvtn.com',
//     from: 'egor.yakovenko@meta.ua',
//     subject:'Test mail',
//     html:"<p><strong>Test email</strong> from localhost:3000</p>"
// }

// transport.sendMail(email)
// .then(()=>console.log('Email send success'))
// .catch(error=>console.log(error.message))


const transport = nodemailer.createTransport({
	host: 'smtp.meta.ua',
	port: 465,
	auth: {
        user:'egor.yakovenko@meta.ua',
        pass: META_PASSWORD
	},
});

function sendEmail(message) {
	return transport.sendMail(message);
}

export default sendEmail;