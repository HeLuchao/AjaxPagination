var pageModel = (function () {
    var userList = document.getElementById('userList');
    var page = document.getElementById('page');
    var pageControl=document.getElementById("pageControl");
    var pageGo = document.getElementById("pageGo");


    var curPage = 1;
    var total = 0;

//绑定事件
    function bindEvent(){
        pageControl.onclick = function (ev) {
            ev = ev ||window.event;
            var tar = ev.target||ev.srcElement;//获取事件源
            var tarName = tar.tagName.toUpperCase();//获取标签
            if(tarName == "SPAN"){
                if(tar.innerHTML == "首页"){
                    if(curPage = 1){
                        return;
                    }
                    curPage = 1;
                }else if(tar.innerHTML == "上一页"){
                    if(curPage <=1){
                        return;
                    }
                    curPage--;
                }else if(tar.innerHTML == "下一页"){
                    if(curPage >=total){
                        return;
                    }
                    curPage++;
                }else if(tar.innerHTML == "尾页"){
                    if(curPage == total){
                        return;
                    }
                    curPage = total;
                }
                sendAjax();
            }else if(tarName == "LI"){
                if(curPage == parseInt(tar.innerHTML)){
                    return;
                }
                curPage= parseInt(tar.innerHTML);
                sendAjax();
            }else if(tarName=="INPUT"){
                return;
            }

        };

        pageGo.onkeyup = function (ev) {
        ev = ev||window.event;
        if(ev.keyCode == 13){
            var tar = ev.target||ev.srcElement;
            var value = parseInt(tar.value);
            if(!isNaN(value)){
                if(value == curPage){
                    return;
                }else if(value<=0){
                    value =1;
                }else if (value >total){
                    value = total;
                }
                curPage = value;
            }
            tar.value = curPage;
            sendAjax();
        }

        };

        userList.onclick = function (ev) {
        ev = ev||window.event;
            var tar = ev.target ||ev.srcElement;
            var tarName = tar.parentNode.tagName.toUpperCase();//获取父级元素
            if(tarName == "LI"){
                //window.location.href = "/detail.html";
                var userId = tar.parentNode.getAttribute("userId");
                window.open("/detail.html?id="+userId);
            }
        }
    }
    //绑定html数据
    function bindHTML(ary) {
        var str = '';

        //绑定用户列表区域
        for (var i = 0; i < ary.length; i++) {
            var userInfo = ary[i];
            str += '<li userId="'+userInfo.id+'"> <span>' + userInfo.id + '</span> <span>' + userInfo.name + '</span> <span>' + (userInfo.sex ? "女" : "男") + '</span> <span>' + userInfo.score + '</span> </li>';
        }
        userList.innerHTML = str;

        //绑定页码区域
        str = '';
        for (var i = 1; i <= total; i++) {
            str += '<li class="' + (curPage == i ? "select" : "") + '">' + i + '</li>';
        }
        page.innerHTML = str;

        //
        bindEvent();





    }
    //发送ajax
    function sendAjax() {
        ajax({
            type: "get",
            url: "/getListUserInfo?page=" + curPage,
            async: true,
            data: null,
            dataType: "json",
            success: function (data) {
                total = parseInt(data.total);//获取总页数
                bindHTML(data.data);
            }
        });
    }

    function init() {
        sendAjax();
    }

    return {
        init: init
    }
})();
pageModel.init();






