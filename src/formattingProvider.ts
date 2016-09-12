import * as vsc from 'vscode';

export class EdifactFormattingEditProvider implements vsc.DocumentFormattingEditProvider {
    provideDocumentFormattingEdits(document: vsc.TextDocument, 
                                   options: vsc.FormattingOptions,
                                   token: vsc.CancellationToken) {
        
        // Create range over whole document
        const startPos = new vsc.Position(0, 0);
        const endPos = new vsc.Position(
            document.lineCount - 1,
            document.lineAt(document.lineCount - 1).text.length);
        const wholeDocRange = new vsc.Range(startPos, endPos);

        // Append newlines after all non-escaped quotes 
        const text = document.getText();
        const textEdit = new vsc.TextEdit(
            wholeDocRange, 
            text.replace(/([^?])'(?=.)/g, "$1'\n"));

        return [textEdit]; 
    }
}