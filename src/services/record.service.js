const Record = require("../models/Record");

const createRecordService = async(data,userId)=>{
    const record = await Record.create({
        ...data,
        userId,
    })
    return record;
}

const updateRecordService = async(id,data)=>{
    const record = await Record.findByIdAndUpdate(id,data,{
        new: true,
    });

    if(!record) throw new Error("Record not found");

    return record;
}

const getRecordsService = async (filters)=>{
    const query = {};

    if (filters.type) query.type = filters.type;
    if(filters.category) query.category = filters.category;
    if(filters.startDate && filters.endDate){
        query.date = {
            $gte: new Date(filters.startDate),
            $lte: new Date(filters.endDate),
        };
    }
    const records = await Record.find(query).sort({createdAt: -1});
    return records;
};

const getSingleRecordService = async (id) => {
    const record = await Record.findById(id);
    if (!record) throw new Error("Record not found");
    return record;
};

const deleteRecordService = async(id)=>{
    const record = await Record.findByIdAndDelete(id);

    if(!record) throw new Error("Record not found");
    return record;
}
module.exports = {
    createRecordService,
    updateRecordService,
    getRecordsService,
    getSingleRecordService,
    deleteRecordService
};