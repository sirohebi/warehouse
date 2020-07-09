// miniprogram/pages/login/login.js
import {LOGINS} from '../../utils/logins.js'
const logins = new LOGINS()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},
	
	//登陆用户的校验和登陆
	onUserLogin: function(e) {
		let user = e.detail.value.user
		let password = e.detail.value.password
		let userInfo = {
			user: user,
			password: password
		}
		logins.userLogin(userInfo).then((res)=>{
			if(res.data[0]){
				wx.navigateTo({
					url:'/pages/index/index'
				})
			}else{
				wx.showToast({
					title: '你输入得账号或密码不正确……',
					icon: 'none',
					duration: 2000
				})
			}
		},(err)=>{
			console.error(err)
		})
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
