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
        var status = [0, 0, 0, 0] ;
        var statusCodes = ["开发中","已完成","已联调","已废弃"] ;

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

                    var desc = op.description;
                    if(!!desc){
                        for (var i = 0; i < statusCodes.length ; i++) {
                            if(desc.indexOf(statusCodes[i]) > -1){
                                status[i] = status[i] + 1
                                continue;
                            }
                        }
                    }
                }
            );

            icount++;
        });

        var unmark = gcount - status[0] - status[1] - status[2] - status[3];
        console.log('');
        console.log('## 统计信息');
        console.log('- 共有接口类'+ (icount-1)+'个');
        console.log('- 共有接口'+ (gcount-1)+'个');
        console.log('- 开发中的接口'+ status[0]+'个，占比' + (status[0]*100.0/gcount).toFixed(2) + '%');
        console.log('- 已完成的接口'+ status[1]+'个，占比' + (status[1]*100.0/gcount).toFixed(2) + '%');
        console.log('- 已联调的接口'+ status[2]+'个，占比' + (status[2]*100.0/gcount).toFixed(2) + '%');
        console.log('- 已废弃的接口'+ status[3]+'个，占比' + (status[3]*100.0/gcount).toFixed(2) + '%');
        console.log('- 未标记的接口'+ unmark +'个，占比' + (unmark*100.0/gcount).toFixed(2) + '%');

        console.log('- 总体进度 '+ ((status[1]*0.5+status[2])*100.0/(gcount - status[3])).toFixed(2) + '%');        

    }
})


var getChildren = function (p) {
    var r = [];
    for (var pn in p) {
        r.push(pn);
    }
    return r;
}