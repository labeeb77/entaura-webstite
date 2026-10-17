// Small line icons for the integration page: 20px, stroke in currentColor.
const paths = {
  database: <><ellipse cx="10" cy="4.5" rx="6" ry="2.5" /><path d="M4 4.5v11c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-11M4 10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" /></>,
  document: <><path d="M5 2.5h6.5L15 6v11.5H5z" /><path d="M11.5 2.5V6H15M7.5 10h5M7.5 13h5" /></>,
  chart: <path d="M3 17h14M5.5 14V9M10 14V5M14.5 14v-3" />,
  people: <><circle cx="7.5" cy="7" r="2.5" /><path d="M3 16c.5-2.5 2.3-4 4.5-4s4 1.5 4.5 4M13 4.8a2.4 2.4 0 0 1 0 4.4M14.5 12c1.4.4 2.3 1.8 2.5 4" /></>,
  person: <><circle cx="10" cy="6.5" r="3" /><path d="M4 17c.7-3 3-5 6-5s5.3 2 6 5" /></>,
  flag: <path d="M5 17.5V3M5 3.5h9l-2 3.5 2 3.5H5" />,
  shield: <><path d="M10 2.5 4 5v5c0 3.6 2.6 6.5 6 7.5 3.4-1 6-3.9 6-7.5V5z" /><path d="m7.5 10 1.8 1.8 3.4-3.6" /></>,
  workshop: <><path d="M3 4h14v9H3z" /><path d="M7 17l3-4 3 4M6.5 7.5h7M6.5 10h4" /></>,
  plug: <path d="M7 2.5v4M13 2.5v4M5 6.5h10v3a5 5 0 0 1-10 0zM10 14.5v3" />,
  cloud: <path d="M5.5 15.5a3.5 3.5 0 0 1-.4-7A5 5 0 0 1 14.6 7a3.8 3.8 0 0 1 .4 8.5z" />,
  server: <><rect x="3" y="3" width="14" height="6" rx="1.5" /><rect x="3" y="11" width="14" height="6" rx="1.5" /><path d="M6 6h.01M6 14h.01" /></>,
  training: <><path d="M10 3 2 7l8 4 8-4z" /><path d="M5 8.5V13c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V8.5" /></>,
  support: <><path d="M4 11V9a6 6 0 0 1 12 0v2" /><rect x="3" y="11" width="3" height="5" rx="1" /><rect x="14" y="11" width="3" height="5" rx="1" /></>,
  search: <><circle cx="9" cy="9" r="5.5" /><path d="m13 13 4 4" /></>,
  check: <><circle cx="10" cy="10" r="7.5" /><path d="m6.8 10.2 2.2 2.2 4.2-4.6" /></>,
  rocket: <><path d="M11.5 3.5c2.5-.8 4.5-.5 5 0s.8 2.5 0 5L10 15 5 10z" /><path d="M7 13l-3 3M5 10l-2 .5M10 15l-.5 2" /></>,
  layers: <><path d="m10 2.5 7.5 4-7.5 4-7.5-4z" /><path d="m2.5 10 7.5 4 7.5-4M2.5 13.5l7.5 4 7.5-4" /></>,
  lock: <><rect x="4" y="9" width="12" height="8.5" rx="1.5" /><path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" /></>,
  key: <><circle cx="7" cy="12.5" r="3.5" /><path d="M9.5 10 16 3.5M13.5 6l2 2" /></>,
  eye: <><path d="M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10z" /><circle cx="10" cy="10" r="2.3" /></>,
  link: <path d="M8.5 11.5a3 3 0 0 0 4.2 0l3-3a3 3 0 0 0-4.2-4.2l-1 1M11.5 8.5a3 3 0 0 0-4.2 0l-3 3a3 3 0 0 0 4.2 4.2l1-1" />,
  bell: <path d="M10 2.5a5 5 0 0 0-5 5v3L3.5 13h13L15 10.5v-3a5 5 0 0 0-5-5zM8 15.5a2 2 0 0 0 4 0" />,
}

function IntegrationIcon({ name }) {
  return (
    <svg className="int-icon" viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export default IntegrationIcon
