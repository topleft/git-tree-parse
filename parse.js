

( function () {
var util = require('util')
var data = require('./data.js')


  var parse = {

    parse: function (input) {
      var repoName = input.url.split('/')[5];
      var rootArray = input.tree;

      
      var allChildren = this.createChildren(rootArray);
      var uniquePaths = this.reduceToUnique(Object.keys(allChildren));
      console.log('______Unique Paths_______')
      // console.log(uniquePaths);
      var deepestPaths = this.findDeepestPaths(uniquePaths);
      console.log('______Deepest Paths_______')
      console.log(deepestPaths);
          console.log("__________________")

      var result = this.createFinalObject(deepestPaths, allChildren, repoName);
      
      result = JSON.stringify(result);
      // result = JSON.parse(result);
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
    findDeepestPaths: function (directories) {
      // given an array paths as strings
      return directories.reduce( function (deep, dir, i, arr ) {
        //split the current and prev take one off the current, re join and see if they match, if they don't match you have two different paths, add the return prev

        if (!arr[i+1]) {
          deep.push(dir);
          return deep;
        }
        var curr = dir.split('/').shift();
        var next = arr[i+1].split('/').shift();

        // var curr = dir.split('/');
        // var next = arr[i+1].split('/');
        // next.pop();
        // curr = curr.join('/');
        // next = next.join('/');
        if (curr !== next && dir !== '') { deep.push(dir) }
          return deep;
      }, []);


    },
    // not using right now
    createNestedObject: function (base, names) {
      // make each name and object in the array
      
    },
    // names is an array of the longest unique paths
    // children is an object with file paths (string) for keys and an array of objects (children) that belong in that file
    
    createFinalObject: function(names, childrenObj, repoName) {
      // this is the outermost object
      var repoObject = {'name': repoName, 'children': []};
      repoObject.children.push(childrenObj[''][0]);

      // this loops through all the paths
      names.forEach( function (path) {
        var splitPath = path.split('/');
        
        // this loops over each file in a path from right to left (deepest to shallowest)
        var nestedObj = splitPath.reduceRight(function ( base, name, i, arr ) {
            var j = i;

            if ( Object.keys(base).length === 0 ) {
              base = undefined;
            }
            // create an object and set the name with the current file
            var nested = { 'name': '',children: [] };
            nested.name = name;

            // grab current filr path
            if (i === 0) { i = 1}
            var currentPath = arr.slice(0, i+1).join('/');
            // if (currentPath === '') { repoObject.children.push(childrenObj[currentPath][0]) }
            if (childrenObj[currentPath]) {
              nested.children = childrenObj[currentPath];
            }

            if (base !== undefined) { nested.children.push(base) }
            return nested;

        }, {});

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

  module.exports = parse;
 

      // var children = parse.createChildren(data.repo.tree)
      // console.log('______Children_______')
      // console.log(children)
      

      var result = parse.parse(data.repo);


      // console.log('______Original_______');
      // console.log(util.inspect(data.repo, false, null))
      

      console.log('______Final_______');
      console.log(util.inspect(result, false, null))

})();


    // names.reduceRight(function ( base, name ) {
    //       var nested = {}
    //       nested[name] = base;
    //       return nested;
    //  }, {});












