import ContactStrip from '../components/ContactStrip.jsx'
import IndustryGrid from '../components/IndustryGrid.jsx'
import PageHero from '../components/PageHero.jsx'
import ProblemGrid from '../components/ProblemGrid.jsx'
import SectionHead from '../components/SectionHead.jsx'
import SolutionDetail from '../components/SolutionDetail.jsx'
import Steps from '../components/Steps.jsx'
import { pageMeta } from '../data/pageMeta.js'
import { industries, problems, solutionDetails, solutionSteps } from '../data/solutions.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

function Solutions() {
  usePageMeta(pageMeta.solutions)

  return (
    <main>
      <PageHero
        className="solutions-hero"
        eyebrow="Solutions for real work"
        title="Less searching."
        gradientLines={['More moving forward.']}
        text="EntAura helps organizations connect policies, documents, and transactional data, so teams decide better, stay compliant, and manage proactively."
      />
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Why organizations need it"
            title="Disconnected knowledge"
            gradient="costs more than time."
            text="Business policies, tools, and structured and unstructured data usually live apart. Decisions slow down, compliance gaps go unnoticed, and problems are found after the fact."
          />
          <ProblemGrid items={problems} />
        </div>
      </section>
      <section className="info-band">
        <div className="container">
          <SectionHead eyebrow="One family, three jobs" title="Use the right intelligence" gradient="for the moment." />
          <Steps items={solutionSteps} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Where EntAura fits" title="Built around your" gradient="industry reality." />
          <IndustryGrid items={industries} />
        </div>
      </section>
      <SolutionDetail items={solutionDetails} />
      <ContactStrip title="Find the right starting point." text="Tell us about your industry, your systems, and the decisions your team makes every day." />
    </main>
  )
}

export default Solutions
