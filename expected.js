module.exports = expected;

var expected = {}


expected.file = {name: 'repo',
                  children: [
                    {name: 'file1'},
                    {name: 'file2'},
                    {name: 'repo/directory',
                      children: [
                        {name: 'file3'}
                      ],
                    }
                  ]
                }


expected.sample = 
  {
    "name": "root",
    "children": [
      {
        "name": "src",
        "children":[
          {
            "name": "client",
            "children":[
              {
                "name": "css",
                "children": [
                  {"name": "main.css"},
                  {"name": "test.css"}
                ]
              },
              {
                "name": "js",
                "children": [
                  {"name": "main.js"},
                  {"name": "test.js"}
                ]
              }
            ]
          },
          {
            "name": "server",
            "children":[
              {
                "name": "bin",
                "children":[
                  {"name": "www"}
                ]
              },
              {
                "name": "routes",
                "children": [
                  {"name": "index.js"}
                ]
              },
              {
                "name": "views",
                "children": [
                  {"name": "index.html"},
                  {"name": "error.html"},
                  {"name": "layout.html"}
                ]
              },
              {"name": "app.js"}
            ]
          }
        ]
      },
      {"name": ".gitignore"},
      {"name": "package.json"},
      {"name": "gulpfile.js"}
    ]
  }