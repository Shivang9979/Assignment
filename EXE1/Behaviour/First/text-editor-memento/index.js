"use strict";
// Memento Class
class EditorMemento {
    constructor(content, fontSize, fontColor) {
        this.content = content;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.timestamp = new Date();
    }
    getContent() {
        return this.content;
    }
    getFontSize() {
        return this.fontSize;
    }
    getFontColor() {
        return this.fontColor;
    }
    getTimestamp() {
        return this.timestamp;
    }
}
// Originator Class (Advanced Text Editor)
class TextEditor {
    constructor() {
        this.content = "";
        this.fontSize = 12;
        this.fontColor = "black";
    }
    write(text) {
        this.content += text;
    }
    setFontSize(size) {
        this.fontSize = size;
    }
    setFontColor(color) {
        this.fontColor = color;
    }
    save() {
        return new EditorMemento(this.content, this.fontSize, this.fontColor);
    }
    restore(memento) {
        this.content = memento.getContent();
        this.fontSize = memento.getFontSize();
        this.fontColor = memento.getFontColor();
    }
    getEditorState() {
        return `Content: ${this.content}, Font Size: ${this.fontSize}, Font Color: ${this.fontColor}`;
    }
}
// Caretaker Class (History Manager with Undo/Redo and Max History)
class EditorHistory {
    constructor(maxHistorySize = 5) {
        this.history = [];
        this.redoStack = [];
        this.maxHistorySize = maxHistorySize;
    }
    save(memento) {
        if (this.history.length === this.maxHistorySize) {
            this.history.shift(); // Remove the oldest memento
        }
        this.history.push(memento);
        this.redoStack = []; // Clear redo stack on new save
    }
    undo() {
        if (this.history.length > 1) { // Ensure there's something to undo
            const lastState = this.history.pop(); // Remove the latest state
            if (lastState) {
                this.redoStack.push(lastState); // Save the last state for redo
                return this.history[this.history.length - 1]; // Return the previous state
            }
        }
        return null; // If there's no state to undo to
    }
    redo() {
        if (this.redoStack.length > 0) {
            const redoState = this.redoStack.pop();
            if (redoState) {
                this.history.push(redoState);
                return redoState;
            }
        }
        return null;
    }
    getHistorySize() {
        return this.history.length;
    }
    getRedoSize() {
        return this.redoStack.length;
    }
}
const editor = new TextEditor();
const editorHistory = new EditorHistory(3); // Max 3 saved states in history
// Initial writing and formatting
editor.write("Hello, ");
editor.setFontSize(14);
editor.setFontColor("blue");
editorHistory.save(editor.save()); // Save state 1
editor.write("world!");
editor.setFontSize(18);
editor.setFontColor("red");
editorHistory.save(editor.save()); // Save state 2
console.log(editor.getEditorState()); // Output: Content: Hello, world!, Font Size: 18, Font Color: red
// Undo the last change
let lastState = editorHistory.undo();
if (lastState) {
    editor.restore(lastState);
}
console.log("After Undo: " + editor.getEditorState()); // Should revert to state 1: Content: Hello, , Font Size: 14, Font Color: blue
// Redo the undone change
let redoState = editorHistory.redo();
if (redoState) {
    editor.restore(redoState);
}
console.log("After Redo: " + editor.getEditorState()); // Should revert to state 2: Content: Hello, world!, Font Size: 18, Font Color: red
