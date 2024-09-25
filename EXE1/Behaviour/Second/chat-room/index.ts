// Mediator Interface
interface ChatRoomMediator {
    showMessage(user: User, message: string, recipient?: User): void;
    addUser(user: User): void;
    removeUser(user: User): void;
    getUserList(): User[];
}

// Concrete Mediator
class ChatRoom implements ChatRoomMediator {
    private users: User[] = [];
    private messageHistory: string[] = [];

    addUser(user: User): void {
        this.users.push(user);
        console.log(`${user.getName()} has joined the chat.`);
    }

    removeUser(user: User): void {
        this.users = this.users.filter(u => u !== user);
        console.log(`${user.getName()} has left the chat.`);
    }

    showMessage(user: User, message: string, recipient?: User): void {
        const time = new Date().toLocaleTimeString();
        const sender = user.getName();
        let outputMessage: string;

        if (recipient) {
            outputMessage = `${time} [${sender} -> ${recipient.getName()}]: ${message}`;
        } else {
            outputMessage = `${time} [${sender}]: ${message}`;
        }

        this.messageHistory.push(outputMessage);
        console.log(outputMessage);
    }

    getUserList(): User[] {
        return this.users;
    }
}

// Colleague Interface
class User {
    private name: string;
    private chatMediator: ChatRoomMediator;
    private isOnline: boolean;

    constructor(name: string, chatMediator: ChatRoomMediator) {
        this.name = name;
        this.chatMediator = chatMediator;
        this.isOnline = true;
        chatMediator.addUser(this);
    }

    getName(): string {
        return this.name;
    }

    sendMessage(message: string, recipient?: User): void {
        this.chatMediator.showMessage(this, message, recipient);
    }

    setStatus(online: boolean): void {
        this.isOnline = online;
        console.log(`${this.name} is now ${online ? 'online' : 'offline'}.`);
    }

    getStatus(): boolean {
        return this.isOnline;
    }

    leaveChat(): void {
        this.chatMediator.removeUser(this);
    }
}

// Client code
function main() {
    const chatroom = new ChatRoom();

    const user1 = new User("Ayush", chatroom);
    const user2 = new User("Shivang", chatroom);
    const user3 = new User("Ankit", chatroom);

    user1.sendMessage("Hello everyone!");  // Public message
    user2.sendMessage("Hey Ayush!");         // Public message
    user3.sendMessage("Hi Shivang, Ayush!");     // Public message

    // Private message from Ayush to Shivang
    user1.sendMessage("How are you, Shivang?", user2);
    
    // Changing user status
    user2.setStatus(false);  // Shivang goes offline
    user1.sendMessage("Shivang, are you there?");  // Will be ignored since Shivang is offline

    // User leaving the chat
    user2.leaveChat();

    // List current users in the chat
    console.log("Current users in chat:", chatroom.getUserList().map(user => user.getName()).join(", "));
}

main();
