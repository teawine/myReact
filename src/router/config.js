import React,{Component} from "react";

let newCom=(coms,loding)=>{
    return class Com extends Component{
         constructor(props){
             super(props)
             this.state={
                 Now:loding
             }
         }
         render(){
                 let {Now}=this.state;
                  return(<Now {...this.props}/>)
                  
              }
         componentDidMount(){
             
             coms().then(res=>{
                 this.setState({Now:res.default})
             })
         }
     }   
}

function loding(){
  return(
        <div style={{width:"100%",height:"100%",background:"#fff"}}>
            <img style={{width:"100%",height:"100%"}} src={require("../loding.gif")} alt=""/>
        </div>
  )
}
let config=[
    {
        path:"/manger",
        render:newCom(()=>import("../components/Manger"),loding),
        name:"管理用户"
    },
    {
        path:"/box",
        render:newCom(()=>import("../components/Box"),loding),
        name:"all",
        children:[
            {
                path:"/home",
                render:newCom(()=>import("../components/Home"),loding),
                name:"首页",
                
            },{
                path:"/detail",
                render:newCom(()=>import("../components/Detail"),loding),
                name:"详情"
            },{
                path:"/submit",
                render:newCom(()=>import("../components/Submit"),loding),
                name:"提交"
            },{
                path:"/account",
                render:newCom(()=>import("../components/Account"),loding),
                name:"结算"
            }
        ]
    }
    
]
export default config;