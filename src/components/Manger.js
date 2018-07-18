import React, { Component } from 'react';
import { NavBar, Icon,InputItem,Button,Modal } from 'antd-mobile';
import {connect} from "react-redux";
import axios from 'axios';
import {ADDUSER,CHANGEUSER,REMOVEUSER,INITDATA} from "../store/actions/index";

const alert = Modal.alert;

class Manger extends Component {
	constructor(props){
		super(props);
		this.state={
			markShow:false,
			addShow:false,
			changeShow:false,
			modal:false,
			userId:"",
			userName:"",
			userMoney:"",
			errinfo:"",
		}
	}
	render() {
		let {history,userList}=this.props;
		let {markShow,modal,userId,userName,userMoney,errinfo,addShow,changeShow}=this.state;
	
		return (
		<div className="Manger">
			<div className="mark" style={{display:markShow?"block":"none"}}
				  onClick={()=>{this.setState({markShow:false,addShow:false,changeShow:false})}}
			></div>
			<div className="add" style={{display:addShow?"block":"none"}}>
				<InputItem
					clear
					placeholder="请输入用户ID"
					value={userId}
					onChange={(ev)=>{this.setState({userId:ev})}}
				>用户ID</InputItem>
				<InputItem
					clear
					placeholder="请输入用户姓名"
					value={userName}
					onChange={(ev)=>{this.setState({userName:ev})}}
				>姓名</InputItem>
				<InputItem
					clear
					placeholder="请输入金钱基数"
					value={userMoney}
					onChange={(ev)=>{this.setState({userMoney:ev})}}
				>金钱基数</InputItem>
				<Button 
					className="btn" 
					type="primary" inline size="small" 
					style={{ marginRight: '4px' }}
					onClick={this.addUser.bind(this)}
				>添加</Button>
				<Button type="warning" inline size="small"  
						onClick={()=>{this.setState({markShow:false,addShow:false})}}
				>取消</Button>
			</div>
			<div className="change" style={{display:changeShow?"block":"none"}}>
				<InputItem
					clear
					placeholder="请输入用户姓名"
					value={userName} //userName
					onChange={(ev)=>{this.setState({userName:ev})}}
				>姓名</InputItem>
				<Button 
					className="btn" 
					type="primary" inline size="small" 
					style={{ marginRight: '4px' }}
					onClick={this.changeUser.bind(this)}
				>修改</Button>
				<Button type="warning" inline size="small"  
						onClick={()=>{this.setState({markShow:false,changeShow:false})}}
				>取消</Button>
			</div>

			<NavBar className="header"
				mode="light"
				icon={<Icon type="left" color="#333"/>}
				onLeftClick={() => {history.go(-1)}}
				rightContent={
					<Icon onClick={()=>{
						this.setState({markShow:true,addShow:true})
					}} type="ellipsis" color="#333"/>
				}
			>用户管理</NavBar>
			<ul className="userList">
				{
					userList&&userList.map((item,index)=>{
						 return <li key={index}>
									<span>
										<Icon type="check-circle" color="#333" 
											onClick={()=>{
											this.setState({userId:item.userId,userName:item.userName})
											this.setState({markShow:true,changeShow:true})
										}}/>
									</span>
									<span>{item.userId}</span>
									<span>{item.userName}</span>
									<span>
										<Icon type="cross-circle" color="#333"
											onClick={()=>{
												alert('删除', '确定删除吗', [
													{ text: '取消' },
													{ text: '确定', onPress: () =>{
														this.removeUser(item.userId);
													}},
												  ])
										}}/>
									</span>
								</li>
					})
				}
			</ul>
			<Modal
                visible={modal}
                transparent
                maskClosable={false}
                onClose={()=>{this.setState({modal: false})}}
                title="提示"
                footer={[{ text: '关闭', onPress: () => {this.setState({modal: false})}}]}
            >
                <div style={{ height: 30}}>
                   {errinfo}
                </div>
            </Modal>
		</div>
		);
	}
	componentDidMount(){
		axios.get("http://localhost:3000/getAllUsers").then(res=>{
			if(res.data.code===1){
				console.log(res.data.userList)
				this.props.initData(res.data.userList);
			}
		})
	}
	removeUser(num){
		axios.get("http://localhost:3000/removeUser",{params:{removeId:num}}).then(res=>{
			if(res.data.code===1){
				this.props.removeOne(num);
			}
		})
	}
	changeUser(){
		let {userName,userId}=this.state;
		if(!userName){
			this.setState({errinfo:"姓名不能为空",modal: true});
		}else{
			axios.get("http://localhost:3000/changeUser",{params:{userId:userId,userName:userName}}).then(res=>{
				if(res.data.code===1){
					this.props.change({userId,userName});
					
					this.setState({errinfo:res.data.msg,modal: true,markShow:false,changeShow:false,userId:"",userName:"",userMoney:""});
				}
			})
		}
	}
	addUser(){
		let {userId,userName,userMoney}=this.state;
		if(!userId){
			this.setState({errinfo:"ID不能为空",modal: true});
		}else if(!userName){
			this.setState({errinfo:"姓名不能为空",modal: true});
		}else if(!userMoney){
			this.setState({errinfo:"金钱基数不能为空",modal: true});
		}else{
			axios.get("http://localhost:3000/createUser",{params:{userId:userId,userName:userName,userMoney:userMoney}}).then(res=>{
				if(res.data.code===1){
					this.props.createUser({userId,userName,userMoney});
					
					this.setState({errinfo:res.data.msg,modal: true,markShow:false,addShow:false,userId:"",userName:"",userMoney:""});
				}else if(res.data.code===2){
					this.setState({errinfo:res.data.msg,modal: true});
				}
			})
		}
	}
}
let mapState=(state)=>{
    return{
		userList:state.computed.userList
	}
}
let mapDispatch=(dispatch)=>{
    return{
		createUser(obj){
			dispatch({type:ADDUSER,obj})
		},
		change(obj){
			dispatch({type:CHANGEUSER,obj})
		},
		removeOne(removeId){
			dispatch({type:REMOVEUSER,removeId})
		},
		initData(userList){
			dispatch({type:INITDATA,userList})
		}
	}
}
Manger=connect(mapState,mapDispatch)(Manger)
export default Manger;