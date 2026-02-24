import type { AppId } from '@/lib/types/desktop';

export interface AppDefinition {
  id: AppId;
  title: string;
  dockLabel: string;
  command: string;
  color: string;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
}

export const appDefinitions: AppDefinition[] = [
  {
    id: 'about',
    title: 'About Alex',
    dockLabel: 'About',
    command: 'about',
    color: '#f08c5b',
    defaultSize: { width: 700, height: 540 },
    defaultPosition: { x: 120, y: 90 },
  },
  {
    id: 'projects',
    title: 'Projects',
    dockLabel: 'Projects',
    command: 'projects',
    color: '#6ec2ff',
    defaultSize: { width: 920, height: 600 },
    defaultPosition: { x: 170, y: 120 },
  },
  {
    id: 'skills',
    title: 'Skills',
    dockLabel: 'Skills',
    command: 'skills',
    color: '#96d56f',
    defaultSize: { width: 760, height: 560 },
    defaultPosition: { x: 190, y: 130 },
  },
  {
    id: 'experience',
    title: 'Experience',
    dockLabel: 'Experience',
    command: 'experience',
    color: '#d7b96b',
    defaultSize: { width: 760, height: 560 },
    defaultPosition: { x: 210, y: 140 },
  },
  {
    id: 'contact',
    title: 'Contact',
    dockLabel: 'Contact',
    command: 'contact',
    color: '#9fd6d0',
    defaultSize: { width: 680, height: 520 },
    defaultPosition: { x: 220, y: 150 },
  },
  {
    id: 'blog',
    title: 'Blog & Links',
    dockLabel: 'Blog',
    command: 'blog',
    color: '#f1a0cc',
    defaultSize: { width: 680, height: 480 },
    defaultPosition: { x: 230, y: 160 },
  },
  {
    id: 'code',
    title: 'Visual Studio Code',
    dockLabel: 'Code',
    command: 'code',
    color: '#4ca5ff',
    defaultSize: { width: 960, height: 620 },
    defaultPosition: { x: 140, y: 96 },
  },
  {
    id: 'files',
    title: 'Files',
    dockLabel: 'Files',
    command: 'files',
    color: '#97a7f5',
    defaultSize: { width: 860, height: 560 },
    defaultPosition: { x: 150, y: 110 },
  },
  {
    id: 'terminal',
    title: 'Terminal',
    dockLabel: 'Terminal',
    command: 'terminal',
    color: '#8eaac7',
    defaultSize: { width: 800, height: 460 },
    defaultPosition: { x: 180, y: 150 },
  },
  {
    id: 'settings',
    title: 'Settings',
    dockLabel: 'Settings',
    command: 'settings',
    color: '#76c0a3',
    defaultSize: { width: 760, height: 560 },
    defaultPosition: { x: 200, y: 120 },
  },
  {
    id: 'notes',
    title: 'Notepad',
    dockLabel: 'Notes',
    command: 'notes',
    color: '#f2d37a',
    defaultSize: { width: 620, height: 500 },
    defaultPosition: { x: 220, y: 128 },
  },
];

export const appDefinitionMap = Object.fromEntries(
  appDefinitions.map((app) => [app.id, app]),
) as Record<AppId, AppDefinition>;
