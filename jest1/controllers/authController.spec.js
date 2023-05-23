const { registerUser } = require('./authController')
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
})
