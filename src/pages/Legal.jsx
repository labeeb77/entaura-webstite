import PageHero from '../components/PageHero.jsx'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

function Legal({ page }) {
  usePageMeta(pageMeta[page.meta])

  return (
    <main>
      <PageHero eyebrow={page.eyebrow} title={page.title} gradientLines={[page.gradient]} text={page.intro} />
      <section className="section legal-page">
        <div className="container legal-body">
          <p className="legal-draft">Draft: pending legal review. Last updated {page.updated}.</p>
          {page.sections.map(section => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Legal
