import { Fragment } from 'react';

export type Block =
  | { type: 'h'; level: number; text: string }
  | { type: 'p'; text: string }
  | { type: 'li'; text: string }
  | { type: 'table'; rows: string[][] };

/** Renders the structured blocks extracted from the original long-form pages. */
export default function Article({ blocks }: { blocks: Block[] }) {
  const out: JSX.Element[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: number) => {
    if (listBuffer.length) {
      out.push(
        <ul key={`ul-${key}`} className="ml-5 list-disc space-y-2 text-[15px] leading-relaxed text-muted">
          {listBuffer.map((t, i) => <li key={i}>{t}</li>)}
        </ul>,
      );
      listBuffer = [];
    }
  };

  blocks.forEach((b, i) => {
    if (b.type === 'li') {
      listBuffer.push(b.text);
      return;
    }
    flushList(i);
    if (b.type === 'h') {
      const cls =
        b.level <= 2
          ? 'mt-12 font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl'
          : 'mt-8 text-lg font-medium text-ink';
      out.push(<h2 key={i} className={cls}>{b.text}</h2>);
    } else if (b.type === 'p') {
      out.push(<p key={i} className="text-[15px] leading-relaxed text-muted">{b.text}</p>);
    } else {
      out.push(
        <div key={i} className="overflow-x-auto rounded-2xl border border-black/10">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <tbody>
              {b.rows.map((row, r) => (
                <tr key={r} className="border-b border-black/5 last:border-0">
                  {row.map((cell, c) => {
                    const Cell = r === 0 ? 'th' : 'td';
                    return (
                      <Cell key={c} className={`px-4 py-3 align-top ${r === 0 ? 'font-medium text-ink' : 'text-muted'}`}>
                        {cell}
                      </Cell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    }
  });
  flushList(blocks.length);

  return (
    <div className="space-y-5">
      {out.map((el, i) => <Fragment key={i}>{el}</Fragment>)}
    </div>
  );
}
