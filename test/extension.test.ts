import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as myext from '../src/main';

suite("Complex Command Tests", () => {
    const fileUnformatted = path.join(
        path.resolve(__dirname, '..', '..', 'test'), 
        'sample_std_seg_delimiter_unformatted.edi');
    const fileFormatted = path.join(
        path.resolve(__dirname, '..', '..', 'test'),
        'sample_std_seg_delimiter_formatted.edi');
    let txtFormatted = '';

    suiteSetup(() => {
        txtFormatted = fs.readFileSync(fileFormatted).toString();
    });

    test("Format unformatted EDIFACT file", (done) => {
        vscode
            .workspace
            .openTextDocument(fileUnformatted)
            .then((textDocument) => {
                return vscode.window.showTextDocument(textDocument);
            }).then((textEditor) => {
                return vscode.commands.executeCommand('editor.action.formatDocument');
            }).then(() => {
                const txtEditor = vscode.window.activeTextEditor.document.getText();
                assert.equal(
                    txtEditor,
                    txtFormatted,
                    'Editor text does not match preformatted EDIFACT file');
                done();
            }, done);
    });
});