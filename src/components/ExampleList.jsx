function ExampleList({ items }) {
  return (
    <div className="example-list">
      {items.map(example => (
        <article className="example-card" key={example.label}>
          <b>{example.label}</b>
          <p>{example.text}</p>
        </article>
      ))}
    </div>
  )
}

export default ExampleList
