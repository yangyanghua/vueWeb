<template>
	<main-wrapper>
		<div slot="header">
			消息模板设置
		</div>
		<div slot="main">
			<div class="com-block-bg management">
				<p style="margin-bottom: 20px;">消息提醒</p>
				<el-table :data="businessLists" border style="width: 100%">
					<el-table-column prop="name" label="消息类型" >						
					</el-table-column>					
					<el-table-column  label="电子邮件" >
						<template slot-scope="scope">					
						   <p v-if="scope.row.EMAIL">
						   <el-checkbox v-model="scope.row.EMAIL.needSend" @change="_businessSendorNot(scope.row.EMAIL.id,scope.row.EMAIL.needSend)" :true-label="1" :false-label="0" >是否发送</el-checkbox>
						   <el-button type="text" size="mini" @click="editMsg(scope.row.EMAIL)" round>编辑内容</el-button>						   	
						   </p>
						   <p v-else>
						   <el-checkbox disabled :true-label="1" :false-label="0" >是否发送</el-checkbox>
						   <el-button type="text" size="mini" @click="AddMsg('EMAIL',scope.row.id)" round>新增内容</el-button>						   	
						   </p>
						</template>
					</el-table-column>					
					<el-table-column  label="站内消息">
						<template slot-scope="scope">					
							<p v-if="scope.row.STATION_MSG">
							<el-checkbox v-model="scope.row.STATION_MSG.needSend" @change="_businessSendorNot(scope.row.STATION_MSG.id,scope.row.STATION_MSG.needSend)" :true-label="1" :false-label="0" >是否发送</el-checkbox>
						    <el-button type="text" size="mini" @click="editMsg(scope.row.STATION_MSG)" round>编辑内容</el-button>								
							</p>
						   <p v-else>
						   <el-checkbox disabled  :true-label="1" :false-label="0" >是否发送</el-checkbox>
						   <el-button type="text" size="mini" @click="AddMsg('STATION_MSG',scope.row.id)" round>新增内容</el-button>						   	
						   </p>							
						</template>						
					</el-table-column>
					<el-table-column  label="手机短信">
						<template slot-scope="scope">					
						   <p v-if="scope.row.SMS">
						   <el-checkbox v-model="scope.row.SMS.needSend" @change="_businessSendorNot(scope.row.SMS.id,scope.row.SMS.needSend)"  :true-label="1" :false-label="0" >是否发送</el-checkbox>
						   <el-button type="text" size="mini" @click="editMsg(scope.row.SMS)" round>编辑内容</el-button>						   	
						   </p>
						   <p v-else>
						   <el-checkbox disabled  :true-label="1" :false-label="0" >是否发送</el-checkbox>
						   <el-button type="text" size="mini" @click="AddMsg('SMS',scope.row.id)" round>新增内容</el-button>						   	
						   </p>

						</template>	
					</el-table-column>
					<el-table-column  label="APP消息推送">
						<template slot-scope="scope">					
						   <p v-if="scope.row.APP_PUSH_MSG">
						   <el-checkbox v-model="scope.row.APP_PUSH_MSG.needSend" @change="_businessSendorNot(scope.row.APP_PUSH_MSG.id,scope.row.APP_PUSH_MSG.needSend)"  :true-label="1" :false-label="0" >是否发送</el-checkbox>
						   <el-button type="text" size="mini" @click="editMsg(scope.row.APP_PUSH_MSG)"  round>编辑内容</el-button>						   	
						   </p>
						   <p v-else>
						   <el-checkbox disabled  :true-label="1" :false-label="0" >是否发送</el-checkbox>
						   <el-button type="text" size="mini" @click="AddMsg('APP_PUSH_MSG',scope.row.id)" round>新增内容</el-button>						   	
						   </p>						   
						</template>							
					</el-table-column>
				</el-table>				
			</div>
			<el-dialog
			  title="提示"
			  :visible.sync="dialogVisible"
			  width="70%"
			  :before-close="handleClose">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
					 	<el-form-item label="消息类型：">
					    <p>{{msgType}}</p>
					 	</el-form-item>					 
					  <el-form-item label="标签说明：" >								
								<el-button type="primary" plain size="small" v-for= "(configuraList,index) in dataList" :key="index" @click="configuraBtn(configuraList)">
								{{configuraList.name}}：{{'$'+configuraList.code+'$'}}
								</el-button>
								<!-- <el-button  class="button-new-tag" size="small">+ New Tag</el-button>	 -->
								<el-button size="small" @click="addNewEntry()">新建消息标签</el-button>				    
					  </el-form-item>
					  
					 <el-form-item :label="nameLabel" v-if="needTitle" prop="messageTitle">
				     	<el-input  v-model="ruleForm.messageTitle"></el-input>
					 </el-form-item>			
					  <el-form-item label="内容模板：" prop="messageBody">
					    <el-input type="textarea" :rows="6" v-model="ruleForm.messageBody"></el-input>
					  </el-form-item>
					  <el-form-item>				
					 </el-form-item>
					</el-form>			  
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
   				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
			  </span>
			</el-dialog>

			 <!--新增消息标签-->
		        <el-dialog title="消息配置管理" :visible.sync="brandAudit" width="500px">
		          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2">
		             <el-form-item label="key：" prop="code" required>
		                 <el-input v-model="ruleForm2.code" placeholder=""></el-input>
		            </el-form-item>
		            <el-form-item label="说明：" prop="name" required>
		                 <el-input v-model="ruleForm2.name" placeholder=""></el-input>
		            </el-form-item>
		          </el-form>
		          <div slot="footer" class="dialog-footer">
		            <el-button @click="brandAudit = false">取 消</el-button>
		            <el-button type="primary" @click="submitStreet('ruleForm2')">保存</el-button>
		          </div>
		        </el-dialog>	
			
		</div>
	</main-wrapper>
</template>

<script>
	import * as Service from '@/common/service/system/index.js';
	export default {
		data() {
			return {			
				dialogVisible:false, //弹窗
				msgType:'', //弹窗标题变量1
				nameLabel:'',//弹窗标题变量2
				dataList:[],//新增消息标签 列表
				brandAudit:false,//新增消息标签  弹窗
				ruleForm2:{       //新增消息标签
		          code:'',
		          name:''
		        },
				needTitle:true,
				businessLists: [],
		        ruleForm: {
		        	id:'',
		        	businessId:'',
		        	messageTypeCode:'',       	
		            messageTitle:'',
		            messageBody: ''
		        },				
		        rules: {
		          messageTitle: [
		            { required: true, message: '请输入消息标题', trigger: 'blur' },
		          ],
		          messageBody: [
		            { required: true, message: '请填写消息内容', trigger: 'blur' }
		          ]
		        },
		        rules2: {
		          code: [
		            { required: true, message: '请输入key', trigger: 'blur' }
		          ],
		          name: [
		            { required: true, message: '请输入内容', trigger: 'blur' },
		           
		          ],
		        },

			}
		},
		methods: {
	      submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            if(this.ruleForm.id){
	            	this._busineMsgtmpEdit(this.ruleForm);
	            }else{
	            	this._busineMsgtmpAdd(this.ruleForm);
	            }
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },	
	      handleClose(done) {
	        this.$confirm('确认关闭？')
	          .then(_ => {
	            done();
	          })
	          .catch(_ => {});
	      }, 
	      AddMsg(type,id){
				if(type=='APP_PUSH_MSG'){
					this.msgType = 'APP消息推送';
					this.nameLabel = 'APP推送标题';
				}else if(type=='EMAIL'){
					this.msgType = '电子邮件';
					this.nameLabel = '电子邮件标题';
				}else if(type=='SMS'){
					this.msgType = '手机短信';
				}else if(type=='STATION_MSG'){
					this.msgType = '站内消息';
					this.nameLabel = '站内信标题';
				}
				if(type=='SMS'){
						this.needTitle=false;
				        this.rules = {
				          messageBody: [
				            { required: true, message: '请填写消息内容', trigger: 'blur' }
				          ]
				        };
					}else{
						this.needTitle=true;
				        this.rules = {
				          messageTitle: [
				            { required: true, message: '请输入消息标题', trigger: 'blur' },
				          ],
				          messageBody: [
				            { required: true, message: '请填写消息内容', trigger: 'blur' }
				          ]
				        };				
				}

		        this.ruleForm = {
		        	id:'',
		        	businessId:id,
		        	messageTypeCode:type,       	
			        messageTitle:'',
			        messageBody: '',
		        };
	      		this.dialogVisible = true;
	      	
	      },
			/*编辑*/
			editMsg(msg){
				if(msg.messageType=='APP_PUSH_MSG'){
					this.msgType = 'APP消息推送';
					this.nameLabel = 'APP推送标题';
				}else if(msg.messageType=='EMAIL'){
					this.msgType = '电子邮件';
					this.nameLabel = '电子邮件标题';
				}else if(msg.messageType=='SMS'){
					this.msgType = '手机短信';
				}else if(msg.messageType=='STATION_MSG'){
					this.msgType = '站内消息';
					this.nameLabel = '站内信标题';
				}
				if(msg.messageType=='SMS'){
					this.needTitle=false;
			        this.rules = {
			          messageBody: [
			            { required: true, message: '请填写消息内容', trigger: 'blur' }
			          ]
			        };
				}else{
					this.needTitle=true;
			        this.rules = {
			          messageTitle: [
			            { required: true, message: '请输入消息标题', trigger: 'blur' },
			          ],
			          messageBody: [
			            { required: true, message: '请填写消息内容', trigger: 'blur' }
			          ]
			        };				
				}
	        this.ruleForm = {
	        	id:msg.id,     	
		        messageTitle:msg.messageTitle,
		        messageBody: msg.messageBody
	        };
				this.dialogVisible = true;
			},

			//列表数据
			getList(opt) {
				Service.businessList(opt).then(res => {
					this.businessLists = res.data;
				  this.totalNum = res.totalRecord;
				}).catch(res => {
					this.$message.error(res.message);
				})
			},
			_businessSendorNot(id,send){
				if(id){
					Service.businessSendorNot({id:id,needSend:send}).then((res)=>{
						
						
					}).catch((res)=>{
								this.$message.error(res.message);
								this.getList();
					})					
				}else{
					this.$message.error('请先编辑消息内容');
				}

			},
			_busineMsgtmpAdd(opt){
				Service.busineMsgtmpAdd(opt).then((res)=>{
						this.$message({
							type: 'success',
							message: '添加成功'
						})
					this.getList();	
					this.dialogVisible = false;					
				}).catch((res)=>{
					this.$message.error(res.message);
				})
			},
			_busineMsgtmpEdit(opt){
				 Service.busineMsgtmpEdit(opt).then((res)=>{
						this.$message({
							type: 'success',
							message: '更新成功'
						})	
					this.getList();	
					this.dialogVisible = false;
				 }).catch((res)=>{
				 	this.$message.error(res.message);
				 })
				
			},
			//新增消息标签 列表	
			_configuraList(){
				let params = {
		          pageSize: this.pageSize,
		          p: this.currentPage
		        };
		        Service.mlabelList(params).then(res => {
		          console.log('get list ',res);
		          this.dataList = res.data;
		        }).catch(res => {
		            this.$message.error(res.message);
		        })
			},
			//新增消息标签 创建
		    addNewEntry(){
	          this.brandAudit = true;
	          this.ruleForm2 = {
	            code: '',
	            name: ''
	          };
	           this.$refs["ruleForm2"].resetFields();
		    },
		    //修改
	      submitStreet(formName){
	           //验证通过
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            let params = {
	                code:this.ruleForm2.code,
	                name:this.ruleForm2.name
	              };
	            Service.mlabelAdd(params).then((res) => {
	                  this.$message({
	                      type: 'success',
	                      message: '添加成功！'
	                  });
	                  this.brandAudit = false;
	                  this._configuraList();   
	            }).catch((res) => {
	              console.log('error ', res);
	              this.$message({
	                type: 'error',
	                message: res.message
	              });  
	            })
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      configuraBtn(row){
	      	console.log(row);
	      	this.ruleForm.messageBody+= " "+row.name +"："+ row.code+" " ;  //在原来的基础上加一个
	      }
		},
		mounted() {
			this.getList();
			this._configuraList();
		}
	}
</script>

<style lang="scss" scoped>
	.management {
		padding: 20px;
		margin-top: 20px;
		position: relative;
		.business_span {
			margin-left: 10px;
			cursor: pointer;
			color: $color-primary;
		}
	}
</style>