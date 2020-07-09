// miniprogram/pages/index/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		goodsList: [],
		searchShow: true,
		searchInput: "",
		searchList: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	//主页的数据加载
	onLoad: function(options) {
		const db = wx.cloud.database()
		db.collection('goods').where({}).get({}).then((res) => {
			this.setData({
				goodsList: res.data
			})
		}).catch((err) => {
			console.error(err)
		})
	},

	//前往添加商品的页面功能
	onAddGoodsGoTo: function(e) {
		wx.navigateTo({
			url: "../addGoods/addGoods"
		})
	},
	
	//点击变更搜索页面的显隐
	onSearchShow: function(e) {
		this.setData({
			searchShow: false,
			searchInput: ""
		})
	},

	//点击退出搜索页面并把搜索的数据置空
	exitSearch: function(e) {
		this.setData({
			searchShow: !this.data.searchShow,
			searchInput: "",
			searchList: []
		})
	},
	
	//加载搜索的数据
	getSearch: function(e) {
		let searchText = e.detail.value
		const db = wx.cloud.database()
		db.collection('goods').where({
			goodsname: db.RegExp({
				regexp: searchText,
				options: "i",
			})
		}).get({}).then((res) => {
			this.setData({
				searchList: res.data
			})
		}).catch((err) => {
			console.error(err)
		})
	},
	
	//前往商品的详情页面
	onGoodsGoTo: function(e) {
		let id = e.currentTarget.dataset.id
		wx.navigateTo({
			url:'/pages/goods/goods?id=' + id
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
		this.onLoad()
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
