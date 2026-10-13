function IntegrationIcons({ items }) {
  return (
    <div className="integration-icons">
      {items.map(item => (
        <span key={item.label}>
          {item.icon ? (
            <img className="integration-icon-image" src={`/assets/integrations/${item.icon}`} alt="" />
          ) : (
            <b>{item.badge}</b>
          )}
          {item.label}
        </span>
      ))}
    </div>
  )
}

export default IntegrationIcons
