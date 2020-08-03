// miniprogram/pages/userReg/userReg.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		nullValue: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	userReg: function(e){
		let userInfo = e.detail.value
		wx.showLoading()
		if(userInfo.userPassword == userInfo.again_password){
			if(userInfo.invite_code == 'bhcsxgyy'){
				const db = wx.cloud.database()
				db.collection('user').add({
					data:{
						user: userInfo.name,
						password: userInfo.userPassword
					}
				}).then(res=>{
					if(res._id){
						wx.hideLoading()
						wx.showToast({
							title: '注册成功',
							duration: 2000
						})
						this.setData({
							nullValue: '',
						})
					}else{
						wx.hideLoading()
						wx.showToast({
							title: '注册失败,请联系管理员……',
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(err =>{
					console.log(err)
				})
			}else{
				wx.showToast({
					title: '您输入的邀请码不正确，请联系管理员……',
					icon: 'none',
					duration: 2000
				})
			}
		}else{
			wx.showToast({
				title: '您输入的两次密码不相符，请检查……',
				icon: 'none',
				duration: 2000
			})
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})