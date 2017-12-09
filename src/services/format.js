
export default (json) => {
  let map = {};

  let regex = /.+#label$/;

  //TODO 把各种语言的聚合到一块儿
  json.forEach((obj) => {
      let key = obj.subject.value;
      if(obj.other) {
          let label_key = ['labels', obj.other['xml:lang']].join('_');
          if(map[key]) {
            if(!map[key][label_key]) {
                map[key][label_key] = [];
            }
            map[key][label_key].push(obj.other.value);
          } else {
            map[key] = {};
            map[key][label_key] = [obj.other.value];
          }
      }

      if(obj.comment) {
          let comment_key = ['commnet', obj.comment['xml:lang']].join('_');
          if(map[key]) {
            if(!map[key][comment_key]) {
                map[key][comment_key] = [];
            }
            map[key][comment_key].push(obj.other.value);
          } else {
            map[key] = {};
            map[key][comment_key] = [obj.other.value];
          }
      }
  });

  // 只聚合label(按语言)
  // key: label_[language]

  return map;
};
