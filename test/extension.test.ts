import * as assert from 'assert';
import * as fs from 'fs';
import Helper from './helper';

suite("Complex Command Tests", () => {
    suite("Format unformatted EDIFACT file with ", () => {
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
    });
});