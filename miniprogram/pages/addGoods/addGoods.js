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
		checked:false,
		clear: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	
	//添加商品的详细内容
	onGoodsAdd:function(event){
		//先取得input框里的数据并置入一个对象中
		let temp = event.detail.value
		let imgUrl = this.data.imgUrl
		const db = wx.cloud.database()
		temp.imgUrl = imgUrl
		let judge = false
		//for循环判断对象内的数据是否有空值
		for(let i in temp){
			//数据为空时的具体错误代码并输出到页面显示出来
			if(temp[i] == ""){
				this._show_error(i)
				judge = false
				break
			}else{
				judge = true
			}
		}
		//当对象内的数据不存在空值时通过云数据库函数添加商品
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
				//当添加商品成功以后把input和图片置空
				if(res.errMsg == "collection.add:ok"){
					this.setData({
						input_value:"",
						checked:false,
						clear: true
					})
					wx.showToast({
						title:"商品添加成功",
						duration:2000
					})
				}
				//置空成功2秒以后把图片的置空按钮恢复成false的状态方便下一个商品添加使用
				setTimeout(function(){
					this.setData({
						clear: false
					})
				},2000)
			}).catch((err)=>{
				console.error(err)
			})
		}
	},
	
	//上传商品图片并且设置时间为文件名
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
	
	//数据为空时的错位代码
	_show_error:function(error){
		wx.showToast({
			title:tips[error],
			icon:"none",
			duration:2000
		})
	}
})