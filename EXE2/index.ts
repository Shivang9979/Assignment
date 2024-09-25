import * as readline from 'readline';

class Rocket {
    private stage: string;
    private fuel: number;
    private altitude: number;
    private speed: number;
    private currentStage: number;
    private checksComplete: boolean;

    constructor() {
        this.stage = "Pre-Launch";
        this.fuel = 100; // fuel percentage
        this.altitude = 0; // altitude in km
        this.speed = 0; // speed in km/h
        this.currentStage = 1; // rocket starts at stage 1
        this.checksComplete = false; // pre-launch checks status
    }

    // Start pre-launch checks
    public startChecks(): void {
        if (this.stage === "Pre-Launch") {
            console.log("Performing system checks...");
            setTimeout(() => {
                this.checksComplete = true;
                console.log("All systems are 'Go' for launch.");
            }, 1000); // simulate time delay for system checks
        } else {
            console.log("Cannot start checks after launch.");
        }
    }

    // Launch the rocket
    public launch(): void {
        if (!this.checksComplete) {
            console.log("Pre-launch checks not complete. Type 'start_checks' first.");
            return;
        }

        if (this.stage === "Pre-Launch") {
            console.log("Launching...");
            this.stage = "Flight";
            this.updateLaunch();
        }
    }

    // Simulate the launch process
    private updateLaunch(): void {
        const interval = setInterval(() => {
            if (this.fuel > 0 && this.altitude < 200) {
                this.simulateSecond();

                // Stage separation logic
                if (this.altitude >= 100 && this.currentStage === 1) {
                    this.currentStage = 2;
                    console.log(`Stage 1 complete. Separating stage. Entering Stage 2.`);
                }

                // Orbit achieved
                if (this.altitude >= 200) {
                    console.log("Orbit achieved! Mission Successful.");
                    clearInterval(interval);
                }

            } else {
                clearInterval(interval);

                // Mission failure
                if (this.fuel <= 0 && this.altitude < 200) {
                    console.log("Mission Failed due to insufficient fuel.");
                }
            }
        }, 1000); // Update every second
    }

    // Fast forward simulation by X seconds
    public fastForward(seconds: number): void {
        for (let i = 0; i < seconds; i++) {
            if (this.fuel > 0 && this.altitude < 200) {
                this.simulateSecond();

                // Stage separation
                if (this.altitude >= 100 && this.currentStage === 1) {
                    this.currentStage = 2;
                    console.log(`Stage 1 complete. Separating stage. Entering Stage 2.`);
                }

                // Orbit achieved
                if (this.altitude >= 200) {
                    console.log("Orbit achieved! Mission Successful.");
                    break;
                }

            } else {
                if (this.fuel <= 0 && this.altitude < 200) {
                    console.log("Mission Failed due to insufficient fuel.");
                }
                break;
            }
        }
    }

    // Simulate one second of flight (updates rocket parameters)
    private simulateSecond(): void {
        if (this.currentStage === 1) {
            this.fuel -= 2; // Stage 1 fuel consumption
            this.altitude += 10; // Stage 1 altitude gain
            this.speed += 1000; // Stage 1 speed increase
        } else if (this.currentStage === 2) {
            this.fuel -= 1; // Stage 2 fuel consumption
            this.altitude += 5; // Stage 2 altitude gain
            this.speed += 500; // Stage 2 speed increase
        }

        console.log(`Stage: ${this.currentStage}, Fuel: ${this.fuel}%, Altitude: ${this.altitude} km, Speed: ${this.speed} km/h`);
    }
}

// Create an instance of the Rocket
const rocket = new Rocket();

// Set up the readline interface for console input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to process user input
function processInput(input: string): void {
    const command = input.trim().split(" ");

    switch (command[0]) {
        case "start_checks":
            rocket.startChecks();
            break;
        case "launch":
            rocket.launch();
            break;
        case "fast_forward":
            const seconds = parseInt(command[1]);
            if (!isNaN(seconds) && seconds > 0) {
                rocket.fastForward(seconds);
            } else {
                console.log("Please provide a valid number of seconds.");
            }
            break;
        case "exit":
            console.log("Exiting the simulation.");
            rl.close();
            break;
        default:
            console.log("Unknown command. Please use 'start_checks', 'launch', 'fast_forward X', or 'exit'.");
            break;
    }
}

// Prompt user for input
rl.setPrompt("Enter command (start_checks, launch, fast_forward X, exit): ");
rl.prompt();

rl.on("line", (input): void => {
    processInput(input);
    rl.prompt();
});

rl.on("close", () => {
    console.log("Rocket launch simulator closed.");
});
