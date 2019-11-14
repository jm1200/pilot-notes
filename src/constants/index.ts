export const folderStructure = {
  routes: [
    {
      flightNumbers: [1, 2],
      airports: ["Toronto", "Delhi"],
      IATA: ["yyz", "del"],
      ICAO: ["cyyz", "vidp"],
      notes: {
        rampCheck: "",
        departure: "",
        enroute: "",
        approach: "",
        threats: "",
        general: "",
        alternateStrings: ""
      }
    },
    {
      flightNumbers: [21, 22],
      airports: ["Toronto", "Mumbai"],
      IATA: ["yyz", "bom"],
      ICAO: ["cyyz", "vibm"],
      notes: {
        rampCheck: "",
        departure: "",
        enroute: "",
        approach: "",
        threats: "",
        general: "",
        alternateStrings: ""
      }
    }
  ],
  airplanes: [
    { type: "787", notes: { memoryItems: "", systems: "", general: "" } },
    { type: "777", notes: { memoryItems: "", systems: "", general: "" } }
  ]
};
