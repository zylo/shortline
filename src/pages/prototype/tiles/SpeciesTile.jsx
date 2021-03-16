import React from 'react';
import PropTypes from 'prop-types';
import BarChart from '../../../components/charts/BarChart';
import Tile from '../../../components/Tile';
import { xhrRequest } from '../../../utilities/helpers';

export default function SpeciesTile() {
  return <SpeciesTile_DisplayLayer {...useDataLayer()} />;
}

export function SpeciesTile_DisplayLayer({ speciesData }) {
  return (
    <Tile title="Star Wars Species Average Heights (cm)" isLoading>
      <BarChart data={speciesData} xKey="name" yKey="value" />
    </Tile>
  );
}

SpeciesTile_DisplayLayer.propTypes = {
  speciesData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number
    })
  )
};

// a great spot to fetch third party API data, the useDataLayer hook is... see README.md
function useDataLayer() {
  return {};
}
