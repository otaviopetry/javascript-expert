import MongoDB from 'mongodb';

export default class MongoDBStrategy {
    #instance;
    #collection;
    
    constructor(connectionString) {
        const { pathname: dbName } = new URL(connectionString);

        this.connectionString = connectionString.replace(dbName, '');
        this.db = dbName.replace(/\W/, '');
        this.#collection = 'warriors';

        console.log({
            connectionString: this.connectionString,
            db: this.db,
            collection: this.#collection,
        })
    }

    async connect() {
        const client = new MongoDB.MongoClient(this.connectionString);

        await client.connect();

        const db = client.db(this.db).collection(this.#collection);
        
        this.#instance = db;
    }

    async create(item) {
        return this.#instance 
            .insertOne(item);
    }

    async read(item) {
        return this.#instance
            .find(item)
            .toArray()
    }
}