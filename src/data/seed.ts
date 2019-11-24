const categories = [
  {
    id: "B787",
    name: "B787"
  },
  {
    id: "FOM",
    name: "FOM"
  }
];

const notes = [
  {
    id: "e0196fd9-d644-4ca8-aa58-467b8082993e",
    text:
      "# YYZ-DEL CYYZ-VIDP 61 62\n\n ### Pre-Departure\n\n yada yada yada... \n\n ### Departure\n\n yada yada yada... \n\n ### Enroute \n\n yada yada yada... \n\n ### Arrival\n\n yada yada yada... \n\n ### Alternate Strings \n\n |Destination Alternates | VIJP VIAR OPLA VAAH OPKC VABB VOHS VECC VOMM | \n | --------------------- |:--------------------------------------------:|\n |Northern Route         | VIAR OPLA VAAH OPKC VABB                     |\n |Southern Route         | VIAR OPLA VAAH OPKC VABB                     |",
    created: "2019-10-14T17:03:27-05:00",
    lastUpdated: "2019-10-14T17:03:27-05:00",
    category: "routes",
    favorite: true
  },
  {
    id: "e0196fd9-d644-4ca8-aa58-117b8082993e",
    text:
      "# YYZ-PVG CYYZ-XPVG 42 43\n\n ### Pre-Departure\n\n ### Departure\n\n ### Enroute \n\n ### Arrival\n\n ### Alternate Strings \n\n |Destination Alternates | VIJP VIAR OPLA VAAH OPKC VABB VOHS VECC VOMM | \n | --------------------- |:--------------------------------------------:|\n |Northern Route         | VIAR OPLA VAAH OPKC VABB                     |",
    created: "2019-10-14T17:03:27-05:00",
    lastUpdated: "2019-10-14T17:03:27-05:00",
    category: "routes",
    favorite: false
  },
  {
    id: "e0196fd9-d644-4ca8-aa58-467b8asdf82993e",
    text:
      "# Memory Items\n\n ### Oceanic Diversion (Engine-Out)\n\n yada yada yada... \n\n ### Oceanic Diversion(All-Engine)\n\n yada yada yada... \n\n ### Volcanic Ash \n\n yada yada yada... ",
    created: "2019-10-14T17:03:27-05:00",
    lastUpdated: "2019-10-14T17:03:27-05:00",
    category: "B787",
    favorite: true
  },
  {
    id: "1230196fd9-d644-4ca8-aa58-89ib8asdf82993e",
    text:
      "# Flows\n\n ### Pre-Departure\n\n yada yada yada... \n\n### Before Take-off \n\n yada yada yada... \n\n ###Line-up Brief\n\n yada yada yada...",
    created: "2019-10-14T17:03:27-05:00",
    lastUpdated: "2019-10-14T17:03:27-05:00",
    category: "B787",
    favorite: false
  },
  {
    id: "e0196fd9-d644-4ca8-aa58-89ib8asdf82993e",
    text:
      "# Systems\n\n ### APU\n\n yada yada yada... \n\n### Engine \n\n yada yada yada... \n\n ###Fire Protection\n\n yada yada yada...",
    created: "2019-10-14T17:03:27-05:00",
    lastUpdated: "2019-10-14T17:03:27-05:00",
    category: "B787",
    favorite: false
  },
  {
    id: "e0196fd9-d644-4ca8-aa58-kjahsdasdf82993e",
    text:
      "# Limitations\n\n ### Engine\n\n yada yada yada... \n\n### Cabin Pressure\n\n yada yada yada...",
    created: "2019-10-14T17:03:27-05:00",
    lastUpdated: "2019-10-14T17:03:27-05:00",
    category: "B787",
    favorite: true
  },
  {
    id: "e01wefdffd9-d644-4ca8-aa58-89ib8asdf82993e",
    text: "# Chapter 1\n\n ### \n\n blah blah blah...",
    created: "2019-10-14T17:03:27-05:00",
    lastUpdated: "2019-10-14T17:03:27-05:00",
    category: "FOM",
    favorite: false
  },
  {
    id: "e0196fd9-dasdf4-4ca8-aa58-89ib8asdf82993e",
    text: "# Chapter 2\n\n ### \n\n blah blah blah...",
    created: "2019-10-14T17:03:27-05:00",
    lastUpdated: "2019-10-14T17:03:27-05:00",
    category: "FOM",
    favorite: false
  }
];

const seedData = { notes, categories };

export default seedData;

//   localStorage.setItem('categories', JSON.stringify(categories))
//   localStorage.setItem('notes', JSON.stringify(notes))
//   window.location.reload()
