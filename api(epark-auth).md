## API接口规则说明
|返回码|代码说明|
|-|-|
|200|操作成功|
|201|数据为空|
|202|用户名或密码无效或用户名重复|
|203|密码已失效|
|400|token无效 跳转登录页面|
|404|其他错误信息|
|500|服务器异常|
token由调用登录接口成功返回,作为调用别的接口时的公共参数请求(放在请求头中),用来校验用户身份.

## 登录
|接口名称|login|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/login|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|username|true|string||用户登录名|
|password|true|string||登录密码|

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码(200、202错误、203为密码已失效、500)|
|message|true|string||提示信息|
|data|true|object||返回数据|

```
{
    "status": "200",
    "message": "登录成功",
    "data": {
        "id": 1,
        "login": "admin",
        "name": "系统管理员",
        "token": "DE8157FD72E48C571BAFD32CB09A9045",
        "menuList": [
            {
                "menuId": 1,
                "name": "权限管理",
                "child": [
                    {
                        "pageId": 2,
                        "url": "/user",
                        "description": "用户列表",
                        "parent": 1
                    },
                    {
                        "pageId": 3,
                        "url": "/role",
                        "description": "角色列表",
                        "parent": 1
                    },
                    {
                        "pageId": 4,
                        "url": "/permission",
                        "description": "权限列表",
                        "parent": 1
                    }
                ]
            },
            {
                "menuId": 5,
                "name": "后台管理",
                "child": [
                    {
                        "pageId": 6,
                        "url": "/test1",
                        "description": "测试页面1",
                        "parent": 5
                    },
                    {
                        "pageId": 7,
                        "url": "/test2",
                        "description": "测试页面2",
                        "parent": 5
                    }
                ]
            }
        ]
    }
}
```

## 退出
|接口名称|logout|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/logout|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|请求头带token|||||

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|

## 用户查询
|接口名称|selectUsers|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/user/search|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|page|false|string|"1"|页码数值|
|limit|false|string|"10"|一页记录数值|
|selectStr|false|string|""|搜索条件字符串|

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码(200、201为未搜索到数据、500)|
|message|true|string||提示信息|
|data|true|object||返回数据|

```
{
    "status": "200",
    "message": "搜索到用户信息",
    "data": {
        "total": 3,
        "list": [
            {
                "uid": 1,
                "login": "admin",
                "username": "系统管理员",
                "status": true,
                "begin": "2019-01-15 10:49:21",
                "miss": "2099-01-01 00:00:00",
                "roleList": [
                    {
                        "id": 1,
                        "name": "管理员",
                        "description": "系统管理员"
                    },
                    {
                        "id": 2,
                        "name": "测试角色",
                        "description": "测试员1"
                    },
                    {
                        "id": 3,
                        "name": "测试角色2",
                        "description": "test2"
                    }
                ]
            },
            {
                "uid": 2,
                "login": "user",
                "username": "用户",
                "status": true,
                "begin": "2019-01-15 10:49:59",
                "miss": "2099-01-01 00:00:00",
                "roleList": [
                    {
                        "id": 1,
                        "name": "管理员",
                        "description": "系统管理员"
                    },
                    {
                        "id": 2,
                        "name": "测试角色",
                        "description": "测试员1"
                    }
                ]
            },
            {
                "uid": 3,
                "login": "test",
                "username": "测试员",
                "status": true,
                "begin": "2019-01-15 10:50:28",
                "miss": "2099-01-01 00:00:00",
                "roleList": [
                    {
                        "id": 3,
                        "name": "测试角色2",
                        "description": "test2"
                    }
                ]
            }
        ],
        "pageNum": 1,
        "pageSize": 10,
        "size": 3,
        "startRow": 1,
        "endRow": 3,
    }
}
```

## 用户新增
|接口名称|addUser|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/user/add|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|login|true|string||用户登录名|
|name|true|string||用户昵称|
|password|true|string||用户登录密码|

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码(200为成功，201为失败，202为登录名重复，500为服务器异常)|
|message|true|string||提示信息|

## 用户删除
|接口名称|deleteUsers|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/user/delete|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|ids|true|int[]||选中的用户id数组|
==将数组以json格式传过来：==
```
{"ids":[8,9,10]}
```

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码(200、500)|
|message|true|string||提示信息|

## 用户修改
|接口名称|modifyUser|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/user/update|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|uid|true|int||选中的用户id|
|login|true|string||要修改的登录名|
|name|true|string||要修改的用户昵称|
|status|true|boolean||要修改的用户状态(true为启用，false为禁用)|
|rids|true|int[]||选中的角色id数组|
==将数据以json格式传过来：==
```
{
    "uid":1,
    "login":"admin",
    "name":"系统管理员",
    "status":true,
    "rids":[8,9,10]
}
```

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码(200、201、202、500)|
|message|true|string||提示信息|

## 显示所有角色
|接口名称|selectAllRoles|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/user/searchRoles|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|无|||||

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|
|data|true|object||返回数据|

```
{
    "status": "200",
    "message": "搜索到角色信息",
    "data": [
        {
            "id": 1,
            "name": "管理员",
            "description": "系统管理员"
        },
        {
            "id": 2,
            "name": "测试角色",
            "description": "测试员1"
        },
        {
            "id": 3,
            "name": "测试角色2",
            "description": "test2"
        }
    ]
}
```

## 用户重置密码
|接口名称|resetPwd|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/user/reset|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|uid|true|int||选中的用户id|

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|
|data|true|object||返回数据(返回的是重置后的密码)|

```
{
    "status": "200",
    "message": "重置密码成功",
    "data": "EuAA26"
}
```

## 角色查询
|接口名称|selectRoles|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/role/search|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|page|false|string|"1"|页码数值|
|limit|false|string|"10"|一页记录数值|
|selectStr|false|string|""|搜索条件字符串|

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|
|data|true|object||返回数据|

```
{
    "status": "200",
    "message": "搜索到角色信息",
    "data": {
        "total": 3,
        "list": [
            {
                "roleId": 1,
                "roleName": "管理员",
                "roleDesc": "系统管理员",
                "permissionList": [
                    {
                        "pageId": 2,
                        "pageName": "用户列表",
                        "pageUrl": "/user",
                        "pid": 0,
                        "child": [
                            {
                                "id": 1,
                                "pid": 2,
                                "name": "/search",
                                "description": "查询"
                            },
                            {
                                "id": 2,
                                "pid": 2,
                                "name": "/add",
                                "description": "新增"
                            },
                            {
                                "id": 3,
                                "pid": 2,
                                "name": "/delete",
                                "description": "删除"
                            },
                            {
                                "id": 4,
                                "pid": 2,
                                "name": "/update",
                                "description": "修改"
                            },
                            {
                                "id": 5,
                                "pid": 2,
                                "name": "/searchRoles",
                                "description": "显示所有角色"
                            },
                            {
                                "id": 6,
                                "pid": 2,
                                "name": "/reset",
                                "description": "重置密码"
                            }
                        ]
                    },
                    {
                        "pageId": 3,
                        "pageName": "角色列表",
                        "pageUrl": "/role",
                        "pid": 0,
                        "child": [
                            {
                                "id": 7,
                                "pid": 3,
                                "name": "/search",
                                "description": "查询"
                            },
                            {
                                "id": 8,
                                "pid": 3,
                                "name": "/add",
                                "description": "新增"
                            },
                            {
                                "id": 9,
                                "pid": 3,
                                "name": "/delete",
                                "description": "删除"
                            },
                            {
                                "id": 10,
                                "pid": 3,
                                "name": "/update",
                                "description": "修改"
                            },
                            {
                                "id": 11,
                                "pid": 3,
                                "name": "/searchPermissions",
                                "description": "显示所有权限"
                            }
                        ]
                    },
                    {
                        "pageId": 4,
                        "pageName": "权限列表",
                        "pageUrl": "/permission",
                        "pid": 0,
                        "child": [
                            {
                                "id": 12,
                                "pid": 4,
                                "name": "/search",
                                "description": "查询"
                            },
                            {
                                "id": 13,
                                "pid": 4,
                                "name": "/add",
                                "description": "新增"
                            },
                            {
                                "id": 14,
                                "pid": 4,
                                "name": "/delete",
                                "description": "删除"
                            },
                            {
                                "id": 15,
                                "pid": 4,
                                "name": "/update",
                                "description": "修改"
                            }
                        ]
                    }
                ]
            },
            {
                "roleId": 2,
                "roleName": "测试角色",
                "roleDesc": "测试员1",
                "permissionList": [
                    {
                        "pageId": 6,
                        "pageName": "测试页面1",
                        "pageUrl": "/test1",
                        "pid": 0,
                        "child": [
                            {
                                "id": 16,
                                "pid": 6,
                                "name": "/test3",
                                "description": "测试接口3"
                            }
                        ]
                    },
                    {
                        "pageId": 7,
                        "pageName": "测试页面2",
                        "pageUrl": "/test2",
                        "pid": 0,
                        "child": [
                            {
                                "id": 17,
                                "pid": 7,
                                "name": "/test4",
                                "description": "测试接口4"
                            }
                        ]
                    }
                ]
            },
            {
                "roleId": 3,
                "roleName": "测试角色2",
                "roleDesc": "test2",
                "permissionList": [
                    {
                        "pageId": 7,
                        "pageName": "测试页面2",
                        "pageUrl": "/test2",
                        "pid": 0,
                        "child": [
                            {
                                "id": 17,
                                "pid": 7,
                                "name": "/test4",
                                "description": "测试接口4"
                            }
                        ]
                    }
                ]
            }
        ],
        "pageNum": 1,
        "pageSize": 10,
        "size": 3,
        "startRow": 1,
        "endRow": 3
    }
}
```


## 角色新增
|接口名称|addRole|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/role/add|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|name|true|string||角色名称|
|description|true|string||角色描述|

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|

## 角色删除
|接口名称|deleteRoles|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/role/delete|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|ids|true|int[]||选中的角色id数组|
==将数组以json格式传过来：==
```
{"ids":[8,9,10]}
```

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|

## 角色修改
|接口名称|modifyRole|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/role/update|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|rid|true|int||选中的角色id|
|name|true|string||要修改的角色名称|
|desc|true|string||要修改的角色描述|
|pids|true|int[]||选中的权限id数组|
==将数据以json格式传过来：==
```
{
    "rid":1,
    "name":"管理员",
    "desc":"系统管理员",
    "pids":[8,9,10]
}
```

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|

## 显示所有权限
|接口名称|selectAllPermissions|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/user/searchPermissions|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|无|||||

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|
|data|true|object||返回数据|
```
{
    "status": "200",
    "message": "搜索到所有权限信息",
    "data": [
        {
            "pageId": 2,
            "pageName": "用户列表",
            "pageUrl": "/user",
            "pid": 0,
            "child": [
                {
                    "id": 1,
                    "pid": 2,
                    "name": "/search",
                    "description": "查询"
                },
                {
                    "id": 2,
                    "pid": 2,
                    "name": "/add",
                    "description": "新增"
                },
                {
                    "id": 3,
                    "pid": 2,
                    "name": "/delete",
                    "description": "删除"
                },
                {
                    "id": 4,
                    "pid": 2,
                    "name": "/update",
                    "description": "修改"
                },
                {
                    "id": 5,
                    "pid": 2,
                    "name": "/searchRoles",
                    "description": "显示所有角色"
                },
                {
                    "id": 6,
                    "pid": 2,
                    "name": "/reset",
                    "description": "重置密码"
                }
            ]
        },
        {
            "pageId": 3,
            "pageName": "角色列表",
            "pageUrl": "/role",
            "pid": 0,
            "child": [
                {
                    "id": 7,
                    "pid": 3,
                    "name": "/search",
                    "description": "查询"
                },
                {
                    "id": 8,
                    "pid": 3,
                    "name": "/add",
                    "description": "新增"
                },
                {
                    "id": 9,
                    "pid": 3,
                    "name": "/delete",
                    "description": "删除"
                },
                {
                    "id": 10,
                    "pid": 3,
                    "name": "/update",
                    "description": "修改"
                },
                {
                    "id": 11,
                    "pid": 3,
                    "name": "/searchPermissions",
                    "description": "显示所有权限"
                }
            ]
        }
    ]
}
```

## 权限查询
|接口名称|listPermissions|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/permission/search|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|selectStr|false|string|""|搜索条件字符串|

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|
|data|true|object||返回数据|
==数据格式同上（显示所有权限接口）==

## 权限新增
|接口名称|addPagePermission|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/permission/add|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|id|false|int|"0"|页面id(若type为0时，则不需要传页面id)|
|type|true|int||若pid为0则type为0，若pid不为0则type为1(用于区别页面和权限)|
|name|true|string||页面或权限名称|
|url|true|string||页面或权限url|

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|

## 权限删除
|接口名称|deletePermissions|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/permission/delete|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|pageIds|true|int[]||选中的页面id数组|
|ids|true|int[]||选中的权限id数组|
==将数据以json格式传过来：==
```
{
    "pageIds":[8,3,4],
    "ids":[8,9,10]
}
```

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|

## 权限修改
|接口名称|modifyPagePermission|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/permission/update|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|id|true|int||选中的页面或权限id|
|pid|true|int||pid为0则是页面，pid不为0则为权限|
|name|true|string||页面或权限名称|
|url|true|string||页面或权限url|

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|

## 点击二级菜单时查询用户是否有页面权限
|接口名称|selectUserOwnPermissions|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/permission/selectUserOwnPermissions|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|pageName|true|string||二级菜单页面url|
例：

```
application/x-www-form-urlencoded
pageName  "/user"
```

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|data|true|object||返回数据|
==如果没有权限 则不返回，只返回有权限的url！==
```
{
    "data": {
        "/delete": 1,
        "/add": 1,
        "/search": 1
    },
    "status": 200
}
```
