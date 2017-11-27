'use strict';

import request from 'koa2-request';

import { query } from './request';

const WDSPARQL_URL = 'http://localhost:3030/raw/query';

export const getListByLabel = async (label) => {

  let prefix1 = '<http://www.w3.org/1999/02/22-rdf-syntax-ns#>';
  let prefix2 = '<http://www.w3.org/2000/01/rdf-schema#>';
  let prefix3 = '<http://www.semioe.com/onto#>';
  let name = '"' + label + '"@cn';

  let  sparql = `
        PREFIX rdf: ${prefix1}
        PREFIX rdfs: ${prefix2}
        PREFIX semioe: ${prefix3}

        SELECT ?subject ?other ?comment
        WHERE {
            ?subject rdfs:label ${name} .
            ?subject rdfs:label ?other .
            OPTIONAL {
                ?subject rdfs:comment ?comment .
            }
        }
        LIMIT 20
     `;


  return await query(sparql);
}

export const getListByLabelOri = async (label) => {
  let prefix1 = '<http://www.w3.org/1999/02/22-rdf-syntax-ns#>';
  let prefix2 = '<http://www.w3.org/2000/01/rdf-schema#>';
  let prefix3 = '<http://www.semioe.com/onto#>';
  let name = '"' + label + '"@cn';
  let  sparql = `
        PREFIX rdf: ${prefix1}
        PREFIX rdfs: ${prefix2}
        PREFIX semioe: ${prefix3}

        SELECT ?subject ?predicate ?object ?pname ?oname
        WHERE {
            ?subject ?predicate ?object .
            ?subject rdfs:label ${name} .
            OPTIONAL {
              ?predicate rdfs:label ?pname .
            }
            OPTIONAL {
              ?object rdfs:label ?oname .
            }
        }
        LIMIT 20
     `;


  return await query(sparql);
};

export const getDetailByUri = async (uri) => {
  let prefix1 = '<http://www.w3.org/1999/02/22-rdf-syntax-ns#>';
  let prefix2 = '<http://www.w3.org/2000/01/rdf-schema#>';

  let  sparql = `
        PREFIX rdf: ${prefix1}
        PREFIX rdfs: ${prefix2}

        SELECT ?predicate ?object ?pname ?oname
        WHERE {
            <${uri}> ?predicate ?object .
            OPTIONAL {
                ?predicate rdfs:label ?pname .
            }
            OPTIONAL {
                ?object rdfs:label ?oname .
            }
        }
        LIMIT 20
     `;

  return await query(sparql);
};


