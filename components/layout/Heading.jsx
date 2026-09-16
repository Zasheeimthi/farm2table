export function Heading({
  eyebrow,
  title,
  children
}) {
  return <div className="market-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{children && <p>{children}</p>}</div>;
}
