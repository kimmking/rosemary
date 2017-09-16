var request = require('request');

var url = 'http://192.168.20.3:9999';

request(url+'/v2/api-docs', function (error, response, body) {
    if (!error && response.statusCode == 200) {

        var json = JSON.parse(body);
        var tags = json.tags;

        var interfaces = {};
        tags.forEach(function (t) {
            interfaces[t.name] = [];
        });

        var paths = json.paths;
        for (var pname in paths) {
            var p = paths[pname];
            var methods = getChildren(p);
            methods.forEach(function (m) {
                    var op = p[m];
                    op.path = pname;
                    op.m = m;
                    var tn = op.tags[0];
                    interfaces[tn].push(op);
                }
            );
        }

        // print

        var icount = 1;
        var gcount = 1;
        tags.forEach(function (t) {
            console.log("");
            console.log("## "+icount + ".接口类:", t.name);
            console.log("- 描述信息:", t.description);
            console.log("");
            var ocount = 1;
            interfaces[t.name].forEach(function (op) {
                    console.log("### "+icount+"."+ocount+"(" + gcount + ")" +op.path);
                    console.log('- 路径:', url+op.path);
                    console.log('- 方法:', op.m);
                    console.log('- 概要:', op.summary);
                    console.log('- 描述:', op.description);
                    console.log('- 操作ID:', op.operationId);
                    console.log('- 响应类型:', op.consumes);
                    console.log('- 请求类型:', op.produces);
                    ocount++;gcount++;
                }
            );

            icount++;
        });

        console.log('');
        console.log('## 统计信息');
        console.log('- 共有接口类'+ (icount-1)+'个');
        console.log('- 共有接口'+ (gcount-1)+'个');

    }
})


var getChildren = function (p) {
    var r = [];
    for (var pn in p) {
        r.push(pn);
    }
    return r;
}