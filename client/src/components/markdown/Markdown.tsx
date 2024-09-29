import React from 'react'
import ReactMarkdown from 'react-markdown'
import './Markdown.css'

interface MarkdownContentProps {
  content: string | undefined
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <div className="markdown-container">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export default MarkdownContent
