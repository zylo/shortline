import { interpolateHcl } from 'd3-interpolate';

// Accepts an array of two colors (hex or rgb) and incrementally adds new colors (rgb) between existing values
function fillInColorScale(scale, newColorsNeeded) {
  if (newColorsNeeded < 1) {
    return scale;
  }

  const spectrum = interpolateHcl(scale[0], scale[1]);
  const expandedScale = [scale[0]];
  const increment = 1 / (newColorsNeeded + 1);
  let currentColor = increment;
  let counter = 0;

  while (counter <= newColorsNeeded) {
    expandedScale.push(spectrum(currentColor));
    currentColor += increment;
    counter += 1;
  }

  return expandedScale;
}

/**
 * use for ui elements that cannot use index for key (e.g. items rearranged, deleted)
 * call once in constructor, and again for every new indexed item added
 */
function genKey(keyLength = 5) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomKey = '';

  for (let i = 0; i < keyLength; i += 1) {
    randomKey += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return randomKey;
}

/**
 * accepts an array of numbers and a number of desired results
 * returns an array of indexes of the highest values in the arr arg
 */

function findMaxIndices(arr, numResults) {
  const maxIndices = [];
  for (let i = 0; i < arr.length; i += 1) {
    maxIndices.push(i);

    if (maxIndices.length > numResults) {
      maxIndices.sort((a, b) => {
        return arr[b] - arr[a];
      });
      maxIndices.pop();
    }
  }
  return maxIndices;
}

export { fillInColorScale, genKey, findMaxIndices };
