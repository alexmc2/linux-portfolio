'use client';

interface KernelPanicOverlayProps {
  progress: number;
}

const penguinAscii = String.raw`   .--.
  |o_o |
  |:_/ |
 //   \ \
(|     | )
/'\_   _/\ 
\___)=(___/`;

const panicLines = [
  'KERNEL PANIC',
  'Please reboot your computer.',
  '',
  'VFS: Unable to mount root fs on unknown-block(0,0)',
  'init: /sbin/init not found. Tried /etc/init /bin/init /bin/sh',
  'Kernel panic - not syncing: Attempted to kill init!',
  'System halted.',
];

export function KernelPanicOverlay({ progress }: KernelPanicOverlayProps) {
  const secondsLeft = Math.max(0, Math.ceil(((100 - progress) / 100) * 3));

  return (
    <div className="fixed inset-0 z-2000 overflow-hidden bg-[#9e5eb6] px-10 py-8 font-mono text-[#f6ecfb]">
      <pre className="text-xs leading-4 sm:text-base sm:leading-5">
        {`${penguinAscii}

0_0 !`}
      </pre>

      <div className="absolute inset-x-0 top-[44%] -translate-y-1/2 text-center sm:top-1/2">
        <pre className="text-sm font-semibold leading-7 sm:text-4xl sm:leading-12">
          {panicLines.join('\n')}
        </pre>
      </div>

      <p className="absolute bottom-10 right-10 text-xs tracking-widest sm:text-sm">
        AUTO REBOOT IN {secondsLeft}s
      </p>
    </div>
  );
}
