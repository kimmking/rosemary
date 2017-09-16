var args = process.argv.splice(2)

var rf=require("fs");
var data=rf.readFileSync(args[0],"utf-8");

let markdowner = require('markdown-it');
var md = new markdowner({
    html: true,
    prefix: 'code-',
});

var html = md.render(data||'');
console.log(html)
