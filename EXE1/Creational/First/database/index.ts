class Database {
    private static instance: Database;
    private static lock = new Object(); // Lock object for thread safety
    private connectionString: string;
    private isConnected: boolean = false;
    private logs: string[] = [];

    // Private constructor prevents instantiation from outside the class
    private constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    // Static method to get the instance of the class (thread-safe)
    public static getInstance(connectionString: string): Database {
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

    public connect(): void {
        if (!this.isConnected) {
            this.isConnected = true;
            this.log(`Connected to the database with connection string: ${this.connectionString}`);
        } else {
            this.log(`Already connected to the database: ${this.connectionString}`);
        }
    }

    public disconnect(): void {
        if (this.isConnected) {
            this.isConnected = false;
            this.log(`Disconnected from the database: ${this.connectionString}`);
        } else {
            this.log(`No active connection to disconnect: ${this.connectionString}`);
        }
    }

    public executeQuery(query: string): void {
        if (this.isConnected) {
            this.log(`Executing query: ${query}`);
            // Simulate query execution
        } else {
            this.log(`Failed to execute query. No active connection: ${query}`);
        }
    }

    private log(message: string): void {
        const time = new Date().toISOString();
        this.logs.push(`${time} - ${message}`);
        console.log(`${time} - ${message}`);
    }

    public getLogs(): string[] {
        return this.logs;
    }
}

// Function to simulate synchronized behavior (simple locking mechanism)
function synchronized(lock: Object, fn: () => void) {
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
