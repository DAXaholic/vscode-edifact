import * as assert from "assert";
import EdifactSegmentInfo from "../src/edifactSegmentInfo";
import EdifactUnaInfo from "../src/edifactUnaInfo";
import Helper from "./helper";

suite("Unit Tests", () => {
    suite("EdifactUnaInfo", () => {
        test('"UNA:+.? #" is valid UNA data', () => {
            assert(EdifactUnaInfo.isValidUnaData("UNA:+.? #"));
        });

        test('"UNA:+.? #" has segment terminator "#"', () => {
            const unaInfo = new EdifactUnaInfo("UNA:+.? #");
            assert.strictEqual(unaInfo.segmentTerminator, "#");
        });

        test('"UN :+.? #" is invalid UNA data', () => {
            assert(!EdifactUnaInfo.isValidUnaData("UN :+.? #"));
        });

        test('"UNA:+.? # " is invalid UNA data', () => {
            assert(!EdifactUnaInfo.isValidUnaData("UNA:+.? # "));
        });

        test("Provide defaults (:+.? ') in absence of UNA segment", () => {
            const content = Helper.readTestFileSync(
                "sample_no_una_single_line.edi");
            const fileUnaInfo = EdifactUnaInfo.determineFromEdifactData(content);
            assert.deepStrictEqual(fileUnaInfo, EdifactUnaInfo.default);
        });
    });

    suite("EdifactSegmentInfo", () => {
        const dtmSegmentTestData = "DTM+132:201708071456:203?'";

        test(`"${dtmSegmentTestData}" has segment "DTM" in line 0 starting at char 0 and ending at char 25`, () => {
            const segmentInfo = new EdifactSegmentInfo(
                0,
                0,
                0,
                dtmSegmentTestData.length - 1,
                dtmSegmentTestData);
            assert.strictEqual(segmentInfo.segment, "DTM");
            assert.strictEqual(segmentInfo.startLineIndex, 0);
            assert.strictEqual(segmentInfo.startCharIndex, 0);
            assert.strictEqual(segmentInfo.endLineIndex, 0);
            assert.strictEqual(segmentInfo.endCharIndex, 25);
        });

        suite("Extracts segments for ", () => {
            const expectedSegments = [
                "UNA", "UNB", "UNH", "BGM", "DTM", "NAD",
                "LIN", "QTY", "UNS", "CNT", "UNT", "UNZ",
            ];

            suite("single line EDIFACT file with ", () => {
                test("standard (') segment delimiter", () => {
                    const fileData = Helper.readTestFileSync(
                        "sample_std_seg_delimiter_single_line.edi");
                    const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(fileData);
                    const segments = segmentInfos.map((x) => x.segment);
                    assert.deepStrictEqual(segments, expectedSegments);
                });

                test("hash (#) segment delimiter", () => {
                    const fileData = Helper.readTestFileSync(
                        "sample_hash_seg_delimiter_single_line.edi");
                    const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(fileData);
                    const segments = segmentInfos.map((x) => x.segment);
                    assert.deepStrictEqual(segments, expectedSegments);
                });
            });

            suite("formatted EDIFACT file with ", () => {
                test("standard (') segment delimiter", () => {
                    const fileData = Helper.readTestFileSync(
                        "sample_std_seg_delimiter_formatted.edi");
                    const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(fileData);
                    const segments = segmentInfos.map((x) => x.segment);
                    assert.deepStrictEqual(segments, expectedSegments);
                });

                test("hash (#) segment delimiter", () => {
                    const fileData = Helper.readTestFileSync(
                        "sample_hash_seg_delimiter_formatted.edi");
                    const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(fileData);
                    const segments = segmentInfos.map((x) => x.segment);
                    assert.deepStrictEqual(segments, expectedSegments);
                });

                test("CRLF line ending", () => {
                    const fileData = Helper.readTestFileSync(
                        "sample_crlf_line_ending_formatted.edi");
                    const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(fileData);
                    const segments = segmentInfos.map((x) => x.segment);
                    assert.deepStrictEqual(segments, expectedSegments);
                });

                test("LF line ending", () => {
                    const fileData = Helper.readTestFileSync(
                        "sample_lf_line_ending_formatted.edi");
                    const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(fileData);
                    const segments = segmentInfos.map((x) => x.segment);
                    assert.deepStrictEqual(segments, expectedSegments);
                });
            });

            test("EDIFACT file with line break", () => {
                const fileData = Helper.readTestFileSync(
                    "sample_line_break.edi");
                const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(fileData);
                const segments = segmentInfos.map((x) => x.segment);
                assert.deepStrictEqual(segments, expectedSegments);
            });

            test("EDIFACT file with escaped release character in front of segment delimiter", () => {
                const fileData = Helper.readTestFileSync(
                    "sample_esc_release_char_before_seg_delimiter_single_line.edi");
                const segmentInfos = EdifactSegmentInfo.getSegmentsFromEdifactData(fileData);
                const segments = segmentInfos.map((x) => x.segment);
                assert.deepStrictEqual(segments, expectedSegments);
            });
        });
    });
});

suite("Complex Command Tests", () => {
    suite("Format single line EDIFACT file with ", () => {
        test("standard (') segment delimiter", () => {
            const formattedText = Helper.readTestFileSync(
                "sample_std_seg_delimiter_formatted.edi");
            return Helper
                .openAndFormatTestFile("sample_std_seg_delimiter_single_line.edi")
                .then((editorText) => {
                    assert.strictEqual(
                        editorText,
                        formattedText,
                        "Editor text does not match preformatted EDIFACT file");
                });
        });

        test("hash (#) segment delimiter", () => {
            const formattedText = Helper.readTestFileSync(
                "sample_hash_seg_delimiter_formatted.edi");
            return Helper
                .openAndFormatTestFile("sample_hash_seg_delimiter_single_line.edi")
                .then((editorText) => {
                    assert.strictEqual(
                        editorText,
                        formattedText,
                        "Editor text does not match preformatted EDIFACT file");
                });
        });

        test("escaped release character in front of segment delimiter", () => {
            const formattedText = Helper.readTestFileSync(
                "sample_esc_release_char_before_seg_delimiter_formatted.edi");
            return Helper
                .openAndFormatTestFile(
                    "sample_esc_release_char_before_seg_delimiter_single_line.edi")
                .then((editorText) => {
                    assert.strictEqual(
                        editorText,
                        formattedText,
                        "Editor text does not match preformatted EDIFACT file");
                });
        });
    });

    suite("Auto. detect EDIFACT language on file ", () => {
        test("without UNA segment", () => {
            return Helper
                .openTestFile("sample_auto_detect_no_una")
                .then((textEditor) => {
                    assert.strictEqual(
                        textEditor.document.languageId,
                        "edifact");
                });
        });

        test("with UNA segment", () => {
            return Helper
                .openTestFile("sample_auto_detect_with_una")
                .then((textEditor) => {
                    assert.strictEqual(
                        textEditor.document.languageId,
                        "edifact");
                });
        });
    });
});
