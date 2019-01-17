$(()=>{
	let token = window.localStorage.token;
	$(function() {
	//var str = [];
	var mymap = L.map('map').setView([30.1930566293, 120.2615604164], 14);

	L.tileLayer(
		'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
				'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(mymap);

	//获取地点任务信息
	 $.ajax({
		
	 });
	//获取图标的信息
	$.ajax({
		type: 'get',
		url: '../json/tubiao.json', //请求数据的地址
		headers: {
			"token": token
		},
		dataType: "json", //返回数据形式为json
//		beforeSend: function(request) {
//               request.setRequestHeader("Authorization", token);
//          },//返回数据形式为json
		success: function(res) {
//			console.log(res);
			var str = res.data;
			for (var i = 0; i < str.length; i++) {
				//正常图标
				if (str[i].status == 0) {
					var mySafe = L.icon({
						iconUrl: '../img/map/safe.png',
						iconSize: 		[35, 40],
						iconAnchor:	  [22, 94],
						popupAnchor:  [-3, -76],
//						shadowUrl: '../img/map/safe.png',
//						shadowSize: 	[20, 1],
//						shadowAnchor: [8, 54]
					});
					var marker = L.marker([str[i].lat, str[i].long], {icon: mySafe}).addTo(mymap);
					marker.bindPopup( //坐标提示框内容
					'<div style="width:215px;height:80px;background:#0DD569"><div class="add-1 add-2"><span>'
						+str[i].worker+'</span></div><div class="add-1 add-3"><span style="height:40px">'
						+'内容'+'</span><span>'
						+str[i].text+'</span></div></div></div>'
						)
					.openPopup();
// 					marker.on('mouseover', function (e) {       
// 							this.openPopup();

				} else {
					//警告图标
					var myWarning = L.icon({
						iconUrl: '../img/map/wrong.png',
						iconSize: 		[35, 40],
						iconAnchor:   [22, 94],
						popupAnchor:  [-3, -76],
						className:'wrong',
//						shadowUrl: '../img/map/wrong.png',
//						shadowSize: 	[20, 1],
//						shadowAnchor: [8, 54]
					});
					var marker = L.marker([str[i].lat, str[i].long], {icon: myWarning}).addTo(mymap);
					marker.bindPopup(
						'<div class="add"><div class="add-1 add-2"><span>'
						+'地址'+'</span><span>'
						+str[i].adress+'</span></div><div class="add-1 add-3"><span>'
						+'内容'+'</span><span  class="txt">'
						+str[i].text+'</span></div><div class="add-1 add-4"><span>'
						+'维护'+'</span><span><select class="selects" name="" id=""><option selected>'
						+ str[i].worker +'</option><option value="1">'
						+'陈大林'+'</option><option value="2">'
						+'陈小华'+'</option><option value="3">'
						+'陈大华'+'</option></select><button class="add-btn">'
						+'派 送'+'</button></span></div></div>'
					)
					.openPopup();	
				}
			}
		},
		error: function(errorMsg) {

		}
	});

	// 获取右侧维护人员信息
	$.ajax({
		type: 'get',
		url: '../json/worker.json', //请求数据的地址
		dataType: "json", //返回数据形式为json
		headers: {
			"token": token
		},
//		beforeSend: function(request) {
//               request.setRequestHeader("Authorization", token);
//          },//返回数据形式为json
		success: function(response) {
			// console.log(res);
			$('.online').html(response.online);
			$('.total').html(response.count);
			for (var i = 0; i < response.data.length; i++) {
				// console.log(response.data[i]);
				var res = response.data[i];
				if (res.status == 0) {
					res["state"] = "离线";
					tr = '<div class="offline_name"><i class="offline_yuan"></i>' + res.name + '<span>' + res.state +
						'</span></div><div class="online_phone"><p>' + res.number + '</p><span>' + res.group + '</span></div>'
					$("#offline").append('<li>' + tr + '</li>')
				};
				if (res.status == 1) {
					res["state"] = "在线 ";
					tr = '<div class="online_name"><i class="online_yuan"></i>' + res.name + '<span>' + res.state +
						'</span></div><div class="online_phone"><p>' + res.number + '</p><span>' + res.group + '</span></div>'
					$("#online").append('<li>' + tr + '</li>')
				}
			}
			// console.log(response.data)
		},
		error: function() {},
	})
})
});


// leaflet-marker-icon leaflet-zoom-animated leaflet-interactive
// leaflet-marker-icon leaflet-zoom-animated leaflet-interactive
// leaflet-marker-icon leaflet-zoom-animated leaflet-interactive
// leaflet-marker-icon leaflet-zoom-animated leaflet-interactive
