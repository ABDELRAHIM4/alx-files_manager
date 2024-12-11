const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');
class AppController {
	static async getStatus(req, res) {
		const redisStatus = redisClient.isAlive();
		const dbStatus = dbClient.isAlive();
		res.status(200).json({ "redis": redisStatus, "db": dbStatus});
	}
	static async getstats(req, res) {
		const uc = await dbClient.nbUsers();
		const file = await dbClient.nbFiles();
		res.status(200).json({ "users": uc, "files": file});
	}
}
module.exports = AppController;
