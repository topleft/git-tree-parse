
( function () {


  module.exports = parse
  var parse = {

    parse: function (input) {
      var repoName = input.url.split('/')[6];
      var rootArray = input.tree;

      var repoName = {repoName: {children: []}};

      var result = rootArray.reduce ( function (base, item) {
        if ( item.type === 'tree' ) {
          var pathArr = item.path.split( '/' );
          var base;
          pathArr.forEach(function(name){
            base = base[name] = base[name] || {};
            console.log(base);
            return base;
          });
        }
        return base;
      }, {})
      console.log('Result: ', result);
      return result;
    },

    createNestedObject: function(names) {
      // make each name and object in the array
      // then set arrays equal to each other backwards
     return names.reduceRight(function(base, name){
           name = {};
          return base[name] = {};
     }, {});

  }
}

      var x = parse.createNestedObject(['a', 'b', 'c'])
      console.log( x )

})();