import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function MistralSchedule(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Recommended Schedule:</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{props.schedule}</ReactMarkdown>
        </section>
    )
}