$(() => {
	function addmsg() {
		var username = $("input[name='username']").val();
		var password = $("input[name='password']").val();
		var span1 = $(".span1");
		var span2 = $(".span2");
		if(!username || username == "") {
			span1.html("*请输入账号！");
			setTimeout(function() {
				span1.html("");
			}, 2000);
			return;
		};
		if(!password || password == "") {
			span2.html("*请输入密码！");
			setTimeout(function() {
				span2.html("");
			}, 2000);
			return;
		};
	    $.ajax({
	        type: 'post',
	        url: 'http://192.168.1.122:8080/epark/api/v1/login',//请求数据的地址
	        dataType: "json",
	        data:{
				'username': username,
				'password': password
		    },
//		    beforeSend: function() {
//				var params = arguments[1].data;
//				var data = '';
//				for(var key in params) {
//					//进行 base64 编码
//					var result = Base64.encode(params[key]);
//					data = data.concat('&' + key + '=' + result);
//				};
//				arguments[1].data = data.substring(1, data.length); //将序列化后的参数重写
//			},
//			processData: false,
	        success: function (res) {
	        	console.log(res)
	        	if(res.status == 200) {
					var token = res.data.token;
					window.localStorage.token = token;
					var list= [];
					list.push(JSON.stringify(res.data.menuList));
					window.localStorage.list = list;
//					console.log(list)
//					console.log(window.localStorage.list);
					$(location).attr('href', '../index.html');
				} else {
					alert(res.message)
				}
	        },
	        error: function (errorMsg) {
	            //请求失败时执行该函数
	            console.log(errorMsg)
	        }
	    });
	};
	$(".btn").click(function() {
		addmsg();
	});
	$("input[name='password']").bind('keypress', function(event) {
		if(event.keyCode == 13) {
			addmsg();
		}
	});
});