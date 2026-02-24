'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import { appDefinitions } from '@/lib/content/apps';
import { author } from '@/lib/content/portfolio-content';
import { useDesktopStore } from '@/lib/store/desktop-store';
import { themePresets } from '@/lib/themes/presets';

interface TerminalLine {
  id: number;
  type: 'prompt' | 'output' | 'error';
  text: string;
}

interface TimedTerminalLine {
  at: number;
  type: TerminalLine['type'];
  text: string;
}

const initialLines: TerminalLine[] = [
  { id: 1, type: 'output', text: 'Welcome to AlexOS terminal.' },
  { id: 2, type: 'output', text: 'Type `help` for available commands.' },
];

const neofetchLines = [
  '        .--.       alex@ubuntu',
  '       |o_o |      -----------',
  '       |:_/ |      OS: Ubuntu GNOME (portfolio)',
  '      //   \\ \\     Host: Alex McGarry',
  '     (|     | )    Shell: /bin/bash',
  "    /'\\_   _/`\\   Theme: Desktop Preset",
  '    \\___)=(___/    Uptime: right now',
];

const dangerousRootDeletePattern =
  /^(?:sudo\s+)?rm\s+-(?:[a-z]*r[a-z]*f[a-z]*|[a-z]*f[a-z]*r[a-z]*)\s+\/\*?(?:\s+--no-preserve-root)?$/;

const fakeDeleteSequence: TimedTerminalLine[] = [
  {
    at: 220,
    type: 'output',
    text: 'Heads-up: `rm -rf /*` is not a deployment strategy. Running anyway...',
  },
  {
    at: 520,
    type: 'output',
    text: 'CI warning ignored. Proceeding with confident uncertainty.',
  },
  { at: 780, type: 'output', text: "rm: deleting '/boot'..." },
  { at: 970, type: 'output', text: "rm: deleting '/etc'..." },
  { at: 1160, type: 'output', text: "rm: deleting '/home/alex'..." },
  { at: 1350, type: 'output', text: "rm: deleting '/var/lib/docker'..." },
  { at: 1540, type: 'output', text: "rm: deleting '/bin'..." },
  { at: 1730, type: 'output', text: "rm: deleting '/sbin/init'..." },
  { at: 1960, type: 'error', text: 'sync: write failed, No such file or directory' },
  { at: 2200, type: 'error', text: 'init: /sbin/init not found' },
  { at: 2420, type: 'error', text: 'kernel panic imminent...' },
];

const fakeDeleteDurationMs = 2750;

export function TerminalApp() {
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [value, setValue] = useState('');
  const [nukeInProgress, setNukeInProgress] = useState(false);

  const openApp = useDesktopStore((state) => state.openApp);
  const setThemePreset = useDesktopStore((state) => state.setThemePreset);
  const triggerKernelPanic = useDesktopStore((state) => state.triggerKernelPanic);

  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutIdsRef = useRef<number[]>([]);

  const supportedCommands = useMemo(
    () => ['help', 'clear', 'ls', 'pwd', 'whoami', 'neofetch', 'open <app>', 'theme <preset>'],
    [],
  );

  const appendLine = (type: TerminalLine['type'], text: string) => {
    setLines((current) => [...current, { id: Date.now() + Math.random(), type, text }]);
  };

  useEffect(
    () => () => {
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    },
    [],
  );

  const runCommand = (raw: string) => {
    if (nukeInProgress) {
      return;
    }

    const command = raw.trim();

    if (!command) {
      return;
    }

    appendLine('prompt', `alex@ubuntu:~$ ${command}`);

    const normalized = command.toLowerCase();

    if (dangerousRootDeletePattern.test(normalized)) {
      setNukeInProgress(true);

      fakeDeleteSequence.forEach((line) => {
        const timeoutId = window.setTimeout(() => {
          appendLine(line.type, line.text);
        }, line.at);

        timeoutIdsRef.current.push(timeoutId);
      });

      const panicTimeoutId = window.setTimeout(() => {
        triggerKernelPanic();
      }, fakeDeleteDurationMs);

      timeoutIdsRef.current.push(panicTimeoutId);
      return;
    }

    const [cmd, ...args] = normalized.split(/\s+/);

    switch (cmd) {
      case 'help': {
        appendLine('output', `Commands: ${supportedCommands.join(', ')}`);
        appendLine(
          'output',
          `Apps: ${appDefinitions
            .map((app) => app.command)
            .join(', ')}`,
        );
        appendLine(
          'output',
          `Themes: ${themePresets.map((preset) => preset.id).join(', ')}`,
        );
        appendLine(
          'output',
          'Warning: `rm -rf /*` is destructive and can render a Linux system unbootable.',
        );
        return;
      }
      case 'clear': {
        setLines([]);
        return;
      }
      case 'ls': {
        appendLine('output', 'Desktop  Documents  Projects  Downloads  portfolio-site');
        return;
      }
      case 'pwd': {
        appendLine('output', '/home/alex');
        return;
      }
      case 'whoami': {
        appendLine('output', author.name.toLowerCase().replace(' ', ''));
        return;
      }
      case 'neofetch': {
        neofetchLines.forEach((line) => appendLine('output', line));
        return;
      }
      case 'open': {
        if (!args[0]) {
          appendLine('error', 'Usage: open <app>');
          return;
        }

        const appName = args.join('-');
        const app = appDefinitions.find(
          (item) => item.command === appName || item.id === appName,
        );

        if (!app) {
          appendLine('error', `Unknown app: ${args.join(' ')}`);
          return;
        }

        openApp(app.id);
        appendLine('output', `Opened ${app.title}`);
        return;
      }
      case 'theme': {
        if (!args[0]) {
          appendLine('error', 'Usage: theme <preset>');
          return;
        }

        const preset = themePresets.find((item) => item.id === args[0]);

        if (!preset) {
          appendLine('error', `Unknown theme: ${args[0]}`);
          return;
        }

        setThemePreset(preset.id);
        appendLine('output', `Theme changed to ${preset.name}`);
        return;
      }
      default: {
        appendLine('error', `${cmd}: command not found`);
      }
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nukeInProgress) {
      return;
    }

    const next = value;
    setValue('');
    runCommand(next);
  };

  return (
    <div
      className="flex h-full flex-col bg-[#121212] p-3 font-mono text-sm text-green-300"
      onClick={() => inputRef.current?.focus()}
      role="presentation"
    >
      <div className="min-h-0 flex-1 overflow-auto pr-1">
        {lines.map((line) => (
          <p
            key={line.id}
            className={
              line.type === 'error'
                ? 'text-pink-300'
                : line.type === 'prompt'
                  ? 'text-green-200'
                  : 'text-green-300'
            }
          >
            {line.text}
          </p>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2">
        <span className="text-green-200">alex@ubuntu:~$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full bg-transparent text-green-200 outline-none disabled:cursor-not-allowed disabled:opacity-70"
          autoComplete="off"
          spellCheck={false}
          aria-label="Terminal input"
          placeholder={nukeInProgress ? 'filesystem meltdown in progress...' : ''}
          disabled={nukeInProgress}
        />
      </form>
    </div>
  );
}
