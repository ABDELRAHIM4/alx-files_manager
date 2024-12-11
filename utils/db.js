import { MongoClient } from 'mongodb';

class DBClient {
	constructor() {
		const host = process.env.DB_HOST || 'localhost';
		const port = process.env.DB_PORT || 27017;
		const database = process.env.DB_DATABASE || 'files_manager';
		this.url = `mongodb://${host}:${port}`;
		this.client = new MongoClient(this.url);
		this.databaseName = database;
		this.isConnected = false;
		this.connect();
	}
	async connect() {
		try {
			await this.client.connect();
			this.isConnected = true;
			console.log("conect");
		} catch(err) {
			console.log("failed");
			this.isConnected = false;
		}
	}
	isAlive() {
		return this.isConnected;
	}
	async nbUsers() {
		if (!this.isConnected) {
			return 0;
		}
		try {
			const db = this.client.db(this.databaseName);
			const cool = db.collection('users');
			const count = await cool.countDocuments();
			return count;
		} catch (err) {
			conole.log("error");
			return 0;
		}
	}
	aync nbFiles() {
		if (!this.isConnected) {
                        return 0;
                }
                try {
                        const db = this.client.db(this.databaseName);
                        const cool = db.collection('files');
                        const count = await cool.countDocuments();
                        return count;
                } catch (err) {
                        conole.log("error");
                        return 0;
                }
	}
}
const dbClient = new DBClient();
export default dbClient;
