layui.use(['jquery', 'form', 'table', 'element', 'layer'], function() {
	var form = layui.form;
	var table = layui.table;
	var element = layui.element;
	var $ = layui.jquery;
	layer = layui.layer;

	table.render({
		elem: '#test',
		id: 'test',
		type: "post",
		url: '../json/rolePermission.json',
		headers:{
			token:1
		},
		parseData: function(res) { //res 即为原始返回的数据
			return {
				"code": res.status, //解析接口状态
				"msg": res.message, //解析提示文本
				"count": res.data.total, //解析数据长度
				"data": res.data.list //解析数据列表
			};
		},
		response: {
			statusCode: 200
		},
		toolbar: '#toolbarDemo',
		title: '用户数据表',
		height: 690,
		cols: [
			[{
				type: 'checkbox',
				fixed: 'left',
				width: 60
			}, {
				field: 'roleName',
				title: '权限名称',
				width: 190
			}, {
				field: 'roleType',
				title: '权限类型',
				width: 190
			}, {
				field: 'permissionName',
				title: '拥有的权限',
			}, {
				fixed: 'right',
				title: '操作',
				toolbar: '#barDemo',
				width: 125
			}]
		],
		page: true,
		done: function(res) {
			// 列表中权限选择
			console.log(res.data);
			// 			var arr = [];
			// 			var datas = obj.data.id;
			// 			arr.push(res.data[datas].permissionId);
			// 			console.log(arr);
			table.on('tool(test)', function(obj) {
				$.ajax({
					type: "get",
					url: "../json/permission.json",
					dataType: "json",
					success: function(result) {
						let list = result.data.list;

						// 权限选择的复选框
						var str = '<div style="height: 400px;">';
						// 弹出框循环显示内容
						for (var i = 0; i < list.length; i++) {
							str += '<div class="alt"><input type="checkbox">' + list[i].permissionDesc + '</div>';
						}
						str += '</div>';

						if (obj.event === 'edit') {
							layer.confirm(str, function(index) {
								skin: 'layui-layer-dialog', //重新定义弹出框样式
								// 确认后 发送要给予的权限数据
								Delindex();
								layer.close(index);
							});
						}

					}
				})

				function Delindex() {
					var data = obj.data.id;
					// 角色权限分配
					var rid = Number(data);
					rid = JSON.stringify({
						rid
					});
					console.log(rid);
				}
			});
		},
	});
});
