import express from 'express';
import { getRepository } from 'typeorm';
import { Donor } from '../entity/Donor';


const checkAuth = require('../middleware/check-auth')

const router = express.Router();


router.get('/test', (req, res, next) => {
  return res.status(200).json({
    message: 'Donor router working',
  });
});



function tajCodeValidation(tajCode: string): boolean {
  let isnum: boolean = /^\d+$/.test(tajCode);
  if (tajCode == null || tajCode.length != 9 || !isnum) {
    return false;
  }

  var numbers = tajCode.split('').map(function (item) {
    return parseInt(item, 10);
  });

  let cdv =
    (7 * (numbers[0] + numbers[2] + numbers[4] + numbers[6]) +
      3 * (numbers[1] + numbers[3] + numbers[5] + numbers[7])) %
    10;
  console.log(cdv);
  if (cdv != numbers[8]) {
    return false;
  }

  console.log(numbers);
  return true;
}


router.post('',

(req, res, next) => {
  const repository = getRepository(Donor);

  if(!tajCodeValidation(req.body.taj_code)){
    return res.status(400).json({
      message: 'Taj format not valid',
    });
  }
  

  const donorEntity = repository.create({
    name: req.body.name,
    sex: req.body.sex,
    nationality: req.body.nationality,
    birth_place: req.body.birth_place,
    birth_time: req.body.birth_time,
    postcode: req.body.postcode,
    town: req.body.town,
    address: req.body.address,
    taj_code: req.body.taj_code
  });

  repository
    .save(donorEntity)
    .then((result) => {
      res.status(201).json({
        messager: 'Donor created',
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



router.delete('/:id', async (req, res, next) => {
  console.log('Delete has started with this id:' + req.body.id);
  const repository = getRepository(Donor);
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



router.get('', (req, res, next) => {
  const repository = getRepository(Donor);
  repository.find().then((result) => {
    return res.status(200).json({
      message: 'Elementes fetched succesfull',
      elements: result,
    });
  });
});



router.get('/:taj', async (req, res, next) => {

  const repository = getRepository(Donor);
  try{
    const entity = await repository.findOne({taj_code: req.params.taj});
    if (!entity) {
      return res.status(404).json({ message: 'Entity not founded', donorIsExsiting: false });
    }
    res.status(200).json({ message:"Entity founded", donorIsExsiting: true });
  }catch(err){console.log(err)}
  
})


router.get('/getDonor/:taj', async (req, res, next) => {
  
  const repository = getRepository(Donor);
  repository.findOne({taj_code: req.params.taj}).then((result)=>{
    return res.status(200).json({
      message: 'Taj is founded',
      id: result.donor_id,
    });
  })
  
});


module.exports = router;
