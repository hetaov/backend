'use strict';

import request from 'koa2-request';

const WDSPARQL_URL = 'http://localhost:3030/raw/query';

export const query = async (sparql) => {
    return await request({
          url: WDSPARQL_URL,
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          form:{ format:'json', query: sparql}
      });
}
