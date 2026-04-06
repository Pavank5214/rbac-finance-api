const Record = require("../models/Record");

const createRecordService = async (data, userId) => {
    const record = await Record.create({
        ...data,
        userId,
    })
    return record;
}

const updateRecordService = async (id, data) => {
    const record = await Record.findByIdAndUpdate(id, data, {
        new: true,
    });

    if (!record) throw new Error("Record not found");

    return record;
}

const getRecordsService = async (filters) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', search, type, category, startDate, endDate } = filters;
    const query = { isDeleted: false };

    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate && endDate) {
        query.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }

    if (search) {
        query.$or = [
            { category: { $regex: search, $options: 'i' } },
            { note: { $regex: search, $options: 'i' } },
        ];
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const skip = (page - 1) * limit;

    const records = await Record.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit);

    const total = await Record.countDocuments(query);

    return {
        records,
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
    };
};

const getSingleRecordService = async (id) => {
    const record = await Record.findOne({ _id: id, isDeleted: false });
    if (!record) throw new Error("Record not found");
    return record;
};

const deleteRecordService = async (id) => {
    const record = await Record.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    if (!record) throw new Error("Record not found");
    return record;
}
module.exports = {
    createRecordService,
    updateRecordService,
    getRecordsService,
    getSingleRecordService,
    deleteRecordService
};