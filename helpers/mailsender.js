var nodemailer = require('nodemailer');

let sendMailer = (optionData, resolve, reject) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'revanth.g@inxsasia.com',
            pass: ''
        }
    });

    var mailOptions = {
        from: 'revanth.g@inxsasia.com',
        to: optionData.email,
        subject: 'Banking',
        text: optionData.value
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('error ' + error);
            reject(error);
        } else {
            console.log('Email sent: ' + info.response);
            resolve(info.response);
        }
    });
};

export default sendMailer;