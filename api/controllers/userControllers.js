const { user, securityQuestion } = require('../models');
const { encryptToken } = require('../middlewares');
const { encryptHandler, emailHandler } = require('../handlers');

// Per-Joinan
user.belongsTo(securityQuestion, {
  foreignKey: "security_question_id"
})

// Controllers
const register = async (req, res, next) => {
  try {
    const {
      username,
      password,
      email,
      full_name,
      security_answer,
      security_question_id,
    } = req.body;
    const addUser = await user.create({
      username,
      password: encryptHandler(password),
      email,
      full_name,
      security_answer,
      security_question_id,
    });
    const getUser = await user.findAll({
      where: {
        id: addUser.id,
      },
      attributes: { exclude: 'password' },
    });
    const response = {
      ...getUser[0].dataValues,
      token: encryptToken(getUser[0].dataValues),
    };
    const mailOption = {
      from: 'Admin <nature.goods.official@no-reply.com>',
      to: email,
      subject: 'Email Verification',
      template: 'VerifyEmail',
      context: {
        username,
        email,
        token: response.token,
      },
    };
    await emailHandler(mailOption);
    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

const getSecurityQuestion = async (req, res, next) => {
  try {
    const getQuestion = await securityQuestion.findAll();
    const response = [];
    getQuestion.forEach((value) => {
      response.push({ value: value.id, label: value.question });
    });
    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

const registeredChecker = async (req, res, next) => {
  const { email } = req.body

  try {
    const getData = await user.findOne({
      where: {
        email: email,
        email_verification_id: 1
      },
      include: {
        model: securityQuestion
      },
      raw: true
    })

    if(!getData){
      res.status(404).send({
        message: "Mohon maaf, email anda tidak tersedia atau belum terverifikasi"
      })
    }

    return res.status(200).send(getData)
  }catch(err) {
    next(err)
  }
}

const securityQuestionChecker = async (req, res, next) => {
  const {email, answer} = req.body

  try {
    const getData = await user.findOne({
      where: {
        email: email,
        email_verification_id: 1,
        security_answer: answer
      },
    })

    if(!getData){
      res.status(404).send({
        message: "Mohon maaf, jawaban anda salah"
      })
    }

    return res.status(200).send(true)
  }catch(err) {
    next(err)
  }
}

const changePasswordEmailRequest = async (req, res, next) => {
  const {email} = req.body
  try {
    const getData = await user.findOne({
      where: {
        email,
        email_verification_id: 1,
      },
      attributes: [
        "email"
      ]
    })
    
    const token = encryptToken({
      ...getData.toJSON()
    })

    const mailOptions = {
      from: "Admin <luthfilarlar@gmail.com>",
      to: email,
      subject: "Permintaan Ubah Password",
      html: `
        <div>
          <p>Nature Goods</p>
          <p>Permohonan Pengubahan Password</p>
          <a href="http://localhost:3000/redirect?email=${email}&token=${token}">Klik disini untuk mengganti password</a>
          <p>Tidak merasa mengirim permohonan? Abaikan saja!</p>
        </div>`
    }

    await emailHandler(mailOptions)

    return res.status(200).send({
      message: "Sent",
      token: token
    })
  }catch(err) {
    next(err)
  }
}

const changePassword = async (req, res, next) => {
  const {newPassword, id} = req.body

  try {
    if(req.user){
      await user.update(
        {
          password: encryptHandler(newPassword)
        },
        {
        where: {
          email: req.user.email
        }
      })
    }else {
      await user.update(
        {
          password: encryptHandler(newPassword)
        },
        {
        where: {
          id
        }
      })
    }



    return res.status(200).send({
      message: "Edited",
    })
  }catch(err) {
    next(err)
  }
}

module.exports = { register, getSecurityQuestion, registeredChecker, securityQuestionChecker, changePasswordEmailRequest, changePassword };
