var fs = require('fs');
var url = require('url');
var http = require('http');


var server = http.createServer(function (req, res) {
    var objUrl = url.parse(req.url, true);
    var pathname = objUrl.pathname;
    var query = objUrl.query;
    var reg = /\.(HTML|JS|JSON|CSS|TXT|ICO)/i;
    //静态资源文件请求
    if (reg.test(pathname))
    {
        var suffix = reg.exec(pathname)[1].toUpperCase();
        var suffixMIME = 'text/plain';
        switch (suffix) {
            case 'HTML':+++;
            {
                suffixMIME = 'text/html';
            }
                break;
            case 'CSS':
            {
                suffixMIME = 'text/css';
            }
                break;
            case 'JS':
            {
                suffixMIME = 'application/js';
            }
                break;
            case 'JSON':
            {
                suffixMIME = 'application/json';
            }
                break;
            case 'TXT':
            {
                suffixMIME = 'text/html';
            }
                break;
        }
        try {
            var conFile = fs.readFileSync('.' + pathname, 'utf8');
            res.writeHead(200, {'content-type': suffixMIME + ';charset=utf8'});
            res.end(conFile);
        } catch (err) {
            res.writeHead(404, {'content-type': 'text/plain;charset=utf8'});
            res.end();
        }
    }


    /*-------------------接口请求的处理-------------------*/
    //获取所有用户信息
    function getAllUserInfo() {
        var allUserInfo = fs.readFileSync('./data/data.json', 'utf8');
        (!allUserInfo) && (allUserInfo = '[]');
        return JSON.parse(allUserInfo);
    }

    //获取指定页用户信息
    function getUserInfoFromPage(allUserInfo, page) {
        var start = (page - 1) * 10; //起始下标
        var end = (page * 10) - 1;   //结束下标
        end = (end >= allUserInfo.length ? allUserInfo.length - 1 : end); //下标越界处理
        var ary = [];
        for (var i = start; i <= end; i++) {  //遍历所有用户找到符合要求的用户信息
            ary.push(allUserInfo[i]);
        }
        return ary;
    }

    //根据id号获取指定用户信息
    function getUserInfoFromId(alluserinfo, id){
        for (var i=0; i<alluserinfo.length; i++){//遍历所有用户
            if (id == alluserinfo[i].id){//找到id匹配用户
                return alluserinfo[i]; //返回匹配的用户
            }
        }
        return null;//找不到返回null
    }

    //获取指定某页用户的信息
    if (pathname == '/getListUserInfo') {
        //1: 获取客户端请求url中page的值
        var page = parseInt(query.page);
        //2: 获取所有用户的信息
        var allUserInfo = getAllUserInfo();
        //3: 在所有用户信息中找到客户端需要的指定页用户信息
        var ary = getUserInfoFromPage(allUserInfo, page);
        //4: 确定总页数
        var total = Math.ceil(allUserInfo.length / 10);
        //5: 按照接口返回信息(指定页用户信息和总页数)
        var result = {};
        result.code = ary.length > 0 ? 0 : 1;
        result.msg = ary.length > 0 ? "获取指定页用户信息成功" : "获取指定页用户信息失败";
        result.total = total;
        result.data = ary;

        res.writeHead(200, {"content-type":"application/json;charset=utf8"});
        res.end(JSON.stringify(result));
    }

    //获取指定用户的信息
    if (pathname == '/getUserInfo'){
        //1: 获取url中用户的id号
        var id = parseInt(query.id);
        //2: 获取所有用户信息
        var allUserInfo = getAllUserInfo();
        //3: 在所有用户信息中找到id号匹配的用户信息
        var userInfo = getUserInfoFromId(allUserInfo, id);
        //4: 按照接口要求返回
        var result = {};
        result.code = userInfo? 0:1;
        result.msg = userInfo ? "获取指定用户信息成功" :"获取指定用户信息失败";
        result.data = userInfo;

        res.writeHead(200, {"content-type":"application/json;charset=utf8"});
        res.end(JSON.stringify(result));
    }


});


server.listen(8080);