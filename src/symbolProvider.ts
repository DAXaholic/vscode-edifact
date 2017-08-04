import * as vsc from 'vscode';
import EdifactSegmentInfo from './edifactSegmentInfo';

export class EdifactSymbolProvider implements vsc.DocumentSymbolProvider {
    provideDocumentSymbols(document: vsc.TextDocument,
                           token: vsc.CancellationToken) {

        let text = document.getText();
        let segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(text);
        let symbolInfos: vsc.SymbolInformation[] = [];
        for (let segmentInfo of segmentInfos) {
            const symbolRange = new vsc.Range(
                segmentInfo.startLineIndex,
                segmentInfo.startCharIndex,
                segmentInfo.endLineIndex,
                segmentInfo.endCharIndex);
            const symbolInfo = new vsc.SymbolInformation(
                segmentInfo.segment,
                vsc.SymbolKind.Struct,
                symbolRange);
            symbolInfos.push(symbolInfo)
        }
        return symbolInfos;
    }
}