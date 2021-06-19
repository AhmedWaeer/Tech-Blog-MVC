/* eslint-disable prettier/prettier */
const router = require('express').Router();
const { User } = require('../../models');


router.post('/', async(req, res) => {

    try {
        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.userId = newUser.Id;
            req.session.loggedIn = true;
            res.status(200).json(newUser);
        });

    } catch (err) {
        res.status(500).json(err)

    }

})


router.post('/login', async(req, res) => {

    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect Email or Password: please try again!' })
            return;
        }

        const IsValid = await User.checkPassword(req.body.password);
        if (!IsValid) {
            res.status(400).json({ message: 'Incorrect Email or Password: please try again!' })
            return;
        }
        req.session.save(() => {
            req.session.userId = userData.Id;
            req.session.loggedIn = true;
            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(500).json(err)

    }

})

router.post('/logout', async(req, res) => {

    if (req.session.loggedIn) {

        req.session.destroy(() => {

            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }

})



module.exports = router;