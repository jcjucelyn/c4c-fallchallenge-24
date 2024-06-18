import express from 'express';
// import cors from 'cors';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 4000;
// const cors = require('cors');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/* 
  APPLICATION MIDDLEWARE
  This section contains some server configuration.
  You will likely not need to change anything here to meet the requirements.
  (but you are welcome to, if you'd like)
*/

// Parse request bodies as JSON
app.use(express.json())

// Enable CORS for the frontend so it can call the backend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
})

/*
  APPLICATION ROUTES
*/

app.get('/', (req, res) => {
  res.status(200).send(partners);
})

// POST for form data (update JSON file)
app.post('/api/save-data', async (req, res) => {
  try  {
    const { name, description, thumbnailUrl, active } = req.body

    // data from the form
    const formData = { name, description, thumbnailUrl, active };

    // read json file & append new data
    const filePath = path.join(__dirname, 'partnerdata.json');
    const partnerData = await fs.readFile(filePath, 'utf-8');
    const currentData = JSON.parse(partnerData)

    currentData.push(formData)

    // save combined data as json
    await fs.writeFile(filePath, JSON.stringify(currentData, null, 2));

    console.log('Data saved successfully.')
    res.status(200).send('Data saved successfully!')
  } catch (error) {
    console.error('Data saving failed. Error: ', error)
  }
})


// GET partner data for use in tiles
app.get('/api/partners', async (req, res) => {
  console.log('Request received for /api/partners');
  try {
    const filePath = path.join(__dirname, 'partnerdata.json');
    console.log('File path: ', filePath)

    const partnerData = await fs.readFile(filePath, 'utf-8');
    const partners = JSON.parse(partnerData)

    console.log('partner data: ', partners)

    res.setHeader('Content-Type', 'application/json',
      'Accept', 'application/json'
    );
    
    res.json(partners);

  } catch (error) {
    console.error('Issue reading JSON file: ', error)
  }
});

// DELETE partner data 
app.delete('/api/partners/:name', async (req, res) => {
  try{
    const { name } = req.params;
    const filePath = path.join(__dirname, 'partnerdata.json');

    // current data
    const partnerData = await fs.readFile(filePath, 'utf-8');
    const partners = JSON.parse(partnerData);

    const newData = partners.filter(partner => partner.name !== name);

    // update JSON
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2));

    console.log('Data deleted successfully');
    res.status(200).json({message: 'Partner deleted successfully'});

  } catch (error) {
  console.error('Error deleting partner: ', error);
}

});

// Start the backend
app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
})