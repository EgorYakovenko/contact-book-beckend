import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();
const {META_PASSWORD, BASE_FROMEMAIL} = process.env;


const transport = nodemailer.createTransport({
	host: 'smtp.meta.ua',
	port: 465,
	auth: {
        user: BASE_FROMEMAIL,
        pass: META_PASSWORD
	},
});

function sendEmail(message) {
	return transport.sendMail(message);
}

export default sendEmail;