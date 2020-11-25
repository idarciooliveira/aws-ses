const route = require('express').Router();
const awsSns = require('./aws-sns');

route.post('/sendEmail', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send({ message: 'Not Email Provider' });

  const result = await awsSns.sendEmail(email);

  res.json(result);
});

route.post('/verifyEmail', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send({ message: 'Not Email Provider' });

  const result = await awsSns.verifyEmail(email);

  res.send(result);
});

route.get('/', (req, res) => {
  res.json({ message: 'Hello Baby its AWS SES ' });
});

module.exports = route;
