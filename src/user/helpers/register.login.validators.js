const { User } = require('../models/User')

const isValiteMail = (async(mail = '') => {
    const mailExist = await User.findOne({ where: { mail: mail } });
    if (mailExist) {
        throw new Error(`This mail ${mail} already exists`);
    }
});

module.exports = { isValiteMail };