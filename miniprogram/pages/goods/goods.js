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
	//进入商品详情时的数据加载请求
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
	
	//前往商品的编辑页面
	gotoRedact:function(e){
		let id = e.currentTarget.dataset.id
		wx.redirectTo({
			url:"../redact/redact?id=" + id
		})
	},
	
	//商品的删除功能
	gotoDelete:function(e){
		let id = e.currentTarget.dataset.id
		const db = wx.cloud.database()
		//删除时的确认提示
		wx.showModal({
			title: '提示',
			content: '是否确定删除该商品',
			success(res){
				if(res.confirm){
					db.collection('goods').doc(id).remove().then((res)=>{
						wx.showToast({
							title: '商品删除成功',
							icon: 'none',
							duration: 2500
						})
						wx.navigateBack({
							delta:1
						})
					}).catch((err)=>{
						
					})
				}
			}
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
