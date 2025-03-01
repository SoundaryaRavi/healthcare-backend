const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Import your Express app
const User = require('../models/User');

// Test user data
const testUser = {
    email: 'test@example.com',
    password: 'password123',
    first_name: 'Test User',
    age: 25,
    health_issues: [],
    weight: 70,
    height: 175,
};

// Test update data
const updateData = {
    first_name: 'Updated User',
    age: 30,
    health_issues: ['diabetes'],
    weight: 75,
    height: 180,
};

let userId; // To store the ID of the test user
let authToken; // To store the JWT token for authentication

beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Create a test user
    const user = new User(testUser);
    await user.save();
    userId = user._id;

    // Generate a JWT token for the test user
    const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });
    authToken = loginResponse.body.token;
});

afterAll(async () => {
    // Delete the test user and close the database connection
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('Update User Controller', () => {
    it('should update user details', async () => {
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${authToken}`) // Add the JWT token to the request headers
            .send(updateData);

        expect(response.status).toBe(200);
        expect(response.body.first_name).toBe(updateData.first_name);
        expect(response.body.age).toBe(updateData.age);
        expect(response.body.health_issues).toEqual(updateData.health_issues);
        expect(response.body.weight).toBe(updateData.weight);
        expect(response.body.height).toBe(updateData.height);
    });

    it('should return 404 if user is not found', async () => {
        const invalidUserId = new mongoose.Types.ObjectId(); // Generate a random ID
        const response = await request(app)
            .put(`/api/users/${invalidUserId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(updateData);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    it('should return 400 if user ID is invalid', async () => {
        const invalidUserId = 'invalid-id';
        const response = await request(app)
            .put(`/api/users/${invalidUserId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(updateData);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid user ID');
    });

    it('should return 401 if no token is provided', async () => {
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send(updateData);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Access denied. No token provided.');
    });
});