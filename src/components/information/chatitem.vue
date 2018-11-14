<template>
	<div class="information-system-dl">
		<dl @click="chats(message.user_id)">
			<dt class="visit">
				<img :src="message.avatarUrl" mode="widthFix">
			</dt>
			<dd>
				<h6>{{message.nick_name}}</h6>
				<p>{{message.updated_at}}</p>
			</dd>
		</dl>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'chat-item',
	props: {
		itemid:{
			type:String,
			default:''
		}
	},
	data () {
		return {
			message:'',
			id:''
		}
	},
	onLoad(option) {
			this.id  = wx.getStorageSync('token').user_id
			this.userlist()

	},
	methods: {
		chats(id) {
			wx.navigateTo({
				url: '/pages/Information/chat/main?id='+ id,
			})
		},
		userlist() {
			var _this = this;
			wx.showLoading({
				title: '玩命加载中',
			})
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/userinfo/${this.itemid}`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				},
			}).then(d=>{
				wx.hideLoading ();
				this.message = d.data
			})


		},
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
.information-system-dl{
	dl{
		padding:20px;
		border-bottom:1px solid #eee;
		display:flex;
		background:#fff;
		dt{
			width:50px;
			height:50px;
			margin-right:10px;
			border-radius:5px;
			text-align:center;
			line-height:50px;
			image{
				width:100%;
				display:block;
				border-radius:5px;
				overflow:hidden;
			}
		}
		dd{
			flex:1;
			h6{
				font-size:@fontt16;
				span{
					float:right;
					color:@fontcolor;
					font-size:@fonttwo;
				}
			}
			p{
				font-size:@fonttwo;
				color:@fontcolor;
				margin-top:3px;
				display:flex;
			}
		}
	}
}
</style>
