import * as vsc from 'vscode';
import EdifactSegmentInfo from './edifactSegmentInfo';

export class EdifactStatusBarPresenter implements vsc.Disposable {

    private m_MessageTypeBarItem : vsc.StatusBarItem;
    private m_SegmentBarItem : vsc.StatusBarItem;
    private m_EventSubscription : vsc.Disposable;

    constructor() {
        this.m_MessageTypeBarItem = vsc.window.createStatusBarItem(vsc.StatusBarAlignment.Left);
        this.m_SegmentBarItem = vsc.window.createStatusBarItem(vsc.StatusBarAlignment.Left);
        this.m_EventSubscription = vsc.window.onDidChangeTextEditorSelection(this.refresh, this);
    }

    private hideBarItems() {
        this.m_MessageTypeBarItem.hide();
        this.m_SegmentBarItem.hide();
    }

    private showBarItems() {
        this.m_MessageTypeBarItem.show();
        this.m_SegmentBarItem.show();
    }

    refresh() {
        let editor = vsc.window.activeTextEditor;
        if (editor && editor.document.languageId === 'edifact') {
            // Add code to determine message type and segment
            this.showBarItems();
        }
        else {
            this.hideBarItems();
        }
    }

    dispose() {
        this.m_MessageTypeBarItem.dispose();
        this.m_SegmentBarItem.dispose();
        this.m_EventSubscription.dispose();
    }
}