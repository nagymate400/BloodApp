import express from 'express';
import { getRepository } from 'typeorm';
import { DonationPlace } from '../entity/DonationPlace';

const router = express.Router();


router.get('/test', (req, res, next) => {
  return res.status(200).json({
    message: 'Donation place router working',
  });
});


router.post('', (req, res, next) => {
  const repository = getRepository(DonationPlace);
  const donationPlaceEntity = repository.create({
    name: req.body.name,
    postcode: req.body.postcode,
    town: req.body.town,
    address: req.body.address,
    active: req.body.active,
  });
  repository
    .save(donationPlaceEntity)
    .then((result) => {
      res.status(201).json({
        messager: 'Donation place created',
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: 'Something wrong with the donation place create',
      });
    });
});


router.delete('/:id', async (req, res, next) => {
  console.log('Delete has started with this id:' + req.body.id);
  const repository = getRepository(DonationPlace);
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


router.patch('', (req, res, next) => {
  const repository = getRepository(DonationPlace);
  const donationPlaceEntity = repository.create({
    place_id: req.body.place_id,
    name: req.body.name,
    postcode: req.body.postcode,
    town: req.body.town,
    address: req.body.address,
    active: req.body.active,
  });
  repository
    .save(donationPlaceEntity)
    .then((result) => {
      res.status(201).json({
        messager: 'Donation place updated',
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: 'Something wrong with the donation place create',
      });
    });
});




router.get('', (req, res, next) => {
  const repository = getRepository(DonationPlace);
  repository.find().then((result) => {
    return res.status(200).json({
      message: 'Elementes fetched succesfull',
      elements: result,
    });
  });
});


module.exports = router;
