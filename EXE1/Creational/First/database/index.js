"use strict";
class Database {
    // Private constructor prevents instantiation from outside the class
    constructor(connectionString) {
        this.isConnected = false;
        this.logs = [];
        this.connectionString = connectionString;
    }
    // Static method to get the instance of the class (thread-safe)
    static getInstance(connectionString) {
        if (!Database.instance) {
            // Lock to ensure thread safety during instance creation
            synchronized(Database.lock, () => {
                if (!Database.instance) {
                    Database.instance = new Database(connectionString);
                }
            });
        }
        return Database.instance;
    }
    connect() {
        if (!this.isConnected) {
            this.isConnected = true;
            this.log(`Connected to the database with connection string: ${this.connectionString}`);
        }
        else {
            this.log(`Already connected to the database: ${this.connectionString}`);
        }
    }
    disconnect() {
        if (this.isConnected) {
            this.isConnected = false;
            this.log(`Disconnected from the database: ${this.connectionString}`);
        }
        else {
            this.log(`No active connection to disconnect: ${this.connectionString}`);
        }
    }
    executeQuery(query) {
        if (this.isConnected) {
            this.log(`Executing query: ${query}`);
            // Simulate query execution
        }
        else {
            this.log(`Failed to execute query. No active connection: ${query}`);
        }
    }
    log(message) {
        const time = new Date().toISOString();
        this.logs.push(`${time} - ${message}`);
        console.log(`${time} - ${message}`);
    }
    getLogs() {
        return this.logs;
    }
}
Database.lock = new Object(); // Lock object for thread safety
// Function to simulate synchronized behavior (simple locking mechanism)
function synchronized(lock, fn) {
    // Simulate a lock by calling the function directly
    fn();
}
// Client code
function main() {
    const db1 = Database.getInstance("Server=localhost;Database=myDB;User Id=myUser;Password=myPassword;");
    db1.connect(); // Output: Connected to the database with connection string: Server=localhost;Database=myDB;User Id=myUser;Password=myPassword;
    const db2 = Database.getInstance("Server=localhost;Database=myOtherDB;User Id=myOtherUser;Password=myOtherPassword;");
    db2.connect(); // Output: Already connected to the database: Server=localhost;Database=myDB;User Id=myUser;Password=myPassword;
    db1.executeQuery("SELECT * FROM users");
    db2.executeQuery("SELECT * FROM orders");
    db1.disconnect();
    db2.disconnect();
    console.log("Database Logs:", db1.getLogs());
}
main();
