const Job = require('../models/jobs')
const { getJobs, newJob } = require('./jobsController')

const mockJob = {
    _id: "646ee406821086a11a9c1421",
    title: "Node js Developer",
    description: "Node. js (Node) is an open source, cross-platform runtime environment for executing JavaScript code. Node is used extensively for server-side programming.",
    email: "chotu123@gmail.com",
    address: "rewa",
    company: "Micro Technologies",
    industry: [],
    positions: 2,
    salary: 25000,
    user: "646d1f10c3ce9978d6ffe8fb",
    postingDate: "2023-05-25T04:28:54.987Z"
}

const mockRequest = () => {
    return {
        body: {},
        query: {},
        params: {},
        user: {}
    }
}

const mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
}

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
})

describe('Jobs Container', () => {
    describe('Get all jobs', () => {
        it('should get all jobs', async () => {
            jest.spyOn(Job, 'find').mockImplementationOnce(() => ({
                limit: () => ({
                    skip: jest.fn().mockResolvedValue([mockJob])
                })
            }))
            const mockReq = mockRequest()
            const mockRes = mockResponse()
            await getJobs(mockReq, mockRes)
            expect(mockRes.status).toHaveBeenCalledWith(200)
            expect(mockRes.json).toHaveBeenCalledWith({
                jobs: [mockJob]
            })
        })
    });
    describe('Create new Job', () => {
        it('should create new job', async () => {
            jest.spyOn(Job, 'create').mockResolvedValue(mockJob)

            const mockReq = mockRequest().body ={
                body:{
                    title: "Node js Developer",
                    description: "Node. js (Node) is an open source, cross-platform runtime environment for executing JavaScript code. Node is used extensively for server-side programming.",
                    email: "chotu123@gmail.com",
                    address: "rewa",
                    company: "Micro Technologies",
                    positions: 2,
                    salary: 25000
                },
                user:{
                    _id:"646ee406821086a11a9c1421"
                }
            }

            const mockRes = mockResponse()
            await newJob(mockReq, mockRes)
            expect(mockRes.status).toHaveBeenCalledWith(200)
            expect(mockRes.json).toHaveBeenCalledWith({
                job: mockJob
            })
        });

    });

});
