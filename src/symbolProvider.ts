import * as vsc from "vscode";
import EdifactSegmentInfo from "./edifactSegmentInfo";

export class EdifactSymbolProvider implements vsc.DocumentSymbolProvider {
    public provideDocumentSymbols(document: vsc.TextDocument,
                                  token: vsc.CancellationToken) {

        const text = document.getText();
        const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(text);
        const symbolInfos: vsc.SymbolInformation[] = [];
        for (const segmentInfo of segmentInfos) {
            const symbolRange = new vsc.Range(
                segmentInfo.startLineIndex,
                segmentInfo.startCharIndex,
                segmentInfo.endLineIndex,
                segmentInfo.endCharIndex);
            const symbolInfo = new vsc.SymbolInformation(
                segmentInfo.segment,
                vsc.SymbolKind.Struct,
                symbolRange);
            symbolInfos.push(symbolInfo);
        }
        return symbolInfos;
    }
}
