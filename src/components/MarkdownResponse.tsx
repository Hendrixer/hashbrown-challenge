import ReactMarkdown from 'react-markdown'

interface MarkdownResponseProps {
  markdown: string
}

const MarkdownResponse = ({ markdown }: MarkdownResponseProps) => {
  return (
    <div className="markdown-response prose prose-sm max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold mb-2">{children}</h3>,
          p: ({ children }) => <p className="mb-3 text-gray-700">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-5 mb-3">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-3">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-3">
              {children}
            </blockquote>
          ),
          code: ({ inline, children }) =>
            inline ? (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>
            ) : (
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto mb-3">
                <code>{children}</code>
              </pre>
            ),
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => (
            <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          hr: () => <hr className="my-4 border-gray-300" />,
          table: ({ children }) => (
            <table className="min-w-full border-collapse border border-gray-300 mb-3">
              {children}
            </table>
          ),
          thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="border-b border-gray-300">{children}</tr>,
          td: ({ children }) => <td className="px-3 py-2 border border-gray-300">{children}</td>,
          th: ({ children }) => <th className="px-3 py-2 border border-gray-300 font-semibold">{children}</th>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownResponse