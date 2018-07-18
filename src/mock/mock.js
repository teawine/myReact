import Mock from "mockjs";
//登录
Mock.mock("/login",(req)=>{
    if(JSON.parse(req.body).pwd==="123"){
        return {code:1}
    }else{
        return {code:0}
    }
})

let userList=[];
let allMoney=0;

//添加用户
Mock.mock("/createUser",(req)=>{
    userList.push(JSON.parse(req.body));
    return {code:1}
})
//修改用户信息
Mock.mock("/changeUser",(req)=>{
    userList.forEach((item)=>{
        if(item.userId===JSON.parse(req.body).userId){
            item.userName=JSON.parse(req.body).userName;
        }
    })
    return {code:1}
})
//删除用户
Mock.mock("/removeUser",(req)=>{
    userList.forEach((item,index)=>{
        if(item.userId===JSON.parse(req.body).removeId){
            userList.splice(index,1);
        }
    })
    return {code:1}
})
//获取所有用户列表
Mock.mock("/getAllUsers",(req)=>{
    let n=0;
    userList.forEach((item)=>{
        n+=item.userMoney*1
    });
    allMoney=n;
    return {code:1,userList:userList}
})
//获取个人提交列表
Mock.mock("/onlyUser",(req,res)=>{
    if(userList.length>0){
        let off=false;
        let now={};
        userList.forEach((item)=>{
            if(item.userId===JSON.parse(req.body).onlyId){
                // return {code:1,submitLog:item.submitLog}
                off=true
                now=item;
            }
        })
        if(off){ 
            return {code:1,data:now}
        }
    }else{
        return 0
    }
})
//个人提交的记录
Mock.mock("/addUserLog",(req,res)=>{
    let {userId,time,money,info}=JSON.parse(req.body);
    userList.forEach((item)=>{
        if(item.userId===userId){
            item.userMoney=item.userMoney*1+money*1;
            item.submitLog?item.submitLog.push({time,money,info}):item.submitLog=[{time,money,info}];
        }
    });
    return {code:1}
})
//获取总钱数
Mock.mock("/getAllMoney",(req,res)=>{
    let n=0;
    userList.forEach((item)=>{
        n+=item.userMoney*1
    });
    allMoney=n;
    return {code:1}
})
//应收 receivable 应付 handle 平均 average
//结算
Mock.mock("/account",(req,res)=>{
    userList.forEach((item)=>{
        item.average=allMoney/userList.length;
        item.receivable=item.userMoney-item.average>0?item.userMoney-item.average:0
        item.handle=item.userMoney-item.average<0?Math.abs(item.userMoney-item.average):0
    });
    return {code:1}
})