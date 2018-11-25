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

    static isExtensionActivated() {
        return vscode.extensions.getExtension('DAXaholic.vscode-edifact').isActive;
    }

    static waitForExtensionActivation(timeout: number = 500) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const scheduledCheck = () => {
                if (this.isExtensionActivated()) {
                    resolve();
                }
                else if ((Date.now() - start) > timeout) {
                    reject('Timeout while waiting for extension activation');
                }
                else {
                    setTimeout(scheduledCheck, 15)
                }
            };
            scheduledCheck();
        });
    }

    static openAndFormatTestFile(fileName: string) {
        return this
            .openTestFile(fileName)
            .then(() => this.waitForExtensionActivation())
            .then(() => vscode.commands.executeCommand('editor.action.formatDocument'))
            .then(() => {
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