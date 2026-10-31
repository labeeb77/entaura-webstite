// Countries for the phone field: [ISO code, name, dial code]. The markets we
// serve come first; the rest follow alphabetically.
export const countries = [
  ['IN', 'India', '+91'],
  ['SA', 'Saudi Arabia', '+966'],
  ['AE', 'United Arab Emirates', '+971'],
  ['QA', 'Qatar', '+974'],
  ['KW', 'Kuwait', '+965'],
  ['BH', 'Bahrain', '+973'],
  ['OM', 'Oman', '+968'],
  ['AU', 'Australia', '+61'],
  ['AT', 'Austria', '+43'],
  ['BD', 'Bangladesh', '+880'],
  ['BE', 'Belgium', '+32'],
  ['BR', 'Brazil', '+55'],
  ['CA', 'Canada', '+1'],
  ['CN', 'China', '+86'],
  ['DK', 'Denmark', '+45'],
  ['EG', 'Egypt', '+20'],
  ['FI', 'Finland', '+358'],
  ['FR', 'France', '+33'],
  ['DE', 'Germany', '+49'],
  ['HK', 'Hong Kong', '+852'],
  ['ID', 'Indonesia', '+62'],
  ['IQ', 'Iraq', '+964'],
  ['IE', 'Ireland', '+353'],
  ['IT', 'Italy', '+39'],
  ['JP', 'Japan', '+81'],
  ['JO', 'Jordan', '+962'],
  ['KE', 'Kenya', '+254'],
  ['LB', 'Lebanon', '+961'],
  ['MY', 'Malaysia', '+60'],
  ['MV', 'Maldives', '+960'],
  ['MX', 'Mexico', '+52'],
  ['MA', 'Morocco', '+212'],
  ['NP', 'Nepal', '+977'],
  ['NL', 'Netherlands', '+31'],
  ['NZ', 'New Zealand', '+64'],
  ['NG', 'Nigeria', '+234'],
  ['NO', 'Norway', '+47'],
  ['PK', 'Pakistan', '+92'],
  ['PH', 'Philippines', '+63'],
  ['PL', 'Poland', '+48'],
  ['PT', 'Portugal', '+351'],
  ['SG', 'Singapore', '+65'],
  ['ZA', 'South Africa', '+27'],
  ['KR', 'South Korea', '+82'],
  ['ES', 'Spain', '+34'],
  ['LK', 'Sri Lanka', '+94'],
  ['SE', 'Sweden', '+46'],
  ['CH', 'Switzerland', '+41'],
  ['TH', 'Thailand', '+66'],
  ['TR', 'Türkiye', '+90'],
  ['GB', 'United Kingdom', '+44'],
  ['US', 'United States', '+1'],
  ['VN', 'Vietnam', '+84'],
]

// A flag emoji from the two-letter code.
export const flagOf = code => String.fromCodePoint(...[...code].map(letter => 0x1f1a5 + letter.charCodeAt(0)))

// The visitor's likely country from their time zone, for the default dial code.
const zoneCountry = {
  'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Asia/Riyadh': 'SA', 'Asia/Dubai': 'AE', 'Asia/Qatar': 'QA',
  'Asia/Kuwait': 'KW', 'Asia/Bahrain': 'BH', 'Asia/Muscat': 'OM', 'Asia/Karachi': 'PK', 'Asia/Dhaka': 'BD',
  'Asia/Colombo': 'LK', 'Asia/Kathmandu': 'NP', 'Asia/Singapore': 'SG', 'Asia/Kuala_Lumpur': 'MY',
  'Europe/London': 'GB', 'Europe/Dublin': 'IE', 'Europe/Berlin': 'DE', 'Europe/Paris': 'FR', 'Europe/Madrid': 'ES',
  'Europe/Amsterdam': 'NL', 'Africa/Cairo': 'EG', 'Australia/Sydney': 'AU', 'America/New_York': 'US',
  'America/Chicago': 'US', 'America/Denver': 'US', 'America/Los_Angeles': 'US', 'America/Toronto': 'CA',
}

export function guessCountry() {
  try {
    return zoneCountry[Intl.DateTimeFormat().resolvedOptions().timeZone] || 'IN'
  } catch {
    return 'IN'
  }
}
