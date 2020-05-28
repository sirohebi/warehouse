// miniprogram/pages/addGoods/addGoods.js
var getDate = require("../../utils/get_date.js")
const tips = {
	goodsname:'商品名称不可为空',
	imgUrl:"商品图片不可为空",
	goods_buy_price:"商品购入价格不可为空",
	channel_sales:"商品来源渠道不可为空",
	goods_sale_price:"商品售出价格不可为空",
	goods_size:"商品规格不可为空",
	goods_unit:"商品单位不可为空"
}
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgUrl:"",
		input_value:"",
		checked:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	
	onGoodsAdd:function(event){
		let temp = event.detail.value
		let imgUrl = this.data.imgUrl
		const db = wx.cloud.database()
		temp.imgUrl = imgUrl
		let judge = false
		for(let i in temp){
			if(temp[i] == ""){
				this._show_error(i)
				judge = false
				break
			}else{
				judge = true
			}
		}
		if(judge){
			db.collection('goods').add({
				data:{
					goodsname: temp.goodsname,
					imgUrl: temp.imgUrl,
					goods_buy_price: temp.goods_buy_price,
					channel_sales: temp.channel_sales,
					goods_sale_price: temp.goods_sale_price,
					goods_size: temp.goods_size,
					goods_unit: temp.goods_unit
				}
			}).then((res)=>{
				if(res.errMsg == "collection.add:ok"){
					this.setData({
						input_value:"",
						checked:false
					})
					wx.showToast({
						title:"商品添加成功",
						duration:2000
					})
				}
			}).catch((err)=>{
				console.error(err)
			})
		}
	},
	
	onGoodsImgFile:function(event){
		let fileUrl = event.detail.current[0].url
		let date = getDate.formatTime(new Date())
		wx.cloud.uploadFile({
			cloudPath:date + ".png",
			filePath:fileUrl
		}).then((res)=>{
			this.setData({
				imgUrl:res.fileID
			})
		}).catch((err)=>{
			
		})
	},
	
	_show_error:function(error){
		wx.showToast({
			title:tips[error],
			icon:"none",
			duration:2000
		})
	}
})