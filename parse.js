

( function () {
var util = require('util')
var data = require('./data.js')

  module.exports = parse;

  var parse = {

    parse: function (input) {
      var repoName = input.url.split('/')[6];
      var rootArray = input.tree;

      
      var allChildren = this.createChildren(rootArray);
      var uniquePaths = this.reduceToUnique(Object.keys(allChildren));
      console.log('______Unique Paths_______')
      console.log(uniquePaths);
      var deepestPaths = this.findDeepestPaths(uniquePaths);
      console.log('______Deepest Paths_______')
      console.log(deepestPaths);
          console.log("__________________")

      var result = this.createFinalObject(deepestPaths, allChildren);

      return result;

    },

    createChildren: function (input) {
      // make arrays of all files
      var files = input.filter(function (item) {
        return item.type === 'blob';
      });
      // make an object that uses the path(string) as key
      var filesObj = files.reduce( function (obj, item) {
        var path = item.path.slice();
        path = path.split('/');
        var file = path.pop()
        path = path.join('/');
        var child = {name: file, url: item.url}
        
        if (!obj[path]) {
          obj[path] = [child];

        } else {
          obj[path].push(child);
        }
        return obj;
      }, {});

      return filesObj;

    },
    // not using right now
    findDeepestPaths: function (array) {
      // given an array of objects with property paths
      directories = this.reduceToUnique(array);
      return directories.reduce( function (deep, dir, i, arr ) {
        //split the current and prev take one off the current re join and see if they match, if they don't match you have two different paths, add the return prev

        if (!arr[i+1]) {
          deep.push(dir);
          return deep;
        }
        var a = dir.split('/');
        var b = arr[i+1].split('/');
        console.log(dir)
        b.pop();
        a = a.join('/');
        b = b.join('/');
        if (a !== b) { deep.push(a) }
          return deep;
      }, []);


    },
    // not using right now
    createNestedObject: function (base, names) {
      // make each name and object in the array
      
    },
    // names is an array of desired keys, that represent a file path
    // children is an object with file paths (string) for keys and an array of objects (children) that belong in that file
    
    createFinalObject: function(names, childrenObj) {
      var repoObject = {children: []}
      names.forEach(function (path) {
        // we have to run create final object

        var nestedObj = path.split('/').reduceRight(function ( base, name, i, arr ) {
            var nested = { name: '',children: [] }
            nested.name = name;

            var currentPath = arr.slice(0,i).join('/');
            console.log('Current Path: ', currentPath)
            if (childrenObj[currentPath]) {
              nested.children = children[currentPath];
            }
            nested.children.push(base);
            return nested;
        }, { name: 'x',children: [] });
        repoObject.children.push(nestedObj);
      });

      return repoObject;

  },
  reduceToUnique: function (arr) {
    var seen = {};
    return arr.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }
};

      // var x = parse.createNestedObject(['a', 'b', 'c', 'd', 'e']);

      // console.log( x)

      // var deep = parse.findDeepestPaths({'root': true,'root/src': true,'root/src/client': true, 'root/src/server': true, 'root/src/server/test': true, 'root/src/server/models': true, 'test': true, 'config': true});
      // console.log('Deep: ',deep); 

      var children = parse.createChildren(data.repo.tree)
      console.log('______Children_______')
      console.log(children)
      

      var result = parse.parse(data.repo);


      console.log('______Original_______');
      // console.log(util.inspect(data.repo, false, null))
      

      console.log('______Final_______');
      console.log(util.inspect(result, false, null))

})();


    // names.reduceRight(function ( base, name ) {
    //       var nested = {}
    //       nested[name] = base;
    //       return nested;
    //  }, {});












