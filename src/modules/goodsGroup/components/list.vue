<template>
	<main-wrapper>
		<div class="toph" slot="header">
			<span>商品组</span>
		</div>
		<div slot="main" class="com-block-bg media">
			<div class="ml_header">
				<span>数据列表</span>
			</div>
			<div class="searchContent">
				<el-form ref="searchform" :model="searchform" label-width="100px">

					<el-form-item label="分组名称：" style="width: 300px;display: inline-block;">
						<el-input v-model="searchform.groupName"></el-input>
					</el-form-item>
					<el-form-item label="创建人：" style="width: 300px; display: inline-block;">
						<el-input v-model="searchform.createPerson"></el-input>
					</el-form-item>
					<el-form-item label="创建时间：" style="width: 300px; display: inline-block;">
						<el-date-picker v-model="searchDate" type="datetimerange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>

				</el-form>
			</div>
			<div class="optBtn">
				<!--<el-dropdown @command="orBatchOpt">
					<el-button type="primary" size="small">
						批量操作<i class="el-icon-arrow-down el-icon--right"></i>
					</el-button>
					<el-dropdown-menu size="small" slot="dropdown">
						<el-dropdown-item size="small" command="002">删除</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>-->
				<el-button type="primary" size="small" @click="addGroup">新建商品组</el-button>
				<el-button type="primary" size="small" @click="handleSearch">搜索</el-button>
				<el-button size="small" @click="resetSearch">重置</el-button>
			</div>
			<div class="tableContent">
				<div class="gruupTable">
					<el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
						<el-table-column label="图片" width="240">
							<template slot-scope="scope">
								<div class="groupImg" style="background-size:cover ;" v-bind:style="{backgroundImage: 'url(' + scope.row.imgUrl + ')'}"></div>
							</template>
						</el-table-column>
						<el-table-column label="商品分组名称" width="260" prop="name">
						</el-table-column>
						<el-table-column label="商品数量" prop="productNum">
						</el-table-column>
						<el-table-column label="创建人" prop="createPerson">
						</el-table-column>
						<el-table-column label="创建时间" width="180" prop="createTime">
						</el-table-column>
						<el-table-column prop="address" label="操作" width="200">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="deleteGroup(scope.row.id)">删除</el-button>
								<el-button type="text" size="small" @click="editGroup(scope.row.id)">编辑</el-button>
								<el-button size="mini" @click="previewGroup(scope.row.id)">预览</el-button>
							</template>
						</el-table-column>
					</el-table>

				</div>

				<div class="pagination" style="text-align: right;">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
					</el-pagination>
				</div>

			</div>


			<!--
	作者：1063676593@qq.com
	时间：2018-04-10
	描述：预览分组弹窗
-->

			<el-dialog title="商品组预览" :visible.sync="previewGroupVisible" width="50%">
				<div class="GroupContent">
					<div class="banner" v-bind:style="{backgroundImage: 'url(' + groupDetail.imgUrl + ')'}"></div>
					<div class="GroupProContent">
						<ul class="GroupProList">
							<li v-for="item in groupDetail.productList">
								<img :src="item.image.split(';')[0]" />
								<p>¥{{item.minPrice}}{{'~'+item.maxPrice}}</p>
							</li>
						</ul>
					</div>
				</div>

				<span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="previewGroupVisible=false">关闭</el-button>
		  </span>
			</el-dialog>

		</div>

	</main-wrapper>
</template>

<script>
	import {
		getProductGroupList,
		productGroupDelete,
		productGroupInfo,
		getProductList,
		productGroupAdd,
		productGroupUpdata
	} from '@/common/service/goodsGroup/index.js'
	import { getUploadImgSrc } from '@/common/service/common.js'

	export default {
		data() {
			return {
				searchDate: [],
				previewGroupVisible: false,
				totalNum: 0,
				searchform: {
					groupName: '',
					createPerson: '',
					page: 1,
					pageSize: 10,
					startTime: '',
					endTime: '',
				},
				tableData: [],
				multipleSelection: [],
				groupDetail: {},

			}
		},

		methods: {
			addGroup() {
		        this.$router.push({
		          path:'/goodsGroup/list/detail',
		        })				
			},
			editGroup(id) {
		        this.$router.push({
		          path:'/goodsGroup/list/detail',
		          query:{
		            id:id
		          }
		        });				
			},
			previewGroup(id) {
				productGroupInfo({
					id: id
				}).then((res) => {
					this.groupDetail = res;
					this.previewGroupVisible = true;

				}).catch((res) => {
					this.$message({
						type: 'error',
						message: res.message
					})
				})

			},
			handleSearch() {
				if(this.searchDate.length > 0) {
					this.searchform.startTime = this.searchDate[0].Format('yyyy-MM-dd hh:mm:ss');
					this.searchform.endTime = this.searchDate[1].Format('yyyy-MM-dd hh:mm:ss');
				} else {
					this.searchform.startTime = '';
					this.searchform.endTime = '';
				}
				this.searchform.page = 1;
				this._getProductGroupList(this.searchform);
			},
			resetSearch() {
				this.searchform.startTime = '';
				this.searchform.endTime = '';
				this.searchDate = [];
				this.searchform.groupName = '';
				this.searchform.createPerson = '';
				this.searchform.page = 1;
				this._getProductGroupList(this.searchform);
			},
			orBatchOpt(command) {
				console.log(command)
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.searchform.page = 1;
				this.searchform.pageSize = val;
				this._getProductGroupList(this.searchform);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.searchform.page = val;
				this._getProductGroupList(this.searchform);
			},

			deleteGroup(id) {
				this.$confirm('该操作将永久删除该分组, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					productGroupDelete({
						id: id
					}).then((res) => {
						this.$message({
							type: 'success',
							message: '删除成功'
						})
						this._getProductGroupList(this.searchform);
					}).catch((res) => {
						this.$message({
							type: 'error',
							message: res.message
						})
					})
				}).catch(() => {

				});
			},
			_getProductGroupList(opt) {
				getProductGroupList(opt).then((res) => {
					this.totalNum = res.totalRecord;
					this.tableData = res.data;
				}).catch((res) => {
					this.$message({
						type: 'error',
						message: res.message
					})
				})
			},


		},
		mounted() {
			this._getProductGroupList(this.searchform);
		}

	}
</script>

<style lang="scss" scoped>
	.ml_header {
		height: 50px;
		line-height: 50px;
		padding: 0 20px;
	}
	
	.tableContent {
		padding: 0 20px 30px 20px;
		width: 100%;
	}
	
	.groupImg {
		height: 70px;
		width: 200px;
		margin: auto;
		border: 1px solid gainsboro;
	}
	
	.optBtn {
		padding-left: 20px;
		margin-bottom: 20px;
	}
	
	.GroupContent {
		overflow: hidden;
		width: 372px;
		margin: auto;
		min-height: 300px;
		border: 1px solid gainsboro;
		padding: 5px;
		.banner {
			width: 100%;
			height: 190px;
			background: url(../../../assets/images/logo.png);
			background-size: cover;
		}
		.GroupProContent {
			margin-top: 5px;
			width: 500px;
			height: 100px;
			.GroupProList {
				overflow: hidden;
				width: 100%;
				height: 100%;
				li {
					height: 100%;
					width: 80px;
					float: left;
					text-align: center;
					img {
						width: 70px;
						height: 70px;
					}
					p {
						font-size: 14px;
						color: #333333;
					}
				}
			}
		}
	}
</style>