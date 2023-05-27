import express from "express";
import AirQuality from "../models/AirQuality.js";
const router = express.Router();
import bodyParser from 'body-parser';

router.use(bodyParser.json());


router.post('/airquality', async (req, res) => {
    try {
      const airQualityData = req.body;
  
      for (const data of airQualityData) {
        const newAirQuality = new AirQuality(data);
        await newAirQuality.save();
      }
  
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



router.get('/airquality', async (req, res) => {
  try {
    const sensorData = await AirQuality.find();
    res.json(sensorData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données des capteurs.' });
  }
});


export default router;
