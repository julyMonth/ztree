$(function() {
	let token = window.localStorage.token;
	layui.use('table', function() {
		var table = layui.table;
		var tableIns = table.render({
			elem: '#test',
			//method:'post',
			url: '../json/showusers.json',
			// url: 'http://192.168.1.122:8080/epark/api/v1/user/search',
			width: 900,
			height: 660,
			page: true,
			headers: {
				"token": token
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
			id: "test",
			cols: [
				[{
						type: "checkbox",
						fixed: "left",
						width: 60
					},
					{
						field: 'login',
						title: '登录名称',
						width: 96,
						align: "center"
					},
					{
						field: 'username',
						title: '用户昵称',
						// width: 120,
						align: 'center'
					},
					{
						field: 'status',
						title: '用户状态',
						width: 90,
						align: 'center',
						templet:function(d){
                            return  d.status == true ? "可用":"<span class='layui-red'>禁用</span>";
						   }
					},
					{
						field: 'begin',
						title: '注册时间',
						align: 'center'
					},
					{
						field: 'miss',
						title: '密码失效时间',
						align: 'center'
					},
					{
						title: '操作',
						templet: '#userListBar',
						fixed: "right",
						align: "center",
						toolbar: '#barDemo',
						width: 140
					}
				]
			],
			done: function(res, curr, count) {}
		});

/**********************监听行工具事件**********************/
		table.on('tool(test)', function(obj) {
			 // console.log(obj)
			if(obj.event === 'modify'){
				event.stopPropagation();
				$('.mask').show();//点击选择修改后出现弹框
	           //清除弹框所有input内的值,然后重新赋值
				$('#uid').val('');
				$('.modifyName').val('');
				$('.modifyDes').val('');
	//			获取数据,渲染到dom中
				var data = obj.data;
				// console.log(data)
				$('#uid').val(data.uid);
				var str = [];
				for(var i =0;i<data.roleList.length;i++){
					str.push(data.roleList[i].id)
				};
				$('.modifyName').val(data.login);
				$('.modifyDes').val(data.username);
//				改变用户状态
			    if(data.status==true){
			    	$('.modifyStatus').prop('value','true');
			    }else{
			    	$('.modifyStatus').prop('value','false');
			    }
			    
			    /**********************点击修改后，请求所有角色的数据 **********************/
			$.ajax({
				// type:'post',
				type: 'get',
				url: '../json/jueselist.json', //请求所有角色
				// url: 'http://192.168.1.122:8080/epark/api/v1/user/searchRoles',
				// headers:{"token":token},
				success: function(res) {
					let list = res.data;
					// console.log(list)
					// 获得数据后渲染到弹框中
					var allList = '';
					for (var i = 0; i < list.length; i++) {
						allList +='<option id="' +list[i].id+'">'+list[i].name+'</option>';
					}
					$('#select1').append(allList);
						let $options = $('#select1').find('option')
					// 遍历所有的option标签
					$.each($options, function(index, item) {
						for (var j = 0; j < str.length; j++) {
							// 将拥有的角色放进右侧
							if (item.id == str[j]) {
								$('#select2').append(item);
							}
						}
					});
					
				},
				error: function(e) {
					console.log(e)
				}
			})
		  } ;
/**********************密码重置按钮**********************/
			if(obj.event==='reset'){
				event.stopPropagation();
				let uid = obj.data.uid;
				$.ajax({
					type:'post',
					url:'127.0.0.1',
					// url: 'http://192.168.1.122:8080/epark/api/v1/user/reset',
					data:{uid:uid},
					headers:{token:token},
					success:function(res){
						console.log(res);
						$('.belongs').hide();
						$('.resetPass').show();
//						将获取的新密码在弹框中显示
						$('.newPass').val(res.data)
//					    点击确定后,跳转到登录页面
//						 $(location).attr('href', '../index.html');
					},
					error:function(e){
						 console.log(e)
					}
				})
			}
		});

// 点击已拥有角色一级菜单后,二级菜单显示出来
$('.allMenu').on('click','.firstMenu',function(){
	$(this).children().find('li').toggle();
	// console.log($(this))
	$(this).siblings().find('li').hide();
})
$('.allMenu').on('click','.secondMenu',function(event){
	event.stopPropagation()
})

/**********************重置密码弹框中的关闭按钮**********************/
			$('.close').click(function(){
				$('.resetPass').hide();
			})
 /**********************点击行获取当前行数据，并设置选中状态**********************/
		$(document).on("click", ".layui-table-body table.layui-table tbody tr", function() {
			var index = $(this).attr('data-index');
			var tableBox = $(this).parents('.layui-table-box');
			//存在固定列
			if (tableBox.find(".layui-table-fixed.layui-table-fixed-l").length > 0) {
				tableDiv = tableBox.find(".layui-table-fixed.layui-table-fixed-l");
			} else {
				tableDiv = tableBox.find(".layui-table-body.layui-table-main");
			}
			var checkCell = tableDiv.find("tr[data-index=" + index + "]").find(
				"td div.laytable-cell-checkbox div.layui-form-checkbox I");
			if (checkCell.length > 0) {
				checkCell.click();
				$('.belongs').show();
			};
			// 将点击表中的行数据渲染到已拥有权限的框中
			$('.bList ul').empty();
			// 获取选中状态的所有数据，
			let list = layui.table.checkStatus('test').data;
			// console.log(list)
			var lis = '';
			if (list.length !== 0) {
				let roleList = list[0].roleList;
				// 遍历数据,然后append到已拥有权限的框中
				
				for (var i = 0; i < roleList.length; i++) {
					lis += '<li class="firstMenu">' + roleList[i].name + '</li>';
				}
				$('.bList ul').append(lis);
			} else {
				$('.belongs').hide();
			}
		});

		$(document).on("click", "td div.laytable-cell-checkbox div.layui-form-checkbox", function(e) {
			e.stopPropagation();
		});
		
	})
	/**********************修改弹框中的按钮**********************/
	//修改弹框中的确定按钮
	$('.confirm').click(function() {
		var $name = $('.modifyName').val();
		var $des = $('.modifyDes').val();
		var $uid = $('#uid').val();//单行数据中的uid
		var $status = $('.modifyStatus').val();
		var $options= $('#select2').find('option');
		var status= $('.modifyStatus option:selected').val();
		if(status=='true'){
			status=true
		}else{
			status=false;
		}
		let ids =[];
		for(var i=0;i<$options.length;i++){
			ids.push($options[i].id)
		};
		if($name==''){
			$('.tipName').show();
			return;
		};
		if($des==''){
			$('.tipDes').show();
			return;
		};
		$.ajax({
			type: "post",
//				url: "http://192.168.1.122:8080/epark/api/v1/user/update",
			url:'127.0.0.1',
			// async: true,
			dataType: 'json',
			headers: {
				"token": token,
				'Content-Type': "application/json;charset=UTF-8"
			},
			data: JSON.stringify({
				name:$name,
				login:$des,
				uid:$uid,
				rids:ids,
				status:status
			}),
			success: function(res) {
				if(res.status==200){
					$('.mask').hide();
					$('.checkLeft').empty();
					$('.checkRight').empty();
				}else{
					alert(res.message)
				}
			},
			error: function(error) {
				console.log(error)
			}
		});
	});
	// input聚焦后为空提示消失
	$('.modifyName').focus(function(){
		$('.tipName').hide();
	});
	$('.modifyDes').focus(function(){
		$('.tipDes').hide();
	});
	//修改弹框中的取消按钮
	$('.cancel').click(function() {
		// 清空两侧的子元素
		$('#select1').empty();
		$('#select2').empty();
		$('.mask').hide(); //隐藏遮罩
	});

	//以下四个点击事件是左右框的事件
	$('.singleRight').click(function() {
		var $optionLeft = $("#select1 option:selected");
		$('#select2').append($optionLeft);
		$('#select2').children().removeAttr('selected')
	});
	$('.singleLeft').click(function() {
		var $optionRight = $("#select2 option:selected");
		$('#select1').append($optionRight);
		$('#select1').children().removeAttr('selected')
	});
	$('.allRight').click(function() {
		var $optionAllLeft = $("#select1").children();
		$('#select2').append($optionAllLeft)
	});
	$('.allLeft').click(function() {
		var $optionAllRight = $("#select2").children();
		$('#select1').append($optionAllRight)
	})



/**********************点击查询按钮**********************/
	$('.roleSearch').click(function() {
		active = {
			reload: function() {
				let $demoReload = $('#search');
				//表格执行重载
				layui.table.reload('test', {
					headers: {
						"token": token
					},
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						selectStr: $demoReload.val()
					},
					// 清空搜索信息
// 					done: function(res, curr, count) {
// 						$demoReload.val('');
// 					}
				});
			}
		};
		let type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});



/**********************delete按钮**********************/
	//需要重载的DOM标签需要加上data-type="reload"这个属性
	$('.delRole').click(function() {
		let list = layui.table.checkStatus('test').data; //获取当前选择行所有内容
		if (list.length || list.length !== 0) {
			$('#delRole').show(); // 弹框显示
		} else {
			alert('请选择角色')
		};
	});
	//确认删除按钮
	$('.delBtnConfirm').click(function() {
		let list = layui.table.checkStatus('test').data; //
//		console.log(list)
		var strs = [];
		for (var item in list) { //将所有选择项的id放进str中
			let id = list[item].uid;
			strs.push(id);
		};
//		console.log(strs)
		$.ajax({
			type: "post",
//			url: 'http://192.168.1.122:8080/epark/api/v1/user/delete',
			url:'127.0.0.1',
			headers: {
				"token": token,
				'Content-Type': "application/json;charset=UTF-8"
			},
			data: JSON.stringify({
				ids: strs
			}),
			success: function(res) {
				// console.log(res)
				// 成功后表格重载
				if(res.status==200){
					active = {
						reload: function() {
							//表格执行重载
							layui.table.reload('test', {
								headers: {
									"token": token
								},
								//page: {
								//curr: 1 //重新从第 1 页开始
								//},
								done: function() {
									$('#delRole').hide();
								}
							});
						}
					};
					var type = $(this).data('type');
					active[type] ? active[type].call(this) : '';
				}else{
					alert(res.message)
				}
			},
			error: function(error) {
				console.log(error)
			}
		})
	});
	//点击弹框取消按钮
	$('.delBtnConcel').click(function() {
		$('#delRole').hide(); //弹框隐藏
	});
	// 点击弹框的x按钮
	$('.close').click(function() {
		$('#delRole').hide(); //弹框隐藏
	});



/**********************新增角色按钮**********************/
   // 点击新增后弹框出现,input的值为空 
	$('.addRole').click(function() {
		$('.addRoleFrame').show();
		// input框清空
		$('.name').find('input').val('');
		$('.description').find('input').val('');
		$('#firstPass').val('');
		$('#lastPass').val('');
	})
	// input聚焦后为空提示消失
	$('.name input').focus(function(){
		$('.name span').hide();
	});
	$('.description input').focus(function(){
		$('.description span').hide();
	});
	$('.firstPass input').focus(function(){
		$('.firstPass span').hide();
	});
	$('.lastPass input').focus(function(){
		$('.lastPass span').hide();
	});
//	点击新增的确定按钮
	$('.addConfirm').click(function() {
		var roleName = $('.name').find('input').val();
		var roleDes = $('.description').find('input').val();
		var firstpas = $('#firstPass').val();
		var lastpas = $('#lastPass').val();
		if(roleName==''){
			$('.name span').show();
			return;
		};
		if(roleDes==''){
			$('.description span').show();
			return;
		};
		if(firstpas==''){
			$('.firstPass span').show();
			return;
		};
		if(lastpas==''){
			$('.lastPass span').show();
			return;
		};
		if(firstpas!==lastpas){
			alert('两次密码不一致');
			return;
		}
		$.ajax({
			type: "post",
			url: 'http://192.168.1.122:8080/epark/api/v1/user/add',
			headers: {
				"token": token
			},
			data:{
				login:roleName,
				name:roleDes,
				pass:firstpas
			},
			success: function(res) {
				// 成功后表格重载
				if(res.status==200){
					active = {
						reload: function() {
							//表格执行重载
							layui.table.reload('test', {
								headers: {
									"token": token
								},
								page: {
								curr: 1 //重新从第 1 页开始
								},
								done: function() {
									$('.addRoleFrame').hide();
								}
							});
						}
					};
					var type = $(this).data('type');
					active[type] ? active[type].call(this) : '';
				}
				else{
					alert(res.message)
				}
			},
			error: function(error) {
				console.log(error)
			}
		})
	});
	$('.addCancel').click(function() {
		$('.addRoleFrame').hide();
	});

})
