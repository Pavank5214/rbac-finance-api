const Record = require("../models/Record");

const getSummary = async () =>{
    const result = await Record.aggregate([
        {
            $group:{
                _id: "$type",
                total: {$sum: "$amount"},
            },
        },
    ]);

    let totalIncome =0;
    let totalExpense =0;

    result.forEach((item) => {
        if(item._id === "income") totalIncome = item.total;
        if(item._id === "expense") totalExpense = item.total;
    });

    return {
        totalIncome,
        totalExpense,
        netBalance: totalIncome - totalExpense,
    };
};

const getCategorieBreakdown = async() =>{
    return await Record.aggregate([
        {
            $group:{
                _id: "$category",
                total: {$sum: "$amount"},
            },
        },
    ]);
};

const getTrends = async () =>{
    return await Record.aggregate([
        {
            $group:{
                _id: {
                    month: {$month: "$date"},
                    year: {$year:  "$date"},
                    type: "$type",
                },
                total: {$sum: "$amount"},
            },
        },
    ]);
};

module.exports = {
    getSummary,
    getCategorieBreakdown,
    getTrends
}