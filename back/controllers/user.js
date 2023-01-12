const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const cryptojs = require('crypto-js');

const user = require('../models/user');
require('dotenv').config();

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new user({
                email: req.body.email,
                //email: cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_KEY).toString(), 
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    const cryptedResearchedEmail = cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_KEY).toString();
    User.findOne( { email: cryptedResearchedEmail })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé!' })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect!' })
                    }
                    const newToken = jsonwebtoken.sign(
                        { userId: user._id },
                        process.env.TOKEN_KEY,
                        { expiresIn: '24h' }
                    );
                    req.session.token = newToken; 
                    res.status(200).json({
                        userId: user._id,
                        token: newToken 
                    })
                })
        })
        .catch(error => res.status(500).json({ error }));
};