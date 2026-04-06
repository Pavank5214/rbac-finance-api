const {getSummary,getCategorieBreakdown,getTrends} = require("../services/dashboard.service");

const summary = async (req,res) =>{
    try{
        const data = await getSummary();
        res.status(200).json(
            data,
        );
    } catch(error){
        res.status(500).json({
            message : "Cant fetch data",
        });
    }
};

const categories = async (req,res) =>{
    try{
        const data = await getCategorieBreakdown();
        res.status(200).json(
            data,
        );
    } catch(error){
        res.status(500).json({
            message : "Cant fetch data",
        });
    }
};

const trends = async (req,res) =>{
    try{
        const data = await getTrends();
        res.status(200).json(
            data,
        );
    } catch(error){
        res.status(500).json({
            message : "Cant fetch data",
        });
    }
};

module.exports = {
    summary,
    categories,
    trends,
};
