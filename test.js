var netease = require('./neteaseMusic');
var config = require('./src/config');


netease.comments(386830).then((data)=> {
    console.log(data)
},(err)=> {
	console.log(err)
})
  