import { Fragment } from 'react'

function PageHero({ className, eyebrow, title, gradientLines, text }) {
  return (
    <section className={className ? `page-hero ${className}` : 'page-hero'}>
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>
          {title}<br />
          <span className="gradient-text">
            {gradientLines.map((line, index) => (
              <Fragment key={line}>{index > 0 && <br />}{line}</Fragment>
            ))}
          </span>
        </h1>
        <p>{text}</p>
      </div>
    </section>
  )
}

export default PageHero
