# netease-cloud-music
<p align="left">
    <a href="https://www.npmjs.com/package/netease-cloud-music"><img src="https://img.shields.io/npm/v/netease-cloud-music.svg" alt="Version"></a>
    <a href="https://www.npmjs.com/package/netease-cloud-music"><img src="https://img.shields.io/npm/l/netease-cloud-music.svg" alt="License"></a>
</p>

# install
``` 
npm install netease-cloud-music
``` 

# useage
``` javascript
var neteaseMusic = require('netease-cloud-music')

neteaseMusic.comments(386830).then((data)=> {
    	console.log(data)
	},(err)=> {
		console.log(err)
})
``` 
# default
```javascript
 @param {number} offset 分页偏移量
 @param {number} limit 每页条数(最大100)
 这两个参数默认值为{offset:0,limit:100}
 未传时使用默认值
```
# api
### search 搜索
``` javascript
/**搜索
 *  @param {string} name 搜索内容
 *  @param {number} offset 分页偏移量
 *  @param {number} limit 每页条数
 *  @param {number} searchType 类型
 * 1/单曲 10/专辑 100/歌手 1000/歌单 1002/用户 1004/MV 1006/歌词 1009/主播电台
 */
neteaseMusic.search(name,offset,limit,searchType)
```
### topPlaylists 热门歌单
``` javascript
/**获取热门歌单
*  @param {number} offset 分页偏移量
*  @param {number} limit 返回条数
*/
neteaseMusic.topPlaylists(offset,limit)
```
### userPlaylists 用户歌单
``` javascript
/**获取用户歌单
 *  @param {number} uid 用户id
 *  @param {number} offset 分页偏移量
 *  @param {number} limit 返回条数
 */
neteaseMusic.userPlaylists(uid,offset,limit)
```
### fm 私人FM
``` javascript
neteaseMusic.fm()
```
### playlists 根据id获取歌单
``` javascript
/**根据id获取歌单
 *  @param {number} id 歌单id
 */
neteaseMusic.playlists(id)
```
### artistAlbums 根据歌手id专辑
``` javascript
/**根据歌手id获取专辑
 *  @param {number} id 歌手id
 *  @param {number} offset 分页偏移量
 *  @param {number} limit 返回条数
 */
neteaseMusic.artistAlbums(id,offset,limit)
```
### album 根据id获取专辑
``` javascript
/**根据id获取专辑
 *  @param {number} id 专辑id
 */
neteaseMusic.album(id)
```
### lrc 根据id获取歌词
``` javascript
/**根据id获取歌词
 *  @param {number} id 歌曲id
 */
neteaseMusic.lrc(id)
```
### song 根据id获取歌曲信息
``` javascript
/**根据id获取歌曲信息
 *  @param {number} id 歌曲id
 */
neteaseMusic.song(id)
```
### login 用户登陆
``` javascript
/**登录
 *  @param {number} phone 手机号
 *  @param {string} password 密码
 *  @param {boolean} rememberLogin 是否记住密码
 */
neteaseMusic.login(phone,password,rememberLogin)
```
### newAlbum 新碟上架
``` javascript
/**新碟上架
 *  @param {number} limit 返回条数
 *  @param {number} offset 分页偏移量
 */
neteaseMusic.newAlbum(offset,limit)
```
### hotArtist 热门歌手
``` javascript
/**热门歌手
 *  @param {number} limit 返回条数
 *  @param {number} offset 分页偏移量
 */
neteaseMusic.hotArtist(offset,limit)
```
### comments 评论
``` javascript
/**
 * 根据歌曲id获取歌曲评论
 *  @param {number} id 歌曲id
 *  @param {number} limit 返回条数
 *  @param {number} offset 分页偏移量
 */
neteaseMusic.comments(id,offset,limit)
```
### getFans 获取粉丝列表
``` javascript
/**获取粉丝列表
 *  @param {number} uid 用户id
 *  @param {number} limit 请求条数
 *  @param {number} offset 起始标记
 */
neteaseMusic.getFans(uid,offset,limit)
```
### getFollows 获取关注的人
``` javascript
/**获取关注的人
 *  @param {number} uid 用户id
 *  @param {number} limit 请求条数
 *  @param {number} offset 分页偏移量
 */
neteaseMusic.getFollows(uid,offset,limit)
```
### getEvent 获取好友动态
``` javascript
/**获取好友动态
 *  @param {number} offset 分页偏移量
 *  @param {number} limit 单页返回条数
 */
neteaseMusic.getEvent(offset,limit)
```
### follow 关注用户
``` javascript
/**关注用户
 *  @param {number} uid 用户id
 */
neteaseMusic.follow(uid)
```
### delFollow 取消关注
``` javascript
/**取消关注
 *  @param {number} uid 用户id
 */
neteaseMusic.delFollow(uid)
```
### addComment 发表评论
``` javascript
/**发表评论
 *  @param {number} songId 歌曲id
 *  @param {string} content 评论内容
 */
neteaseMusic.addComment(songId,content)
```
### replyComment 回复评论
``` javascript
/**回复评论
 *  @param {number} songId 歌曲id
 *  @param {number} commentId 评论id
 *  @param {string} content 评论内容
 */
neteaseMusic.replyComment(songId,commentId,content)
```
### delComment 删除评论
``` javascript
/**删除评论
 *  @param {number} songId 歌曲id
 *  @param {number} commentId 评论id
 */
neteaseMusic.delComment(songId,commentId)
```
### like 点赞
``` javascript
/**点赞
 *  @param {number} songId 歌曲id
 *  @param {number} commentId 评论id
 */
neteaseMusic.like(songId,commentId)
```
### unlike 取消点赞
``` javascript
/**取消点赞
 *  @param {number} songId 歌曲id
 *  @param {number} commentId 评论id
 */
neteaseMusic.unlike(songId,commentId)
```
### dailyRecommend 每日推荐
``` javascript
/**
 * 每日推荐
 *  @param {number} limit 返回条数
 *  @param {number} offset 分页偏移量
 */
neteaseMusic.dailyRecommend(offset,limit)
```
# thanks

https://github.com/Himmas/NeteaseMusicApi
