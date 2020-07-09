// miniprogram/pages/redact/redact.js
import {
	HTTP
} from "../../utils/http.js"
const http = new HTTP()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		goodsList: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let id = options.id
		http.getGoods(id).then((res) => {
			this.setData({
				goodsList: res,
			})
		},
			(err) => {
				console.log(err)
			})
	},
	
	//商品修改功能
	onUpdateGoods: function (e) {
		wx.showLoading({
			title:"正在修改,请稍等……"
		})
		let goods_buy_price = e.detail.value.goods_buy_price
		let goods_sale_price = e.detail.value.goods_sale_price
		let channel_sales = e.detail.value.channel_sales
		let id = e.currentTarget.dataset.id
		wx.cloud.callFunction({
			name:'updategoods',
			data:{
				id: id,
				goods_buy_price: goods_buy_price,
				goods_sale_price: goods_sale_price,
				channel_sales: channel_sales
			}
		}).then((res)=>{
			if(res.result.dbResult.stats.updated == 1){
				wx.showToast({
					title:'修改成功',
					duration:2000
				})
				setTimeout(function(){
					wx.navigateBack({
						delta:1
					})
				},2000)
				wx.hideLoading()
			}
		}).catch((err)=>{
			console.error(err)
		})
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