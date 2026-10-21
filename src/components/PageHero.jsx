import { Fragment } from 'react'

function PageHero({ className, eyebrow, badge, title, gradientLines, text, children }) {
  return (
    <section className={className ? `page-hero ${className}` : 'page-hero'}>
      <div className="container">
        {badge ?? <span className="eyebrow">{eyebrow}</span>}
        <h1>
          {title}<br />
          <span className="gradient-text">
            {gradientLines.map((line, index) => (
              <Fragment key={line}>{index > 0 && <br />}{line}</Fragment>
            ))}
          </span>
        </h1>
        <p>{text}</p>
        {children}
      </div>
    </section>
  )
}

export default PageHero
