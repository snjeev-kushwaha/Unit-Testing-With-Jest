const { registerUser, loginUser } = require('./authController')
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const { getJwtToken } = require('../utils/helpers')

jest.mock('../utils/helpers', () => ({
    getJwtToken: jest.fn(() => 'jwt_token')
}))

const mockRequest = () => {
    return {
        body: {
            name: "Test User",
            email: 'test@gmail.com',
            password: "12345678"
        }
    }
}

const mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
}

const mockUser = {
    _id: "646d1f10c3ce9978d6ffe8fb",
    name: "Test User",
    email: 'test@gmail.com',
    password: "hashPassword"
}

const userLogin = {
    email: 'test@gmail.com',
    password: "hashPassword"
}

afterEach(() => {
    //restore the spy created with spyon
    jest.restoreAllMocks();
})

describe('Register User', () => {
    it('should register user', async () => {

        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("hashPassword")
        jest.spyOn(User, 'create').mockResolvedValueOnce(mockUser)

        const mockReq = mockRequest()
        const mockRes = mockResponse()

        await registerUser(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(201)
        expect(bcrypt.hash).toHaveBeenCalledWith("12345678", 10)
        expect(User.create).toHaveBeenCalledWith({
            name: "Test User",
            email: 'test@gmail.com',
            password: "hashPassword"
        })
    })
    // for validation error show
    it('should throw validation error', async () => {
        const mockReq = (mockRequest().body = { body: {} })
        const mockRes = mockResponse()

        await registerUser(mockReq, mockRes)
        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({
            error: "Please enter all values"
        })
    })
    it('should throw duplicate email entered error', async () => {
        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("hashPassword")
        jest.spyOn(User, 'create').mockRejectedValueOnce({ code: 11000 })

        const mockReq = mockRequest()
        const mockRes = mockResponse()

        await registerUser(mockReq, mockRes)
        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({
            error: "Duplicate email"
        })
    })
})

describe('Login User', () => {
    it('should throw missing email and password error', async () => {
        const mockReq = mockRequest().body = { body: {} }
        const mockRes = mockResponse()
        await loginUser(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({
            error: "Please enter email & Password"
        })
    });

    it('should throw Invalid email error', async () => {
        jest.spyOn(User, 'findOne').mockImplementationOnce(() => ({
            select: jest.fn().mockResolvedValueOnce(null)
        }))
        const mockReq = (mockRequest().body = { body: userLogin })
        const mockRes = mockResponse()

        await loginUser(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(401)
        expect(mockRes.json).toHaveBeenCalledWith({
            error: "Invalid Email or Password"
        })
    });

    it('should throw Invalid password error', async () => {
        jest.spyOn(User, 'findOne').mockImplementationOnce(() => ({
            select: jest.fn().mockResolvedValueOnce(mockUser)
        }))

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false)

        const mockReq = (mockRequest().body = { body: userLogin })
        const mockRes = mockResponse()

        await loginUser(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(401)
        expect(mockRes.json).toHaveBeenCalledWith({
            error: "Invalid Email or Password"
        })
    });
});

