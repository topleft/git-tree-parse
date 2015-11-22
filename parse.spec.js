var parse = require('./parse.js');
var data = require('./data.js');
var expected = require('./expected.js')

describe('tree parser', function () {
  
  it('should grab repo name', function(){
    var expected = parse(data.file);
    var result = 'test';
    expect(result).toEqual(expected);
  });

  it('should parse a single file', function(){
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

});