const {createRecordService,updateRecordService, getRecordsService,getSingleRecordService,deleteRecordService} = require("../services/record.service");

const createRecord = async(req,res)=>{
    try {
        const record = await createRecordService(req.body,req.user._id);

        res.status(201).json({
            message:"Record created successfully",
            record,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const updateRecord = async(req,res)=>{
    try {
        const record = await updateRecordService(req.params.id,req.body);

        res.json({
            message: "Record updated",
            record,
        });
    } catch (error) {
        res.status(404).json({
            message:error.message
        });
    }
};

const getRecords = async(req,res)=>{
    try {
        const records = await getRecordsService(req.query);

        res.status(200).json({
            count: records.length,
            records,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getSingleRecord = async (req, res) => {
    try {
        const record = await getSingleRecordService(req.params.id);

        res.status(200).json({
            record,
        });
    } catch (error) {
        res.status(404).json({ 
            message: error.message,
        });
    }
};

const deleteRecord = async(req,res)=>{
    try{
        const record = await deleteRecordService(req.params.id);

        res.json({
            message: "Record deleted",
            record,
        });
    } catch(error){
        res.status(404).json({
            message: error.message,
        });
    }
};

module.exports = {
    createRecord,
    updateRecord,
    getRecords,
    getSingleRecord,
    deleteRecord,
}