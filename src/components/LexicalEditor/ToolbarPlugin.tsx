"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    REDO_COMMAND,
    UNDO_COMMAND,
    FORMAT_TEXT_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $getSelection, $isRangeSelection, ElementFormatType } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode, HeadingTagType } from "@lexical/rich-text";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { mergeRegister } from "@lexical/utils";
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaQuoteLeft, FaUndo, FaRedo, FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";

export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
            setIsUnderline(selection.hasFormat("underline"));
        }
    }, []);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, _newEditor) => {
                    updateToolbar();
                    return false;
                },
                1
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                1
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                1
            )
        );
    }, [editor, updateToolbar]);

    const formatHeading = (headingSize: HeadingTagType) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(headingSize));
            }
        });
    };

    const formatQuote = () => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createQuoteNode());
            }
        });
    };

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-800 border-b border-slate-700 rounded-t-xl mb-1">
            <button
                type="button"
                disabled={!canUndo}
                onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
                className="p-2 hover:bg-slate-700 text-slate-300 disabled:opacity-30 rounded transition-colors"
                title="Undo"
            >
                <FaUndo size={14} />
            </button>
            <button
                type="button"
                disabled={!canRedo}
                onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
                className="p-2 hover:bg-slate-700 text-slate-300 disabled:opacity-30 rounded transition-colors"
                title="Redo"
            >
                <FaRedo size={14} />
            </button>

            <div className="w-px h-6 bg-slate-700 mx-1" />

            <button
                type="button"
                onClick={() => formatHeading("h1")}
                className="px-2 py-1 text-xs font-bold hover:bg-slate-700 text-slate-300 rounded transition-colors"
            >
                H1
            </button>
            <button
                type="button"
                onClick={() => formatHeading("h2")}
                className="px-2 py-1 text-xs font-bold hover:bg-slate-700 text-slate-300 rounded transition-colors"
            >
                H2
            </button>

            <div className="w-px h-6 bg-slate-700 mx-1" />

            <button
                type="button"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
                className={`p-2 hover:bg-slate-700 rounded transition-colors ${isBold ? "bg-indigo-600 text-white" : "text-slate-300"}`}
                title="Bold"
            >
                <FaBold size={14} />
            </button>
            <button
                type="button"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
                className={`p-2 hover:bg-slate-700 rounded transition-colors ${isItalic ? "bg-indigo-600 text-white" : "text-slate-300"}`}
                title="Italic"
            >
                <FaItalic size={14} />
            </button>
            <button
                type="button"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
                className={`p-2 hover:bg-slate-700 rounded transition-colors ${isUnderline ? "bg-indigo-600 text-white" : "text-slate-300"}`}
                title="Underline"
            >
                <FaUnderline size={14} />
            </button>

            <div className="w-px h-6 bg-slate-700 mx-1" />

            <button
                type="button"
                onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
                className="p-2 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                title="Bullet List"
            >
                <FaListUl size={14} />
            </button>
            <button
                type="button"
                onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
                className="p-2 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                title="Numbered List"
            >
                <FaListOl size={14} />
            </button>
            <button
                type="button"
                onClick={formatQuote}
                className="p-2 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                title="Quote"
            >
                <FaQuoteLeft size={14} />
            </button>

            <div className="w-px h-6 bg-slate-700 mx-1" />

            <button
                type="button"
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
                className="p-2 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                title="Align Left"
            >
                <FaAlignLeft size={14} />
            </button>
            <button
                type="button"
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
                className="p-2 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                title="Align Center"
            >
                <FaAlignCenter size={14} />
            </button>
            <button
                type="button"
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
                className="p-2 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                title="Align Right"
            >
                <FaAlignRight size={14} />
            </button>
        </div>
    );
}
