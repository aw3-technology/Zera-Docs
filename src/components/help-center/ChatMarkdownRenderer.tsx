import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Icon } from '../ui/icon';
import { CodeBlock, InlineCode } from '../ui/code-block';

interface ChatMarkdownRendererProps {
  content: string;
  primaryColor: string;
}

export function ChatMarkdownRenderer({ content, primaryColor }: ChatMarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        table({ children }) {
          return (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-border rounded-lg">
                {children}
              </table>
            </div>
          );
        },
        thead({ children }) {
          return <thead className="bg-muted/50">{children}</thead>;
        },
        th({ children }) {
          return (
            <th className="border border-border px-4 py-3 text-left font-medium text-foreground bg-muted/30">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="border border-border px-4 py-3 text-sm text-foreground">
              {children}
            </td>
          );
        },
        blockquote({ children }) {
          return (
            <blockquote
              className="border-l-4 pl-4 py-3 my-4 bg-muted/20 rounded-r-lg"
              style={{ borderLeftColor: primaryColor }}
            >
              <div className="text-foreground/90 italic leading-relaxed">
                {children}
              </div>
            </blockquote>
          );
        },
        h1({ children }) {
          return <h1 className="text-xl font-semibold text-foreground mt-6 mb-3 leading-tight">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="text-lg font-medium text-foreground mt-5 mb-2 leading-tight">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="text-base font-medium text-foreground mt-4 mb-2 leading-snug">{children}</h3>;
        },
        ul({ children }) {
          return <ul className="list-disc list-inside space-y-1.5 my-3 ml-2">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside space-y-1.5 my-3 ml-2">{children}</ol>;
        },
        li({ children }) {
          return <li className="text-sm text-foreground leading-relaxed">{children}</li>;
        },
        p({ children }) {
          return <p className="text-sm text-foreground mb-3 leading-relaxed text-balance">{children}</p>;
        },
        strong({ children }) {
          return <strong className="font-semibold text-foreground">{children}</strong>;
        },
        em({ children }) {
          return <em className="italic text-foreground/90">{children}</em>;
        },
        hr() {
          return <hr className="border-border my-6" />;
        },
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          const codeString = String(children).replace(/\n$/, '');

          if (!inline) {
            return (
              <CodeBlock primaryColor={primaryColor} language={match?.[1]}>
                {codeString}
              </CodeBlock>
            );
          }

          return <InlineCode>{codeString}</InlineCode>;
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline inline-flex items-center gap-1 font-medium"
              style={{ color: primaryColor }}
            >
              {children}
              <Icon icon="hugeicons:link-square-02" className="h-3 w-3" />
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
