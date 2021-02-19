import { Position, Range, TextDocument } from "vscode";

export function getRangeOverWholeDocument(document: TextDocument) {
    const startPos = new Position(0, 0);
    const endPos = new Position(
        document.lineCount - 1,
        document.lineAt(document.lineCount - 1).text.length);
    return new Range(startPos, endPos);
}