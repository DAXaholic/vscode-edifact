import EdifactUnaInfo from "./edifactUnaInfo";

export function putEachSegmentInNewLine(edifactData: string) {
    const unaInfo = EdifactUnaInfo.determineFromEdifactData(edifactData);
    const rc = unaInfo.releaseCharacter;
    const st = unaInfo.segmentTerminator;

    // Append newlines after all non-escaped segment terminators
    const searchRegExp = new RegExp(`([^${rc}]|[^${rc}](\\${rc}\\${rc})+)${st}(?=.)`, "g");
    const transformedData = edifactData.replace(searchRegExp, `$1${st}\n`);

    return transformedData;
}

export function putAllSegmentsToSingleLine(edifactData: string) {
    // Remove all newlines
    const searchRegExp = new RegExp(`\r?\n`, "g");
    const transformedData = edifactData.replace(searchRegExp, "");

    return transformedData;
}
