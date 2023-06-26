const Hapi = require('@hapi/hapi');
const HttpStatus = require('http-status');
require('dotenv').config();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controller/controller');
const server = Hapi.server({
    port: process.env.PORT,
    host: 'localhost',
});
server.route([
    // Create a new user
    {
        method: 'POST',
        path: '/users',
        handler: createUser,
    },
    // Get all users
    {
        method: 'GET',
        path: '/users',
        handler: getAllUsers,
    },
    // Get a single user
    {
        method: 'GET',
        path: '/users/{id}',
        handler: getUserById,
    },
    // Update a user
    {
        method: 'PUT',
        path: '/users/{id}',
        handler: updateUser,
    },
    // Delete a user
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: deleteUser,
    },
]);
module.exports = { server }
