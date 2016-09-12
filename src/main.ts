import * as vsc from 'vscode';
import { EdifactFormattingEditProvider } from './formattingProvider';

export function activate(ctx: vsc.ExtensionContext) {
    ctx.subscriptions.push(
        vsc.languages.registerDocumentFormattingEditProvider(
            ['edifact'],
            new EdifactFormattingEditProvider())
    );
}