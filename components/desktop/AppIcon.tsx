'use client';

import { clsx } from 'clsx';
import {
  Folder,
  Gauge,
  Mail,
  Newspaper,
  Settings,
  Terminal,
  User,
  Wrench,
  BriefcaseBusiness,
} from 'lucide-react';

import type { AppId } from '@/lib/types/desktop';

interface AppIconProps {
  appId: AppId;
  className?: string;
}

const icons = {
  about: User,
  projects: BriefcaseBusiness,
  skills: Wrench,
  experience: Gauge,
  contact: Mail,
  blog: Newspaper,
  files: Folder,
  terminal: Terminal,
  settings: Settings,
} as const;

export function AppIcon({ appId, className }: AppIconProps) {
  const Icon = icons[appId];

  return (
    <Icon className={clsx('h-5 w-5 text-black/80', className)} strokeWidth={2.2} />
  );
}
