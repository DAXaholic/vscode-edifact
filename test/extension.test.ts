import * as assert from 'assert';
import EdifactUnaInfo from '../src/edifactUnaInfo';
import EdifactSegmentInfo from '../src/edifactSegmentInfo';
import Helper from './helper';

suite('Unit Tests', () => {
    suite('EdifactUnaInfo', () => {
        test('"UNA:+.? #" is valid UNA data', () => {
            assert(EdifactUnaInfo.isValidUnaData('UNA:+.? #'));
        });

        test('"UNA:+.? #" has segment terminator "#"', () => {
            const unaInfo = new EdifactUnaInfo('UNA:+.? #');
            assert.strictEqual(unaInfo.segmentTerminator, '#');
        });

        test('"UN :+.? #" is invalid UNA data', () => {
            assert(!EdifactUnaInfo.isValidUnaData('UN :+.? #'));
        });

        test('"UNA:+.? # " is invalid UNA data', () => {
            assert(!EdifactUnaInfo.isValidUnaData('UNA:+.? # '));
        });

        test("Provide defaults (:+.? ') in absence of UNA segment", () => {
            const content = Helper.readTestFileSync(
                'sample_no_una_unformatted.edi');
            const fileUnaInfo = EdifactUnaInfo.determineFromEdifactData(content);
            assert.deepStrictEqual(fileUnaInfo, EdifactUnaInfo.default);
        });
    });

    suite('EdifactSegmentInfo', () => {
        const dtmSegmentTestData = "DTM+132:201708071456:203?'";

        test(`"${dtmSegmentTestData}" has segment "DTM" in line 0 starting at char 0 and ending at char 25`, () => {
            const segmentInfo = new EdifactSegmentInfo(
                EdifactUnaInfo.default,
                0,
                0,
                0,
                dtmSegmentTestData.length - 1,
                dtmSegmentTestData);
            assert.strictEqual(segmentInfo.segment, 'DTM');
            assert.strictEqual(segmentInfo.startLineIndex, 0);
            assert.strictEqual(segmentInfo.startCharIndex, 0);
            assert.strictEqual(segmentInfo.endLineIndex, 0);
            assert.strictEqual(segmentInfo.endCharIndex, 25);
        });

        suite("Extracts segments for ", () => {
            const expectedSegments = ['UNA', 'UNB', 'UNH', 'BGM', 'DTM', 'NAD', 'LIN', 'QTY', 'UNS', 'CNT', 'UNT', 'UNZ'];

            suite("unformatted EDIFACT file with ", () => {
                test("standard (') segment delimiter", () => {
                    const fileData = Helper.readTestFileSync(
                        'sample_std_seg_delimiter_unformatted.edi');
                    const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(fileData);
                    const segments = segmentInfos.map(x => x.segment);
                    assert.deepStrictEqual(segments, expectedSegments);
                });

                test('hash (#) segment delimiter', () => {
                    const fileData = Helper.readTestFileSync(
                        'sample_hash_seg_delimiter_unformatted.edi');
                    const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(fileData);
                    const segments = segmentInfos.map(x => x.segment);
                    assert.deepStrictEqual(segments, expectedSegments);
                });
            });

            suite("formatted EDIFACT file with ", () => {
                test("standard (') segment delimiter", () => {
                    const fileData = Helper.readTestFileSync(
                        'sample_std_seg_delimiter_formatted.edi');
                    const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(fileData);
                    const segments = segmentInfos.map(x => x.segment);
                    assert.deepStrictEqual(segments, expectedSegments);
                });

                test('hash (#) segment delimiter', () => {
                    const fileData = Helper.readTestFileSync(
                        'sample_hash_seg_delimiter_formatted.edi');
                    const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(fileData);
                    const segments = segmentInfos.map(x => x.segment);
                    assert.deepStrictEqual(segments, expectedSegments);
                });
            });
        });
    });
});

suite('Complex Command Tests', () => {
    suite('Format unformatted EDIFACT file with ', () => {
        test("standard (') segment delimiter", () => {
            const formattedText = Helper.readTestFileSync(
                'sample_std_seg_delimiter_formatted.edi');
            return Helper
                .openAndFormatTestFile('sample_std_seg_delimiter_unformatted.edi')
                .then(editorText => {
                    assert.strictEqual(
                        editorText,
                        formattedText,
                        'Editor text does not match preformatted EDIFACT file');
                });
        });

        test('hash (#) segment delimiter', () => {
            const formattedText = Helper.readTestFileSync(
                'sample_hash_seg_delimiter_formatted.edi');
            return Helper
                .openAndFormatTestFile('sample_hash_seg_delimiter_unformatted.edi')
                .then(editorText => {
                    assert.strictEqual(
                        editorText,
                        formattedText,
                        'Editor text does not match preformatted EDIFACT file');
                });
        });
    });
});