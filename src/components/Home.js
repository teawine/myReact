import React, { Component } from 'react';
import { Button,Modal } from 'antd-mobile';
import {connect} from "react-redux";
import "../mock/mock";
import axios from "axios"
import {INITDATA} from "../store/actions/index";

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            left:0,
            btnShow:false,
            modal: false,
        }
    }
    render() {
        let {left,btnShow}=this.state;
        let {userList,history,allMoney}=this.props;
        return (
        <div className="Home">
            <div className="jumbotron">
                <div className="num">{allMoney}</div>
                <p className="magt">嗨，1601M的美女帅哥</p>
                <Button type="primary" className="btn" 
                        style={{display:btnShow?"none":"block"}}>
                    <input type="password" placeholder="请输入管理员密码" 
                        onChange={(ev)=>{this.val=ev.target.value}}
                        onKeyUp={this.login.bind(this)}
                    />
                </Button>
                <Button type="primary" className="btn"
                        style={{display:btnShow?"block":"none"}}
                        onClick={()=>{
                            history.push("/manger")
                        }}
                >
                    管理用户
                </Button>
                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={false}
                    onClose={()=>{this.setState({modal: false})}}
                    title="提示"
                    footer={[{ text: '关闭', onPress: () => {this.setState({modal: false}) } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                <div style={{ height: 30}}>
                   密码错误！
                </div>
                </Modal>

                <p className="miantell">
                    <span style={{left:left+"px"}} >吴家宝提交了100元钱；</span>
                </p>
            </div>
            <div className="section">
                <ul id="home">
                {
                    userList&&userList.map((item,index)=>{
                        return <li key={index} 
                                   onClick={()=>{
                                      history.push("/box/detail?id="+item.userId+"&name="+item.userName)
                                   }}>
                                    <p>{item.userName}</p>
                                    <span>{item.userMoney}</span>
                                </li>
                    })
                }
                </ul>
            </div>
        </div>
        );
    }
    login(ev){
        if(ev.keyCode===13){
            axios.get("http://localhost:3000/login",{params:{pwd:this.val}}).then(res=>{
                if(res.data.code===1){
                    this.setState({btnShow:true})
                }else if(res.data.code===0){
                    this.setState({modal: true});
                }
            })
        }
    }
    componentDidMount(){
        let left=-window.innerWidth;
        this.timer=setInterval(()=>{
            left++;
            if(left>window.innerWidth){
                left=-window.innerWidth
            }
            this.setState({left});
        },10);
        //获取用户列表
        axios.get("http://localhost:3000/getAllUsers").then(res=>{
			if(res.data.code===1){
				this.props.initData(res.data.userList);
			}
		})
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
}

let mapState=(state)=>{
    return{
        userList:state.computed.userList,
        allMoney:state.computed.allMoney
    }
}
let mapDispatch=(dispatch)=>{
    return{
        initData(userList){
			dispatch({type:INITDATA,userList})
        },
    }
}
Home=connect(mapState,mapDispatch)(Home)
export default Home;