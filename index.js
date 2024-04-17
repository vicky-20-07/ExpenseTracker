const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Expense, User } = require('./schema');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', function (req, res) {
    res.send("HELLO");
})

async function connectToDb() {
    try {
        await mongoose.connect("mongodb+srv://717821f260:MERNTraining@merntraining.7caomhi.mongodb.net/expenseTracker?retryWrites=true&w=majority&appName=MERNTraining");
        const port = process.env.PORT || 5500;
        app.listen(port, () => {
            console.log(`Listening on port ${port}....`);
        });
    }
    catch (e) {
        console.log(e);
        console.log('Couldn\'t establish the connection...');
    }
}


connectToDb();

app.post('/addExpense', async (req, res) => {
    try {
        await Expense.create({
            "amount": req.body.amount,
            "category": req.body.category,
            "date": req.body.date
        });
        res.status(201).json({
            "status": "success",
            "message": "entry successfully added"
        })
    }
    catch (e) {
        res.status(500).json({
            "status": "failiure",
            "message": "not created",
            "error": e
        })
    }
});

app.get('/getExpense', async (req, res) => {
    try {
        const expenseDetails = await Expense.find();
        res.status(200).json(expenseDetails);
    }
    catch (e) {
        res.status(500).json({
            "Status": "failure",
            "message": "Couldn\'t fetch data... "
        });
    }
});

app.post('/addUser', async (req, res) => {
    try {
        await User.create({
            "email": req.body.email,
            "name": req.body.name,
            "password": req.body.password
        });
        res.json({
            "status": "success",
            "message": "user created successfully"
        })
    }
    catch (e) {
        res.json({
            "status": "Unsuccessful",
            "message": "Unable to create user",
            "error": e
        })
    }
});

app.get('/getUser', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (e) {
        res.json({
            "status": "failed",
            "message": "cannot retrieve the users"
        });
    }
});

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            "status": "success",
            "message": "user deleted successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            "status": "unsuccessful",
            "message": "user cannot be deleted",
            "error": e
        });
    }
});

app.patch('/updateUser/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            "email": req.body.email,
            "name": req.body.name,
            "password": req.body.password
        });
        res.status(200).json({
            "status": "success",
            "message": "user updated successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            "status": "unsuccessful",
            "message": "user cannot be updated",
            "error": e
        });
    }
});

app.delete('/deleteExpense/:id', async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({
            "status": "success",
            "message": "expense deleted successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            "status": "unsuccessful",
            "message": "expense cannot be deleted",
            "error": e
        });
    }
});

app.patch('/updateExpense/:id', async (req, res) => {
    try {
        await Expense.findByIdAndUpdate(req.params.id, {
            "amount": req.body.amount,
            "category": req.body.category,
            "date": req.body.date
        });
        res.status(200).json({
            "status": "success",
            "message": "expense updated successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            "status": "unsuccessful",
            "message": "expense cannot be updated",
            "error": e
        });
    }
});