const ZIP_MAP: Record<string, string> = {
  // Downtown / Central San Diego
  "92101": "Downtown San Diego / Gaslamp",
  "92102": "Golden Hill / Sherman Heights",
  "92103": "Hillcrest / Mission Hills",
  "92104": "North Park",
  "92105": "City Heights",
  "92106": "Point Loma",
  "92107": "Ocean Beach",
  "92108": "Mission Valley",
  "92109": "Pacific Beach / Mission Beach",
  "92110": "Old Town / Midway",
  "92111": "Clairemont",
  "92113": "Barrio Logan",
  "92114": "Encanto / Skyline",
  "92115": "College Area / SDSU",
  "92116": "Normal Heights / Kensington",
  "92117": "Clairemont West",
  "92118": "Coronado",
  "92119": "San Carlos",
  "92120": "Del Cerro",
  "92121": "Sorrento Valley",
  "92122": "UTC / University City",
  "92123": "Kearny Mesa",
  "92124": "Tierrasanta",
  "92126": "Mira Mesa",
  "92127": "Rancho Bernardo / 4S Ranch",
  "92128": "Rancho Bernardo",
  "92129": "Rancho Peñasquitos",
  "92130": "Carmel Valley",
  "92131": "Scripps Ranch",
  "92139": "Paradise Hills",
  "92154": "Otay Mesa",
  "92173": "San Ysidro",

  // South Bay
  "91910": "Chula Vista (West)",
  "91911": "Chula Vista (Southwest)",
  "91913": "Eastlake / Otay Ranch",
  "91914": "Rolling Hills Ranch",
  "91915": "Eastlake",
  "91932": "Imperial Beach",
  "91950": "National City",

  // East County
  "92019": "El Cajon East",
  "92020": "El Cajon",
  "92021": "El Cajon / Granite Hills",
  "91941": "La Mesa",
  "91942": "La Mesa",
  "91945": "Lemon Grove",
  "92040": "Lakeside",
  "92071": "Santee",
  "91935": "Jamul",
  "91977": "Spring Valley",

  // North County Coastal
  "92007": "Cardiff-by-the-Sea",
  "92008": "Carlsbad Village",
  "92009": "South Carlsbad",
  "92014": "Del Mar",
  "92024": "Encinitas",
  "92037": "La Jolla",
  "92054": "Oceanside",
  "92057": "Oceanside North",
  "92067": "Rancho Santa Fe",

  // North County Inland
  "92025": "Escondido",
  "92026": "North Escondido",
  "92027": "East Escondido",
  "92028": "Fallbrook",
  "92064": "Poway",
  "92069": "San Marcos",
  "92078": "San Marcos South",
  "92081": "Vista",
  "92083": "Vista Central",
  "92084": "Vista North",

  // Rural / Mountain / Desert
  "92036": "Julian",
  "91901": "Alpine",
  "91905": "Boulevard",
  "92004": "Borrego Springs",
  "91906": "Campo",
  "91917": "Dulzura",
  "92061": "Pauma Valley",
};

function genericRegion(zip: string): string {
  const n = parseInt(zip, 10);
  if (isNaN(n)) return "San Diego Area";
  // South SD: 9191x, 91932, 91950, 92154, 92173
  if ((n >= 91910 && n <= 91919) || n === 91932 || n === 91950 || n === 92154 || n === 92173)
    return "South San Diego";
  // Central SD: 92101–92126
  if (n >= 92101 && n <= 92126) return "Central San Diego";
  // North SD: 92127–92131 and other 920xx
  if ((n >= 92127 && n <= 92131) || (n >= 92000 && n <= 92099)) return "North San Diego";
  // East SD: 9190x, 9194x, 9197x, 92019–92071
  if ((n >= 91900 && n <= 91909) || (n >= 91940 && n <= 91949) || (n >= 91970 && n <= 91979) || (n >= 92019 && n <= 92071))
    return "East San Diego";
  return "San Diego Area";
}

export function getNeighborhood(zip: string): string {
  return ZIP_MAP[zip] ?? genericRegion(zip);
}
