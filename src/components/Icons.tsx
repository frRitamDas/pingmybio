import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
});

export const ArrowUpRight = (p: P) => (
  <svg {...base(p)} width="16" height="16"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
);
export const Check = (p: P) => (
  <svg {...base(p)} width="16" height="16"><path d="M20 6L9 17l-5-5" /></svg>
);
export const Menu = (p: P) => (
  <svg {...base(p)} width="20" height="20"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = (p: P) => (
  <svg {...base(p)} width="20" height="20"><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Plus = (p: P) => (
  <svg {...base(p)} width="16" height="16"><path d="M5 12h14M12 5v14" /></svg>
);
export const Mail = (p: P) => (
  <svg {...base(p)} width="20" height="20"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const Spark = (p: P) => (
  <svg {...base(p)} width="20" height="20"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></svg>
);
export const Calendar = (p: P) => (
  <svg {...base(p)} width="20" height="20"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
);
export const Chat = (p: P) => (
  <svg {...base(p)} width="20" height="20"><path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.6L3 21l1.9-5.5A8.5 8.5 0 1 1 21 11.5z" /></svg>
);
export const Inbox = (p: P) => (
  <svg {...base(p)} width="20" height="20"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
);
export const Link = (p: P) => (
  <svg {...base(p)} width="20" height="20"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" /><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" /></svg>
);
export const Share = (p: P) => (
  <svg {...base(p)} width="20" height="20"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>
);
