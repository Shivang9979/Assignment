// New Logger Interface
interface Logger {
    logInfo(message: string): void;
    logWarning(message: string): void;
    logError(message: string): void;
}

// Legacy Console Logger Class
class LegacyConsoleLogger {
    public log(message: string): void {
        console.log(`Console Logger: ${message}`);
    }

    public logError(message: string): void {
        console.error(`Console Logger Error: ${message}`);
    }
}

// Legacy File Logger Class (Simulated)
class LegacyFileLogger {
    public writeToFile(message: string): void {
        console.log(`Writing to file: ${message}`);
    }

    public writeErrorToFile(message: string): void {
        console.error(`Writing error to file: ${message}`);
    }
}

// Adapter Class for Console Logger
class ConsoleLoggerAdapter implements Logger {
    private consoleLogger: LegacyConsoleLogger;

    constructor(consoleLogger: LegacyConsoleLogger) {
        this.consoleLogger = consoleLogger;
    }

    logInfo(message: string): void {
        this.consoleLogger.log(message); // Adapting the method
    }

    logWarning(message: string): void {
        this.consoleLogger.log(`Warning: ${message}`); // Adapting for warnings
    }

    logError(message: string): void {
        this.consoleLogger.logError(message);
    }
}

// Adapter Class for File Logger
class FileLoggerAdapter implements Logger {
    private fileLogger: LegacyFileLogger;

    constructor(fileLogger: LegacyFileLogger) {
        this.fileLogger = fileLogger;
    }

    logInfo(message: string): void {
        this.fileLogger.writeToFile(message); // Adapting the method
    }

    logWarning(message: string): void {
        this.fileLogger.writeToFile(`Warning: ${message}`); // Adapting for warnings
    }

    logError(message: string): void {
        this.fileLogger.writeErrorToFile(message);
    }
}

// Logger Factory for Configuration
class LoggerFactory {
    static createLogger(type: string): Logger {
        if (type === 'console') {
            return new ConsoleLoggerAdapter(new LegacyConsoleLogger());
        } else if (type === 'file') {
            return new FileLoggerAdapter(new LegacyFileLogger());
        } else {
            throw new Error('Invalid logger type');
        }
    }
}

// Client Code
function main() {
    // Configuration for logger type
    const loggerType: string = 'console'; // Change to 'file' to use file logging

    // Create the logger based on configuration
    const logger: Logger = LoggerFactory.createLogger(loggerType);

    logger.logInfo("This is an info message.");    // Uses the adapted method
    logger.logWarning("This is a warning message."); // Uses the adapted method
    logger.logError("This is an error message.");   // Uses the adapted method
}

// Run the client code
main();
