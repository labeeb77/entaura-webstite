function ExampleList({ items }) {
  return (
    <div className="example-list">
      {items.map(text => (
        <article className="example-card" key={text}>
          <p>{text}</p>
        </article>
      ))}
    </div>
  )
}

export default ExampleList
