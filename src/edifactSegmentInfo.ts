import EdifactUnaInfo from "./edifactUnaInfo";

export default class EdifactSegmentInfo {

    public static getSegmentsFromEdifactData(edifactData: string) {
        const unaInfo = EdifactUnaInfo.determineFromEdifactData(edifactData);
        const rc = unaInfo.releaseCharacter;
        const st = unaInfo.segmentTerminator;
        const searchRegExp = new RegExp(`(^|([^${rc}]|[^${rc}](\\${rc}\\${rc})+)${st}).`, "g");
        const lines = edifactData.replace(/\r?\n/g, "\n").split("\n");
        const segmentStarts = [];
        for (let lineIdx = 0; lineIdx < lines.length; ++lineIdx) {
            const line = lines[lineIdx];
            let match = searchRegExp.exec(line);
            while (match !== null) {
                // Only consider start of line as new segment if previous line
                // ended with segment terminator
                if (lineIdx === 0 || lines[lineIdx - 1].endsWith(st)) {
                    const startIdx = match.index + match[1].length;
                    segmentStarts.push({lineIdx, startIdx});
                }
                match = searchRegExp.exec(line);
            }
        }
        const segmentInfos: EdifactSegmentInfo[] = [];
        for (let i = 0; i < segmentStarts.length; ++i) {
            const segmentStart = segmentStarts[i];
            const line = lines[segmentStart.lineIdx];
            const startIdx = segmentStart.startIdx;
            let endIdx = line.length;
            if ((i < segmentStarts.length - 1) &&
                (segmentStarts[i + 1].lineIdx === segmentStart.lineIdx)) {
                endIdx = segmentStarts[i + 1].startIdx - 1;
            }
            const segmentText = line.substring(startIdx, endIdx);
            const segmentInfo = new EdifactSegmentInfo(
                segmentStart.lineIdx,
                startIdx,
                segmentStart.lineIdx,
                endIdx,
                segmentText);
            segmentInfos.push(segmentInfo);
        }
        return segmentInfos;
    }

    public readonly startLineIndex: number;
    public readonly startCharIndex: number;
    public readonly endLineIndex: number;
    public readonly endCharIndex: number;
    public readonly rawData: string;
    public readonly segment: string;

    constructor(
        startLineIndex: number, startCharIndex: number,
        endLineIndex: number, endCharIndex: number,
        rawData: string,
        ) {

        this.startLineIndex = startLineIndex;
        this.startCharIndex = startCharIndex;
        this.endLineIndex = endLineIndex;
        this.endCharIndex = endCharIndex;
        this.rawData = rawData;
        this.segment = rawData.substr(0, 3);
    }
}
