// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {

	const dbResult = await db.collection('goods').where({_id: event.id}).update({
		data: {
			goods_buy_price: event.goods_buy_price,
			goods_sale_price: event.goods_sale_price,
			channel_sales: event.channel_sales
		}
	})
return {
	dbResult
}
}