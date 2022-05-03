import express from 'express';
import { getRepository } from 'typeorm';
import { Donation } from '../entity/Donation';

const router = express.Router();


router.get('/test', (req, res, next) => {
  return res.status(200).json({
    message: 'Donation router working',
  });
});



router.post('', (req, res, next) => {
  const repository = getRepository(Donation);
  const donorEntity = repository.create({
    donation_date: req.body.donation_date,
    success_donation: req.body.success_donation,
    about: req.body.about,
    directed_donation: req.body.directed_donation,
    directed_name: req.body.directed_name,
    directed_taj_code: req.body.directed_taj_code,
    donor_id_fk: req.body.donor_id_fk,
    doctor_id_fk: req.body.doctor_id_fk,
    donationPlace_id_fk: req.body.donationPlace_id_fk
  });

  repository
    .save(donorEntity)
    .then((result) => {
      res.status(201).json({
        message: 'Donor created',
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: 'Something wrong with the donor create',
      });
    });
});




router.get('', (req, res, next) => {
  const repository = getRepository(Donation);
  repository.find().then((result) => {
    return res.status(200).json({
      message: 'Elementes fetched succesfull',
      elements: result,
    });
  });
});



router.delete('/:id', async (req, res, next) => {
  console.log('Delete has started with this id:' + req.body.id);
  const repository = getRepository(Donation);
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
