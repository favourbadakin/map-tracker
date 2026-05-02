export type Location = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: "client" | "office" | "site" | "partner";
  note?: string;
};

export type DaySchedule = {
  day: string;
  shortDay: string;
  locations: Location[];
};

// ─── Master location registry ───────────────────────────────────────────────
// Every unique location is defined exactly once here.
const L: Record<string, Location> = {
  // Saturday / Wednesday shared
  "r-owuye":        { id: "r-owuye",        name: "R Owuye Stores",              address: "Gbekuba, Ibadan",                          lat: 7.391705, lng: 3.829600, category: "partner", note: "Aspiring Urban Mainstream" },
  "iya-glo":        { id: "iya-glo",         name: "Iya Glo",                     address: "",                                         lat: 7.392414, lng: 3.829182, category: "partner", note: "Aspiring Urban Mainstream" },
  "ola-inu-kan":    { id: "ola-inu-kan",     name: "Ola Inu Kan",                 address: "Charity, Gbekuba Ibadan",                  lat: 7.394979, lng: 3.829467, category: "partner", note: "Aspiring Urban Mainstream" },
  "omolola":        { id: "omolola",         name: "Omolola Store",               address: "",                                         lat: 7.393480, lng: 3.835106, category: "partner", note: "Aspiring Urban Mainstream" },
  "akorede":        { id: "akorede",         name: "Akorede Food Canteen",        address: "Gbekuba, Ibadan",                          lat: 7.395673, lng: 3.837912, category: "partner", note: "Aspiring Urban Mainstream Buka" },
  "hallelujah":     { id: "hallelujah",      name: "Hallelujah Provision Store",  address: "",                                         lat: 7.397923, lng: 3.834590, category: "partner", note: "Aspiring Urban Mainstream" },
  "bofate":         { id: "bofate",          name: "Bofate Stores",               address: "Gbekuba Road 12, Ibadan",                  lat: 7.396947, lng: 3.843031, category: "partner", note: "Aspiring Urban Mainstream" },
  "acrobat":        { id: "acrobat",         name: "Acrobat and Zillion Store",   address: "Lasokun Street, Ibadan",                   lat: 7.398134, lng: 3.840658, category: "partner", note: "Aspiring Urban Mainstream" },
  "horpsy":         { id: "horpsy",          name: "Horpsy Cool Enterprise",      address: "Gbekuba Road 7",                           lat: 7.394683, lng: 3.840015, category: "partner", note: "Aspiring Urban Mainstream" },
  "opeyemi-gbk":    { id: "opeyemi-gbk",     name: "Opeyemi Stores",              address: "Dojutelegan, Gbekuba, Ibadan",             lat: 7.393570, lng: 3.840040, category: "partner", note: "Aspiring Urban Mainstream" },
  "gods-surprise":  { id: "gods-surprise",   name: "God's Surprise Stores",       address: "Ibadan",                                   lat: 7.392810, lng: 3.835356, category: "partner", note: "Aspiring Urban Mainstream" },
  "arostella":      { id: "arostella",       name: "Arostella Stores",            address: "Ibadan",                                   lat: 7.397986, lng: 3.830079, category: "partner", note: "Aspiring Urban Mainstream" },
  "johnson":        { id: "johnson",          name: "Johnson Stores",              address: "Ibadan",                                   lat: 7.398040, lng: 3.834577, category: "partner", note: "Aspiring Urban Mainstream" },
  "gold-m":         { id: "gold-m",          name: "Gold M Pharmacy",             address: "Ibadan",                                   lat: 7.390243, lng: 3.836449, category: "partner", note: "Aspiring Urban Mainstream" },
  "laweebee":       { id: "laweebee",        name: "LaweeBee Filling Station",    address: "Ibadan",                                   lat: 7.390739, lng: 3.836590, category: "partner", note: "Aspiring Urban Mainstream" },
  "aluwaju":        { id: "aluwaju",         name: "Aluwaju Trading Store",       address: "Ibadan",                                   lat: 7.390734, lng: 3.831784, category: "partner", note: "Aspiring Urban Mainstream" },
  "gods-time":      { id: "gods-time",       name: "God's Time Variety",          address: "Oladele, Ibadan",                          lat: 7.394231, lng: 3.833146, category: "partner", note: "Aspiring Urban Mainstream" },
  "ojuoluwa":       { id: "ojuoluwa",        name: "Ojuoluwa Store",              address: "Ibadan",                                   lat: 7.390569, lng: 3.836131, category: "partner", note: "Aspiring Urban Mainstream" },
  "mummy-tobi":     { id: "mummy-tobi",      name: "Mummy Tobi",                  address: "Gbekuba Road 5",                           lat: 7.390806, lng: 3.836482, category: "partner", note: "Aspiring Urban Mainstream" },
  "kolib":          { id: "kolib",           name: "Kolib Store",                 address: "Ibadan",                                   lat: 7.385034, lng: 3.824099, category: "partner", note: "Aspiring Urban Mainstream" },
  "tenny-lammy":    { id: "tenny-lammy",     name: "Tenny and Lammy",             address: "Ibadan",                                   lat: 7.391080, lng: 3.836412, category: "partner", note: "Aspiring Urban Mainstream" },
  "la-boycert":     { id: "la-boycert",      name: "La Boycert Pharmacy",         address: "Near Up Jesus, Gbekuba, Ibadan",           lat: 7.400659, lng: 3.835960, category: "partner", note: "Aspiring Urban Mainstream" },
  "moranugba":      { id: "moranugba",       name: "Moranugba Store",             address: "Ibadan",                                   lat: 7.383360, lng: 3.825513, category: "partner", note: "Aspiring Urban Mainstream" },
  "mummy-oba":      { id: "mummy-oba",       name: "Mummy Oba Store",             address: "Akilapa Junction, Ibadan",                 lat: 7.406597, lng: 3.829907, category: "partner", note: "Aspiring Urban Mainstream" },
  "adest":          { id: "adest",           name: "Adest Venture",               address: "Ibadan",                                   lat: 7.390500, lng: 3.836118, category: "partner", note: "Aspiring Urban Mainstream" },
  "mummy-eniola":   { id: "mummy-eniola",    name: "Mummy Eniola Store",          address: "Ibadan",                                   lat: 7.392819, lng: 3.835489, category: "partner", note: "Aspiring Urban Mainstream" },
  "vic":            { id: "vic",             name: "Vic Store",                   address: "Ibadan",                                   lat: 7.401941, lng: 3.836487, category: "partner", note: "Aspiring Urban Mainstream" },
  "bunmis":         { id: "bunmis",          name: "Bunmis Store",                address: "Ibadan",                                   lat: 7.409360, lng: 3.824790, category: "partner", note: "Aspiring Urban Mainstream" },
  "clemnah":        { id: "clemnah",         name: "Clemnah Store",               address: "Ibadan",                                   lat: 7.400722, lng: 3.839576, category: "partner", note: "Aspiring Urban Mainstream" },
  "aunty-bee":      { id: "aunty-bee",       name: "Aunty Bee",                   address: "Gbekuba Road 7",                           lat: 7.388789, lng: 3.836334, category: "partner", note: "Aspiring Urban Mainstream" },
  "deejubog":       { id: "deejubog",        name: "Deejubog",                    address: "Agbofieti, Ibadan",                        lat: 7.410862, lng: 3.822277, category: "partner", note: "Aspiring Urban Mainstream" },
  "temitope-gbk":   { id: "temitope-gbk",    name: "Temitope",                    address: "Ibadan",                                   lat: 7.394330, lng: 3.840103, category: "partner", note: "Aspiring Urban Mainstream" },
  "gods-favour-v":  { id: "gods-favour-v",   name: "God's Favour (Verasset)",     address: "Ibadan",                                   lat: 7.403484, lng: 3.833532, category: "partner", note: "Aspiring Urban Mainstream" },
  "lampeace":       { id: "lampeace",        name: "Lampeace Store",              address: "Ibadan",                                   lat: 7.409268, lng: 3.824591, category: "partner", note: "Aspiring Urban Mainstream" },
  "gold-store":     { id: "gold-store",      name: "Gold Store",                  address: "Ibadan",                                   lat: 7.401961, lng: 3.836116, category: "partner", note: "Aspiring Urban Mainstream" },
  "boluwatife":     { id: "boluwatife",      name: "Boluwatife",                  address: "Gbekuba Road 7",                           lat: 7.391486, lng: 3.835681, category: "partner", note: "Aspiring Urban Mainstream" },

  // Monday / Thursday shared
  "adeyemo":        { id: "adeyemo",         name: "Adeyemo Stores",              address: "Apata Ibadan",                             lat: 7.384499, lng: 3.826027, category: "partner", note: "Aspiring Urban Mainstream" },
  "adedeji":        { id: "adedeji",         name: "Adedeji Stores",              address: "Along NNPC, Apata, Ibadan",               lat: 7.387486, lng: 3.822693, category: "partner", note: "Aspiring Urban Premium" },
  "jolly":          { id: "jolly",           name: "Jolly Stores",                address: "Along NNPC, Apata, Ibadan",               lat: 7.385398, lng: 3.825019, category: "partner", note: "Aspiring Urban Mainstream" },
  "ambass":         { id: "ambass",          name: "Ambass Stores",               address: "Along NNPC, Apata, Ibadan",               lat: 7.389096, lng: 3.821765, category: "partner", note: "Aspiring Urban Premium" },
  "mama-wura":      { id: "mama-wura",       name: "Mama Wura Variety Stores",    address: "Amadiya Street, Apata, Ibadan",            lat: 7.385223, lng: 3.825273, category: "partner", note: "Aspiring Urban Premium" },
  "bizak":          { id: "bizak",           name: "Bizak Enterprises",           address: "Along NNPC, Apata, Ibadan",               lat: 7.384678, lng: 3.825532, category: "partner", note: "Aspiring Urban Mainstream" },
  "monfi":          { id: "monfi",           name: "Monfi Store",                 address: "Apata, Ibadan",                            lat: 7.385110, lng: 3.825349, category: "partner", note: "Aspiring Urban Mainstream" },
  "adisco":         { id: "adisco",          name: "Adisco Enterprises",          address: "Beside Ahmadiyya Mosque, Apata, Ibadan",  lat: 7.385299, lng: 3.825077, category: "partner", note: "Aspiring Urban Mainstream" },
  "omowunmi":       { id: "omowunmi",        name: "Omowunmi Store",              address: "Abeokuta Express, Apata, Ibadan",          lat: 7.385653, lng: 3.824726, category: "partner", note: "Aspiring Urban Premium" },
  "mrs-olabamiji":  { id: "mrs-olabamiji",   name: "Mrs Olabamiji Store",         address: "Along NNPC, Apata, Ibadan",               lat: 7.386091, lng: 3.824305, category: "partner", note: "Aspiring Urban Mainstream" },
  "funmalo":        { id: "funmalo",         name: "Funmalo Stores",              address: "Apata, Ibadan",                            lat: 7.384597, lng: 3.825738, category: "partner", note: "Aspiring Urban Mainstream" },
  "alikulu":        { id: "alikulu",         name: "Alikulu Medicine Store",      address: "Apata, Ibadan",                            lat: 7.385792, lng: 3.824681, category: "partner", note: "Aspiring Urban Mainstream" },
  "kazmut":         { id: "kazmut",          name: "Kazmut Stores",               address: "Abeokuta Express, Apata, Ibadan",          lat: 7.388020, lng: 3.822673, category: "partner", note: "Aspiring Urban Mainstream" },
  "jubril":         { id: "jubril",          name: "Jubril Stores",               address: "Dogo Area, Apata, Ibadan",                 lat: 7.383491, lng: 3.828084, category: "partner", note: "Aspiring Urban Mainstream" },
  "mothraf":        { id: "mothraf",         name: "Mothraf",                     address: "Adifase, Apata, Ibadan",                   lat: 7.387089, lng: 3.825766, category: "partner", note: "Aspiring Urban Premium" },
  "t-and-t":        { id: "t-and-t",         name: "T and T Ventures",            address: "Adifase, Apata, Ibadan",                   lat: 7.385899, lng: 3.825380, category: "partner", note: "Aspiring Urban Premium" },
  "hikmat":         { id: "hikmat",          name: "Hikmat Store",                address: "Adifase Junction, Apata, Ibadan",          lat: 7.385531, lng: 3.824901, category: "partner", note: "Aspiring Urban Premium" },
  "eleha":          { id: "eleha",           name: "Eleha Stores",                address: "Adifase, Apata, Ibadan",                   lat: 7.386245, lng: 3.825436, category: "partner", note: "Aspiring Urban Mainstream" },
  "best-way":       { id: "best-way",        name: "Best Way",                    address: "Apata, Ibadan",                            lat: 7.385719, lng: 3.824683, category: "partner", note: "Aspiring Urban Mainstream" },
  "mummy-ibrahim":  { id: "mummy-ibrahim",   name: "Mummy Ibrahim Store",         address: "Adifase, Apata, Ibadan",                   lat: 7.386305, lng: 3.825399, category: "partner", note: "Aspiring Urban Mainstream" },
  "sumad":          { id: "sumad",           name: "Sumad Stores",                address: "Opposite Agapa Energy, Apata, Ibadan",     lat: 7.384931, lng: 3.825495, category: "partner", note: "Aspiring Urban Mainstream" },
  "blue-ribbon":    { id: "blue-ribbon",     name: "Blue Ribbon",                 address: "Abeokuta Way, Apata, Ibadan",              lat: 7.385872, lng: 3.824089, category: "partner", note: "Aspiring Urban Mainstream" },
  "ebetoy":         { id: "ebetoy",          name: "Ebetoy Store",                address: "Apata, Ibadan",                            lat: 7.386151, lng: 3.824204, category: "partner", note: "Aspiring Urban Premium" },
  "oyin":           { id: "oyin",            name: "Oyin Store",                  address: "Adifase, Apata, Ibadan",                   lat: 7.385927, lng: 3.825207, category: "partner", note: "Aspiring Urban Mainstream" },
  "karutu":         { id: "karutu",          name: "Karutu Ventures",             address: "Amona Ali Street, Apata, Ibadan",          lat: 7.384984, lng: 3.823999, category: "partner", note: "Aspiring Urban Mainstream" },
  "olanrewaju":     { id: "olanrewaju",      name: "Olanrewaju Store",            address: "Apata, Ibadan",                            lat: 7.386581, lng: 3.825996, category: "partner", note: "Aspiring Urban Mainstream" },
  "eats-chops":     { id: "eats-chops",      name: "Eats and Chops",              address: "Apata, Ibadan",                            lat: 7.388969, lng: 3.821775, category: "partner", note: "Aspiring Urban Mainstream" },
  "ewaoluwa":       { id: "ewaoluwa",        name: "Ewaoluwa Enterprises",        address: "Boye Street, Apata, Ibadan",               lat: 7.385185, lng: 3.825736, category: "partner", note: "Aspiring Urban Mainstream" },
  "iya-pupa":       { id: "iya-pupa",        name: "Iya Pupa Store",              address: "Agape Street, Apata, Ibadan",              lat: 7.385247, lng: 3.825009, category: "partner", note: "Aspiring Urban Mainstream" },
  "joyous-g":       { id: "joyous-g",        name: "Joyous G",                    address: "Abeokuta Road, Apata, Ibadan",             lat: 7.385225, lng: 3.825208, category: "partner", note: "Aspiring Urban Mainstream" },
  "em-liquor":      { id: "em-liquor",       name: "EM Liquor",                   address: "Abeokuta Road, Apata, Ibadan",             lat: 7.383848, lng: 3.826772, category: "partner", note: "Aspiring Urban Premium" },
  "funmi-mart":     { id: "funmi-mart",      name: "Funmi Mart",                  address: "Abeokuta Road, Apata, Ibadan",             lat: 7.386094, lng: 3.825549, category: "partner", note: "Aspiring Urban Mainstream" },
  "damilare":       { id: "damilare",        name: "Damilare Store",              address: "Along NNPC, Apata, Ibadan",               lat: 7.387442, lng: 3.824640, category: "partner", note: "Aspiring Urban Mainstream" },

  // Tuesday / Friday shared
  "iya-ahmed":      { id: "iya-ahmed",       name: "Iya Ahmed",                   address: "Apata, Ibadan",                            lat: 7.383480, lng: 3.828420, category: "partner", note: "Aspiring Urban Mainstream" },
  "mama-b":         { id: "mama-b",          name: "Mama B Store",                address: "Apata, Ibadan",                            lat: 7.382738, lng: 3.828524, category: "partner", note: "Aspiring Urban Premium" },
  "debby-lizzy":    { id: "debby-lizzy",     name: "Debby Lizzy Store",           address: "Omuiyadun Street, Apata, Ibadan",          lat: 7.386869, lng: 3.829219, category: "partner", note: "Aspiring Urban Mainstream" },
  "eniola-s":       { id: "eniola-s",        name: "Eniola Store",                address: "Apata, Ibadan",                            lat: 7.383590, lng: 3.836418, category: "partner", note: "Aspiring Urban Premium" },
  "blessing-bcga":  { id: "blessing-bcga",   name: "Blessing Store",              address: "1 BCGA Street, Apata, Ibadan",             lat: 7.383292, lng: 3.836315, category: "partner", note: "Aspiring Urban Mainstream" },
  "oluwapelumi":    { id: "oluwapelumi",     name: "Oluwapelumi Store",           address: "BCGA Apata, Ibadan",                       lat: 7.383643, lng: 3.836284, category: "partner", note: "Aspiring Urban Mainstream" },
  "eniola-stores":  { id: "eniola-stores",   name: "Eniola Stores",               address: "BCGA, Apata, Ibadan",                      lat: 7.383473, lng: 3.836236, category: "partner", note: "Aspiring Urban Mainstream" },
  "iya-nike":       { id: "iya-nike",        name: "Iya Nike Stores",             address: "Apata, Ibadan",                            lat: 7.383699, lng: 3.836296, category: "partner", note: "Aspiring Urban Mainstream" },
  "ewatomi":        { id: "ewatomi",         name: "Ewatomi Salon",               address: "Apata, Ibadan",                            lat: 7.383816, lng: 3.836314, category: "partner", note: "Aspiring Urban Premium" },
  "ayomi-korede":   { id: "ayomi-korede",    name: "Ayomi Korede Store",          address: "BCGA Street, Apata, Ibadan",               lat: 7.383610, lng: 3.836298, category: "partner", note: "Aspiring Urban Mainstream" },
  "mummy-aliamin":  { id: "mummy-aliamin",   name: "Mummy Aliamin Store",         address: "Omu Iyadun Junction, Apata, Ibadan",       lat: 7.386990, lng: 3.829506, category: "partner", note: "Aspiring Urban Premium" },
  "alhaja-jimoh":   { id: "alhaja-jimoh",    name: "Alhaja Jimoh Store",          address: "Apata, Ibadan",                            lat: 7.384731, lng: 3.828150, category: "partner", note: "Aspiring Urban Premium" },
  "iya-can":        { id: "iya-can",         name: "Iya Can Ventures",            address: "Apata, Ibadan",                            lat: 7.383626, lng: 3.825683, category: "partner", note: "Aspiring Urban Premium" },
  "hayohifeh":      { id: "hayohifeh",       name: "Hayohifeh Store",             address: "BCGA Street, Apata, Ibadan",               lat: 7.384688, lng: 3.836263, category: "partner", note: "Aspiring Urban Mainstream" },
  "goodness-mercy": { id: "goodness-mercy",  name: "Goodness and Mercy Store",    address: "Apata, Ibadan",                            lat: 7.384219, lng: 3.836246, category: "partner", note: "Aspiring Urban Mainstream" },
  "odedina":        { id: "odedina",         name: "Odedina Store",               address: "Apata, Ibadan",                            lat: 7.387082, lng: 3.828366, category: "partner", note: "Aspiring Urban Mainstream" },
  "ayomoyo":        { id: "ayomoyo",         name: "Ayomoyo Store",               address: "BCGA Street, Apata, Ibadan",               lat: 7.384677, lng: 3.836454, category: "partner", note: "Aspiring Urban Mainstream" },
  "mummy-tope":     { id: "mummy-tope",      name: "Mummy Tope Store",            address: "Apata, Ibadan",                            lat: 7.383287, lng: 3.836258, category: "partner", note: "Aspiring Urban Premium" },
  "bunmi-olatunde": { id: "bunmi-olatunde",  name: "Bunmi Olatunde",              address: "BCGA Street, Apata, Ibadan",               lat: 7.384132, lng: 3.836328, category: "partner", note: "Aspiring Urban Mainstream" },
  "solution-bar":   { id: "solution-bar",    name: "Solution Bar",                address: "Apata, Ibadan",                            lat: 7.383152, lng: 3.836526, category: "partner", note: "Aspiring Urban Mainstream" },
  "iya-snacks":     { id: "iya-snacks",      name: "Iya Snacks",                  address: "Apata, Ibadan",                            lat: 7.383457, lng: 3.836279, category: "partner", note: "Aspiring Urban Mainstream" },
  "obyo":           { id: "obyo",            name: "Obyo Ventures",               address: "Gbekuba Road, Apata, Ibadan",              lat: 7.391020, lng: 3.836283, category: "partner", note: "Aspiring Urban Mainstream" },
  "lady-b":         { id: "lady-b",          name: "Lady B Ventures",             address: "Gbekuba Road, Apata, Ibadan",              lat: 7.393197, lng: 3.834876, category: "partner", note: "Aspiring Urban Mainstream" },
  "boosam":         { id: "boosam",          name: "Boosam",                      address: "Gbekuba Road, Apata, Ibadan",              lat: 7.394119, lng: 3.836453, category: "partner", note: "Aspiring Urban Mainstream" },
  "joak":           { id: "joak",            name: "JOAK",                        address: "Apata, Ibadan",                            lat: 7.394808, lng: 3.836822, category: "partner", note: "Aspiring Urban Premium" },

  // Wednesday only
  "biosamfat":      { id: "biosamfat",       name: "Biosamfat Boutique and Cosmetics", address: "Up Jesus Junction, Gbekuba",          lat: 7.402486, lng: 3.835367, category: "partner", note: "Aspiring Urban Mainstream" },
  "mercy-of-god":   { id: "mercy-of-god",    name: "Mercy of God Stores",         address: "Ibadan",                                   lat: 7.398040, lng: 3.834577, category: "partner", note: "Aspiring Urban Mainstream" },
  "gbk-road":       { id: "gbk-road",        name: "Gbekuba Road, Ibadan",        address: "Ibadan",                                   lat: 7.393495, lng: 3.839917, category: "partner", note: "Aspiring Urban Mainstream" },
  "bakare":         { id: "bakare",          name: "Bakare Store",                address: "Gbekuba Araromi, Ibadan",                  lat: 7.400841, lng: 3.835861, category: "partner", note: "Aspiring Urban Mainstream" },
  "agbo-meji":      { id: "agbo-meji",       name: "Agbo Meji Store",             address: "Gbekuba, Ibadan",                          lat: 7.389857, lng: 3.827736, category: "partner", note: "Aspiring Urban Mainstream" },
  "remson":         { id: "remson",          name: "Remson Food Canteen",         address: "Opposite Gbabila Omo-Owo Plaza, Apata, Ibadan", lat: 7.389426, lng: 3.831765, category: "partner", note: "Aspiring Urban Mainstream" },
  "marvelous":      { id: "marvelous",       name: "Marvelous Store",             address: "Near Up Jesus Complex, Ibadan",            lat: 7.401995, lng: 3.836031, category: "partner", note: "Aspiring Urban Mainstream" },
  "unique-bv":      { id: "unique-bv",       name: "Unique Business Venture",     address: "Aba Afa, Gbekuba, Ibadan",                 lat: 7.395020, lng: 3.836796, category: "partner", note: "Aspiring Urban Mainstream" },
  "apola":          { id: "apola",           name: "Apola Store",                 address: "Gbekuba Road 7 Ibadan",                    lat: 7.391698, lng: 3.840302, category: "partner", note: "Aspiring Urban Mainstream" },
  "oluwaseun":      { id: "oluwaseun",       name: "Oluwaseun Store",             address: "Agbede Junction, Gbekuba, Ibadan",         lat: 7.402538, lng: 3.835017, category: "partner", note: "Aspiring Urban Mainstream" },
  "temmy":          { id: "temmy",           name: "Temmy Store",                 address: "Gbekuba, Ibadan",                          lat: 7.399035, lng: 3.835537, category: "partner", note: "Aspiring Urban Mainstream" },
  "yemyet":         { id: "yemyet",          name: "Yemyet Wine and Groceries",   address: "Agbofieti Road, Ibadan",                   lat: 7.393328, lng: 3.835692, category: "partner", note: "Aspiring Urban Mainstream" },
  "warafana":       { id: "warafana",        name: "Warafana",                    address: "Araromi, Gbekuba, Ibadan",                 lat: 7.398052, lng: 3.836038, category: "partner", note: "Aspiring Urban Mainstream" },
  "reetas":         { id: "reetas",          name: "Reetas",                      address: "Along Up Jesus, Gbekuba, Ibadan",          lat: 7.400726, lng: 3.839349, category: "partner", note: "Aspiring Urban Mainstream" },
  "tty":            { id: "tty",             name: "TTY Neighbouring Ventures",   address: "Up Jesus, Gbekuba, Ibadan",                lat: 7.402482, lng: 3.834128, category: "partner", note: "Aspiring Urban Mainstream" },
  "mummy-kemi":     { id: "mummy-kemi",      name: "Mummy Kemi Store",            address: "Up Jesus, Ibadan",                         lat: 7.403403, lng: 3.833536, category: "partner", note: "Aspiring Urban Mainstream" },
  "princess-super": { id: "princess-super",  name: "Princess Supermarket",        address: "Up Jesus, Gbekuba, Ibadan",                lat: 7.403034, lng: 3.833974, category: "partner", note: "Aspiring Urban Mainstream" },

  // Thursday only
  "hello-somebody": { id: "hello-somebody",  name: "Hello Somebody Store",        address: "NNPC Site, Apata, Ibadan",                 lat: 7.389954, lng: 3.821434, category: "partner", note: "Aspiring Urban Mainstream" },
  "adefila":        { id: "adefila",         name: "Adefila Stores",              address: "Owode Idi-Oro, Apata, Ibadan",             lat: 7.387992, lng: 3.822407, category: "partner", note: "Aspiring Urban Premium" },
  "silver":         { id: "silver",          name: "Silver Store",                address: "Apata Road, Ibadan",                       lat: 7.386295, lng: 3.824031, category: "partner", note: "Aspiring Urban Premium" },
  "an-nuuru":       { id: "an-nuuru",        name: "An Nuuru The Light Variety Store", address: "Railway Line, Apata, Ibadan",          lat: 7.389805, lng: 3.820445, category: "partner", note: "Aspiring Urban Mainstream" },
  "ajoke":          { id: "ajoke",           name: "Ajoke Store",                 address: "NNPC Road, Apata, Ibadan",                 lat: 7.389921, lng: 3.820696, category: "partner", note: "Aspiring Urban Mainstream" },
  "blessing-nnpc":  { id: "blessing-nnpc",   name: "Blessing Store",              address: "Along NNPC, Apata, Ibadan",               lat: 7.386278, lng: 3.824116, category: "partner", note: "Aspiring Urban Mainstream" },
  "amusan":         { id: "amusan",          name: "Amusan Store",                address: "Samade Street, Along NNPC, Ibadan",        lat: 7.389507, lng: 3.821704, category: "partner", note: "Aspiring Urban Mainstream" },
  "gods-favour-s":  { id: "gods-favour-s",   name: "God's Favour Store",          address: "Apata, Ibadan",                            lat: 7.386614, lng: 3.823862, category: "partner", note: "Aspiring Urban Mainstream" },
  "mama-seun":      { id: "mama-seun",       name: "Mama Seun Stores",            address: "Apata, Ibadan",                            lat: 7.386715, lng: 3.823812, category: "partner", note: "Aspiring Urban Premium" },
  "glory-of-god":   { id: "glory-of-god",    name: "Glory of God Store",          address: "Abeokuta Express, Apata, Ibadan",          lat: 7.386735, lng: 3.823742, category: "partner", note: "Aspiring Urban Mainstream" },
  "ronke":          { id: "ronke",           name: "Ronke Store",                 address: "Ahmadiyya Area, Apata, Ibadan",            lat: 7.385596, lng: 3.824539, category: "partner", note: "Aspiring Urban Premium" },
  "abimbola":       { id: "abimbola",        name: "Abimbola Stores",             address: "NNPC Apata, Ibadan",                       lat: 7.390796, lng: 3.820429, category: "partner", note: "Aspiring Urban Mainstream" },
  "ben-iyke":       { id: "ben-iyke",        name: "Ben Iyke Global Enterprises", address: "Apata, Ibadan",                            lat: 7.387277, lng: 3.823034, category: "partner", note: "Aspiring Urban Mainstream" },
  "good-chef":      { id: "good-chef",       name: "Good Chef Store",             address: "NNPC Area, Apata, Ibadan",                 lat: 7.390016, lng: 3.820457, category: "partner", note: "Aspiring Urban Premium" },
  "with-god":       { id: "with-god",        name: "With God Store",              address: "Adifase, Apata, Ibadan",                   lat: 7.388595, lng: 3.822383, category: "partner", note: "Aspiring Urban Premium" },
  "mammi-s":        { id: "mammi-s",         name: "Mammi S Store",               address: "NNPC Road, Apata, Ibadan",                 lat: 7.389341, lng: 3.821665, category: "partner", note: "Aspiring Urban Affordable" },
  "3ds":            { id: "3ds",             name: "3DS Ventures",                address: "Apata, Ibadan",                            lat: 7.387440, lng: 3.823133, category: "partner", note: "Aspiring Urban Premium" },
  "kontssap":       { id: "kontssap",        name: "Kontssap Ventures",           address: "Adifase, Apata, Ibadan",                   lat: 7.386641, lng: 3.823995, category: "partner", note: "Aspiring Urban Mainstream" },
  "focus":          { id: "focus",           name: "Focus Store",                 address: "Apata, Ibadan",                            lat: 7.387356, lng: 3.825913, category: "partner", note: "Aspiring Urban Premium" },
  "ya-lateef":      { id: "ya-lateef",       name: "Ya Lateef Store",             address: "Along NNPC Apata, Ibadan",                 lat: 7.388822, lng: 3.821601, category: "partner", note: "Aspiring Urban Mainstream" },
  "adebhat":        { id: "adebhat",         name: "Adebhat Store",               address: "NNPC Junction, Apata, Ibadan",             lat: 7.389780, lng: 3.820093, category: "partner", note: "Aspiring Urban Premium" },
  "layo":           { id: "layo",            name: "Layo Store",                  address: "Abeokuta Road, Apata, Ibadan",             lat: 7.386757, lng: 3.823306, category: "partner", note: "Aspiring Urban Mainstream" },
  "alhaja-olorun":  { id: "alhaja-olorun",   name: "Alhaja Olorunlowu Store",     address: "Apata, Ibadan",                            lat: 7.386413, lng: 3.824139, category: "partner", note: "Aspiring Urban Mainstream" },
  "tofat":          { id: "tofat",           name: "Tofat Ventures",              address: "Apata, Ibadan",                            lat: 7.388424, lng: 3.822002, category: "partner", note: "Aspiring Urban Premium" },
  "omoh":           { id: "omoh",            name: "Omoh Enterprises",            address: "Apata, Ibadan",                            lat: 7.389594, lng: 3.822105, category: "partner", note: "Aspiring Urban Mainstream" },
  "iseabiyamo":     { id: "iseabiyamo",      name: "Iseabiyamo",                  address: "Apata, Ibadan",                            lat: 7.389238, lng: 3.822625, category: "partner", note: "Aspiring Urban Mainstream" },

  // Friday only
  "moismail":       { id: "moismail",        name: "Moismail Filling Station",    address: "Apata, Ibadan",                            lat: 7.383053, lng: 3.824653, category: "partner", note: "Aspiring Urban Premium" },
  "essence":        { id: "essence",         name: "Essence Store",               address: "Apata, Ibadan",                            lat: 7.384452, lng: 3.825905, category: "partner", note: "Aspiring Urban Mainstream" },
  "biskem":         { id: "biskem",          name: "Biskem Store",                address: "Apata, Ibadan",                            lat: 7.384634, lng: 3.826072, category: "partner", note: "Aspiring Urban Premium" },
  "event-wine":     { id: "event-wine",      name: "Event and Wine Store",        address: "Apata, Ibadan",                            lat: 7.383481, lng: 3.828111, category: "partner", note: "Aspiring Urban Mainstream" },
  "nnpc-filling":   { id: "nnpc-filling",    name: "NNPC Filling Station",        address: "Apata, Ibadan",                            lat: 7.383563, lng: 3.826418, category: "partner", note: "Aspiring Urban Premium" },
  "success":        { id: "success",         name: "Success Store",               address: "Obadina Street, Apata, Ibadan",            lat: 7.383396, lng: 3.826829, category: "partner", note: "Aspiring Urban Premium" },
  "godswill":       { id: "godswill",        name: "Godswill Store",              address: "Lasokun Street, Gbekuba, Apata, Ibadan",   lat: 7.383605, lng: 3.836306, category: "partner", note: "Aspiring Urban Mainstream" },
  "aduragbemi":     { id: "aduragbemi",      name: "Aduragbemi Stores",           address: "Amole Street, Apata, Ibadan",              lat: 7.383191, lng: 3.828458, category: "partner", note: "Aspiring Urban Mainstream" },
  "jacombe":        { id: "jacombe",         name: "Jacombe Store",               address: "Apata Market, Ibadan",                     lat: 7.384389, lng: 3.826100, category: "partner", note: "Aspiring Urban Premium" },
  "divine-mercy":   { id: "divine-mercy",    name: "Divine Mercy Store",          address: "Dogo, Apata, Ibadan",                      lat: 7.383648, lng: 3.827981, category: "partner", note: "Aspiring Urban Premium" },
  "baba-ruka":      { id: "baba-ruka",       name: "Baba Ruka",                   address: "BCGA Street, Apata, Ibadan",               lat: 7.383659, lng: 3.836318, category: "partner", note: "Aspiring Urban Premium" },
  "fortis":         { id: "fortis",          name: "Fortis Pharmacy",             address: "Opposite Wema Bank, Apata, Ibadan",        lat: 7.383546, lng: 3.828957, category: "partner", note: "Aspiring Urban Premium" },
  "gina":           { id: "gina",            name: "Gina Store",                  address: "Apata Market, Ibadan",                     lat: 7.383774, lng: 3.825972, category: "partner", note: "Aspiring Urban Premium" },
  "opeyemi-mkt":    { id: "opeyemi-mkt",     name: "Opeyemi Store",               address: "Apata Market, Ibadan",                     lat: 7.382281, lng: 3.825737, category: "partner", note: "Aspiring Urban Premium" },
  "events-wine-2":  { id: "events-wine-2",   name: "Events and Wine Apata",       address: "Apata, Ibadan",                            lat: 7.382340, lng: 3.825015, category: "partner", note: "Aspiring Urban Premium" },
  "deultimate":     { id: "deultimate",      name: "Deultimate Drinks Store",     address: "Dogo Bus Stop, Apata, Ibadan",             lat: 7.383644, lng: 3.827986, category: "partner", note: "Aspiring Urban Mainstream" },
  "royal-wealth":   { id: "royal-wealth",    name: "Royal Wealth Store",          address: "Olose Aba Pan, Apata, Ibadan",             lat: 7.383699, lng: 3.826937, category: "partner", note: "Retail Services" },
  "opeoluwa":       { id: "opeoluwa",        name: "Opeoluwa Store",              address: "Amole Street, Apata, Ibadan",              lat: 7.383266, lng: 3.828525, category: "partner", note: "Aspiring Urban Mainstream" },
  "rasdeby":        { id: "rasdeby",         name: "Rasdeby Ventures",            address: "BCGA Junction, Apata, Ibadan",             lat: 7.382555, lng: 3.837012, category: "partner", note: "Aspiring Urban Mainstream" },
  "baymas":         { id: "baymas",          name: "Baymas Filling Station",      address: "Opposite Wema Bank, Apata, Ibadan",        lat: 7.383743, lng: 3.829495, category: "partner", note: "Aspiring Urban Mainstream" },
};

// ─── Helper ──────────────────────────────────────────────────────────────────
const pick = (...keys: string[]): Location[] => keys.map(k => L[k]);

// ─── Week schedule ───────────────────────────────────────────────────────────
export const weekSchedule: DaySchedule[] = [
  {
    day: "Saturday", shortDay: "Sat",
    locations: pick(
      "r-owuye","iya-glo","ola-inu-kan","omolola","akorede","hallelujah",
      "bofate","acrobat","horpsy","opeyemi-gbk","gods-surprise","arostella",
      "johnson","gold-m","laweebee","aluwaju","gods-time","ojuoluwa",
      "mummy-tobi","kolib","tenny-lammy","la-boycert","moranugba","mummy-oba",
      "adest","mummy-eniola","vic","bunmis","clemnah","aunty-bee","deejubog",
      "temitope-gbk","gods-favour-v","lampeace","gold-store","boluwatife"
    ),
  },
  {
    day: "Monday", shortDay: "Mon",
    locations: pick(
      "adeyemo","adedeji","jolly","ambass","mama-wura","bizak","monfi","adisco",
      "omowunmi","mrs-olabamiji","funmalo","alikulu","kazmut","jubril","mothraf",
      "t-and-t","hikmat","eleha","best-way","mummy-ibrahim","sumad","blue-ribbon",
      "ebetoy","oyin","karutu","olanrewaju","eats-chops","ewaoluwa","iya-pupa",
      "joyous-g","em-liquor","funmi-mart","damilare"
    ),
  },
  {
    day: "Tuesday", shortDay: "Tue",
    locations: pick(
      "iya-ahmed","mama-b","debby-lizzy","eniola-s","blessing-bcga","oluwapelumi",
      "eniola-stores","iya-nike","ewatomi","ayomi-korede","mummy-aliamin",
      "alhaja-jimoh","iya-can","hayohifeh","goodness-mercy","odedina","ayomoyo",
      "mummy-tope","bunmi-olatunde","solution-bar","iya-snacks","obyo","lady-b",
      "boosam","joak"
    ),
  },
  {
    day: "Wednesday", shortDay: "Wed",
    locations: pick(
      "ola-inu-kan","biosamfat","opeyemi-gbk","gods-surprise","arostella","johnson",
      "mercy-of-god","laweebee","bofate","hallelujah","aluwaju","gbk-road","bakare",
      "agbo-meji","omolola","acrobat","remson","gods-time","marvelous","mummy-tobi",
      "r-owuye","kolib","unique-bv","moranugba","mummy-oba","apola","oluwaseun",
      "temitope-gbk","temmy","yemyet","warafana","reetas","tty","mummy-kemi",
      "princess-super"
    ),
  },
  {
    day: "Thursday", shortDay: "Thu",
    locations: pick(
      "adeyemo","adedeji","hello-somebody","adefila","silver","ambass","an-nuuru",
      "ajoke","blessing-nnpc","monfi","amusan","gods-favour-s","funmalo","mama-seun",
      "kazmut","jubril","glory-of-god","ronke","t-and-t","abimbola","ben-iyke",
      "good-chef","mummy-ibrahim","with-god","mammi-s","3ds","kontssap","ebetoy",
      "focus","oyin","ya-lateef","eats-chops","adebhat","layo","alhaja-olorun",
      "tofat","omoh","iseabiyamo"
    ),
  },
  {
    day: "Friday", shortDay: "Fri",
    locations: pick(
      "iya-ahmed","moismail","essence","biskem","event-wine","nnpc-filling","mama-b",
      "debby-lizzy","success","godswill","oluwapelumi","iya-nike","aduragbemi",
      "ayomi-korede","jacombe","divine-mercy","baba-ruka","fortis","gina",
      "opeyemi-mkt","iya-can","events-wine-2","deultimate","royal-wealth","opeoluwa",
      "ayomoyo","rasdeby","baymas"
    ),
  },
];

// ─── Display config ───────────────────────────────────────────────────────────
export const categoryColors: Record<Location["category"], string> = {
  office:  "#3b82f6",
  client:  "#f43f5e",
  site:    "#f59e0b",
  partner: "#10b981",
};

export const categoryLabels: Record<Location["category"], string> = {
  office:  "Office",
  client:  "Client",
  site:    "Site",
  partner: "Customer",
};