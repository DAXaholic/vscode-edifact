import * as vsc from "vscode";
import { EdifactFormattingEditProvider } from "./formattingProvider";
import { putAllSegmentsInSingleLineCommandHandler } from "./commandHandlers";
import { EdifactSymbolProvider } from "./symbolProvider";

export function activate(ctx: vsc.ExtensionContext) {
    ctx.subscriptions.push(
        vsc.languages.registerDocumentFormattingEditProvider(
            ["edifact"],
            new EdifactFormattingEditProvider()),
        vsc.languages.registerDocumentSymbolProvider(
            ["edifact"],
            new EdifactSymbolProvider()),
        vsc.commands.registerCommand(
            "edifact.putAllSegmentsToSingleLine",
            putAllSegmentsInSingleLineCommandHandler)
    );
}
