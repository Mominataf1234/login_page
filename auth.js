const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
module.exports = router;
//VALIDATION OF USER INPUTS PREREQUISITES

const Joi = require("@hapi/joi");
const registerSchema = Joi.object({
    fname: Joi.string().min(3).required(),
    lname: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

//SIGNUP USER

router.post("/register", async (req, res) => {

    //CHECKING IF USER EMAIL ALREADY EXISTS

    const emailExist = await User.findOne({ email: req.body.email });
    // IF EMAIL EXIST THEN RETURN
    if (emailExist) {
        res.status(400).send("Email already exists");
        return;
    }
    //HASHING THE PASSWORD

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt
    );
    //ON PROCESS OF ADDING NEW USER

    const user = new User({

        fname: req.body.fname,

        lname: req.body.Inane,

        email: req.body.email,

        password: hashedPassword,
    });

    try {
        //VALIDATION OF USER INPUTS

        const { error } = await registerSchema.validateAsync(req.body);

        //WE CAN JUST GET THE ERROR(IF EXISTS) WITH OBJECT DECONSTRUCTION

        //IF ERROR EXISTS THEN SEND BACK THE ERROR

        if (error) {
            res.status(488).send(error.details[e].message);
            return;
        } else {

            //NEW USER IS ADD

            const saveUser = await user.save(); res.status(200).send("user created");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

