class LOGINS {
	userLogin(userInfo){
		const db = wx.cloud.database()
		return new Promise(function(reslove, reject){
			db.collection('user').where({
				user: userInfo.user,
				password: userInfo.password,
			}).get().then((res)=>{
				reslove(res)
			}).catch((err)=>{
				reject(err)
			})
		})
		
	}
}

export {LOGINS}