export default class EdifactUnaInfo {

    public static readonly default = new EdifactUnaInfo("UNA:+.? '");

    public static isValidUnaData(unaData: string) {
        return (unaData.length === 9 && unaData.startsWith("UNA"));
    }

    public static determineFromEdifactData(edifactData: string) {
        const unaData = edifactData.trim().substr(0, 9);
        if (EdifactUnaInfo.isValidUnaData(unaData)) {
            return new EdifactUnaInfo(unaData);
        }
        else {
            return this.default;
        }
    }

    public readonly compDataElementSeparator: string;
    public readonly dataElementSeparator: string;
    public readonly decimalNotation: string;
    public readonly releaseCharacter: string;
    public readonly reservedValue: string;
    public readonly segmentTerminator: string;

    constructor(unaData: string) {
        if (!EdifactUnaInfo.isValidUnaData(unaData)) {
            throw new Error('UNA segment must be 9 characters long and prefixed with "UNA"');
        }
        this.compDataElementSeparator = unaData[3];
        this.dataElementSeparator = unaData[4];
        this.decimalNotation = unaData[5];
        this.releaseCharacter = unaData[6];
        this.reservedValue = unaData[7];
        this.segmentTerminator = unaData[8];
    }
}
