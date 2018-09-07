<template>
	<div class="group-component">
		<div class="default" @click="group('collection')">
			<h5>我的收藏({{list.length}})</h5>
			<dl >
				<dt>
					<img :src="list[0].card.img_url" class="img" mode="widthFix" v-if="list[0]">
					<view v-else-if="!list[0]" class="img" style="background:#eee;height:100%"></view>

				</dt>
				<dd>
					<img :src="list[1].card.img_url" v-if="list[1]" class="img" mode="widthFix">
					<view v-else-if="!list[1]" class="img" style="background:#eee;height:50%"></view>
					<img :src="list[2].card.img_url" v-if="list[2]" class="img" mode="widthFix">
					<view v-else-if="!list[2]" class="img" style="background:#eee;height:50%"></view>
					<img :src="list[3].card.img_url" v-if="list[3]" class="img" mode="widthFix">
					<view v-else-if="!list[3]" class="img" style="background:#eee;height:50%"></view>
					<img :src="list[4].card.img_url" v-if="list[4]" class="img" mode="widthFix">
					<view v-else-if="!list[4]" class="img" style="background:#eee;height:50%"></view>
				</dd>
			</dl>
			<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
		</div>

		<div class="default"  @click="group('default')">
			<h5>默认分组({{friend.length}})</h5>
			<dl>
				<dt>
					<img :src="friend[0].card.img_url" class="img" mode="widthFix" v-if="friend[0]">
					<view v-else-if="!friend[0]" class="img" style="background:#eee;height:100%"></view>

				</dt>
				<dd>
					<img :src="friend[1].card.img_url" v-if="friend[1]" class="img" mode="widthFix">
					<view v-else-if="!friend[1]" class="img" style="background:#eee;height:50%"></view>
					<img :src="friend[2].card.img_url" v-if="friend[2]" class="img" mode="widthFix">
					<view v-else-if="!friend[2]" class="img" style="background:#eee;height:50%"></view>
					<img :src="friend[3].card.img_url" v-if="friend[3]" class="img" mode="widthFix">
					<view v-else-if="!friend[3]" class="img" style="background:#eee;height:50%"></view>
					<img :src="friend[4].card.img_url" v-if="friend[4]" class="img" mode="widthFix">
					<view v-else-if="!friend[4]" class="img" style="background:#eee;height:50%"></view>
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
			list: '',
			friend:''
		}
	},
	onShow() {
		this.getdata();
		if(wx.getStorageSync('collection').length > 0 ) {
			this.list = wx.getStorageSync('collection')
		}else {
			this.list = ''
		}
	},
	onLoad() {
		this.getdata();
		if(wx.getStorageSync('collection').length > 0 ) {
			this.list = wx.getStorageSync('collection')
		}else {
			this.list = ''
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
