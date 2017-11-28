//import request from 'request';
import request from 'koa2-request';
import {getListByLabel, getListByLabelOri, getDetailByUri} from '../services';

export let Get = async (ctx) => {
  let result = await getListByLabel(ctx.params.name);
  //let result = await getListByLabelOri(ctx.params.name);

  let fresult = JSON.parse(result.body).results.bindings;

  let map = {};

  //TODO 把各种语言的聚合到一块儿
  fresult.forEach((obj) => {
      let key = obj.subject.value;
      if(map[key]) {
          map[key]['labels'].push(obj.other.value);
          if(obj.comment) {
              map[key]['comments'].push(obj.comment.value);
          }
      } else {
        map[key] = {};
        map[key]['labels'] = [obj.other.value];
        if(obj.comment) {
            map[key]['labels'] = [obj.comment.value];
        } else {
            map[key]['comment'] = [];
        }
      }
  });

  ctx.body = {
    result: fresult,
    name: ctx.params.name,
    para: ctx.query
  }


}

export let Detail = async (ctx) => {
  let result = await getDetailByUri(ctx.params.uri);
  //let result = await getListByLabelOri(ctx.params.name);

  let fresult = JSON.parse(result.body);

  ctx.body = {
    result: fresult.results.bindings,
    name: ctx.params.uri,
    para: ctx.query
  }


}

export let Post = async (ctx) => {
  ctx.body = {
    result: 'post',
    name: ctx.params.name,
    para: ctx.request.body
  }
}

export let Put = (ctx) => {
  ctx.body = {
    result: 'put',
    name: ctx.params.name,
    para: ctx.request.body
  }
}

export let Delect = (ctx) => {
  ctx.body = {
    result: 'delect',
    name: ctx.params.name,
    para: ctx.request.body
  }
}
