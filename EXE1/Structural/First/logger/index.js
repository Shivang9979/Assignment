"use strict";
// Legacy Console Logger Class
class LegacyConsoleLogger {
    log(message) {
        console.log(`Console Logger: ${message}`);
    }
    logError(message) {
        console.error(`Console Logger Error: ${message}`);
    }
}
// Legacy File Logger Class (Simulated)
class LegacyFileLogger {
    writeToFile(message) {
        console.log(`Writing to file: ${message}`);
    }
    writeErrorToFile(message) {
        console.error(`Writing error to file: ${message}`);
    }
}
// Adapter Class for Console Logger
class ConsoleLoggerAdapter {
    constructor(consoleLogger) {
        this.consoleLogger = consoleLogger;
    }
    logInfo(message) {
        this.consoleLogger.log(message); // Adapting the method
    }
    logWarning(message) {
        this.consoleLogger.log(`Warning: ${message}`); // Adapting for warnings
    }
    logError(message) {
        this.consoleLogger.logError(message);
    }
}
// Adapter Class for File Logger
class FileLoggerAdapter {
    constructor(fileLogger) {
        this.fileLogger = fileLogger;
    }
    logInfo(message) {
        this.fileLogger.writeToFile(message); // Adapting the method
    }
    logWarning(message) {
        this.fileLogger.writeToFile(`Warning: ${message}`); // Adapting for warnings
    }
    logError(message) {
        this.fileLogger.writeErrorToFile(message);
    }
}
// Logger Factory for Configuration
class LoggerFactory {
    static createLogger(type) {
        if (type === 'console') {
            return new ConsoleLoggerAdapter(new LegacyConsoleLogger());
        }
        else if (type === 'file') {
            return new FileLoggerAdapter(new LegacyFileLogger());
        }
        else {
            throw new Error('Invalid logger type');
        }
    }
}
// Client Code
function main() {
    // Configuration for logger type
    const loggerType = 'file'; // Change to 'file' to use file logging
    // Create the logger based on configuration
    const logger = LoggerFactory.createLogger(loggerType);
    logger.logInfo("This is an info message."); // Uses the adapted method
    logger.logWarning("This is a warning message."); // Uses the adapted method
    logger.logError("This is an error message."); // Uses the adapted method
}
// Run the client code
main();
