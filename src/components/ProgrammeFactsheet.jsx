import './ProgrammeFactsheet.css';

export default function ProgrammeFactsheet({ sections }) {
  return sections.map((section) => (
    <section className="country-section programme-factsheet" key={section.title}>
      <h2>{section.title}</h2>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.rows && (
        <dl className="programme-factsheet-table">
          {section.rows.map(([label, value]) => (
            <div className="programme-factsheet-row" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {section.items && (
        <ul className="country-list">
          {section.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}
      {section.steps && (
        <ol className="process-list">
          {section.steps.map((step, index) => (
            <li className="process-step" key={step}>
              <span className="step-num">{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  ));
}
