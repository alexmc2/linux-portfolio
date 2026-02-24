'use client';

type BootMode = 'startup' | 'recovery';

type BootLineTone = 'info' | 'ok' | 'warn' | 'cmd';

interface BootLine {
  at: number;
  line: string;
  tone: BootLineTone;
}

interface BootOverlayProps {
  progress: number;
  mode?: BootMode;
}

const startupLines: BootLine[] = [
  {
    at: 4,
    line: '[    0.198] Ubuntu 24.04.2 LTS (6.8.0-generic)',
    tone: 'info',
  },
  {
    at: 12,
    line: '[  OK  ] initramfs-tools loaded local-top scripts',
    tone: 'ok',
  },
  {
    at: 20,
    line: '[  OK  ] root mounted on /dev/nvme0n1p2 (ext4)',
    tone: 'ok',
  },
  {
    at: 30,
    line: '[  OK  ] Started systemd-udevd.service',
    tone: 'ok',
  },
  {
    at: 40,
    line: '[  OK  ] Started NetworkManager.service',
    tone: 'ok',
  },
  {
    at: 52,
    line: '[CMD ] netplan apply --sync',
    tone: 'cmd',
  },
  {
    at: 62,
    line: '[  OK  ] snapd.seeded.service completed',
    tone: 'ok',
  },
  {
    at: 74,
    line: '[  OK  ] Started gdm.service (GNOME Display Manager)',
    tone: 'ok',
  },
  {
    at: 86,
    line: '[WARN ] unattended-upgrades deferred until idle',
    tone: 'warn',
  },
  {
    at: 96,
    line: '[  OK  ] Reached target graphical.target',
    tone: 'ok',
  },
];

const recoveryLines: BootLine[] = [
  {
    at: 8,
    line: '[    0.041] Ubuntu recovery mode requested',
    tone: 'info',
  },
  {
    at: 16,
    line: '[  OK  ] fsck clean on /dev/nvme0n1p2',
    tone: 'ok',
  },
  {
    at: 28,
    line: '[  OK  ] apport crash reports archived',
    tone: 'ok',
  },
  {
    at: 40,
    line: '[  OK  ] replaying systemd journal',
    tone: 'ok',
  },
  {
    at: 55,
    line: '[CMD ] systemctl reset-failed',
    tone: 'cmd',
  },
  {
    at: 68,
    line: '[WARN ] previous panic marker moved to /var/crash',
    tone: 'warn',
  },
  {
    at: 80,
    line: '[  OK  ] gdm.service restarted',
    tone: 'ok',
  },
  {
    at: 96,
    line: '[  OK  ] Returned to graphical.target',
    tone: 'ok',
  },
];

const toneClassMap: Record<BootLineTone, string> = {
  info: 'text-[#98c3ff]',
  ok: 'text-white',
  warn: 'text-[#ffd489]',
  cmd: 'text-[#b1d9ff]',
};

const modeConfig = {
  startup: {
    label: 'UBUNTU 24.04 LTS',
    stage: 'SYSTEMD STARTUP',
    footer: 'Launching GNOME on Wayland',
    lines: startupLines,
  },
  recovery: {
    label: 'UBUNTU RECOVERY',
    stage: 'RECOVERY TARGET',
    footer: 'Rebuilding user session',
    lines: recoveryLines,
  },
} as const;

export function BootOverlay({ progress, mode = 'startup' }: BootOverlayProps) {
  const safeProgress = Math.max(0, Math.min(progress, 100));
  const lineRevealProgress = Math.min(100, safeProgress * 1.28);
  const config = modeConfig[mode];
  const visibleLines = config.lines.filter((item) => item.at <= lineRevealProgress + 1);
  const percent = Math.round(safeProgress).toString().padStart(2, '0');

  return (
    <div className="boot-screen fixed inset-0 z-1999 flex items-center justify-center px-6">
      <div className="boot-hud w-full max-w-3xl rounded-xl border border-[#3a74c8]/45 bg-[#04070d]/88 p-5 shadow-[0_0_60px_rgba(63,119,218,0.24)] backdrop-blur-[1.5px] sm:p-7">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-[#8dbbff]/85 sm:text-[11px]">
          <span>{config.label}</span>
          <span>tty1</span>
        </div>

        <div className="mt-4 h-56 overflow-hidden rounded-lg border border-[#1f365f] bg-black/45 p-4 font-mono text-[11px] leading-5 sm:h-60 sm:text-[13px] sm:leading-6">
          {visibleLines.map((entry) => (
            <p key={entry.line} className={toneClassMap[entry.tone]}>
              {entry.line}
            </p>
          ))}
          <p className="text-[#8dbbff] animate-pulse">{'>'} _</p>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] tracking-[0.28em] text-[#afcbff]/80 sm:text-[11px]">
            <span>{config.stage}</span>
            <span>{percent}%</span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full border border-[#27508a] bg-black/75">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-[#2d74da] via-[#4da8f3] to-[#8be8ff] shadow-[0_0_16px_rgba(92,170,255,0.65)]"
              style={{ width: `${Math.max(0.5, safeProgress)}%` }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.38) 50%, transparent 100%)',
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="mt-5 text-center font-mono text-[10px] tracking-[0.25em] text-[#afcbff]/65 sm:text-[11px]">
          {config.footer}
        </p>

        <div className="mt-3 flex justify-end">
          <div
            className="h-0.5 w-24 rounded-full bg-linear-to-r from-transparent via-[#8dbbff] to-transparent opacity-70"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
