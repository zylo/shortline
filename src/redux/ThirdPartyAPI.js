import superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const request = superagentPromise(superagent, Promise);

export default class ThirdPartyAPI {
  static getStarWarsData({ endpoint, page }) {
    let requestURL = `https://swapi.co/api/${endpoint}`;

    if (Number.isInteger(page)) {
      requestURL += `?page=${page}`;
    }

    return request.get(requestURL).then((res) => res.body);
  }
}
