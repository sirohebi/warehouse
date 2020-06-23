// miniprogram/pages/goods/goods.js
import {
	HTTP
} from "../../utils/http.js"
const http = new HTTP()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		goodsList:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let _id = options.id
		this.setData({
			id: _id
		})
		http.getGoods(this.data.id).then((res) => {
				this.setData({
					goodsList: res,
				})
			},
			(err) => {
				console.log(err)
			})
	},
	
	gotoRedact:function(e){
		let id = e.currentTarget.dataset.id
		wx.redirectTo({
			url:"../redact/redact?id=" + id
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

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
