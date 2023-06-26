const { PrismaClient } = require('@prisma/client');
const HttpStatus = require('http-status');


const prisma = new PrismaClient();

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email } = req.payload;

        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.response({
                message: 'Email is already in use',
                data: {},
            }).code(HttpStatus.CONFLICT);
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
            },
        });

        return res.response({
            message: 'User added successfully',
            data: user,
        }).code(HttpStatus.CREATED);
    } catch (err) {
        return res.response(err.message).code(HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return res.response({
            message: 'User list',
            data: users,
        }).code(HttpStatus.OK);
    } catch (err) {
        return res.response(err.message).code(HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Get a single user
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (!user) {
            return res.response({
                message: 'User not Found',
                data: {},
            }).code(HttpStatus.NOT_FOUND);
        }
        return res.response({
            message: 'User list',
            data: user,
        }).code(HttpStatus.OK);
    } catch (err) {
        return res.response(err.message).code(HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (!user) {
            return res.response({
                message: 'User not Found',
                data: {},
            }).code(HttpStatus.NOT_FOUND);
        }
        const { name, email } = req.payload;
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.response({
                message: 'Email is already in use',
                data: {},
            }).code(HttpStatus.CONFLICT);
        }
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
            },
        });
        return res.response({
            message: 'User details updated',
            data: user,
        }).code(HttpStatus.OK);
    } catch (err) {
        return res.response(err.message).code(HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (!user) {
            return res.response({
                message: 'User not Found',
                data: {},
            }).code(HttpStatus.NOT_FOUND);
        }
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        return res.response({
            message: 'User deleted successfully',
            data: {},
        }).code(HttpStatus.OK);
    } catch (err) {
        return res.response(err.message).code(HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
