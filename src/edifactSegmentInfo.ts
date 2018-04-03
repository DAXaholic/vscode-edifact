import EdifactUnaInfo from './edifactUnaInfo'

export default class EdifactSegmentInfo {

    private readonly unaInfo: EdifactUnaInfo;
    readonly startLineIndex: number;
    readonly startCharIndex: number;
    readonly endLineIndex: number;
    readonly endCharIndex: number;
    readonly rawData: string;
    readonly segment: string;

    constructor(
        unaInfo: EdifactUnaInfo,
        startLineIndex: number, startCharIndex: number,
        endLineIndex: number, endCharIndex: number,
        rawData: string
        ) {

        this.unaInfo = unaInfo;
        this.startLineIndex = startLineIndex;
        this.startCharIndex = startCharIndex;
        this.endLineIndex = endLineIndex;
        this.endCharIndex = endCharIndex;
        this.rawData = rawData;
        this.segment = rawData.substr(0, 3);
    }

    static getSegmentsFromEdifactData(edifactData: string) {
        const unaInfo = EdifactUnaInfo.determineFromEdifactData(edifactData);
        const rc = unaInfo.releaseCharacter;
        const st = unaInfo.segmentTerminator;
        const searchRegExp = new RegExp(`(^|[^${rc}]${st}).`, 'g');
        const lines = edifactData.replace(/\r?\n/g, '\n').split('\n');
        let segmentStarts = []
        for (let lineIdx = 0; lineIdx < lines.length; ++lineIdx) { 
            let line = lines[lineIdx];
            let match : RegExpExecArray;
            while ((match = searchRegExp.exec(line)) != null) {
                // Only consider start of line as new segment if previous line
                // ended with segment terminator
                if (lineIdx == 0 || lines[lineIdx-1].endsWith(st)) {
                    const startIdx = match.index + match[1].length;
                    segmentStarts.push({lineIdx: lineIdx, startIdx: startIdx});
                }
            }
        }
        let segmentInfos: EdifactSegmentInfo[] = [];
        for (let i = 0; i < segmentStarts.length; ++i) {
            const segmentStart = segmentStarts[i];
            const line = lines[segmentStart.lineIdx];
            const startIdx = segmentStart.startIdx;
            let endIdx = line.length - 1;
            if ((i < segmentStarts.length - 1) &&
                (segmentStarts[i+1].lineIdx === segmentStart.lineIdx)) {
                endIdx = segmentStarts[i+1].startIdx - 1;
            }
            const segmentText = line.substring(startIdx, endIdx);
            const segmentInfo = new EdifactSegmentInfo(
                unaInfo,
                segmentStart.lineIdx,
                startIdx,
                segmentStart.lineIdx,
                endIdx,
                segmentText);
            segmentInfos.push(segmentInfo);
        }
        return segmentInfos;
    }
}