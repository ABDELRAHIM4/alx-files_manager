import dbClient from '../utils/db'; // Import your DB client
import crypto from 'crypto';

class UsersController {
    static async postNew(req, res) {
        const { email, password } = req.body;

        // Check for missing email
        if (!email) {
            return res.status(400).json({ error: 'Missing email' });
        }

        // Check for missing password
        if (!password) {
            return res.status(400).json({ error: 'Missing password' });
        }

        // Check if the email already exists
        const db = dbClient.client.db(dbClient.databaseName);
        const usersCollection = db.collection('users');
        const existingUser  = await usersCollection.findOne({ email });

        if (existingUser ) {
            return res.status(400).json({ error: 'Already exist' });
        }

        // Hash the password using SHA1
        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

        // Create the new user
        const newUser  = {
            email,
            password: hashedPassword,
        };

        // Insert the new user into the database
        const result = await usersCollection.insertOne(newUser );

        // Return the new user with id and email
        return res.status(201).json({
            id: result.insertedId,
            email: newUser .email,
        });
    }
}

export default UsersController;
