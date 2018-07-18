import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import React from "react";
import config from "./config";
function RootRouter(){
    return <Router>
        <Switch>
            {
                config.map((item,index)=>{
                    return <Route key={index} path={item.path} render={({match,history})=>{
                        let Con = item.render;
                        return <Con match={match} history={history} children={item.children}/>
                    }}></Route>
                })
            }
            <Redirect from="/" to="/box" />
        </Switch>
    </Router>
}
export default RootRouter;