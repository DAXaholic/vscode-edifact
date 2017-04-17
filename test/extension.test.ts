import * as assert from 'assert';
import * as fs from 'fs';
import EdifactUnaInfo from '../src/edifactUnaInfo'
import Helper from './helper';

suite('Unit Tests', () => {
    suite('EdifactUnaInfo', () => {
        test('"UNA:+.? #" is valid UNA data', () => {
            assert(EdifactUnaInfo.isValidUnaData('UNA:+.? #'));
        });

        test('"UNA:+.? #" has segment terminator "#"', () => {
            const unaInfo = new EdifactUnaInfo('UNA:+.? #');
            assert.equal(unaInfo.segmentTerminator, '#');
        });

        test('"UN :+.? #" is invalid UNA data', () => {
            assert(!EdifactUnaInfo.isValidUnaData('UN :+.? #'));
        });

        test('"UNA:+.? # " is invalid UNA data', () => {
            assert(!EdifactUnaInfo.isValidUnaData('UNA:+.? # '));
        });

        test("Provide defaults (:+.? ') in absence of UNA segment", () => {
            const filePath = Helper.resolveTestFilePath(
                'sample_no_una_unformatted.edi');
            const content = fs.readFileSync(filePath).toString();
            const fileUnaInfo = EdifactUnaInfo.determineFromEdifactData(content);
            assert.deepStrictEqual(fileUnaInfo, EdifactUnaInfo.default);
        });
    });
});

suite('Complex Command Tests', () => {
    suite('Format unformatted EDIFACT file with ', () => {
        test("standard (') segment delimiter", () => {
            const fileUnformattedPath = Helper.resolveTestFilePath(
                'sample_std_seg_delimiter_unformatted.edi');
            const fileFormattedPath = Helper.resolveTestFilePath(
                'sample_std_seg_delimiter_formatted.edi');
            const formattedText = fs.readFileSync(fileFormattedPath).toString();
            return Helper
                .openAndFormatFile(fileUnformattedPath)
                .then(editorText => {
                    assert.equal(
                        editorText,
                        formattedText,
                        'Editor text does not match preformatted EDIFACT file');
                });
        });

        test('hash (#) segment delimiter', () => {
            const fileUnformattedPath = Helper.resolveTestFilePath(
                'sample_hash_seg_delimiter_unformatted.edi');
            const fileFormattedPath = Helper.resolveTestFilePath(
                'sample_hash_seg_delimiter_formatted.edi');
            const formattedText = fs.readFileSync(fileFormattedPath).toString();
            return Helper
                .openAndFormatFile(fileUnformattedPath)
                .then(editorText => {
                    assert.equal(
                        editorText,
                        formattedText,
                        'Editor text does not match preformatted EDIFACT file');
                });
        });
    });
});