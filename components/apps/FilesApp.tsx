'use client';

import { ReactNode, useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  Folder,
} from 'lucide-react';

import { fileTree, FileNode } from '@/lib/content/portfolio-content';

const findFirstFile = (node: FileNode): FileNode | null => {
  if (node.type === 'file') {
    return node;
  }

  for (const child of node.children) {
    const result = findFirstFile(child);
    if (result) {
      return result;
    }
  }

  return null;
};

const findNode = (node: FileNode, path: string): FileNode | null => {
  if (node.path === path) {
    return node;
  }

  if (node.type === 'folder') {
    for (const child of node.children) {
      const result = findNode(child, path);
      if (result) {
        return result;
      }
    }
  }

  return null;
};

const getAllFolderPaths = (node: FileNode): string[] => {
  if (node.type === 'file') {
    return [];
  }

  return [
    node.path,
    ...node.children.flatMap((child) => getAllFolderPaths(child)),
  ];
};

export function FilesApp() {
  const firstFilePath = findFirstFile(fileTree)?.path ?? '';
  const [selectedPath, setSelectedPath] = useState(firstFilePath);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(getAllFolderPaths(fileTree)),
  );

  const selectedNode = useMemo(
    () => findNode(fileTree, selectedPath),
    [selectedPath],
  );

  const toggleFolder = (path: string) => {
    setExpandedFolders((current) => {
      const next = new Set(current);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderNode = (node: FileNode, depth = 0): ReactNode => {
    if (node.type === 'folder') {
      const expanded = expandedFolders.has(node.path);

      return (
        <div key={node.path}>
          <button
            type="button"
            onClick={() => toggleFolder(node.path)}
            className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm hover:bg-white/10"
            style={{ paddingLeft: `${depth * 14 + 8}px` }}
          >
            {expanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
            <Folder className="h-4 w-4 text-(--accent-color)" />
            <span>{node.name}</span>
          </button>
          {expanded &&
            node.children.map((child) => renderNode(child, depth + 1))}
        </div>
      );
    }

    const isSelected = selectedPath === node.path;

    return (
      <button
        type="button"
        key={node.path}
        onClick={() => setSelectedPath(node.path)}
        className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm transition hover:bg-white/10"
        style={{
          paddingLeft: `${depth * 14 + 8}px`,
          backgroundColor: isSelected ? 'rgba(255,255,255,0.16)' : undefined,
        }}
      >
        <FileText className="h-4 w-4 text-(--muted-color)" />
        <span>{node.name}</span>
      </button>
    );
  };

  return (
    <div className="grid h-full grid-cols-1 text-(--text-color) md:grid-cols-[280px_1fr]">
      <aside className="border-b border-(--border-color) bg-black/25 p-3 md:border-b-0 md:border-r">
        <p className="mb-2 text-xs uppercase tracking-[0.16em] text-(--muted-color)">
          Filesystem
        </p>
        <div className="max-h-80 overflow-auto pr-1 md:max-h-none">
          {renderNode(fileTree)}
        </div>
      </aside>

      <section className="min-h-0 p-4 sm:p-5">
        {!selectedNode || selectedNode.type !== 'file' ? (
          <p className="text-sm text-(--muted-color)">
            Select a file from the left panel.
          </p>
        ) : (
          <>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-(--muted-color)">
                  {selectedNode.mime}
                </p>
                <h3 className="text-base font-semibold">{selectedNode.path}</h3>
              </div>
              {selectedNode.mime === 'link' ? (
                <a
                  href={selectedNode.content}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded border border-(--border-color) px-3 py-1 text-xs transition hover:bg-white/10"
                >
                  Open Link
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>

            <div className="h-[calc(100%-3rem)] overflow-auto rounded-lg border border-(--border-color) bg-black/25 p-3">
              {selectedNode.mime === 'link' ? (
                <p className="break-all text-sm text-(--accent-color)">
                  {selectedNode.content}
                </p>
              ) : (
                <pre className="whitespace-pre-wrap text-sm leading-6 text-(--text-color)">
                  {selectedNode.content}
                </pre>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
