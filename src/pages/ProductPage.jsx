import ConnectorDiagram from '../components/ConnectorDiagram.jsx'
import ContactStrip from '../components/ContactStrip.jsx'
import ExampleList from '../components/ExampleList.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHead from '../components/SectionHead.jsx'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

const diagrams = { connector: ConnectorDiagram }

function ProductPage({ page }) {
  usePageMeta(pageMeta[page.meta])
  const { hero, detail, examples, cta } = page
  const Diagram = diagrams[detail.diagram]

  return (
    <main>
      <PageHero {...hero} />
      <section className="section">
        <div className="container detail-grid">
          <div>
            <span className="eyebrow">{detail.eyebrow}</span>
            <h2>{detail.title}</h2>
            {detail.paragraphs.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Diagram />
        </div>
      </section>
      <section className="section examples">
        <div className="container">
          <SectionHead eyebrow={examples.eyebrow} title={examples.title} gradient={examples.gradient} />
          <ExampleList items={examples.items} />
        </div>
      </section>
      <ContactStrip title={cta.title} text={cta.text} />
    </main>
  )
}

export default ProductPage
