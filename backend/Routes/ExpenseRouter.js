const { showExpenses, addExpenses, removeExpenses } = require('../Controllers/ExpenseController');

    const router = require('express').Router();

    //to fetch all expense of user 


    router.get('/',showExpenses);
    router.post('/',addExpenses);

    router.delete('/:expenseId',removeExpenses);


    module.exports=router;