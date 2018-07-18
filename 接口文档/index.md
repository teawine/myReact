#用户登入(#对比密码)
`/login`

# 创建用户
`/createUser`

##传递参数
字段名|类型|必须|说明
-|-|-|-
userid|int|T|
username|string|T|
moneybase|float|F|

##返回数据
字段名|类型|说明
-|-|-
msg|string|
code|1-成功 0-失败 2-重复|

#修改用户
`/changeUser`

# 删除用户
`/removeUser`

#获取总钱数
`/getAllMoney`

#获取所有用户以及用户的金额
`/getAllUsers`

#获取指定用户的提交记录
`/onlyUser`

#个人提交的记录
`/addUserLog`

#结算
`/account`


