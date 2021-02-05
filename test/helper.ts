import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export default class Helper {
    public static resolveTestFilePath(fileName: string) {
        return path.join(path.resolve(__dirname, "..", "..", "test"), fileName);
    }

    public static readTestFileSync(fileName: string) {
        const filePath = Helper.resolveTestFilePath(fileName);
        return fs.readFileSync(filePath).toString();
    }

    public static isExtensionActivated() {
        const extension = vscode.extensions.getExtension("DAXaholic.vscode-edifact");
        return extension && extension.isActive;
    }

    public static waitForExtensionActivation(timeout: number = 500) {
        return new Promise<void>((resolve, reject) => {
            const start = Date.now();
            const scheduledCheck = () => {
                if (this.isExtensionActivated()) {
                    resolve();
                }
                else if ((Date.now() - start) > timeout) {
                    reject("Timeout while waiting for extension activation");
                }
                else {
                    setTimeout(scheduledCheck, 15);
                }
            };
            scheduledCheck();
        });
    }

    public static openAndFormatTestFile(fileName: string) {
        return this
            .openTestFile(fileName)
            .then(() => this.waitForExtensionActivation())
            .then(() => vscode.commands.executeCommand("editor.action.formatDocument"))
            .then(() => {
                const editor = vscode.window.activeTextEditor;
                const txtEditor = editor ? editor.document.getText() : "";
                const txtEditorUnixEol = txtEditor.replace(/\r?\n/g, "\n");
                return txtEditorUnixEol;
            });
    }

    public static openTestFile(fileName: string) {
        const resolvedPath = Helper.resolveTestFilePath(fileName);
        return vscode
            .workspace
            .openTextDocument(resolvedPath)
            .then((textDocument) => {
                return vscode.window.showTextDocument(textDocument);
            });
    }
}
