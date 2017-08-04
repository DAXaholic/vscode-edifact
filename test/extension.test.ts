import * as assert from 'assert';
import EdifactUnaInfo from '../src/edifactUnaInfo';
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