const { createRecordService, getRecordsService, getSingleRecordService, deleteRecordService } = require('../services/record.service');
const Record = require('../models/Record');

jest.mock('../models/Record');

describe('Record Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createRecordService', () => {
        it('should create a new record', async () => {
            const mockData = { amount: 100, type: 'income', category: 'Salary' };
            const userId = 'user123';
            Record.create.mockResolvedValue({ ...mockData, userId });

            const result = await createRecordService(mockData, userId);

            expect(Record.create).toHaveBeenCalledWith({ ...mockData, userId });
            expect(result).toEqual({ ...mockData, userId });
        });
    });

    describe('getRecordsService', () => {
        it('should return paginated records', async () => {
            const filters = { page: 1, limit: 10 };
            const mockRecords = [{ amount: 50, category: 'Food', isDeleted: false }];

            Record.find.mockReturnValue({
                sort: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(mockRecords),
            });
            Record.countDocuments.mockResolvedValue(1);

            const result = await getRecordsService(filters);

            expect(Record.find).toHaveBeenCalledWith({ isDeleted: false });
            expect(result.records).toEqual(mockRecords);
            expect(result.total).toBe(1);
            expect(result.totalPages).toBe(1);
        });

        it('should filter by search term', async () => {
            const filters = { search: 'food' };
            Record.find.mockReturnValue({
                sort: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue([]),
            });
            Record.countDocuments.mockResolvedValue(0);

            await getRecordsService(filters);

            expect(Record.find).toHaveBeenCalledWith(expect.objectContaining({
                $or: [
                    { category: { $regex: 'food', $options: 'i' } },
                    { note: { $regex: 'food', $options: 'i' } },
                ]
            }));
        });
    });

    describe('getSingleRecordService', () => {
        it('should return a record if found and not deleted', async () => {
            const mockRecord = { _id: '1', amount: 100, isDeleted: false };
            Record.findOne.mockResolvedValue(mockRecord);

            const result = await getSingleRecordService('1');

            expect(Record.findOne).toHaveBeenCalledWith({ _id: '1', isDeleted: false });
            expect(result).toEqual(mockRecord);
        });

        it('should throw error if record not found', async () => {
            Record.findOne.mockResolvedValue(null);

            await expect(getSingleRecordService('1')).rejects.toThrow('Record not found');
        });
    });

    describe('deleteRecordService', () => {
        it('should mark record as deleted (soft delete)', async () => {
            const mockRecord = { _id: '1', isDeleted: true };
            Record.findByIdAndUpdate.mockResolvedValue(mockRecord);

            const result = await deleteRecordService('1');

            expect(Record.findByIdAndUpdate).toHaveBeenCalledWith('1', { isDeleted: true }, { new: true });
            expect(result.isDeleted).toBe(true);
        });
    });
});
