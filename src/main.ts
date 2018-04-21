import * as vsc from 'vscode';
import { EdifactFormattingEditProvider } from './formattingProvider';
import { EdifactSymbolProvider } from './symbolProvider';
import { EdifactStatusBarPresenter } from './statusBarPresenter';

export function activate(ctx: vsc.ExtensionContext) {
    ctx.subscriptions.push(
        vsc.languages.registerDocumentFormattingEditProvider(
            ['edifact'],
            new EdifactFormattingEditProvider()),
        vsc.languages.registerDocumentSymbolProvider(
            ['edifact'],
            new EdifactSymbolProvider()),
        new EdifactStatusBarPresenter()
    );
}