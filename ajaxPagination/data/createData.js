//获取m~n之间的随机整数
function getRandomNumber(m, n) {
    return Math.round(Math.random() * (n - m) + m);
}
var str = "六级考试的风景克拉克森的立法解决客户收到反馈就好了似的疯狂回家就看到合理收费和卡勒季斯的复活节快乐客户经理的身份和快乐就快乐和借鸡生蛋法赫卡里决定放手立刻回家的时刻黄金时代发挥空间里说的复活节克里斯朵夫好看";


var fs = require('fs');

var ary = [];
for (var i = 1; i <= 98; i++) {
    var obj = {};
    obj.id = i;
    obj.name = str[getRandomNumber(0, str.length - 1)] + str[getRandomNumber(0, str.length - 1)];
    obj.sex = getRandomNumber(0, 1);
    obj.score = getRandomNumber(50, 100);

    ary.push(obj);//将创建的用户信息保存到数组中
}


fs.writeFileSync('./data.json', JSON.stringify(ary), 'utf8');

