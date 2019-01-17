$(function() {
	var token = window.localStorage.token;
	layui.use('table', function() {
		var table = layui.table;
		var tableIns = table.render({
			elem: '#addRole',
			//			method:'post',
			url: '../json/selectUserRole.json',
			//			url: 'http://192.168.1.122:8080/epark/api/v1/role/search',
			width: 640,
			height: 660,
			page: true,
			headers: {
				token: token
			},
			response: {
				statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
			},
			parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
				return {
					"code": res.status, //解析接口状态
					"msg": res.message, //解析提示文本
					"count": res.data.total, //解析数据长度
					"data": res.data.list //解析数据列表
				};
			},
			limits: [10, 15, 20, 25],
			limit: 10,
			id: "addRole",
			cols: [
				[{
						type: "checkbox",
						fixed: "left",
						width: 80
					},
					{
						field: 'roleName',
						title: '用户名称',
						width: 120,
						align: "center"
					},
					{
						field: 'roleDesc',
						title: '用户描述',
						width: 260,
						align: 'center'
					},
					{
						title: '操作',
						templet: '#userListBar',
						fixed: "right",
						align: "center",
						toolbar: '#barDemo',
					}
				]
			],
			done: function(res, curr, count) {
				// 							var list = layui.table.checkStatus('test').data;
				// 							console.log(list)
			}
		});
		//监听行工具事件
		table.on('tool(addRole)', function(obj) { //表中修改按钮
			$('.modifyRoleBox').show();
			event.stopPropagation();
			//			console.log(obj)
			let data = obj.data;
			let $name = data.roleName;
			let $des = data.roleDesc;
			let $uid = data.roleId;
			//清除弹框所有input内的值,然后重新赋值
			$('.modifyRoleName').val('');
			$('.modifyRoleDes').val('');
			$('#uid').val('');
			$('#demo').empty();
			// 数据渲染到input框中
			$('.modifyRoleName').val($name);
			$('.modifyRoleDes').val($des);
			$('#uid').val($uid)
			$.ajax({
//				url: 'http://192.168.1.122:8080/epark/api/v1/user/searchPermissions',
				type: 'get',
				url: '../json/allRole.json',
				headers:{token:token},
				success: function(res) {
					console.log(res)
					debugger
					var setting = {
						check: {
							enable: true,
							chkStyle: "checkbox",
							chkboxType: {
								"Y": "ps",
								"N": "ps"
							}
						},
//						data: {
//							simpleData: {
//								enable: true
//							}
//						},
					};
					$.fn.zTree.init($("#treeDemo"), setting, res);
			},
			error:function(e){
				console.log(e)
			}
			})

		});
		//点击行获取当前行数据，并设置选中状态
		$(document).on("click", ".layui-table-body table.layui-table tbody tr", function() {
			var index = $(this).attr('data-index');
			var tableBox = $(this).parents('.layui-table-box');
			//存在固定列
			if(tableBox.find(".layui-table-fixed.layui-table-fixed-l").length > 0) {
				tableDiv = tableBox.find(".layui-table-fixed.layui-table-fixed-l");
			} else {
				tableDiv = tableBox.find(".layui-table-body.layui-table-main");
			}
			var checkCell = tableDiv.find("tr[data-index=" + index + "]").find(
				"td div.laytable-cell-checkbox div.layui-form-checkbox I");
			if(checkCell.length > 0) {
				checkCell.click();
				$('.roleBelongs').show();
			};
			// 将点击表中的行数据渲染到已拥有权限的框中
			$('.allMenu').empty();
			// 获取选中状态的所有数据，
			let list = layui.table.checkStatus('addRole').data;
			//			 console.log(list)

			var lis = '';
			if(list.length !== 0) {
				let permissionList = list[0].permissionList;
				// 遍历数据,然后append到已拥有权限的框中
				for(var i = 0; i < permissionList.length; i++) {
					lis += '<li class="firstMenu">' + permissionList[i].pageName + '<ul class="secondMenu">';
					for(var j = 0; j < permissionList[i].child.length; j++) {
						lis += '<li>' + permissionList[i].child[j].description + '</li>'
					}
					lis += '</ul></li>'
				}
				$('.allMenu').append(lis);
			} else {
				$('.roleBelongs').hide();
			}
		});
		$(document).on("click", "td div.laytable-cell-checkbox div.layui-form-checkbox", function(e) {
			e.stopPropagation();

		});

	});
	/**********************已拥有权限弹框中ul的点击事件**********************/
	$('.allMenu').on('click', '.firstMenu', function() {
		$(this).children().find('li').toggle();
		// console.log($(this))
		$(this).siblings().find('li').hide();
	})
	$('.allMenu').on('click', '.secondMenu', function(event) {
		event.stopPropagation()
	})
	/**********************点击搜索按钮的事件**********************/
	$('.topRoleSearch').click(function() {
		active = {
			reload: function() {
				let demoReload = $('.topSearch');
				//执行重载
				layui.table.reload('addRole', {
					headers: {
						"token": token
					},
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						selectStr: demoReload.val()
					}
				});
			}
		};
		let type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	})
	/**********************增加用户按钮**********************/
	$('.topAddRole').click(function() {
		$('.addNewRole').show();
		$('.roleName').find('input').val('');
		$('.roleDescription').find('input').val('');
	});
	// input聚焦后为空提示消失
	$('.roleName input').focus(function() {
		$('.roleName span').hide();
	});
	$('.roleDescription input').focus(function() {
		$('.roleDescription span').hide();
	});
	// 增加用户中的确定按钮
	$('.newRoleConfirm').click(function() {
		var newName = $('.roleName').find('input').val();
		var newRoleDes = $('.roleDescription').find('input').val();
		if(newName == '') {
			$('.roleName span').show();
			return;
		};
		if(newRoleDes == '') {
			$('.roleDescription span').show();
			return;
		};
		$.ajax({
			type: "post",
			url: 'http://192.168.1.122:8080/epark/api/v1/role/add',
			headers: {
				"token": token
			},
			data: {
				name: newName,
				description: newRoleDes
			},
			success: function(res) {
				// 成功后表格重载
				active = {
					reload: function() {
						//表格执行重载
						layui.table.reload('addRole', {
							headers: {
								"token": token
							},
							//page: {
							//curr: 1 //重新从第 1 页开始
							//},
							done: function() {
								$('.addNewRole').hide();
							}
						});
					}
				};
				var type = $(this).data('type');
				active[type] ? active[type].call(this) : '';
			},
			error: function(error) {
				console.log(error)
			}
		})
	});
	//增加用户中的取消按钮
	$('.newRoleCancel').click(function() {
		$('.addNewRole').hide();
	})
	/**********************删除角色信息按钮**********************/
	$('.topDelRole').click(function() {
		var list = layui.table.checkStatus('addRole').data;
		if(list.length || list.length !== 0) {
			$('#addMask').show();
		} else {
			alert("请选择要删除的信息")
		}
	});
	//   删除确定按钮
	$('.delBtnConfirm').click(function() {
		var list = layui.table.checkStatus('addRole').data;
		var str = [];
		for(var item in list) { //将所有选择项的id放进str中
			let id = list[item].uid;
			str.push(id);
		};
		console.log(str)
		//	删除按钮的数据请求
		$.ajax({
			url: "http://192.168.1.122:8080/epark/api/v1/role/delete",
			type: "post",
			crossDomain: true,
			headers: {
				"token": token
			},
			data: JSON.stringify({
				ids: str
			}),
			success: function(res) {
				//    		console.log(res);
				active = {
					reload: function() {
						//执行重载
						layui.table.reload('addRole', {
							headers: {
								"token": token
							},
							//					    page: {
							//					       	curr: 1 //重新从第 1 页开始
							//					        },
						});
					}
				};
				let type = $(this).data('type');
				active[type] ? active[type].call(this) : '';
				$('#addMask').hide();
			},
			error: function(error) {
				console.log(error)
				// alert(error.message)
			}
		})
	});
	//	删除取消按钮
	$('.delBtnConcel').click(function() {
		$('#addMask').hide();
	});
	$('.close').click(function() {
		$('#addMask').hide();
	});
	/**********************修改弹框中的按钮**********************/
	// 确定按钮
	$(".confirm").click(function() {
		var rolename = $('.modifyRoleName').val();
		var rolrdes = $('.modifyRoleDes').val();
		var rid = $("#uid").val();
		var $checked = $('#demo input:checked');
		var ids = [];
		$.each($checked, function(index, item) {
			ids.push(item.id)
		});
//		console.log(ids)
		if(rolename == '') {
			$('.tipName').show();
			return;
		};
		if(rolrdes == '') {
			$('.tipDes').show();
			return;
		}
		$.ajax({
			type: 'post',
			url: '127.0.0.1',
			headers: {
				"token": token,
				'Content-Type': "application/json;charset=UTF-8"
			},
			data: JSON.stringify({
				name: rolename,
				desc: rolrdes,
				rid: rid,
				pids: ids,
			}),

			success: function(res) {
				console.log(res);
				//			表格数据重载
				//						 $(location).attr('href', '../index.html');
				$('.modifyRoleBox').hide();
			},
			error: function(e) {
				console.log(e)
			}
		})
	});
	//input框聚焦后,为空提示
	$('.modifyRoleName').focus(function() {
		$('.tipName').hide();
	});
	$('.modifyRoleDes').focus(function() {
		$('.tipDes').hide();
	});
	// 取消按钮
	$(".cancel").click(function() {
		$('.modifyRoleBox').hide();
	})
})