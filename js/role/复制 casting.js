$(function(){
	layui.use('table', function(){
  var table = layui.table;
  
  table.render({
    elem: '#test',
    url:'../json/list.json',
    toolbar: '#toolbarDemo',
    even:true,
    width:800,
	height:760,
	title: '用户数据表',
    totalRow: true,
    cols: [[ //表头
          {type: 'checkbox', fixed: 'left'},
//	      {field: 'id', title: 'ID',width:0 },
	      {field: 'username', title: '用户昵称'},
	      {field: 'sex', title: 'Email/账号'},
	      {field: 'city', title: '状态'},
	      {field: 'sign', title: '拥有的角色'},
	      {fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
    ]],
    page: true,
  });
//table.reload('#test', {
//  where: {
//     
// },
//page: {
//  curr: 1 //重新从第 1 页开始
//}
//});
  
  //工具栏事件
  table.on('toolbar(test)', function(obj){
    var checkStatus = table.checkStatus('obj.config.id');
//  var checkStatus = table.checkStatus('idTest');
    switch(obj.event){
	      case 'getCheckData':
	        var data = checkStatus.data;  //获取选中行数据
	        layer.alert(JSON.stringify(data));
	      break;
     };
//  switch(obj.event){
//    case 'getCheckData':
//      var data = checkStatus.data;
//      layer.alert(JSON.stringify(data));
//    break;
//    case 'getCheckLength':
//      var data = checkStatus.data;
//      layer.msg('选中了：'+ data.length + ' 个');
//    break;
//    case 'isAll':
//      layer.msg(checkStatus.isAll ? '全选': '未全选')
//    break;
//  };
	console.log(obj)
  });
   //监听行工具事件
  table.on('tool(test)', function(obj){
    var data = obj.data;
    //console.log(obj)
    if(obj.event === 'del'){
      layer.confirm('真的删除行么', function(index){
        obj.del();
        layer.close(index);
      });
    } else if(obj.event === 'edit'){
      layer.prompt({
        formType: 2,
        value: data.email
      }, function(value, index){
//      obj.update({
//        email: value
//      });
        layer.close(index);
      });
    }
    })
});
})
