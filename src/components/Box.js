import React, { Component } from 'react';
import {Link,Route,Switch,Redirect} from "react-router-dom";

class Box extends Component {
    constructor(props){
        super(props);
        this.state={
            iNow:0,
            menuShow:false
        }
    }
    render() {
        let {match,children}=this.props;
        let {iNow,menuShow}=this.state;
        return (
        <div className="Box">
            <div className="menu"></div>
            <div className={`${menuShow?"active":""} wrap`}>
                <div className="mark" style={{display:menuShow?"block":"none"}}
                     onClick={()=>{
                        this.setState({menuShow:false})
                }} ></div>
                <div className="top" onClick={()=>{
                    this.setState({menuShow:true})
                }}>菜单</div>
                <div className="content">
                    <Switch>
                    {
                        children.map((item,index)=>{
                            return <Route key={index} path={match.url+item.path} component={item.render}></Route>
                        })
                    }
                    <Redirect from="/box" to="/box/home"/>
                    </Switch>
                </div>
                <div className="footer">
                    {
                        children.map((item,index)=>{
                            return <Link key={index} to={match.url+item.path} onClick={()=>{
                                this.setState({iNow:index})
                            }} className={iNow===index?"active":""}>{item.name}</Link>
                        })
                    }
                </div>
            </div>
        </div>
        );
    }
    
}

export default Box;