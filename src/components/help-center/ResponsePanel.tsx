import { cn } from '@/lib/utils';

interface ResponsePanelProps {
  response: { status: number; data: any; time: number };
  isDark: boolean;
  monoFont: string;
}

export function ResponsePanel({ response, isDark, monoFont }: ResponsePanelProps) {
  const statusColor = response.status < 300 ? '#22c55e' : response.status < 400 ? '#f59e0b' : '#ef4444';
  const responseText = typeof response.data === 'string'
    ? response.data
    : JSON.stringify(response.data, null, 2);

  return (
    <div className={cn('rounded-xl border overflow-hidden', isDark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-white')}>
      {/* Response Header */}
      <div className={cn('flex items-center justify-between px-4 py-2.5 border-b', isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-50')}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground" style={{ fontFamily: monoFont }}>
            Success Response
          </span>
        </div>
        <span
          className="px-2.5 py-1 rounded-lg text-xs font-bold"
          style={{ color: statusColor, background: `${statusColor}20` }}
        >
          {response.status} • {response.time}ms
        </span>
      </div>

      {/* Response Body */}
      <div className="relative">
        <pre
          className={cn(
            'p-4 text-xs overflow-auto max-h-[400px] leading-relaxed',
            isDark ? 'bg-zinc-950 text-zinc-300' : 'bg-zinc-50 text-zinc-700'
          )}
          style={{ fontFamily: monoFont }}
        >
          {responseText}
        </pre>
        <button
          onClick={() => navigator.clipboard?.writeText(responseText)}
          className={cn(
            'absolute top-2 right-2 p-1.5 rounded-md transition-colors',
            isDark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-600'
          )}
          title="Copy"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
