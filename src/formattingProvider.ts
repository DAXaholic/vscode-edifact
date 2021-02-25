import * as vsc from "vscode";
import { putEachSegmentInNewLine } from "./edifactDocumentTransformations";
import { getRangeOverWholeDocument } from "./rangeUtils";

export class EdifactFormattingEditProvider implements vsc.DocumentFormattingEditProvider {
    public provideDocumentFormattingEdits(document: vsc.TextDocument,
                                          options: vsc.FormattingOptions,
                                          token: vsc.CancellationToken) {

        const text = document.getText();
        const formattedText = putEachSegmentInNewLine(text);
        const textEdit = new vsc.TextEdit(
            getRangeOverWholeDocument(document),
            formattedText);
        return [textEdit];
    }
}
