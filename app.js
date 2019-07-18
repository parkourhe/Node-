var http =require('http')

var fs =require('fs')

var url =require('url')

var template = require('art-template')

//通过node.js可以轻松控制服务器的公共资源和私有资源
// createServer的函数默认绑定request事件

var comments = [
	{
		name:'小明',
		message:'你好啊aasdasdasdsa',
		dateTime:'2019/12/12'
	},
	{
		name:'小明',
		message:'你好啊aasdasdasdsa',
		dateTime:'2019/12/12'
	},
	{
		name:'小明',
		message:'你好啊aasdasdasdsa',
		dateTime:'2019/12/12'
	},
	{
		name:'小明',
		message:'你好啊aasdasdasdsa',
		dateTime:'2019/12/12'
	}


]



http
	.createServer(function (req,rep) {
		var serach  =url.parse(req.url,true).query
		var pathName=url.parse(req.url,true).pathname
		if (pathName==='/') {
			fs.readFile('./view/index.html',function(err,data){
				if (err) {
					console.log('文件读取失败')
				}

				var html  = template.render(data.toString(),{
					comments:comments
				})

				rep.end(html)
				

			}) 

		}else if (pathName==='/pinglun') {
			
			// rep.end(JSON.stringify(serach))
			comment=serach;

			comment.dateTime='2019-10-10'

			

			comments.unshift(comment)

			console.log(comments);
			rep.statusCode=302

			rep.setHeader('Location','/')

			rep.end()


		}
		else if (pathName==='/post') {
			
			readFile('/view/post.html',rep)

		} 
		else if (pathName.indexOf('/public/')===0) {
			
			readFile(pathName,rep)

		}else{
			
			readFile('/view/404.html',rep)
		}
})
	.listen('3000',function(){
		console.log('服务器启动完成')

		})



function readFile(path,end){
	fs.readFile('.'+path,function(err,data){
				if (err) {
					console.log('文件读取失败');
				}
				end.end(data);

	})
}