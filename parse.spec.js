
var parse = require('./parse.js');
var data = require('./data.js');
var expected = require('./expected.js')

describe('tree parser', function () {
  
  xit('should grab repo name', function(){
    var expected = parse(data.file);
    var result = 'test';
    expect(result).toEqual(expected);
  });

  xit('should parse a single file', function(){
    var expected = parse(data.repo);
    var result = 'test';
    expect(result).toEqual(expected);
  });


  xit('should parse a single directory', function(){
    var expected = '';
    var result = '';
    expect(result).toEqual(expected);
  });

  xit('should parse both directories and files', function(){
    var expected = '';
    var result = '';
    expect(result).toEqual(expected);
  });

  xit('should parse a repo and add in size', function(){
    var expected = '';
    var result = '';
    expect(result).toEqual(expected);
  });

  describe('find deepest path', function () {

    it('should find the deepest paths in a list of paths', function () {       
      var expected = data.deepestPaths.one;
      var result = parse.findDeepestPaths(data.paths.one);
      expect(result).toEqual(expected);
    });

    it('should find the deepest paths without any duplicate roots', function () {
      var expected = data.deepestPaths.three;
      var result = parse.findDeepestPaths(data.paths.three);
      expect(result).toEqual(expected);
    });

    xit('should find the deepest paths in a list of paths', function () {
      var expected = '';
      var result = '';
      expect(result).toEqual(expected);
    });

  });



});