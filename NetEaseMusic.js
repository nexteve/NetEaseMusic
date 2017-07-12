
const Request = require('request');

const config = require('./src/config');

const deepClone = require('./src/util').deepClone;

const aesRsaEncrypt = require('./src/aesRsaEncrypt');

var cookieColl = Request.jar();

var request = Request.defaults({jar: cookieColl});

const md5 = require('md5');

const NetEaseMusic = {};
/**根据id获取专辑
 *  @param {number} id 专辑id
 */
NetEaseMusic.album = (id)=> {
    let option = (0, deepClone)(config.option);
    let method = 'GET';
    Object.assign(option, {
        url: config.origin+'/api/album/'+id,
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**根据歌手id获取专辑
 *  @param {number} id 歌手id
 *  @param {number} offset 分页偏移量
 *  @param {number} limit 返回条数
 */
NetEaseMusic.artistAlbums =  (id,offset,limit)=> {
    let option = (0, deepClone)(config.option);
    let method = 'GET';
    Object.assign(option, {
        url: config.origin+'/api/artist/albums/'+id+'?offset='+(offset||0)+'&limit='+(limit||100),
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,(err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**
 * 根据歌曲id获取歌曲评论
 *  @param {number} id 歌曲id
 */
NetEaseMusic.comments =  (id,offset,limit)=> {
    let option = (0, deepClone)(config.option);
    let method = 'GET';
    Object.assign(option, {
        url: config.origin+'/api/v1/resource/comments/R_SO_4_'+id+'/?rid=R_SO_4_'+id+'&offset='+(offset||0)+'&total=false&limit='+(limit||100),
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,(err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    });
    return promise;
}
/**
 * 每日推荐
 *  @param {number} limit 返回条数
 *  @param {number} offset 分页偏移量
 */
NetEaseMusic.dailyRecommend = (offset,limit)=> {
    let textObj = {
        offset:offset||0,
        total:true,
        limit:limit||20,
        csrf_token:"527d916aef401b0e45626603beedbcc3"
    }

    let setOpt = {
        Text: JSON.stringify(textObj),
        pubKey: "010001",
        nonce: '0CoJUm6Qyw8W8jud',
        modulus: '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
    }
    let passObj = aesRsaEncrypt(setOpt.Text, setOpt.pubKey, setOpt.modulus, setOpt.nonce);

    let option = (0, deepClone)(config.option);
    let method = 'POST';
    Object.assign(option, {
        url: 'http://music.163.com/weapi/v1/discovery/recommend/songs',
        form: {
            params: 'Yvb7Q0P4BfMDo/gdEbGbwJQbxM0f5b2AG3MvkxDSJ6tF+mIWvYUzjGoPzvkuWET/G/ykoMpYi2rr4eDN5WpW4KG3L05R0TSTm5/mRGTx0I8ITYDw2f9jVKr1LD5o4PkgLvvhY9klLgHB4mLpBqn8dmcYWjj885pDm9M4g+G5j5ooJ8fUwDviNvcNOy2vwSzP',
            encSecKey: '471ed0911ca380fa4f65e2fb7a41a7c032811f60a265b7ae87901b86ab0614ef3bc0201599657a5de119d7b79293da8cfce658c1f5330e2649bb8f2fdfaee4d3bf2f37791d787fb79154a0d09cca2adc002ba7fae51372b960178315480e85e0d8141e3ec2caea10ab55cf79270cca1036f67a5fba95985520ee8f4d02e98963'
        },
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,(err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    });
    return promise;
}
/**获取fm
 */
NetEaseMusic.fm = ()=> {
    let option = (0, deepClone)(config.option);
    let method = 'GET';
    Object.assign(option, {
        url: config.origin+'/api/radio/get',
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,(err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    });
    return promise;
}
/**热门歌手
 *  @param {number} limit 返回条数
 *  @param {number} offset 分页偏移量
 */
NetEaseMusic.hotArtist = (offset,limit)=> {
    let option = (0, deepClone)(config.option);
    let method = 'GET';
    Object.assign(option, {
        url: config.origin+'/api/artist/top?offset='+(offset||0)+'&limit='+(limit||100)+'&total=false',
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,(err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    });
    return promise;
}
/**登录
 *  @param {number} phone 手机号
 *  @param {string} password 密码
 *  @param {boolean} rememberLogin 是否记住密码
 */
NetEaseMusic.login =  (phone,password,rememberLogin)=> {
    
    let textObj = {
        phone:phone,
        password:md5(password),
        rememberLogin:rememberLogin,
        csrf_token:"3f053fd8a3aa37f56dd0ec02405e5e99"
    }

    let setOpt = {
        Text: JSON.stringify(textObj),
        pubKey: "010001",
        nonce: '0CoJUm6Qyw8W8jud',
        modulus: '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
    }
    let passObj = aesRsaEncrypt(setOpt.Text, setOpt.pubKey, setOpt.modulus, setOpt.nonce);

    let option = (0, deepClone)(config.option);
    let method = 'POST';
    Object.assign(option, {
        url: 'https://music.163.com/weapi/login/cellphone',
        form: {
            params: passObj.encText,
            encSecKey: passObj.encSecKey
        },
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
		
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**获取用户歌单
 *  @param {number} uid 用户id
 *  @param {number} offset 分页偏移量
 *  @param {number} limit 返回条数
 */
NetEaseMusic.userPlaylists =  (uid,offset,limit)=> {
    var option = (0, deepClone)(config.option);
    var method = 'GET';
    Object.assign(option, {
        url: config.origin+'/api/user/playlist?offset='+(offset||0)+'&limit='+(limit||100)+'&uid='+uid,
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    });
    return promise;
}
/**获取热门歌单
*  @param {number} offset 分页偏移量
*  @param {number} limit 返回条数
*/
NetEaseMusic.topPlaylists =  (offset,limit)=> {
    var option = (0, deepClone)(config.option);
    var method = 'GET';
    Object.assign(option, {
        url: config.origin+'/api/playlist/list?&order=hot&offset='+(offset||0)+'&limit='+(limit||100),
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
           try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**根据id获取歌曲
 *  @param {number} id 歌曲id
 */
NetEaseMusic.song =  (id)=> {
    var option = (0, deepClone)(config.option);
    var method = 'GET';
    Object.assign(option, {
        url: config.origin+'/api/song/detail?ids=%5B'+id+'%5d',
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**搜索
 *  @param {string} name 搜索内容
 *  @param {number} offset 分页偏移量
 *  @param {number} limit 每页条数
 *  @param {number} searchType 类型
 *  1/单曲 10/专辑  100/歌手 1000/歌单 1002/用户 1004/MV 1006/歌词  1009/主播电台
 */
NetEaseMusic.search = (name,offset,limit,searchType)=> {
    var typeArr = [1,10,100,1000,1002,1004,1006,1009];
    var type = searchType || typeArr.indexOf(searchType)<0 ? 1 : searchType;
    var option = (0, deepClone)(config.option);

    var url = config.origin + '/api/search/pc';
    var form = {
        s: name,
        limit: limit||100,
        type: type,
        offset: offset||0
    };
    var method = 'POST';
    Object.assign(option, {
        url: url,
        form: form,
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
};
/**根据id获取歌单
 *  @param {number} id 歌单id
 */
NetEaseMusic.playlists =  (id)=> {
    var option = (0, deepClone)(config.option);
    var method = 'GET';
    Object.assign(option, {
        url: config.origin+'/api/playlist/detail?id='+id,
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
		
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**新碟上架
 *  @param {number} limit 返回条数
 *  @param {number} offset 分页偏移量
 */
NetEaseMusic.newAlbum =  (offset,limit)=> {
    var option = (0, deepClone)(config.option);
    var method = 'GET';
    Object.assign(option, {
        url: config.origin +'/api/album/new?area=ALL&offset=' + (offset||0) + '&total=true&limit=' + (limit||100),
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**根据id获取歌词
 *  @param {number} id 歌单id
 */
NetEaseMusic.lrc =  (id,lv)=> {
    //var lv = arguments.length <= 2 || arguments[2] === undefined ? -1 : arguments[2];
    var option = (0, deepClone)(config.option);
    var method = 'GET';
    Object.assign(option, {
        url: config.origin+'/api/song/lyric?id='+id+'&lv='+lv,
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option, (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**点赞
 *  @param {number} songId 歌曲id
 *  @param {number} commentId 评论id
 */
NetEaseMusic.like =  (songId,commentId)=> {
    let textObj = {
        threadId:'R_SO_4_'+songId,
        commentId:commentId.toString(),
        like:true,
        csrf_token:"0a8e56e270797d6ddfc004b4e5c04317"
    }

    let setOpt = {
        Text: JSON.stringify(textObj),
        pubKey: "010001",
        nonce: '0CoJUm6Qyw8W8jud',
        modulus: '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
    }
    let passObj = aesRsaEncrypt(setOpt.Text, setOpt.pubKey, setOpt.modulus, setOpt.nonce);

    let option = (0, deepClone)(config.option);
    let method = 'POST';
    Object.assign(option, {
        url: 'http://music.163.com/weapi/v1/comment/like',
        form: {
            params: passObj.encText,
            encSecKey: passObj.encSecKey
        },
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**取消点赞
 *  @param {number} songId 歌曲id
 *  @param {number} commentId 评论id
 */
NetEaseMusic.unlike =  (songId,commentId)=> {
    let textObj = {
        threadId:'R_SO_4_'+songId,
        commentId:commentId.toString(),
        like:true,
        csrf_token:"0a8e56e270797d6ddfc004b4e5c04317"
    }

    let setOpt = {
        Text: JSON.stringify(textObj),
        pubKey: "010001",
        nonce: '0CoJUm6Qyw8W8jud',
        modulus: '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
    }
    let passObj = aesRsaEncrypt(setOpt.Text, setOpt.pubKey, setOpt.modulus, setOpt.nonce);

    let option = (0, deepClone)(config.option);
    let method = 'POST';
    Object.assign(option, {
        url: 'http://music.163.com/weapi/v1/comment/unlike',
        form: {
            params: passObj.encText,
            encSecKey: passObj.encSecKey
        },
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**发表评论
 *  @param {number} songId 歌曲id
 *  @param {string} content 评论内容
 */
NetEaseMusic.addComment =  (songId,content)=> {
    let textObj = {
        threadId:'R_SO_4_'+songId,
        content:content,
        csrf_token:"0a8e56e270797d6ddfc004b4e5c04317"
    }

    let setOpt = {
        Text: JSON.stringify(textObj),
        pubKey: "010001",
        nonce: '0CoJUm6Qyw8W8jud',
        modulus: '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
    }
    let passObj = aesRsaEncrypt(setOpt.Text, setOpt.pubKey, setOpt.modulus, setOpt.nonce);

    let option = (0, deepClone)(config.option);
    let method = 'POST';
    Object.assign(option, {
        url: 'http://music.163.com/weapi/resource/comments/add',
        form: {
            params: passObj.encText,
            encSecKey: passObj.encSecKey
        },
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**回复评论
 *  @param {number} songId 歌曲id
 *  @param {number} commentId 评论id
 *  @param {string} content 评论内容
 */
NetEaseMusic.replyComment =  (songId,commentId,content)=> {
    let textObj = {
        threadId:'R_SO_4_'+songId,
        commentId:commentId.toString(),
        content:content,
        csrf_token:"0a8e56e270797d6ddfc004b4e5c04317"
    }

    let setOpt = {
        Text: JSON.stringify(textObj),
        pubKey: "010001",
        nonce: '0CoJUm6Qyw8W8jud',
        modulus: '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
    }
    let passObj = aesRsaEncrypt(setOpt.Text, setOpt.pubKey, setOpt.modulus, setOpt.nonce);

    let option = (0, deepClone)(config.option);
    let method = 'POST';
    Object.assign(option, {
        url: 'http://music.163.com/weapi/v1/resource/comments/reply',
        form: {
            params: passObj.encText,
            encSecKey: passObj.encSecKey
        },
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**删除评论
 *  @param {number} songId 歌曲id
 *  @param {number} commentId 评论id
 */
NetEaseMusic.delComment =  (songId,commentId)=> {
    let textObj = {
        threadId:'R_SO_4_'+songId,
        commentId:commentId.toString(),
        csrf_token:"0a8e56e270797d6ddfc004b4e5c04317"
    }

    let setOpt = {
        Text: JSON.stringify(textObj),
        pubKey: "010001",
        nonce: '0CoJUm6Qyw8W8jud',
        modulus: '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
    }
    let passObj = aesRsaEncrypt(setOpt.Text, setOpt.pubKey, setOpt.modulus, setOpt.nonce);

    let option = (0, deepClone)(config.option);
    let method = 'POST';
    Object.assign(option, {
        url: 'http://music.163.com/weapi/resource/comments/delete',
        form: {
            params: passObj.encText,
            encSecKey: passObj.encSecKey
        },
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**关注用户
 *  @param {number} userId 用户id
 */
NetEaseMusic.follow = (userId)=> {
    let textObj = {
        uid: userId,
        csrf_token:"218bb2bac935e2a4e21ef89b59632c96"
    }

    let setOpt = {
        Text: JSON.stringify(textObj),
        pubKey: "010001",
        nonce: '0CoJUm6Qyw8W8jud',
        modulus: '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
    }
    let passObj = aesRsaEncrypt(setOpt.Text, setOpt.pubKey, setOpt.modulus, setOpt.nonce);

    let option = (0, deepClone)(config.option);
    let method = 'post';
    Object.assign(option, {
        url: `http://music.163.com/weapi/user/follow/${userId}`,
        form: {
            params: passObj.encText,
            encSecKey: passObj.encSecKey
        },
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**取消关注
 *  @param {number} userId 用户id
 */
NetEaseMusic.delFollow =  (userId)=> {
    let textObj = {
        followId:userId,
        csrf_token:"218bb2bac935e2a4e21ef89b59632c96"
    }

    let setOpt = {
        Text: JSON.stringify(textObj),
        pubKey: "010001",
        nonce: '0CoJUm6Qyw8W8jud',
        modulus: '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
    }
    let passObj = aesRsaEncrypt(setOpt.Text, setOpt.pubKey, setOpt.modulus, setOpt.nonce);

    let option = (0, deepClone)(config.option);
    let method = 'POST';
    Object.assign(option, {
        url: 'http://music.163.com/weapi/user/delfollow/'+userId,
        form: {
            params: passObj.encText,
            encSecKey: passObj.encSecKey
        },
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**获取好友动态
 *  @param {number} offset 分页偏移量
 *  @param {number} limit 单页返回条数
 */
NetEaseMusic.getEvent = (offset,limit)=> {
    let textObj = {
        total:true,
        offset:offset||0,
        limit:limit||100,
        csrf_token:"218bb2bac935e2a4e21ef89b59632c96"
    }

    let setOpt = {
        Text: JSON.stringify(textObj),
        pubKey: "010001",
        nonce: '0CoJUm6Qyw8W8jud',
        modulus: '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
    }
    let passObj = aesRsaEncrypt(setOpt.Text, setOpt.pubKey, setOpt.modulus, setOpt.nonce);

    let option = (0, deepClone)(config.option);
    let method = 'POST';
    Object.assign(option, {
        url: 'http://music.163.com/weapi/v1/event/get',
        form: {
            params: passObj.encText,
            encSecKey: passObj.encSecKey
        },
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**获取关注的人
 *  @param {number} id 用户id
 */
NetEaseMusic.getFollows = (id,offset,limit)=> {
    let option = (0, deepClone)(config.option);
    let method = 'GET';
    Object.assign(option, {
        url: config.origin+'/api/user/getfollows/'+id+'?offset ='+ (offset||0) +'&limit='+ (limit||100) +'&order=true',
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}
/**获取粉丝列表
 *  @param {number} userId 用户id
 *  @param {number} limit 请求条数
 *  @param {number} offset 起始标记
 */
NetEaseMusic.getFans = (userId,offset,limit)=> {
    let textObj = {
        limit:limit||100,
        offset:offset||0,
        total:true,
        userId:userId,
        csrf_token:"218bb2bac935e2a4e21ef89b59632c96"
    }

    let setOpt = {
        Text: JSON.stringify(textObj),
        pubKey: "010001",
        nonce: '0CoJUm6Qyw8W8jud',
        modulus: '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
    }
    let passObj = aesRsaEncrypt(setOpt.Text, setOpt.pubKey, setOpt.modulus, setOpt.nonce);

    let option = (0, deepClone)(config.option);
    let method = 'POST';
    Object.assign(option, {
        url: 'http://music.163.com/weapi/user/getfolloweds',
        form: {
            params: passObj.encText,
            encSecKey: passObj.encSecKey
        },
        method: method
    });
    let promise = new Promise((resolve,reject)=> {
        request(option,  (err, res, body)=> {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    })
    return promise;
}

module.exports = NetEaseMusic;
