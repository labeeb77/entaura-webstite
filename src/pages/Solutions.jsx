import ContactStrip from '../components/ContactStrip.jsx'
import IndustryGrid from '../components/IndustryGrid.jsx'
import PageHero from '../components/PageHero.jsx'
import ProblemGrid from '../components/ProblemGrid.jsx'
import SectionHead from '../components/SectionHead.jsx'
import SolutionDetail from '../components/SolutionDetail.jsx'
import { pageMeta } from '../data/pageMeta.js'
import { industries, problems, solutionDetails } from '../data/solutions.js'
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
        text="Better decisions, improved compliance, and proactive management."
      />
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Why organizations need it"
            title="Disconnected knowledge"
            gradient="costs more than time."
          />
          <ProblemGrid items={problems} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Ready-made for your industry" title="Built around your" gradient="industry reality." text="Each comes with a tested data model and questions that work from day one. Tap a question to try it in the live demo." />
          <IndustryGrid items={industries} />
        </div>
      </section>
      <SolutionDetail items={solutionDetails} />
      <ContactStrip title="Find the right starting point." text="Tell us about your industry, your systems, and the decisions your team makes every day." />
    </main>
  )
}

export default Solutions
