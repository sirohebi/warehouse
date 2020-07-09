//获取商品数据
class HTTP{
	getGoods(id){
		return new Promise(function(reslove, reject){
			const db = wx.cloud.database()
			db.collection('goods').where({_id:id}).get().then((res)=>{
				reslove(res.data)
			}).catch((err)=>{
				reject(err)
			})
		})
	}
}

export {HTTP}