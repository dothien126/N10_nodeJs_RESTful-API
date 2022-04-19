const nodemailer = require('nodemailer');
const { EMAIL_HOST, PASSWORD_HOST } = require('../../configs/index')

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: EMAIL_HOST,
    pass: PASSWORD_HOST
  },
});

module.exports = transporter;