"use client";
import React, { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";

import { theme } from "./EditorTheme";
import ToolbarPlugin from "./ToolbarPlugin";

interface LexicalEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

function OnChangePlugin({ onChange }: { onChange: (html: string) => void }) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const html = $generateHtmlFromNodes(editor);
                onChange(html);
            });
        });
    }, [editor, onChange]);
    return null;
}

function InitialStatePlugin({ value }: { value: string }) {
    const [editor] = useLexicalComposerContext();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized && value && value !== '<p><br></p>') {
            editor.update(() => {
                const parser = new DOMParser();
                const dom = parser.parseFromString(value, "text/html");
                const nodes = $generateNodesFromDOM(editor, dom);
                const root = $getRoot();
                root.clear();
                root.append(...nodes);
            });
            setInitialized(true);
        }
    }, [editor, value, initialized]);

    return null;
}

export default function LexicalEditor({ value, onChange, placeholder }: LexicalEditorProps) {
    const initialConfig = {
        namespace: "SangaloTechEditor",
        theme,
        nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, LinkNode],
        onError: (error: Error) => {
            console.error(error);
        },
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="editor-container relative border border-slate-700 rounded-xl bg-slate-900 overflow-hidden">
                <ToolbarPlugin />
                <div className="editor-inner relative min-h-[250px] p-4 text-white">
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable className="editor-input outline-none min-h-[250px]" />
                        }
                        placeholder={
                            <div className="absolute top-16 left-4 text-slate-500 pointer-events-none italic">
                                {placeholder || "Enter some rich text..."}
                            </div>
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <OnChangePlugin onChange={onChange} />
                    <InitialStatePlugin value={value} />
                </div>
            </div>

            <style jsx global>{`
                .editor-heading-h1 { font-size: 2.25rem; font-weight: 900; margin-bottom: 0.5rem; }
                .editor-heading-h2 { font-size: 1.875rem; font-weight: 800; margin-bottom: 0.5rem; }
                .editor-list-ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
                .editor-list-ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
                .editor-listitem { margin-bottom: 0.25rem; }
                .editor-quote { border-left: 4px solid #4f46e5; padding-left: 1rem; color: #94a3b8; font-style: italic; margin-bottom: 1rem; }
                .editor-text-bold { font-weight: bold; }
                .editor-text-italic { font-style: italic; }
                .editor-text-underline { text-decoration: underline; }
                .editor-paragraph { margin-bottom: 0.75rem; }
            `}</style>
        </LexicalComposer>
    );
}
