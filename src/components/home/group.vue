<template>
	<div class="group-component">
		<div class="default" @click="group('collection')">
			<h5>我的收藏</h5>
			<dl >
				<dt>
					<img :src="list[0].card.img_url" class="img" mode="widthFix" v-if="list[0] && list[0].card">
				</dt>
				<dd >
					<img :src="list[1].card.img_url" class="img" mode="widthFix" v-if="list[1] && list[1].card">
					<view class="img" mode="widthFix" v-else-if="!list[1]"></view>
					<img :src="list[2].card.img_url" class="img" mode="widthFix" v-if="list[2] && list[2].card">
					<view class="img" mode="widthFix" v-else-if="!list[2]"></view>
					<img :src="list[3].card.img_url" class="img" mode="widthFix" v-if="list[3] && list[3].card">
					<view class="img" mode="widthFix" v-else-if="!list[3]"></view>
					<img :src="list[4].card.img_url" class="img" mode="widthFix" v-if="list[4] && list[4].card">
					<view class="img" mode="widthFix" v-else-if="!list[4]"></view>
				</dd>


			</dl>
			<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
		</div>

		<div class="default"  @click="group('default')">
			<h5>默认分组</h5>
			<dl>
				<dt>
					<img :src="friend[0].card.img_url" class="img" mode="widthFix" v-if="friend[0] && friend[0].card">
				</dt>
				<dd >
					<img :src="friend[1].card.img_url" class="img" mode="widthFix" v-if="friend[1] && friend[1].card">
					<view class="img" mode="widthFix" v-else-if="!friend[1]"></view>
					<img :src="friend[2].card.img_url" class="img" mode="widthFix" v-if="friend[2] && friend[2].card">
					<view class="img" mode="widthFix" v-else-if="!friend[2]"></view>
					<img :src="friend[3].card.img_url" class="img" mode="widthFix" v-if="friend[3] && friend[3].card">
					<view class="img" mode="widthFix" v-else-if="!friend[3]"></view>
					<img :src="friend[4].card.img_url" class="img" mode="widthFix" v-if="friend[4] && friend[4].card">
					<view class="img" mode="widthFix" v-else-if="!friend[4]"></view>
				</dd>

			</dl>
			<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
		</div>

	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'group-component',
	data () {
		return {
			list: [],
			friend:[]
		}
	},
	onShow() {
		this.getdata();
		if(wx.getStorageSync('collection').length > 0 ) {
			this.list = wx.getStorageSync('collection')
		}else {
			this.list = []
		}
	},
	onLoad() {
		this.getdata();
		if(wx.getStorageSync('collection').length > 0 ) {
			this.list = wx.getStorageSync('collection')
		}else {
			this.list = []
		}

	},
	methods: {
		getdata() {
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/showfriends/0`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					this.friend = d.data

				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 404){
					wx.hideLoading ();
					Auth.proxy.token = ''
					// Auth.RefreshToken();
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		},
		group(page) {
			wx.navigateTo({
			  url: '/pages/group/'+page+'/main'
			})
		}
	}
}
</script>
<style lang="less" scoped>
@import '../../configs/style.less';
.group-component{
	padding-top:10px;
	.default{
		background:#fff;
		border-radius:10px;
		padding:10px 0;
		width:95%;
		margin:10px auto;
		position:relative;
		h5{
			font-size:@fontthree;
			line-height:35px;
			text-indent:20px;
		}
		dl{
			display:flex;
			margin-top:3px;
			padding:0 20px;
			height:105px;
			overflow:hidden;
			width:60%;
			float:left;
			margin:0 auto;
			img{
				width:100%;
			}
			dt{
				height:105px;
				flex:1;

			}
			dd{
				flex:1;
				margin-left:1px;
				font-size:0;
				height:105px;
				.img{
					width:calc(50% - 2px);
					float:left;
					margin-left:2px;
					display:block;
					vertical-align: bottom;
					margin-bottom:2px;
					height:50%;
					background:#eee;
				}
			}
		}
		&:after{
			content:'';
			display:block;
			clear:both;
		}
		i{
			position:absolute;
			right:20px;
			bottom:45px;
		}
	}

}
</style>
