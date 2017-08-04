import * as vsc from 'vscode';
import EdifactFormatter from './edifactFormatter';

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

        const text = document.getText();
        const formattedText = EdifactFormatter.format(text);
        const textEdit = new vsc.TextEdit(
            wholeDocRange, 
            formattedText);
        return [textEdit]; 
    }
}