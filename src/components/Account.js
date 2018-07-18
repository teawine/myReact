import React, { Component } from 'react';
import {connect} from "react-redux";
import "../mock/mock";
import axios from "axios"
import {INITDATA} from "../store/actions/index";

class Account extends Component {
    render() {
        let {userList,allMoney}=this.props;
        console.log(userList);
        return (
        <div className="Account">
            <div className="jumbotron">
                <div className="num">{allMoney}</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>个人总计</th>
                        <th>平均金额</th>
                        <th>应付</th>
                        <th>应收</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((item,index)=>{
                            //应收 receivable 应付 handle 平均 average
                            console.log(item.userMoney,item.average,item.handle,item.receivable)
                            return <tr key={index}>
                                        <td>{item.userName}</td>
                                        <td>{item.userMoney}</td>
                                        <td>
                                            {item.userMoney?item.average.toFixed(2):0}
                                        </td>
                                        <td>{item.userMoney?item.handle.toFixed(2):0}</td>
                                        <td>
                                            {item.userMoney?item.receivable.toFixed(2):0}
                                        </td>
                                    </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        );
    }
    componentDidMount(){
        //获取用户列表
        axios.get("http://localhost:3000/getAllUsers").then(res=>{
            if(res.data.code===1){
                this.props.initData(res.data.userList);
            }
        });
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
Account=connect(mapState,mapDispatch)(Account);
export default Account;