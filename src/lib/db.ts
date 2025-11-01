import mysql from 'mysql2/promise';

const {
	DB_HOST,
	DB_USER,
	DB_NAME,
	DB_PASS
} = process.env;

class MySQLSingleton {
	private static instance: MySQLSingleton;
	private pool: mysql.Pool;

	private constructor() {
		this.pool = mysql.createPool({
			host: DB_HOST,
			user: DB_USER,
			database: DB_NAME,
			password: DB_PASS,
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0
		});
	}

	public static getInstance(): MySQLSingleton {
		if (!MySQLSingleton.instance) {
			MySQLSingleton.instance = new MySQLSingleton();
		}
		return MySQLSingleton.instance;
	}

	public getPool(): mysql.Pool {
		return this.pool;
	}
}

export default MySQLSingleton.getInstance().getPool();
