const mongoose = require('mongoose');

const expenseDetailsSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    category: {
        type: String
    },
    date: {
        type: String
    }
}, { versionKey: false });

const userDetailsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    }
}, { versionKey: false });

const Expense = mongoose.model('ExpenseDetails', expenseDetailsSchema);
const User = mongoose.model('UserDetails', userDetailsSchema);

module.exports = { Expense, User }