import AnalyticsDiagram from '../components/AnalyticsDiagram.jsx'
import AskSources from '../components/AskSources.jsx'
import ConnectorDiagram from '../components/ConnectorDiagram.jsx'
import ContactStrip from '../components/ContactStrip.jsx'
import ExampleList from '../components/ExampleList.jsx'
import KnowledgeDiagram from '../components/KnowledgeDiagram.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Steps from '../components/Steps.jsx'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

const diagrams = { knowledge: KnowledgeDiagram, connector: ConnectorDiagram, analytics: AnalyticsDiagram }

function ProductPage({ page }) {
  usePageMeta(pageMeta[page.meta])
  const { hero, detail, examples, steps, sources, cta } = page
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
      <section className="info-band">
        <div className="container">
          <SectionHead eyebrow={steps.eyebrow} title={steps.title} gradient={steps.gradient} />
          <Steps items={steps.items} />
        </div>
      </section>
      {sources && <AskSources {...sources} />}
      <ContactStrip title={cta.title} text={cta.text} />
    </main>
  )
}

export default ProductPage
