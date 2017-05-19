## ajax分页的需求
- 获取指定页的所有用户信息
- 获取指定用户的信息

## 根据需求制定接口
- 获取指定页的所有用户信息
```
//客户端
请求方式type:  get
请求url地址:   /getListUserInfo
请求url参数:   url?page=1           //1是页码数
请求体信息:    null


//服务器
服务器返回的数据:
{
    code: 0,                     //0成功1表示失败
    msg: '获取指定页用户信息成功',   //code的对应描述信息
    totol: 10,                   //一共有多少页信息
    data: [
        {id: 1, name: "chenchao", sex: 0, score: 100},
        {id: 2, name: "liudehua", sex: 0, score: 98},
        ......
    ]
}
```

- 获取指定用户的信息
```
//客户端
请求方式type:  get
请求url地址:   /getUserInfo
请求url参数:   url?id=5         //id表示要获取的用户id号
请求体信息:    null

//服务器
服务器返回的数据:
{
    code: 0,                     //0成功1表示失败
    msg: '获取指定用户信息成功',    //code的对应描述信息
    data:  {id: 5, name: "lihuayong", sex: 0, score: 100},
}
```

