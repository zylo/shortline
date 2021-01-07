import React from 'react';
import PlanetsTile from './tiles/PlanetsTile';
import SpeciesTile from './tiles/SpeciesTile';
import Tooltip from '../../components/Tooltip';
import '../../styles/pages/secret-platform-prototype.scss';

export default function SecretPlatformPrototype() {
  return (
    <div className="main-content flex-container vertical secret-platform-prototype-page">
      <div className="flex-container justify-between page-header">
        <div className="page-header-title">Secret Platform Prototype</div>
        <Tooltip
          className="instructions-tooltip"
          text={
            <div className="instructions-tooltip-body">
              <p className="instructions-tooltip-first-paragraph">
                We need help wiring up our charts. The data we need is currently available via the
                <a
                  className="instructions-tooltip-link"
                  href="https://swapi.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Star Wars API
                </a>
                . Your first task is to initiate requests to the API to retrieve species data for
                the BarChart and planet data for the TetrisChart.
              </p>
              <p>
                The API results are paginated. We only need the first page of species results, but
                we would like all of the pages of the planet results. When you have all of the
                required data, display it in the specified charts.
              </p>
              <p>
                Wiring up the charts to meet the requirements listed above is your primary
                objective. Please focus on this portion of the challenge. If you have time
                remaining, we would like this page&apos;s layout responsive down to a viewport width
                of 400px. Feel free to make any other improvements to the repo if you have any time
                remaining.
              </p>
              <p>
                Please spend approximately two to four hours on this challenge and get as far as you
                can through the tasks listed above. Online resources are permitted, but this is a
                Solo mission (pun-intended). Good luck!
              </p>
              <p className="instructions-tooltip-last-paragraph">
                P.S. It is safe to assume the all of the files in src/components are working
                correctly and do not need refactored to complete this challenge.
              </p>
            </div>
          }
          allowBodyHover
        >
          <div>Instructions</div>
        </Tooltip>
      </div>

      <div className="flex-container justify-between secret-platform-prototype-page-tiles-container">
        <SpeciesTile />
        <PlanetsTile />
      </div>
    </div>
  );
}
