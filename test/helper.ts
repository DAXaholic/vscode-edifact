import * as path from 'path';
import * as vscode from 'vscode';

export default class Helper {
    static resolveTestFilePath(fileName: string) {
        return path.join(path.resolve(__dirname, '..', '..', 'test'), fileName);
    }

    static openAndFormatFile(path: string) {
        return vscode
            .workspace
            .openTextDocument(path)
            .then((textDocument) => {
                return vscode.window.showTextDocument(textDocument);
            }).then((textEditor) => {
                return vscode.commands.executeCommand('editor.action.formatDocument');
            }).then(() => {
                const txtEditor = vscode.window.activeTextEditor.document.getText();
                const txtEditorUnixEol = txtEditor.replace(/\r?\n/g, '\n');
                return txtEditorUnixEol;
            });
    }
}