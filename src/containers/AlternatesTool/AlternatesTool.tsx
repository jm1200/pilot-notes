import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import data from "data/alts.json";
import { AltObject } from "types";
import { X } from "react-feather";
import {
  AlternatesToolContainer,
  AltToolsForm,
  AltToolsLegend,
  AltToolsTable,
  CloseMenu
} from "./AlternatesTool.styles";
import { toggleAlternatesTool } from "slices/appStateSlice";

interface IAlternatesToolProps {
  alternatesTool: boolean;
}

interface Filtered {
  icao: string;
  iata: string;
  airport: string;
  class: string;
}

const AlternatesTool: React.FC<IAlternatesToolProps> = ({ alternatesTool }) => {
  const [altToolInput, setAltToolInput] = useState("");
  const [altToolSelect, setAltToolSelect] = useState<keyof AltObject>("b777");
  const dispatch = useDispatch();

  const _toggleAlternatesTool = () => {
    dispatch(toggleAlternatesTool());
  };
  const initialData: Filtered[] = data.map(line => {
    return {
      iata: line.iata,
      icao: line.icao,
      airport: line.airport,
      class: line[altToolSelect]
    };
  });

  const [filteredData, setFilteredData] = useState<Filtered[]>(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    e.preventDefault();
    setAltToolInput(value.toLowerCase());
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setAltToolSelect(e.target.value as keyof AltObject);
  };

  useEffect(() => {
    const filtered = data
      .map(line => {
        return {
          iata: line.iata,
          icao: line.icao,
          airport: line.airport,
          class: line[altToolSelect]
        };
      })

      .filter(
        line =>
          line.iata.toLowerCase().includes(altToolInput) ||
          line.icao.toLowerCase().includes(altToolInput) ||
          line.airport.toLowerCase().includes(altToolInput)
      );

    setFilteredData(filtered);
  }, [altToolSelect, altToolInput]);

  return (
    <AlternatesToolContainer className={alternatesTool ? "open" : ""}>
      <h1 className="title">Alternates Helper Tool</h1>

      <AltToolsForm
        className="alternates-tool-form"
        onSubmit={event => event.preventDefault()}
        autoComplete="off"
      >
        <div className="select-container">
          <label htmlFor="alternates-tool-select">Aircraft Type: </label>
          <select
            name="alternates-tool-select"
            className="alternates-tool-select"
            onChange={handleSelectChange}
            value={altToolSelect}
          >
            <option value="b777">B777</option>
            <option value="b787">B787</option>
            <option value="b767">B767</option>
            <option value="b737">B737</option>
            <option value="a220">A220</option>
            <option value="a3xx">A3XX</option>
            <option value="a330">A330</option>
            <option value="e190">E190</option>
          </select>
        </div>

        <div className="alternates-tool-input-container">
          <label htmlFor="altToolInput">Search Alternates: </label>
          <input
            className="alternates-tool-input"
            name="altToolInput"
            value={altToolInput}
            onChange={handleInputChange}
          />
        </div>
      </AltToolsForm>
      <AltToolsLegend>
        <p>D - Destination</p>
        <p>A - Alternate</p>
        <p>EC - Escape Chart Airport</p>
      </AltToolsLegend>
      <AltToolsTable>
        <thead>
          <tr>
            <th>ICAO</th>
            <th>IATA</th>
            <th>Airport Name</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(line => (
            <tr key={line.iata}>
              <td>{line.iata}</td>
              <td>{line.icao}</td>
              <td>{line.airport}</td>
              <td>{line.class}</td>
            </tr>
          ))}
        </tbody>
      </AltToolsTable>
      <CloseMenu onClick={_toggleAlternatesTool}>
        <X size={25} />
      </CloseMenu>
    </AlternatesToolContainer>
  );
};

export default AlternatesTool;
