const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async(mail, name) => {

    const msg = {
        to: mail,
        from: 'enrissmuelo@gmail.com',
        subject: 'Successful Registration',
        html: `<h1> ${name.toUpperCase()}, Welcome to MoviesWIKI :D !!</h1> <p> these are your credentials : </p> <ul><li> mail: ${mail}</li> <li> name: ${name}</li></ul>`
    }


    await sgMail.send(msg);

}
module.exports = { sendMail }
