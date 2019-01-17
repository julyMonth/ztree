## API接口规则说明
|返回码|代码说明|
|-|-|
|200|操作成功|
|201|数据为空|
|202|用户名或密码无效|
|400|token无效 跳转登录页面|
|404|其他错误信息|
|500|操作异常|
token由调用登录接口成功返回,作为调用别的接口时的公共参数请求,用来校验用户身份.

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
|status|true|string||返回码|
|message|true|string||提示信息|
|data|true|object||返回数据|

```
{
    "status": "200",
    "message": "登录成功",
    "data": {
        "id": 1,
        "login": "admin",
        "name": "管理员",
        "token": "49C4C348446D3465E6927474586E01E1",
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
                        "url": "/userRole",
                        "description": "角色分配",
                        "parent": 1
                    },
                    {
                        "pageId": 5,
                        "url": "/permission",
                        "description": "权限列表",
                        "parent": 1
                    },
                    {
                        "pageId": 6,
                        "url": "/rolePermission",
                        "description": "权限分配",
                        "parent": 1
                    }
                ]
            },
            {
                "menuId": 7,
                "name": "后台管理",
                "child": [
                    {
                        "pageId": 8,
                        "url": "/test",
                        "description": "测试功能",
                        "parent": 7
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
|pageNum|false|string|"1"|页码数值|
|pageSize|false|string|"10"|一页记录数值|
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
    "message": "搜索到用户信息",
    "data": {
        "total": 1,
        "list": [
            {
                "id": 1,
                "login": "admin",
                "token": null,
                "name": "管理员",
                "status": true,
                "begin": "2018-12-14 11:16:52"
            }
        ],
        "pageNum": 1,
        "pageSize": 10,
        "size": 1,
        "startRow": 1,
        "endRow": 1,
        "pages": 1,
        "prePage": 0,
        "nextPage": 0,
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": false,
        "hasNextPage": false,
        "navigatePages": 8,
        "navigatepageNums": [
            1
        ],
        "navigateFirstPage": 1,
        "navigateLastPage": 1,
        "firstPage": 1,
        "lastPage": 1
    }
}
```

## 新增用户
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
|status|true|string||返回码|
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
|status|true|string||返回码|
|message|true|string||提示信息|

## 角色查询
|接口名称|selectRoles|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/role/search|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|pageNum|false|string||页码数值|
|pageSize|false|string||一页记录数值|
|selectStr|false|string|""|搜索条件字符串|
==分页显示必须给pageNum和pageSize，
若要搜索全部角色则不需要这三个参数==

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|
|data|true|object||返回数据|
==分页返回：==

```
{
    "status": "200",
    "message": "搜索到角色信息",
    "data": {
        "total": 3,
        "list": [
            {
                "id": 1,
                "name": "管理员组",
                "description": "系统管理员"
            },
            {
                "id": 2,
                "name": "测试组",
                "description": "测试员1"
            },
            {
                "id": 3,
                "name": "测试组",
                "description": "test2"
            }
        ],
        "pageNum": 1,
        "pageSize": 3,
        "size": 3,
        ....同上
    }
}
```
==搜索全部返回：==

```
{
    "status": "200",
    "message": "搜索到角色信息",
    "data": [
        {
            "id": 1,
            "name": "管理员组",
            "description": "系统管理员"
        },
        {
            "id": 2,
            "name": "测试组",
            "description": "测试员1"
        },
        {
            "id": 3,
            "name": "测试组",
            "description": "test2"
        }
    ]
}
```

## 新增角色
|接口名称|addRole|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/role/add|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|name|true|string||角色类别|
|description|true|string||角色名称|

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

## 用户角色查询
|接口名称|selectUserRole|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/userRole/search|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|pageNum|false|string|"1"|页码数值|
|pageSize|false|string|"10"|一页记录数值|
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
    "message": "搜索到用户角色信息",
    "data": {
        "total": 1,
        "list": [
            {
                "id": 1,
                "username": "管理员",
                "login": "admin",
                "status": true,
                "roleName": "系统管理员,测试员1,test2",
                "roleId": "1,2,3"
            }
        ],
        .....同上
    }
}
```

## 用户角色分配
|接口名称|giveRole|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/userRole/give|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|uid|true|int||选中的用户id|
|rids|true|int[]||要分配的角色id数组|
==将两个参数以json格式传过来：==
```
{"uid":1,"rids":[2,3,4,5]}
```

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|

## 用户角色清空
|接口名称|deleteUserRoles|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/userRole/delete|
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
|status|true|string||返回码|
|message|true|string||提示信息|

## 权限查询
|接口名称|listPermission|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/permission/search|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|pageNum|false|string||页码数值|
|pageSize|false|string||一页记录数值|
|selectStr|false|string|""|搜索条件字符串|
==分页显示必须给pageNum和pageSize，
若要搜索全部权限则不需要这三个参数==

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|
|data|true|object||返回数据|
==分页返回：==

```
{
    "status": "200",
    "message": "搜索到权限信息",
    "data": {
        "total": 14,
        "list": [
            {
                "id": 1,
                "permissionUrl": "/search",
                "permissionDesc": "用户查询",
                "pageUrl": "/user",
                "pageDesc": "用户列表"
            },
            {
                "id": 2,
                "permissionUrl": "/add",
                "permissionDesc": "新增用户",
                "pageUrl": "/user",
                "pageDesc": "用户列表"
            },
            {
                "id": 3,
                "permissionUrl": "/delete",
                "permissionDesc": "用户删除",
                "pageUrl": "/user",
                "pageDesc": "用户列表"
            },
            {
                "id": 4,
                "permissionUrl": "/search",
                "permissionDesc": "角色查询",
                "pageUrl": "/role",
                "pageDesc": "角色列表"
            }
        ],
        ....同上
    }
}
```
==搜索全部返回：==

```
{
    "status": "200",
    "message": "搜索到权限信息",
    "data": [
        {
            "id": 1,
            "permissionUrl": "/search",
            "permissionDesc": "用户查询",
            "pageUrl": "/user",
            "pageDesc": "用户列表"
        },
        {
            "id": 2,
            "permissionUrl": "/add",
            "permissionDesc": "新增用户",
            "pageUrl": "/user",
            "pageDesc": "用户列表"
        },
        {
            "id": 3,
            "permissionUrl": "/delete",
            "permissionDesc": "用户删除",
            "pageUrl": "/user",
            "pageDesc": "用户列表"
        },
        {
            "id": 4,
            "permissionUrl": "/search",
            "permissionDesc": "角色查询",
            "pageUrl": "/role",
            "pageDesc": "角色列表"
        },
        ....
    ]
}
```

## 新增权限
|接口名称|addPermission|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/permission/add|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|pageUrl|true|string||页面URL|
|pageDesc|true|string||页面名称|
|permissionUrl|true|string||权限URL|
|permissionDesc|true|string||权限名称|

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
|ids|true|int[]||选中的权限id数组|
==将数组以json格式传过来：==
```
{"ids":[8,9,10]}
```

#### 响应参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|status|true|string||返回码|
|message|true|string||提示信息|

## 角色权限查询
|接口名称|selectRolePermission|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/rolePermission/search|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|pageNum|false|string|"1"|页码数值|
|pageSize|false|string|"10"|一页记录数值|
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
    "message": "搜索到角色权限信息",
    "data": {
        "total": 3,
        "list": [
            {
                "id": 1,
                "roleName": "系统管理员",
                "roleType": "管理员组",
                "permissionName": "用户查询,用户删除,角色查询,角色删除,新增权限,权限删除,权限删除,角色权限查询,角色权限分配",
                "permissionId": "1,3,4,6,11,12,12,13,14"
            },
            {
                "id": 2,
                "roleName": "测试员1",
                "roleType": "测试组",
                "permissionName": "新增用户,用户删除,角色查询,新增角色",
                "permissionId": "2,3,4,5"
            },
            {
                "id": 3,
                "roleName": "test2",
                "roleType": "测试组",
                "permissionName": "用户查询",
                "permissionId": "1"
            }
        ],
        "pageNum": 1,
        ....同上
    }
}
```

## 角色权限分配
|接口名称|givePermission|
|-|:-|
|请求方法|POST|
|接口地址|http://host:port/api/v1/rolePermission/give|
|响应格式|JSON|

#### 请求参数
|参数名称|是否必须|类型|默认值|描述|
|-|-|-|-|-|
|rid|true|int||选中的角色id|
|pids|true|int[]||要分配的权限id数组|
==将两个参数以json格式传过来：==
```
{"rid":1,"pids":[2,3,4,5]}
```

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
|permissionArray|true|string[]||页面上所有需要的权限url|
例：

```
application/x-www-form-urlencoded
pageName  "/user"
permissionArray  ["/search","/add","/delete"]
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
        "/user/add": 1,
        "/user/delete": 1,
        "/user/search": 1
    },
    "status": 200
}
```
