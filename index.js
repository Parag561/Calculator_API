const express = require("express");
const app = express();
require('./db/db');
const calculationSchema = require('./db/models/CalculationSchema');

app.use(express.json());

// for adding two numbers
app.post('/add', async (req, res) => {
    try {
        const { num1, num2 } = req.body;
        const result = parseFloat(num1) + parseFloat(num2);
        const newCalculation = new calculationSchema({ operation: '+', num1, num2, result });
        await newCalculation.save();
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send('An error occurred.');
    }
});

// for subtracting two numbers
app.post('/subtract', async (req, res) => {
    try {
        const { num1, num2 } = req.body;
        const result = parseFloat(num1) - parseFloat(num2);
        const newCalculation = new calculationSchema({ operation: '-', num1, num2, result });
        await newCalculation.save();
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send('An error occurred.');
    }
});

//  for multiplying two numbers
app.post('/multiply', async (req, res) => {
    try {
        const { num1, num2 } = req.body;
        const result = parseFloat(num1) * parseFloat(num2);
        const newCalculation = new calculationSchema({ operation: '-', num1, num2, result });
        await newCalculation.save();
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send('An error occurred.');
    }
});

// for dividing two numbers
app.post('/divide', (req, res) => {
    try {
        const { num1, num2 } = req.body;
        const parseNum2 = parseFloat(num2);
        if (parseNum2 === 0) {
            res.status(400).send({ error: 'Division by zero is not allowed.' });
            return;
        }
        const result = parseFloat(num1) / parseNum2;
        const newCalculation = new calculationSchema({ operation: '/', num1, num2, result });
        newCalculation.save();
        res.send({ result });
    } catch (error) {
        res.status(500).send('An error occurred.');
    }
});

//  for exponentiation
app.post('/exponent', (req, res) => {
    try {
        const { num1, num2 } = req.body;
        const base = num1;
        const exponent = num2;
        const result = Math.pow(parseFloat(base), parseFloat(exponent));
        const calculation = new calculationSchema({ operation: '^', num1, num2, result });
        calculation.save();
        res.send({ result });
    } catch (error) {
        res.status(500).send('An error occurred.');
    }
});

// to get all previous calculations
app.get('/previous', async (req, res) => {
    try {
        const calculations = await calculationSchema.find({});
        res.send(calculations);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch previous calculations.' });
    }
});



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});