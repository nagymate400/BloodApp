import express from 'express';

import { getRepository } from 'typeorm';
import { Doctor } from '../entity/Doctor';

const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');


router.get('/test', (req, res, next) => {
  return res.status(200).json({
    message: 'Doctor router working',
  });
});


router.post('/signup', (req, res, next) => {
  const repository = getRepository(Doctor);

  bcrypt.hash(req.body.password, 10).then((hash: any) => {
    const doctorEntity = repository.create({
      email: req.body.email,
      name: req.body.name,
      password: hash,
    });
    repository
      .save(doctorEntity)
      .then((result) => {
        res.status(201).json({
          messager: 'Doctor created',
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          message: 'Something wrong with the doctror create',
        });
      });
  });
});


router.post("/login", (req, res, next) => {
  const repository = getRepository(Doctor);
  let fecthedUser:any;
  repository.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fecthedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fecthedUser.email, userId: fecthedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      })
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
});


router.get('', (req, res, next) => {
  const repository = getRepository(Doctor);
  repository.find().then((result) => {
    return res.status(200).json({
      message: 'Elementes fetched succesfull',
      elements: result,
    });
  });
});

router.delete('/:id', async (req, res, next) => {
  console.log('Delete has started with this id:' + req.body.id);
  const repository = getRepository(Doctor);

  try {
    const id = req.params.id;
    const entity = await repository.findOne(id);

    if (!entity) {
      return res.status(404).json({ message: 'Entity not founded' });
    }

    await repository.delete(entity);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
