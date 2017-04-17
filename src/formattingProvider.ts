import * as vsc from 'vscode';
import EdifactUnaInfo from './edifactUnaInfo';

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

        // Append newlines after all non-escaped segment terminators
        const text = document.getText();
        const unaInfo = EdifactUnaInfo.determineFromEdifactData(text);
        const rc = unaInfo.releaseCharacter;
        const st = unaInfo.segmentTerminator;
        const searchRegExp = new RegExp(`([^${rc}])${st}(?=.)`, 'g');
        const textEdit = new vsc.TextEdit(
            wholeDocRange, 
            text.replace(searchRegExp, `$1${st}\n`));
        return [textEdit]; 
    }
}