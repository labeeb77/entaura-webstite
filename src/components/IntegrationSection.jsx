import { connectorCategories, policyTags } from '../data/integrations.js'
import IntegrationIcons from './IntegrationIcons.jsx'
import SectionHead from './SectionHead.jsx'

function IntegrationSection() {
  return (
    <section className="integration-section" id="integrations">
      <div className="container">
        <SectionHead
          eyebrow="Connect the way you already work"
          title="Your systems, documents,"
          gradient="and policies in one place."
          text="EntAura connects to your ERP, enterprise tools, document repositories, IoT sensors, and ad hoc sources, giving every product the same connected foundation."
        />
        <div className="integration-groups">
          <article className="integration-group unified-integrations">
            <div className="integration-group-head">
              <span className="integration-symbol">✦</span>
              <div>
                <span className="integration-label">EntAura connector ecosystem</span>
                <h3>600+ supported connectors</h3>
              </div>
            </div>
            <p>Connect transactional systems, document stores, operational data, and team channels through one integration layer.</p>
            {connectorCategories.map(category => (
              <div className="connector-category" key={category.title}>
                <strong>{category.title}</strong>
                <IntegrationIcons items={category.items} />
              </div>
            ))}
          </article>
        </div>
        <div className="policy-cloud">
          <div>
            <span className="eyebrow">Business knowledge EntAura can organize</span>
            <h3>From policy documents to financial signals.</h3>
          </div>
          <div className="policy-tags">
            {policyTags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntegrationSection
