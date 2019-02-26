import React from 'react';
import PropTypes from 'prop-types';
import TetrisChart from '../../../components/charts/TetrisChart';
import Tile from '../../../components/Tile';
import { xhrRequest } from '../../../utilities/helpers';

export default function PlanetsTile() {
  return <PlanetsTile_DisplayLayer {...useDataLayer()} />;
}

export function PlanetsTile_DisplayLayer({ planetsData }) {
  function renderPlanetChartTooltip({ name, value }) {
    return (
      <div className="flex-container justify-between align-baseline secret-platform-prototype-chart-tooltip">
        <div className="secret-platform-prototype-chart-tooltip-name">{name}</div>
        <div className="flex-container align-baseline secret-platform-prototype-chart-tooltip-value">
          {value.toLocaleString('en-US')}
          <div className="secret-platform-prototype-chart-tooltip-value-unit">km</div>
        </div>
      </div>
    );
  }

  return (
    <Tile title="Star Wars Planet Diameters (km)" isLoading={true}>
      <TetrisChart data={planetsData} onSectionHover={renderPlanetChartTooltip} />
    </Tile>
  );
}

PlanetsTile_DisplayLayer.propTypes = {
  planetsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number
    })
  )
};

// a great spot to fetch third party API data, the useDataLayer hook is...
function useDataLayer() {
  return {};
}
