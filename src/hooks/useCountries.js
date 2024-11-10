import countries from 'world-countries';

const countryRegions = {
  Cyprus: [
      "Aphrodite Hills",
      "Ayia Napa",
      "Agraka",
      "Larnaca",
      "Paphos",
      "Pernera",
      "Protaras",
      "Paralimni",
  ],
  Greece: [
      "Attica",
      "Central Macedonia",
      "Crete",
      "Epirus",
      "Thessaloniki",
      "Peloponnese",
      "Ionian Islands",
      "North Aegean",
      "South Aegean",
      "Western Macedonia",
      "Eastern Macedonia and Thrace",
      "Aptera",
      "Corfu",
      "Kato Korakiana",
      "Mykonos",
      "Santorini",
      "Zakynthos"
  ],
  "United Arab Emirates": [
      "Abu Dhabi",
      "Dubai",
      "Sharjah",
      "Ajman",
      "Umm Al-Quwain",
      "Fujairah",
      "Ras Al Khaimah",
  ],
  "United States": [
      "California",
      "Texas",
      "Florida",
      "New York",
      "Destin",
      "Glacier",
      "Kihei",
      "Kissimmee",
      "Orlando",
      "Reunion"
  ],
  "United Kingdom": [
      "Belper"
  ],
    "Austria": [
      "Vienna",
      "Lower Austria",
      "Upper Austria",
      "Tyrol",
      "Vorarlberg",
      "Eastern Tyrol",
      "Carinthia",
      "Styria",
      "Burgenland",
      "Salzkammergut",
      "Salzburg",
      "Gastein Valley",
      "Grossarl Valley",
      "Zillertal",
      "Ötztal",
      "Lungau",
      "Montafon",
      "Oberinntal",
      "Pitztal",
      "Murtal-Kreischberg",
      "Arlberg mountain",
      "Lake Neusiedl",
      "Pongau",
      "Pinzgau",
      "Paznaun",
      "Stubaital"
    ],
    "Belgium": [
      "Flanders",
      "Coast",
      "Interior",
      "Belgisch Limburg",
      "Wallonia",
      "Ardennes",
      "Henegouwen"
    ],
    "Croatia": [
      "South Dalmatia",
      "Dalmatia",
      "Central Croatia",
      "Istria",
      "Kvarner",
      "North Dalmatia",
      "Kvarner Hills",
      "Central Dalmatia"
    ],
    "Czech Republic": [
      "Prague and surroundings",
      "Central Bohemia",
      "South Bohemia",
      "West Bohemia",
      "Ore Mountains",
      "Bohemian Switzerland",
      "Jizera Mountains",
      "Adrspach",
      "Eastern Bohemia",
      "Vysocina Region",
      "South Moravia",
      "Jeseniky Mountains",
      "Beskids",
      "Giant Mountains",
      "Bohemian Forest",
      "Bohemian Paradise",
      "Orlicke Mountains"
    ],
    "Denmark": [
      "Jutland & North Sea",
      "Limfjord",
      "Baltic Sea",
      "Bornholm",
      "Sealand",
      "Lolland, Falster & Møn",
      "Western Jutland",
      "Southeast Jutland",
      "Northwest Jutland",
      "Northeast Jutland",
      "Djursland & Mols",
      "Funen & islands"
    ],
    "France": [
      "Ile-de-France",
      "Loire Valley",
      "Burgundy",
      "Alsace",
      "Lorraine-Vosges",
      "Nord/Pas-de-Calais",
      "Picardie",
      "Normandy",
      "Western Loire",
      "Poitou-Charentes",
      "Limousin",
      "Auvergne",
      "Aquitaine",
      "Basque Country",
      "Les Landes",
      "Gironde",
      "Lot-Midi-Pyrénées",
      "Lot",
      "Hautes Pyrénées",
      "Languedoc-Roussillon",
      "Gard-Lozère",
      "Hérault-Aude",
      "Pyrénées-Orientales",
      "Ardèche",
      "Provence",
      "Cote d'Azur",
      "Corsica",
      "Alps",
      "Dauphinoise",
      "Savoie - Haute Savoie",
      "Southern Alps",
      "Vosges",
      "Luberon",
      "Charente-Maritime",
      "Périgord",
      "Tarn-et-Garonne",
      "Lot-et-Garonne",
      "Vendée",
      "Camargue",
      "Brittany",
      "Côtes d'Armor",
      "Finistère",
      "Ille-et-Vilaine",
      "Loire-Atlantique",
      "Morbihan"
    ],
    "Germany": [
      "Baltic Sea",
      "North Sea",
      "Mecklenburgische Seenplatte",
      "Weserbergland",
      "Harz",
      "Lüneburger Heide",
      "Saxony-Anhalt",
      "Brandenburg",
      "Eifel",
      "Sauerland",
      "Teutoburg Forest",
      "Odenwald",
      "Hessisches Bergland",
      "Thuringian Forest",
      "Saxony",
      "Rhine - Mosel - Ahr - Lahn",
      "Hunsrück",
      "Palatinate",
      "Black Forest",
      "Lake Constance",
      "Upper Bavaria",
      "Bavaria",
      "Bavarian Forest",
      "Franken - Fichtelgebirge - Taubertal",
      "Allgau",
      "Emsland",
      "Rügen",
      "Usedom",
      "Altmühltal",
      "Swabian - Franconian Forest",
      "Rhön",
      "Ruhrgebiet",
      "Edersee",
      "Westerwald"
    ],
    "Hungary": [
      "Budapest",
      "Lake Balaton - North Shore",
      "Balaton",
      "Lake Balaton - South Shore",
      "Velence-Lake",
      "Thermal"
    ],
    "Ireland": [
      "Dublin",
      "South East",
      "Cork and Kerry",
      "The Shannon Region",
      "West Ireland",
      "North West Ireland"
    ],
    "Italy": [
      "Aosta Valley",
      "Piemonte",
      "Liguria",
      "Liguria Riviera Ponente",
      "Liguria Riviera Levante & Cinque Terre",
      "Lombardy",
      "North-Italian Lakes",
      "Lago d’Orta",
      "Lake Maggiore",
      "Lake Lugano",
      "Lake Como",
      "Lake Iseo and Idro",
      "Lake Garda",
      "Lake Ledro",
      "Trentino",
      "Dolomites",
      "Alto Adige/South Tirol",
      "Friuli-Venezia Giulia",
      "Adriatic",
      "Tuscany",
      "Florence Countryside",
      "Tuscany Chianti",
      "Arezzo, Cortona and surroundings",
      "Lucca, Pisa and surroundings",
      "Versilia, Lunigiana and surroundings",
      "Maremma Coast",
      "Siena and surroundings",
      "Elba Island",
      "Firenze Città and surroundings",
      "Umbria",
      "Lazio Inland",
      "Campania",
      "Ischia/Capri/Procida",
      "Amalfi Coast",
      "Cilento",
      "Naples & Sorrentino Peninsula",
      "Calabria",
      "Puglia",
      "Sicily",
      "Sardinia",
      "Trulli",
      "Trasimeno Lake",
      "Maremma Inland",
      "Riviera degli Etruschi",
      "Piemonte-Langhe & Monferrato",
      "Gargano",
      "Salento",
      "Fassa Valley",
      "Abruzzo",
      "Molise",
      "Veneto",
      "Emilia Romagna",
      "Marche",
      "Lazio Coast",
      "Rome City",
      "Fiemme Valley"
    ],
    "Luxembourg": [
      "Ardennes",
      "Moselle"
    ],
    "Netherlands": [
      "Groningen",
      "Friesland",
      "Drenthe",
      "Overijssel",
      "Gelderland",
      "Utrecht",
      "Noord-Holland",
      "Zuid-Holland",
      "Zeeland",
      "Noord-Brabant",
      "Limburg",
      "Flevoland",
      "Ijsselmeer"
    ],
    "Norway": [
      "Hallingdal",
      "Eastern Norway",
      "Northern Norway",
      "Lofoten",
      "Valdres",
      "Fjord Norway",
      "Nordmøre",
      "Sunnmøre",
      "Nordfjord",
      "Sunnfjord",
      "(Outer) Sognefjord",
      "(Inner) Sognefjord",
      "Midthordland",
      "Sunnhordland",
      "Hardanger",
      "Sørlandet",
      "Lister",
      "Åseral",
      "Lindesnes and surroundings",
      "Kristiansand and surroundings",
      "Setesdal",
      "Ost Agder",
      "West Telemark",
      "Vestmar",
      "Gudbrandsdalen"
    ],
    "Poland": [
      "Pomerania",
      "Mazury",
      "Large Poland",
      "Sudeten",
      "Silesia",
      "Beskidy",
      "Tatras",
      "Bieszczady",
      "Podlasia",
      "Little Poland",
      "Mazovia",
      "Baltic Sea (Poland)",
      "Lubelskie Region",
      "Lubuskie Region",
      "Podkarpackie Region"
    ],
    "Portugal": [
      "North/Oporto",
      "Lisbon",
      "Lisbon-Tejo Valley",
      "Alentejo",
      "Algarve"
    ],
    "Slovakia": [
      "Trentschin Region",
      "Sillein Region",
      "Preschau Region"
    ],
    "Slovenia": [
      "Kranjska Gora",
      "Drava",
      "Coast & Karst region",
      "Gorenjska",
      "Goriška Brda",
      "Julian Alps"
    ],
    "Spain": [
      "Madrid",
      "Galicia",
      "Cantabria",
      "Basque Country",
      "Pyrenees",
      "Inland Catalonia",
      "Costa Brava",
      "Barcelona – North Coast",
      "Barcelona",
      "Costa del Garraf",
      "Costa Daurada",
      "Navarra",
      "Costa de Valencia",
      "Valencia",
      "Costa del Azahar",
      "Costa Blanca",
      "Costa Cálida",
      "Inland Andalucia",
      "Costa de Almería",
      "Costa Tropical",
      "Costa del Sol",
      "Costa de la Luz",
      "Canary Islands",
      "Gran Canaria",
      "Fuerteventura",
      "Lanzarote",
      "La Palma",
      "Tenerife",
      "Balearic Islands",
      "Mallorca",
      "Menorca",
      "Ibiza",
      "Formentera"
    ],
    "Sweden": [
      "Härjedalen",
      "North Sweden",
      "Hälsingland",
      "Norrbotten - Lappland",
      "Jämtland",
      "Värmland",
      "Swealand",
      "Närke",
      "Södermanland",
      "Stockholm",
      "Uppland",
      "Kronoberg",
      "Västmanland",
      "Dalarna",
      "Southern Sweden",
      "Skåne",
      "Blekinge",
      "Småland",
      "Halland",
      "Bohuslän",
      "Dalsland",
      "Västra Götaland",
      "Östergötland"
    ],
    "Switzerland": [
      "Alpes Vaudoises",
      "Lake Geneva Region",
      "Valais",
      "Jura",
      "Freiburg",
      "Bernese Oberland",
      "Bernese Mittelland",
      "Central Switzerland",
      "Ticino",
      "Graubunden",
      "Engadine",
      "Misox",
      "Surselva",
      "Prättigau",
      "Mittelbünden",
      "Viamala/Surses/Albulatal",
      "Eastern Switzerland",
      "Lake Zurich Region",
      "Val d’Anniviers",
      "Portes du Soleil",
      "Emmental"
    ]
  

};

// Define region codes as an array of objects
const regionCodes = {
  "Austria": [
    {
      "regionCode": "01",
      "regionName": "Vienna"
    },
    {
      "regionCode": "10",
      "regionName": "Lower Austria"
    },
    {
      "regionCode": "20",
      "regionName": "Upper Austria"
    },
    {
      "regionCode": "40",
      "regionName": "Tyrol"
    },
    {
      "regionCode": "50",
      "regionName": "Vorarlberg"
    },
    {
      "regionCode": "60",
      "regionName": "Eastern Tyrol"
    },
    {
      "regionCode": "70",
      "regionName": "Carinthia"
    },
    {
      "regionCode": "80",
      "regionName": "Styria"
    },
    {
      "regionCode": "90",
      "regionName": "Burgenland"
    },
    {
      "regionCode": "31",
      "regionName": "Salzkammergut"
    },
    {
      "regionCode": "30",
      "regionName": "Salzburg"
    },
    {
      "regionCode": "36",
      "regionName": "Gastein Valley"
    },
    {
      "regionCode": "37",
      "regionName": "Grossarl Valley"
    },
    {
      "regionCode": "41",
      "regionName": "Zillertal"
    },
    {
      "regionCode": "42",
      "regionName": "Ötztal"
    },
    {
      "regionCode": "32",
      "regionName": "Lungau"
    },
    {
      "regionCode": "51",
      "regionName": "Montafon"
    },
    {
      "regionCode": "39",
      "regionName": "Oberinntal"
    },
    {
      "regionCode": "95",
      "regionName": "Pitztal"
    },
    {
      "regionCode": "81",
      "regionName": "Murtal-Kreischberg"
    },
    {
      "regionCode": "52",
      "regionName": "Arlberg mountain"
    },
    {
      "regionCode": "91",
      "regionName": "Lake Neusiedl"
    },
    {
      "regionCode": "29",
      "regionName": "Pongau"
    },
    {
      "regionCode": "38",
      "regionName": "Pinzgau"
    },
    {
      "regionCode": "43",
      "regionName": "Paznaun"
    },
    {
      "regionCode": "44",
      "regionName": "Stubaital"
    }
  ],
  "Belgium": [
    {
      "regionCode": "45",
      "regionName": "Flanders"
    },
    {
      "regionCode": "46",
      "regionName": "Coast"
    },
    {
      "regionCode": "48",
      "regionName": "Interior"
    },
    {
      "regionCode": "49",
      "regionName": "Belgisch Limburg"
    },
    {
      "regionCode": "55",
      "regionName": "Wallonia"
    },
    {
      "regionCode": "56",
      "regionName": "Ardennes"
    },
    {
      "regionCode": "57",
      "regionName": "Henegouwen"
    }
  ],
  "Croatia": [
    {
      "regionCode": "60",
      "regionName": "South Dalmatia"
    },
    {
      "regionCode": "39",
      "regionName": "Dalmatia"
    },
    {
      "regionCode": "10",
      "regionName": "Central Croatia"
    },
    {
      "regionCode": "20",
      "regionName": "Istria"
    },
    {
      "regionCode": "30",
      "regionName": "Kvarner"
    },
    {
      "regionCode": "40",
      "regionName": "North Dalmatia"
    },
    {
      "regionCode": "70",
      "regionName": "Kvarner Hills"
    },
    {
      "regionCode": "50",
      "regionName": "Central Dalmatia"
    }
  ],
  "Czech Republic": [
    {
      "regionCode": "01",
      "regionName": "Prague and surroundings"
    },
    {
      "regionCode": "04",
      "regionName": "Central Bohemia"
    },
    {
      "regionCode": "07",
      "regionName": "South Bohemia"
    },
    {
      "regionCode": "10",
      "regionName": "West Bohemia"
    },
    {
      "regionCode": "13",
      "regionName": "Ore Mountains"
    },
    {
      "regionCode": "16",
      "regionName": "Bohemian Switzerland"
    },
    {
      "regionCode": "19",
      "regionName": "Jizera Mountains"
    },
    {
      "regionCode": "22",
      "regionName": "Adrspach"
    },
    {
      "regionCode": "25",
      "regionName": "Eastern Bohemia"
    },
    {
      "regionCode": "28",
      "regionName": "Vysocina Region"
    },
    {
      "regionCode": "31",
      "regionName": "South Moravia"
    },
    {
      "regionCode": "37",
      "regionName": "Jeseniky Mountains"
    },
    {
      "regionCode": "40",
      "regionName": "Beskids"
    },
    {
      "regionCode": "24",
      "regionName": "Giant Mountains"
    },
    {
      "regionCode": "08",
      "regionName": "Bohemian Forest"
    },
    {
      "regionCode": "20",
      "regionName": "Bohemian Paradise"
    },
    {
      "regionCode": "23",
      "regionName": "Orlicke Mountains"
    }
  ],
  "Denmark": [
    {
      "regionCode": "20",
      "regionName": "Jutland & North Sea"
    },
    {
      "regionCode": "23",
      "regionName": "Limfjord"
    },
    {
      "regionCode": "10",
      "regionName": "Baltic Sea"
    },
    {
      "regionCode": "11",
      "regionName": "Bornholm"
    },
    {
      "regionCode": "12",
      "regionName": "Sealand"
    },
    {
      "regionCode": "13",
      "regionName": "Lolland, Falster & Møn"
    },
    {
      "regionCode": "22",
      "regionName": "Western Jutland"
    },
    {
      "regionCode": "21",
      "regionName": "Southeast Jutland"
    },
    {
      "regionCode": "24",
      "regionName": "Northwest Jutland"
    },
    {
      "regionCode": "25",
      "regionName": "Northeast Jutland"
    },
    {
      "regionCode": "26",
      "regionName": "Djursland & Mols"
    },
    {
      "regionCode": "14",
      "regionName": "Funen & islands"
    }
  ],
  "France": [
    {
      "regionCode": "01",
      "regionName": "Ile-de-France"
    },
    {
      "regionCode": "03",
      "regionName": "Loire Valley"
    },
    {
      "regionCode": "09",
      "regionName": "Burgundy"
    },
    {
      "regionCode": "11",
      "regionName": "Alsace"
    },
    {
      "regionCode": "12",
      "regionName": "Lorraine-Vosges"
    },
    {
      "regionCode": "22",
      "regionName": "Nord/Pas-de-Calais"
    },
    {
      "regionCode": "24",
      "regionName": "Picardie"
    },
    {
      "regionCode": "27",
      "regionName": "Normandy"
    },
    {
      "regionCode": "37",
      "regionName": "Western Loire"
    },
    {
      "regionCode": "43",
      "regionName": "Poitou-Charentes"
    },
    {
      "regionCode": "45",
      "regionName": "Limousin"
    },
    {
      "regionCode": "46",
      "regionName": "Auvergne"
    },
    {
      "regionCode": "47",
      "regionName": "Aquitaine"
    },
    {
      "regionCode": "48",
      "regionName": "Basque Country"
    },
    {
      "regionCode": "49",
      "regionName": "Les Landes"
    },
    {
      "regionCode": "50",
      "regionName": "Gironde"
    },
    {
      "regionCode": "57",
      "regionName": "Lot-Midi-Pyrénées"
    },
    {
      "regionCode": "59",
      "regionName": "Lot"
    },
    {
      "regionCode": "60",
      "regionName": "Hautes Pyrénées"
    },
    {
      "regionCode": "66",
      "regionName": "Languedoc-Roussillon"
    },
    {
      "regionCode": "67",
      "regionName": "Gard-Lozère"
    },
    {
      "regionCode": "68",
      "regionName": "Hérault-Aude"
    },
    {
      "regionCode": "69",
      "regionName": "Pyrénées-Orientales"
    },
    {
      "regionCode": "71",
      "regionName": "Ardèche"
    },
    {
      "regionCode": "72",
      "regionName": "Provence"
    },
    {
      "regionCode": "75",
      "regionName": "Cote d'Azur"
    },
    {
      "regionCode": "80",
      "regionName": "Corsica"
    },
    {
      "regionCode": "93",
      "regionName": "Alps"
    },
    {
      "regionCode": "94",
      "regionName": "Dauphinoise"
    },
    {
      "regionCode": "96",
      "regionName": "Savoie - Haute Savoie"
    },
    {
      "regionCode": "98",
      "regionName": "Southern Alps"
    },
    {
      "regionCode": "13",
      "regionName": "Vosges"
    },
    {
      "regionCode": "73",
      "regionName": "Luberon"
    },
    {
      "regionCode": "44",
      "regionName": "Charente-Maritime"
    },
    {
      "regionCode": "52",
      "regionName": "Périgord"
    },
    {
      "regionCode": "53",
      "regionName": "Tarn-et-Garonne"
    },
    {
      "regionCode": "54",
      "regionName": "Lot-et-Garonne"
    },
    {
      "regionCode": "38",
      "regionName": "Vendée"
    },
    {
      "regionCode": "65",
      "regionName": "Camargue"
    },
    {
      "regionCode": "33",
      "regionName": "Brittany"
    },
    {
      "regionCode": "29",
      "regionName": "Côtes d'Armor"
    },
    {
      "regionCode": "30",
      "regionName": "Finistère"
    },
    {
      "regionCode": "31",
      "regionName": "Ille-et-Vilaine"
    },
    {
      "regionCode": "39",
      "regionName": "Loire-Atlantique"
    },
    {
      "regionCode": "32",
      "regionName": "Morbihan"
    }
  ],
  "Germany": [
    {
      "regionCode": "01",
      "regionName": "Baltic Sea"
    },
    {
      "regionCode": "02",
      "regionName": "North Sea"
    },
    {
      "regionCode": "03",
      "regionName": "Mecklenburgische Seenplatte"
    },
    {
      "regionCode": "04",
      "regionName": "Weserbergland"
    },
    {
      "regionCode": "05",
      "regionName": "Harz"
    },
    {
      "regionCode": "06",
      "regionName": "Lüneburger Heide"
    },
    {
      "regionCode": "07",
      "regionName": "Saxony-Anhalt"
    },
    {
      "regionCode": "08",
      "regionName": "Brandenburg"
    },
    {
      "regionCode": "09",
      "regionName": "Eifel"
    },
    {
      "regionCode": "10",
      "regionName": "Sauerland"
    },
    {
      "regionCode": "11",
      "regionName": "Teutoburg Forest"
    },
    {
      "regionCode": "12",
      "regionName": "Odenwald"
    },
    {
      "regionCode": "13",
      "regionName": "Hessisches Bergland"
    },
    {
      "regionCode": "14",
      "regionName": "Thuringian Forest"
    },
    {
      "regionCode": "15",
      "regionName": "Saxony"
    },
    {
      "regionCode": "17",
      "regionName": "Rhine - Mosel - Ahr - Lahn"
    },
    {
      "regionCode": "18",
      "regionName": "Hunsrück"
    },
    {
      "regionCode": "19",
      "regionName": "Palatinate"
    },
    {
      "regionCode": "21",
      "regionName": "Black Forest"
    },
    {
      "regionCode": "22",
      "regionName": "Lake Constance"
    },
    {
      "regionCode": "23",
      "regionName": "Upper Bavaria"
    },
    {
      "regionCode": "40",
      "regionName": "Bavaria"
    },
    {
      "regionCode": "24",
      "regionName": "Bavarian Forest"
    },
    {
      "regionCode": "25",
      "regionName": "Franken - Fichtelgebirge - Taubertal"
    },
    {
      "regionCode": "26",
      "regionName": "Allgau"
    },
    {
      "regionCode": "28",
      "regionName": "Emsland"
    },
    {
      "regionCode": "51",
      "regionName": "Rügen"
    },
    {
      "regionCode": "52",
      "regionName": "Usedom"
    },
    {
      "regionCode": "41",
      "regionName": "Altmühltal"
    },
    {
      "regionCode": "30",
      "regionName": "Swabian - Franconian Forest"
    },
    {
      "regionCode": "32",
      "regionName": "Rhön"
    },
    {
      "regionCode": "31",
      "regionName": "Ruhrgebiet"
    },
    {
      "regionCode": "33",
      "regionName": "Edersee"
    },
    {
      "regionCode": "34",
      "regionName": "Westerwald"
    }
  ],
  "Hungary": [
    {
      "regionCode": "01",
      "regionName": "Budapest"
    },
    {
      "regionCode": "03",
      "regionName": "Lake Balaton - North Shore"
    },
    {
      "regionCode": "04",
      "regionName": "Balaton"
    },
    {
      "regionCode": "05",
      "regionName": "Lake Balaton - South Shore"
    },
    {
      "regionCode": "06",
      "regionName": "Velence-Lake"
    },
    {
      "regionCode": "10",
      "regionName": "Thermal"
    }
  ],
  "Ireland": [
    {
      "regionCode": "01",
      "regionName": "Dublin"
    },
    {
      "regionCode": "20",
      "regionName": "South East"
    },
    {
      "regionCode": "30",
      "regionName": "Cork and Kerry"
    },
    {
      "regionCode": "40",
      "regionName": "The Shannon Region"
    },
    {
      "regionCode": "50",
      "regionName": "West Ireland"
    },
    {
      "regionCode": "60",
      "regionName": "North West Ireland"
    }
  ],
  "Italy": [
    {
      "regionCode": "01",
      "regionName": "Aosta Valley"
    },
    {
      "regionCode": "03",
      "regionName": "Piemonte"
    },
    {
      "regionCode": "04",
      "regionName": "Liguria"
    },
    {
      "regionCode": "05",
      "regionName": "Liguria Riviera Ponente"
    },
    {
      "regionCode": "06",
      "regionName": "Liguria Riviera Levante & Cinque Terre"
    },
    {
      "regionCode": "09",
      "regionName": "Lombardy"
    },
    {
      "regionCode": "10",
      "regionName": "North-Italian Lakes"
    },
    {
      "regionCode": "11",
      "regionName": "Lago d’Orta"
    },
    {
      "regionCode": "12",
      "regionName": "Lake Maggiore"
    },
    {
      "regionCode": "13",
      "regionName": "Lake Lugano"
    },
    {
      "regionCode": "14",
      "regionName": "Lake Como"
    },
    {
      "regionCode": "15",
      "regionName": "Lake Iseo and Idro"
    },
    {
      "regionCode": "17",
      "regionName": "Lake Garda"
    },
    {
      "regionCode": "18",
      "regionName": "Lake Ledro"
    },
    {
      "regionCode": "20",
      "regionName": "Trentino"
    },
    {
      "regionCode": "21",
      "regionName": "Dolomites"
    },
    {
      "regionCode": "22",
      "regionName": "Alto Adige/South Tirol"
    },
    {
      "regionCode": "24",
      "regionName": "Friuli-Venezia Giulia"
    },
    {
      "regionCode": "34",
      "regionName": "Adriatic"
    },
    {
      "regionCode": "42",
      "regionName": "Tuscany"
    },
    {
      "regionCode": "44",
      "regionName": "Florence Countryside"
    },
    {
      "regionCode": "45",
      "regionName": "Tuscany Chianti"
    },
    {
      "regionCode": "47",
      "regionName": "Arezzo, Cortona and surroundings"
    },
    {
      "regionCode": "49",
      "regionName": "Lucca, Pisa and surroundings"
    },
    {
      "regionCode": "50",
      "regionName": "Versilia, Lunigiana and surroundings"
    },
    {
      "regionCode": "52",
      "regionName": "Maremma Coast"
    },
    {
      "regionCode": "53",
      "regionName": "Siena and surroundings"
    },
    {
      "regionCode": "55",
      "regionName": "Elba Island"
    },
    {
      "regionCode": "56",
      "regionName": "Firenze Città and surroundings"
    },
    {
      "regionCode": "58",
      "regionName": "Umbria"
    },
    {
      "regionCode": "60",
      "regionName": "Lazio Inland"
    },
    {
      "regionCode": "70",
      "regionName": "Campania"
    },
    {
      "regionCode": "71",
      "regionName": "Ischia/Capri/Procida"
    },
    {
      "regionCode": "72",
      "regionName": "Amalfi Coast"
    },
    {
      "regionCode": "73",
      "regionName": "Cilento"
    },
    {
      "regionCode": "74",
      "regionName": "Naples & Sorrentino Peninsula"
    },
    {
      "regionCode": "75",
      "regionName": "Calabria"
    },
    {
      "regionCode": "77",
      "regionName": "Puglia"
    },
    {
      "regionCode": "80",
      "regionName": "Sicily"
    },
    {
      "regionCode": "90",
      "regionName": "Sardinia"
    },
    {
      "regionCode": "78",
      "regionName": "Trulli"
    },
    {
      "regionCode": "59",
      "regionName": "Trasimeno Lake"
    },
    {
      "regionCode": "46",
      "regionName": "Maremma Inland"
    },
    {
      "regionCode": "43",
      "regionName": "Riviera degli Etruschi"
    },
    {
      "regionCode": "02",
      "regionName": "Piemonte-Langhe & Monferrato"
    },
    {
      "regionCode": "07",
      "regionName": "Gargano"
    },
    {
      "regionCode": "08",
      "regionName": "Salento"
    },
    {
      "regionCode": "26",
      "regionName": "Fassa Valley"
    },
    {
      "regionCode": "38",
      "regionName": "Abruzzo"
    },
    {
      "regionCode": "39",
      "regionName": "Molise"
    },
    {
      "regionCode": "25",
      "regionName": "Veneto"
    },
    {
      "regionCode": "30",
      "regionName": "Emilia Romagna"
    },
    {
      "regionCode": "35",
      "regionName": "Marche"
    },
    {
      "regionCode": "61",
      "regionName": "Lazio Coast"
    },
    {
      "regionCode": "62",
      "regionName": "Rome City"
    },
    {
      "regionCode": "27",
      "regionName": "Fiemme Valley"
    }
  ],
  "Luxembourg": [
    {
      "regionCode": "10",
      "regionName": "Ardennes"
    },
    {
      "regionCode": "20",
      "regionName": "Moselle"
    }
  ],
  "Netherlands": [
    {
      "regionCode": "10",
      "regionName": "Groningen"
    },
    {
      "regionCode": "15",
      "regionName": "Friesland"
    },
    {
      "regionCode": "20",
      "regionName": "Drenthe"
    },
    {
      "regionCode": "25",
      "regionName": "Overijssel"
    },
    {
      "regionCode": "30",
      "regionName": "Gelderland"
    },
    {
      "regionCode": "35",
      "regionName": "Utrecht"
    },
    {
      "regionCode": "40",
      "regionName": "Noord-Holland"
    },
    {
      "regionCode": "45",
      "regionName": "Zuid-Holland"
    },
    {
      "regionCode": "50",
      "regionName": "Zeeland"
    },
    {
      "regionCode": "55",
      "regionName": "Noord-Brabant"
    },
    {
      "regionCode": "60",
      "regionName": "Limburg"
    },
    {
      "regionCode": "65",
      "regionName": "Flevoland"
    },
    {
      "regionCode": "17",
      "regionName": "Ijsselmeer"
    }
  ],
  "Norway": [
    {
      "regionCode": "61",
      "regionName": "Hallingdal"
    },
    {
      "regionCode": "20",
      "regionName": "Eastern Norway"
    },
    {
      "regionCode": "30",
      "regionName": "Northern Norway"
    },
    {
      "regionCode": "34",
      "regionName": "Lofoten"
    },
    {
      "regionCode": "67",
      "regionName": "Valdres"
    },
    {
      "regionCode": "04",
      "regionName": "Fjord Norway"
    },
    {
      "regionCode": "40",
      "regionName": "Nordmøre"
    },
    {
      "regionCode": "42",
      "regionName": "Sunnmøre"
    },
    {
      "regionCode": "43",
      "regionName": "Nordfjord"
    },
    {
      "regionCode": "44",
      "regionName": "Sunnfjord"
    },
    {
      "regionCode": "45",
      "regionName": "(Outer) Sognefjord"
    },
    {
      "regionCode": "46",
      "regionName": "(Inner) Sognefjord"
    },
    {
      "regionCode": "22",
      "regionName": "Midthordland"
    },
    {
      "regionCode": "24",
      "regionName": "Sunnhordland"
    },
    {
      "regionCode": "25",
      "regionName": "Hardanger"
    },
    {
      "regionCode": "03",
      "regionName": "Sørlandet"
    },
    {
      "regionCode": "80",
      "regionName": "Lister"
    },
    {
      "regionCode": "81",
      "regionName": "Åseral"
    },
    {
      "regionCode": "82",
      "regionName": "Lindesnes and surroundings"
    },
    {
      "regionCode": "83",
      "regionName": "Kristiansand and surroundings"
    },
    {
      "regionCode": "84",
      "regionName": "Setesdal"
    },
    {
      "regionCode": "85",
      "regionName": "Ost Agder"
    },
    {
      "regionCode": "87",
      "regionName": "West Telemark"
    },
    {
      "regionCode": "88",
      "regionName": "Vestmar"
    },
    {
      "regionCode": "69",
      "regionName": "Gudbrandsdalen"
    }
  ],
  "Poland": [
    {
      "regionCode": "01",
      "regionName": "Pomerania"
    },
    {
      "regionCode": "02",
      "regionName": "Mazury"
    },
    {
      "regionCode": "03",
      "regionName": "Large Poland"
    },
    {
      "regionCode": "04",
      "regionName": "Sudeten"
    },
    {
      "regionCode": "05",
      "regionName": "Silesia"
    },
    {
      "regionCode": "06",
      "regionName": "Beskidy"
    },
    {
      "regionCode": "07",
      "regionName": "Tatras"
    },
    {
      "regionCode": "08",
      "regionName": "Bieszczady"
    },
    {
      "regionCode": "09",
      "regionName": "Podlasia"
    },
    {
      "regionCode": "10",
      "regionName": "Little Poland"
    },
    {
      "regionCode": "11",
      "regionName": "Mazovia"
    },
    {
      "regionCode": "13",
      "regionName": "Baltic Sea (Poland)"
    },
    {
      "regionCode": "15",
      "regionName": "Lubelskie Region"
    },
    {
      "regionCode": "17",
      "regionName": "Lubuskie Region"
    },
    {
      "regionCode": "16",
      "regionName": "Podkarpackie Region"
    }
  ],
  "Portugal": [
    {
      "regionCode": "01",
      "regionName": "North/Oporto"
    },
    {
      "regionCode": "09",
      "regionName": "Lisbon"
    },
    {
      "regionCode": "10",
      "regionName": "Lisbon-Tejo Valley"
    },
    {
      "regionCode": "15",
      "regionName": "Alentejo"
    },
    {
      "regionCode": "20",
      "regionName": "Algarve"
    }
  ],
  "Slovakia": [
    {
      "regionCode": "10",
      "regionName": "Trentschin Region"
    },
    {
      "regionCode": "20",
      "regionName": "Sillein Region"
    },
    {
      "regionCode": "25",
      "regionName": "Preschau Region"
    }
  ],
  "Slovenia": [
    {
      "regionCode": "10",
      "regionName": "Kranjska Gora"
    },
    {
      "regionCode": "07",
      "regionName": "Drava"
    },
    {
      "regionCode": "01",
      "regionName": "Coast & Karst region"
    },
    {
      "regionCode": "05",
      "regionName": "Gorenjska"
    },
    {
      "regionCode": "06",
      "regionName": "Goriška Brda"
    },
    {
      "regionCode": "03",
      "regionName": "Julian Alps"
    }
  ],
  "Spain": [
    {
      "regionCode": "01",
      "regionName": "Madrid"
    },
    {
      "regionCode": "05",
      "regionName": "Galicia"
    },
    {
      "regionCode": "07",
      "regionName": "Cantabria"
    },
    {
      "regionCode": "08",
      "regionName": "Basque Country"
    },
    {
      "regionCode": "10",
      "regionName": "Pyrenees"
    },
    {
      "regionCode": "11",
      "regionName": "Inland Catalonia"
    },
    {
      "regionCode": "12",
      "regionName": "Costa Brava"
    },
    {
      "regionCode": "13",
      "regionName": "Barcelona – North Coast"
    },
    {
      "regionCode": "14",
      "regionName": "Barcelona"
    },
    {
      "regionCode": "15",
      "regionName": "Costa del Garraf"
    },
    {
      "regionCode": "16",
      "regionName": "Costa Daurada"
    },
    {
      "regionCode": "17",
      "regionName": "Navarra"
    },
    {
      "regionCode": "37",
      "regionName": "Costa de Valencia"
    },
    {
      "regionCode": "38",
      "regionName": "Valencia"
    },
    {
      "regionCode": "39",
      "regionName": "Costa del Azahar"
    },
    {
      "regionCode": "40",
      "regionName": "Costa Blanca"
    },
    {
      "regionCode": "43",
      "regionName": "Costa Cálida"
    },
    {
      "regionCode": "48",
      "regionName": "Inland Andalucia"
    },
    {
      "regionCode": "49",
      "regionName": "Costa de Almería"
    },
    {
      "regionCode": "50",
      "regionName": "Costa Tropical"
    },
    {
      "regionCode": "51",
      "regionName": "Costa del Sol"
    },
    {
      "regionCode": "52",
      "regionName": "Costa de la Luz"
    },
    {
      "regionCode": "80",
      "regionName": "Canary Islands"
    },
    {
      "regionCode": "81",
      "regionName": "Gran Canaria"
    },
    {
      "regionCode": "82",
      "regionName": "Fuerteventura"
    },
    {
      "regionCode": "83",
      "regionName": "Lanzarote"
    },
    {
      "regionCode": "84",
      "regionName": "La Palma"
    },
    {
      "regionCode": "85",
      "regionName": "Tenerife"
    },
    {
      "regionCode": "90",
      "regionName": "Balearic Islands"
    },
    {
      "regionCode": "91",
      "regionName": "Mallorca"
    },
    {
      "regionCode": "92",
      "regionName": "Menorca"
    },
    {
      "regionCode": "93",
      "regionName": "Ibiza"
    },
    {
      "regionCode": "94",
      "regionName": "Formentera"
    }
  ],
  "Sweden": [
    {
      "regionCode": "21",
      "regionName": "Härjedalen"
    },
    {
      "regionCode": "10",
      "regionName": "North Sweden"
    },
    {
      "regionCode": "20",
      "regionName": "Hälsingland"
    },
    {
      "regionCode": "80",
      "regionName": "Norrbotten - Lappland"
    },
    {
      "regionCode": "85",
      "regionName": "Jämtland"
    },
    {
      "regionCode": "64",
      "regionName": "Värmland"
    },
    {
      "regionCode": "15",
      "regionName": "Swealand"
    },
    {
      "regionCode": "66",
      "regionName": "Närke"
    },
    {
      "regionCode": "07",
      "regionName": "Södermanland"
    },
    {
      "regionCode": "90",
      "regionName": "Stockholm"
    },
    {
      "regionCode": "67",
      "regionName": "Uppland"
    },
    {
      "regionCode": "50",
      "regionName": "Kronoberg"
    },
    {
      "regionCode": "99",
      "regionName": "Västmanland"
    },
    {
      "regionCode": "05",
      "regionName": "Dalarna"
    },
    {
      "regionCode": "30",
      "regionName": "Southern Sweden"
    },
    {
      "regionCode": "01",
      "regionName": "Skåne"
    },
    {
      "regionCode": "06",
      "regionName": "Blekinge"
    },
    {
      "regionCode": "08",
      "regionName": "Småland"
    },
    {
      "regionCode": "03",
      "regionName": "Halland"
    },
    {
      "regionCode": "09",
      "regionName": "Bohuslän"
    },
    {
      "regionCode": "35",
      "regionName": "Dalsland"
    },
    {
      "regionCode": "04",
      "regionName": "Västra Götaland"
    },
    {
      "regionCode": "65",
      "regionName": "Östergötland"
    }
  ],
  "Switzerland": [
    {
      "regionCode": "01",
      "regionName": "Alpes Vaudoises"
    },
    {
      "regionCode": "02",
      "regionName": "Lake Geneva Region"
    },
    {
      "regionCode": "10",
      "regionName": "Valais"
    },
    {
      "regionCode": "20",
      "regionName": "Jura"
    },
    {
      "regionCode": "25",
      "regionName": "Freiburg"
    },
    {
      "regionCode": "35",
      "regionName": "Bernese Oberland"
    },
    {
      "regionCode": "40",
      "regionName": "Bernese Mittelland"
    },
    {
      "regionCode": "45",
      "regionName": "Central Switzerland"
    },
    {
      "regionCode": "50",
      "regionName": "Ticino"
    },
    {
      "regionCode": "60",
      "regionName": "Graubunden"
    },
    {
      "regionCode": "61",
      "regionName": "Engadine"
    },
    {
      "regionCode": "62",
      "regionName": "Misox"
    },
    {
      "regionCode": "65",
      "regionName": "Surselva"
    },
    {
      "regionCode": "66",
      "regionName": "Prättigau"
    },
    {
      "regionCode": "67",
      "regionName": "Mittelbünden"
    },
    {
      "regionCode": "68",
      "regionName": "Viamala/Surses/Albulatal"
    },
    {
      "regionCode": "70",
      "regionName": "Eastern Switzerland"
    },
    {
      "regionCode": "80",
      "regionName": "Lake Zurich Region"
    },
    {
      "regionCode": "11",
      "regionName": "Val d’Anniviers"
    },
    {
      "regionCode": "13",
      "regionName": "Portes du Soleil"
    },
    {
      "regionCode": "41",
      "regionName": "Emmental"
    }
  ]
}

const formattedCountries = countries.map((country) => ({
  value: country.cca2,  // Country code (e.g., USA)
  label: country.name.common,  // Country name (e.g., United States)
  flag: country.flag,
  latlng: country.latlng,  // Latitude and longitude
  region: country.region,  // Continent
  regions: countryRegions[country.name.common] || [],  // Regions (if any)
  regionCodes: regionCodes[country.name.common] || [],  // Region codes (if any)
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  // Find country by value (country code)
  const getByValue = (value) => {
      return formattedCountries.find((item) => item.value === value);
  };

  // Find country by region name
  const getCountryByRegion = (regionName) => {
      const country = formattedCountries.find((country) => 
          country.regions.includes(regionName)
      );
      return country;
  };

  // Get region codes by region name
  const getRegionCodesByRegionName = (regionName) => {
      const countryWithRegion = formattedCountries.find(country => 
          country.regions.includes(regionName)
      );
      return countryWithRegion ? countryWithRegion.regionCodes : [];
  };

  // Get region code by region name
  const getRegionCodeByName = (regionName) => {
      for (const country of Object.keys(regionCodes)) {
          const region = regionCodes[country].find(region => region.regionName === regionName);
          if (region) {
              return region.regionCode; // Return the region code if found
          }
      }
      return null; // Return null if not found
  };

  const getAllCountryDetailsWithRegions = () => {
    return formattedCountries.map((country) => {
      const regionNamesFromCodes = country?.regionCodes?.map(region => region.regionName) || [];
      const regionNamesFromRegions = country?.regions || []; 
      const regions = [...regionNamesFromCodes, ...regionNamesFromRegions];
  
      return {
        name: country.label,     
        lat: country.latlng[0],   
        lng: country.latlng[1],   
        regions: regions,       
        countryCode:country.value 
      };
    });
  }
  

  return {
      getAll,
      getByValue,
      getCountryByRegion,
      getRegionCodesByRegionName,
      getRegionCodeByName,
      getAllCountryDetailsWithRegions
    
  };
};

export default useCountries;
