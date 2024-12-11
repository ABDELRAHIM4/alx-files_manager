// utils/redis.js
import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();

        // Handle connection errors
        this.client.on('error', (err) => {
            console.error('Redis Client Error', err);
        });

        // Connect to Redis
        this.client.connect().catch(err => {
            console.error('Failed to connect to Redis', err);
        });
    }

    async isAlive() {
        try {
            // Check if the client is connected
            return this.client.isOpen;
        } catch (err) {
            console.error('Error checking Redis connection', err);
            return false;
        }
    }

    async get(key) {
        try {
            const value = await this.client.get(key);
            return value;
        } catch (err) {
            console.error('Error getting value from Redis', err);
            return null;
        }
    }

    async set(key, value, duration) {
        try {
            await this.client.set(key, value, {
                EX: duration // Set expiration time in seconds
            });
        } catch (err) {
            console.error('Error setting value in Redis', err);
        }
    }

    async del(key) {
        try {
            await this.client.del(key);
        } catch (err) {
            console.error('Error deleting value from Redis', err);
        }
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
