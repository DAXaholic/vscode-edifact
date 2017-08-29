import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

export default class Helper {
    static resolveTestFilePath(fileName: string) {
        return path.join(path.resolve(__dirname, '..', '..', 'test'), fileName);
    }

    static readTestFileSync(fileName: string) {
        const filePath = Helper.resolveTestFilePath(fileName);
        return fs.readFileSync(filePath).toString();
    }

    static openAndFormatTestFile(fileName: string) {
        return this
            .openTestFile(fileName)
            .then(textEditor => {
                return vscode.commands.executeCommand('editor.action.formatDocument');
            }).then(() => {
                const txtEditor = vscode.window.activeTextEditor.document.getText();
                const txtEditorUnixEol = txtEditor.replace(/\r?\n/g, '\n');
                return txtEditorUnixEol;
            });
    }

    static openTestFile(fileName: string) {
        const resolvedPath = Helper.resolveTestFilePath(fileName);
        return vscode
            .workspace
            .openTextDocument(resolvedPath)
            .then(textDocument => {
                return vscode.window.showTextDocument(textDocument);
            });
    }
}