function Steps({ items }) {
  return (
    <div className="steps">
      {items.map(step => (
        <div className="step" key={step.label}>
          <b>{step.label}</b>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </div>
      ))}
    </div>
  )
}

export default Steps
