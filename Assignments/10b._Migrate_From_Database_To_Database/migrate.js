import pg from 'pg';
import { MongoClient } from 'mongodb';

// Configuration
const config = {
  postgres: {
    host: 'localhost',
    port: 5432,
    database: 'migration_test', 
    user: 'test_user', 
    password: 'test_password' //NEVER USE IN PRODUCTION (did not have time to set up env variables)
  },
  mongodb: {
    uri: 'mongodb://localhost:27017',
    database: 'migration_test'
  }
};

async function migrate() {
  // PostgreSQL connection
  const pgClient = new pg.Client(config.postgres);
  
  // MongoDB connection
  const mongoClient = new MongoClient(config.mongodb.uri);
  const mongoDb = mongoClient.db(config.mongodb.database);
  
  try {
    // Connect to both databases
    await pgClient.connect();
    await mongoClient.connect();
    console.log('Connected to both databases');

    // Get list of tables from PostgreSQL
    const tablesResult = await pgClient.query(`
      SELECT tablename FROM pg_catalog.pg_tables 
      WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'
    `);
    
    const tables = tablesResult.rows.map(row => row.tablename);
    console.log(`Found ${tables.length} tables to migrate`);
    
    // Migrate each table
    for (const table of tables) {
      console.log(`Migrating table: ${table}`);
      
      // Get data from PostgreSQL table
      const dataResult = await pgClient.query(`SELECT * FROM ${table}`);
      const records = dataResult.rows;
      
      if (records.length > 0) {
        // Insert into MongoDB collection
        const collection = mongoDb.collection(table);
        const result = await collection.insertMany(records);
        console.log(`Inserted ${result.insertedCount} documents into ${table} collection`);
      } else {
        console.log(`Table ${table} is empty, skipping`);
      }
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Close connections
    await pgClient.end();
    await mongoClient.close();
    console.log('Connections closed');
  }
}

// Run migration
migrate();