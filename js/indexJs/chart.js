$(function(){
	let token = window.localStorage.token;
//	默认的年份未当前年
	var myDate = new Date();
	var myYear = myDate.getFullYear();
	let option = $('.layui-form-item').find('option');
	$.each(option, function(index,item) {
		if(item.innerText==myYear){
			$(this).attr("selected","selected")
		}else{
			$(this).removeAttr("selected")
		}
	});
	// 点击搜索按钮后的事件
	$('.search').click(function(){
         layui.use('table', function(){
				  var table = layui.table;
				  //第一个实例
				  table.render({
					    elem: '#demo',
					    even:true,
					    width:600,
						height:760,
					    url: '../json/list.json', //数据接口
					    headers: {
							"token": token
						},
						where:{"year":$('.layui-form-item').val()},
					    page: {
		                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip','year'] //自定义分页布局
	                      },
					    cols: [[ //表头
					      {field: 'id', title: 'ID' ,},
					      {field: 'username', title: '用户名'},
					      {field: 'sex', title: '性别'},
					      {field: 'city', title: '城市'},
					      {field: 'sign', title: '签名'},
					    ]],
					    done:function(res,curr,count){
					    	$('th').css({
					    		'background-color': '#5C6F8D','color':'#fff'
					    	})
					    }
				  });
	    });
	});
	$('.search').trigger("click");
//饼图
	function loadOneColumn() {
	    var myChart = echarts.init($('#firstPieChart')[0]);
	    // 显示标题，图例和空的坐标轴
	    myChart.setOption({
	    	   title : {  
	                text: '2018年工单数据统计图',   
	                x:'center',
	                top:10,
	                textStyle:{
	                    color:'#c0c0c0',
	                    fontSize:25
	                }
	            },  
	        color: ['#ff7d27', '#47b73d', '#fcc36e', '#57a2fd'],//饼图颜    
	        tooltip: {
	            trigger: 'item',
	            formatter: "{a} <br/>{b} : {c} ({d}%)"
	        },
					legend: {
	//	        orient : 'horizonal',
	//	        x : 'left',
			        top: 16,
			        right: '40',
		          data:[]
		      },
	        toolbox: {
	            show: false,
	            feature: {
	                mark: { show: true},
	                dataView: { show: true, readOnly: false },
	                restore: { show: true },
	                saveAsImage: { show: true },
	            }
	        },         
	        series: [{
	            name: '工单数据',
	            type: 'pie',
	            radius: '55%',
	            center: ['50%', '60%'],            
	            data: []
	        }]        
	    });
	    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
	    var names = [];    //类别数组（用于存放饼图的类别）
	    var brower = [];
	    $.ajax({
	        type: 'get',
	        url: '../json/chart.json',//请求数据的地址
	        headers: {
				"token": token
			},
	        dataType: "json",        //返回数据形式为json
	        success: function (result) {
	            //请求成功时执行该函数内容，result即为服务器返回的json对象
	            $.each(result.list, function (index, item) {
	                names.push(item.department);    //挨个取出类别并填入类别数组 
	                brower.push({
	                    name: item.department,
	                    value: item.num
	                });
	            });
	            myChart.hideLoading();    //隐藏加载动画
	            myChart.setOption({        //加载数据图表                
	                series: [{                    
	                    data: brower
	                }],
	                legend: {
					          data:names
		              },
	            });
	        },
	        error: function (errorMsg) {
	            //请求失败时执行该函数
	            alert("图表请求数据失败!");
	            myChart.hideLoading();
	        }
	    });
	};
	loadOneColumn();

	//折线图
	function brokenLine(){
		var myChart_line = echarts.init($('.chart_line')[0]);
		myChart_line.setOption({
		        title: {
		            text: '2018年月工单统计图',
		            x:'center',
				        top:10,
				        textStyle:{
				            color:'#c0c0c0',
				            fontSize:25
				        }
		        },
		        color: ['#ff7d27', '#47b73d', '#fcc36e', '#57a2fd'],
		        tooltip: {
		            trigger: 'axis'
		        },
		        legend: {
		        	top: 16,
				    right: '60',
		            data: ['A单', 'B单','C单','D单']
		        },
		        toolbox: {
		            show: false,
		            feature: {
		                mark: { show: true },
		                dataView: { show: true, readOnly: false },
		                magicType: { show: true, type: ['line', 'bar'] },
		                restore: { show: true },
		                saveAsImage: { show: true }
		            }
		        },
		        calculable: true,
		        xAxis: {
		            type: 'category',
		//          boundaryGap: false, //取消左侧的间距
		            data: []
		        },
		        yAxis: {
		            type: 'value',
		//          splitLine: { show: false },//去除网格线
		            name: ''
		        },
		        series: [{
		            name: 'A单',
		            type: 'line',
		            symbol: 'emptydiamond',
		            data: []
		        },
		        {
		            name: 'B单',
		            type: 'line',
		            symbol: 'emptydiamond',
		            data: []
		        },
		        {
		            name: 'C单',
		            type: 'line',
		            symbol: 'emptydiamond',
		            data: []
		        },
		        {
		            name: 'D单',
		            type: 'line',
		            symbol: 'emptydiamond',
		            data: []
		        }
		        ]
		    });
		    myChart_line.showLoading();    //数据加载完之前先显示一段简单的loading动画
		    var names = [];    //类别数组（实际用来盛放X轴坐标值）    
		    var series1 = [];
		    var series2 = [];
		    var series3 = [];
		    var series4 = [];
		    $.ajax({
		        type: 'get',
		        url: '../json/zhexian.json',//请求数据的地址
		        headers: {
					"token": token
				},
		        dataType: "json",        //返回数据形式为json
		        success: function (result) {
		            //请求成功时执行该函数内容，result即为服务器返回的json对象           
		            $.each(result.first, function (index, item) {
		                names.push(item.name);    //挨个取出类别并填入类别数组
		                series1.push(item.value);
		            });
		            $.each(result.second, function (index, item) {
		                series2.push(item.value);
		            });
		            $.each(result.third, function (index, item) {
		                series3.push(item.value);
		            });
		            $.each(result.fourth, function (index, item) {
		                series4.push(item.value);
		            });
		            myChart_line.hideLoading();    //隐藏加载动画
		            myChart_line.setOption({        //加载数据图表
		                xAxis: {
		                    data: names, 
		                },
		                series: [{                    
		                    data: series1
		                },
		                {
		                    data: series2
		                },
		                {
		                    data: series3
		                },
		                {
		                    data: series4
		                },
		                ]
		            });
		        },
		        error: function (errorMsg) {
		            //请求失败时执行该函数
		            console.log(errorMsg)
		            alert("图表请求数据失败!");
		            myChart_line.hideLoading();
		        }
		    });
		};
	   brokenLine();
  })