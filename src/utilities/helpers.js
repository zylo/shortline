import { interpolateHcl } from 'd3-interpolate';
import superagent from 'superagent';
import superagentPromise from 'superagent-promise';

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

function getObjVal(object, path, defaultValue) {
  const pathArray = typeof path === 'string' ? path.split('.') : [];
  const { length } = pathArray;
  let value = object;
  let index = 0;

  while (value && typeof value === 'object' && index < length) {
    value = value[pathArray[index]];
    index += 1;
  }

  return index && index === length && value !== undefined && value !== '' ? value : defaultValue;
}

function joinClassName(...args) {
  return args
    .reduce((accumulated, current) => {
      return typeof current === 'string' ? `${accumulated} ${current.trim()}` : accumulated;
    }, '')
    .trim();
}

// ex: request.get(request url).then((res) => console.log(res));
const xhrRequest = superagentPromise(superagent, Promise);

export { fillInColorScale, findMaxIndices, genKey, getObjVal, joinClassName, xhrRequest };
