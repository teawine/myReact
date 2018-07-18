import React, { Component } from 'react';
import { DatePicker, List ,Picker,InputItem ,Button,TextareaItem,Modal} from 'antd-mobile';
import axios from "axios";
import "../mock/mock";
import {connect} from "react-redux";
import {ADDUSERLOG} from "../store/actions/index";

const alert = Modal.alert;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
if (minDate.getDate() !== maxDate.getDate()) {
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}

class Submit extends Component {
    constructor(props){
        super(props);
        this.state={
            date: now,
            asyncValue:[],
            users:[],
            modal:false,
            errinfo:{},
            title:"",
            money:"",
            info:""
        }
    }
    render() {
        let {date,asyncValue,users,modal,errinfo,title,money,info}=this.state;
        return (
        <div className="Submit">
            <List className="submitList">
                <DatePicker
                    mode="date"
                    title="选择时间"
                    extra="Optional"
                    value={date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">时间</List.Item>
                </DatePicker>
                <Picker
                    data={users}
                    cols="1"
                    value={asyncValue}
                    onOk={v =>{
                        this.setState({asyncValue:v})
                    }}
                >
                    <List.Item arrow="horizontal">姓名</List.Item>
                </Picker>
                <InputItem type="money"
                    placeholder="请输入金额"
                    clear
                    value={money}
                    onChange={(ev)=>{
                        this.setState({money:ev})
                    }}
                    moneyKeyboardAlign="left"
                >金额</InputItem>
                <TextareaItem
                    title="用途备注"
                    placeholder="请输入备注"
                    data-seed="logId"
                    value={info}
                    onChange={(ev)=>{
                        this.setState({info:ev})
                    }}
                    autoHeight
                />
                <Button className="btn" type="primary" 
                        inline size="small" style={{ marginRight: '4px' }}
                        onClick={this.addLog.bind(this)}
                >提交</Button>
                <Button type="warning" inline size="small">清空</Button>
            </List>
            <Modal
                visible={modal}
                transparent
                maskClosable={false}
                onClose={()=>{this.setState({modal: false})}}
                title={title}
                footer={[
                    {text:'确认',onPress:()=>{
                            this.setState({modal: false});
                            this.ajax();
                            alert('提示', '已提交', [
                                { text: '确定'}]);
                        }
                    },
                    {text:'关闭',onPress:()=>{
                            this.setState({modal: false});
                            alert('提示', '您本次未提交', [
                            { text: '确定'}]);
                        }
                    }
                ]}
            >
                <div style={{ height: 100}}>
                   
                   <p>时间：{errinfo.time}</p>
                   <p>编号：{errinfo.userId}</p>
                   <p>金钱：{errinfo.money}</p>
                   <p>用途备注：{errinfo.info}</p>
                </div>
            </Modal>
        </div>
        );
    }
    componentDidMount(){
        axios.get("http://localhost:3000/getAllUsers").then(res=>{
            if(res.data.code===1){
                let users=[];
                res.data.userList.forEach(item=>{
                    users.push({label:item.userName,value:item.userId});
                })
                this.setState({users})
            }
        })
    }
    addLog(){
        let {date,asyncValue,money,info}=this.state;

        let myDate=date;
        let year=myDate.getFullYear();
        let month=myDate.getMonth()+1;
        let dates=myDate.getDate();
        let time=year+"年"+month+"月"+dates+"日";
        let user=asyncValue[0];

        this.setState({modal: true,title:"请确认",errinfo:{userId:user,time,money,info}});
    }
    ajax(){
        let {date,asyncValue,money,info}=this.state;

        let myDate=date;
        let year=myDate.getFullYear();
        let month=myDate.getMonth()+1;
        let dates=myDate.getDate();
        let time=year+"年"+month+"月"+dates+"日";
        let user=asyncValue[0];

        axios.get("http://localhost:3000/addUserLog",{params:{userId:user,time,money,info}}).then(res=>{
            if(res.data.code===1){ 
                this.props.addUserLog({userId:user,time,money,info});
                this.setState({asyncValue:[],date:now,money:'',info:""});
            }
        })
    }
}
let mapState=(state)=>{
    return{}
}
let mapDispatch=(dispatch)=>{
    return{
        addUserLog(obj){
            dispatch({type:ADDUSERLOG,obj})
        }
    }
}
Submit=connect(mapState,mapDispatch)(Submit)
export default Submit;