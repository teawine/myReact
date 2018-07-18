import React, { Component } from 'react';
import axios from "axios";
import querystring from "querystring";
import {connect} from "react-redux";
import {ONLYUSER} from "../store/actions"

class Detail extends Component {
    render() {
        let {showList}=this.props;
        return (
        <div className="Detail">
            <div className="title">{showList.name?showList.name:"请选择一名用户"}</div>
            <div className="container" >
                <ul>
                    {
                        showList.submitLog&&showList.submitLog.length>0&&showList.submitLog.map((item,index)=>{
                            return <li key={index}>
                                        <span>{item.time}</span>
                                        <span>{item.money}</span>
                                        <span>{item.info}</span>
                                    </li>
                        })
                    }
                </ul>
            </div>
        </div>
        );
    }
    componentDidMount(){
        let userId=querystring.parse(this.props.location.search.slice(1)).id;
        let userName=querystring.parse(this.props.location.search.slice(1)).name;
        this.setState({userName})
        if(userId){
            axios.get("http://localhost:3000/onlyUser",{params:{onlyId:userId}}).then(res=>{
                if(res.data.code===1){
                    this.props.onlyUser({name:userName,arr:res.data.data});
                }
            })
        }
    }
}
let mapState=(state)=>{
    return{
		showList:state.computed.showList
	}
}
let mapDispatch=(dispatch)=>{
    return{
		onlyUser(obj){
            dispatch({type:ONLYUSER,obj})
        }
	}
}
Detail=connect(mapState,mapDispatch)(Detail)
export default Detail;