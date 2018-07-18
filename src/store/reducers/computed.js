import {ADDUSER,CHANGEUSER,REMOVEUSER,INITDATA,ONLYUSER,ADDUSERLOG} from "../actions/index";;
let typeFn={
    [ADDUSER]:(state,action)=>{
        state.userList.push(action.obj)
    },
    [CHANGEUSER]:(state,action)=>{
        state.userList.forEach((item)=>{
            if(item.userId===action.obj.userId){
                item.userName=action.obj.userName;
            }
        })
    },
    [REMOVEUSER]:(state,action)=>{
        state.userList.forEach((item,index)=>{
            if(item.userId===action.removeId){
                state.userList.splice(index,1);
            }
        })
    },
    [INITDATA]:(state,action)=>{
        state.userList=action.userList;
        let n=0;
        state.userList.forEach((item)=>{
            n+=item.userMoney*1;
        })
        state.allMoney=n;
        state.userList.forEach((item)=>{
             //应收 receivable 应付 handle 平均 average
            item.average=state.allMoney/state.userList.length;
            item.receivable=item.userMoney-item.average>0?item.userMoney-item.average:0
            item.handle=item.userMoney-item.average<0?Math.abs(item.userMoney-item.average):0
        })
    },
    [ONLYUSER]:(state,action)=>{
        state.showList.name=action.obj.name;
        state.showList.submitLog=action.obj.arr;
    },
    [ADDUSERLOG]:(state,action)=>{
        let {userId,money}=action.obj;
        state.userList.forEach((item)=>{
            if(item.userId===userId){
                item.userMoney=item.userMoney*1+money*1;
                item.submitLog?item.submitLog.push(action.obj):item.submitLog=[action.obj];
            }
        })
    }
}
let computed=(state={userList:[],showList:{},allMoney:0},action)=>{
    typeFn[action.type]&&typeFn[action.type](state,action);
    return {...state,userList:[...state.userList],showList:{...state.showList}}
}

export default computed