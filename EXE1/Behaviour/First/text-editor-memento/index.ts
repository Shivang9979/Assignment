// Memento Class
class EditorMemento {
    private content: string;
    private fontSize: number;
    private fontColor: string;
    private timestamp: Date;

    constructor(content: string, fontSize: number, fontColor: string) {
        this.content = content;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.timestamp = new Date();
    }

    getContent(): string {
        return this.content;
    }

    getFontSize(): number {
        return this.fontSize;
    }

    getFontColor(): string {
        return this.fontColor;
    }

    getTimestamp(): Date {
        return this.timestamp;
    }
}

// Originator Class (Advanced Text Editor)
class TextEditor {
    private content: string = "";
    private fontSize: number = 12;
    private fontColor: string = "black";

    write(text: string): void {
        this.content += text;
    }

    setFontSize(size: number): void {
        this.fontSize = size;
    }

    setFontColor(color: string): void {
        this.fontColor = color;
    }

    save(): EditorMemento {
        return new EditorMemento(this.content, this.fontSize, this.fontColor);
    }

    restore(memento: EditorMemento): void {
        this.content = memento.getContent();
        this.fontSize = memento.getFontSize();
        this.fontColor = memento.getFontColor();
    }

    getEditorState(): string {
        return `Content: ${this.content}, Font Size: ${this.fontSize}, Font Color: ${this.fontColor}`;
    }
}

// Caretaker Class (History Manager with Undo/Redo and Max History)
class EditorHistory {
    private history: EditorMemento[] = [];
    private redoStack: EditorMemento[] = [];
    private maxHistorySize: number;

    constructor(maxHistorySize: number = 5) {
        this.maxHistorySize = maxHistorySize;
    }

    save(memento: EditorMemento): void {
        if (this.history.length === this.maxHistorySize) {
            this.history.shift();  // Remove the oldest memento
        }
        this.history.push(memento);
        this.redoStack = [];  // Clear redo stack on new save
    }

    undo(): EditorMemento | null {
        if (this.history.length > 1) {  // Ensure there's something to undo
            const lastState = this.history.pop();  // Remove the latest state
            if (lastState) {
                this.redoStack.push(lastState);  // Save the last state for redo
                return this.history[this.history.length - 1];  // Return the previous state
            }
        }
        return null;  // If there's no state to undo to
    }

    redo(): EditorMemento | null {
        if (this.redoStack.length > 0) {
            const redoState = this.redoStack.pop();
            if (redoState) {
                this.history.push(redoState);
                return redoState;
            }
        }
        return null;
    }

    getHistorySize(): number {
        return this.history.length;
    }

    getRedoSize(): number {
        return this.redoStack.length;
    }
}
const editor = new TextEditor();
const editorHistory = new EditorHistory(3);  // Max 3 saved states in history

// Initial writing and formatting
editor.write("Hello, ");
editor.setFontSize(14);
editor.setFontColor("blue");
editorHistory.save(editor.save());  // Save state 1

editor.write("world!");
editor.setFontSize(18);
editor.setFontColor("red");
editorHistory.save(editor.save());  // Save state 2

console.log(editor.getEditorState());  // Output: Content: Hello, world!, Font Size: 18, Font Color: red

// Undo the last change
let lastState = editorHistory.undo();
if (lastState) {
    editor.restore(lastState);
}
console.log("After Undo: " + editor.getEditorState());  // Should revert to state 1: Content: Hello, , Font Size: 14, Font Color: blue

// Redo the undone change
let redoState = editorHistory.redo();
if (redoState) {
    editor.restore(redoState);
}
console.log("After Redo: " + editor.getEditorState());  // Should revert to state 2: Content: Hello, world!, Font Size: 18, Font Color: red
