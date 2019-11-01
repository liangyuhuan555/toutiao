// 1定义state
export const state = ()=>({
    userinfo:{
        token:'',
        user:{}
    }
});
// 2定义 mutations
export const mutations = {
    setUser(state,userinfo){
        state.userinfo=userinfo
    }
}
// 3定义异步 actions
export const actions = {
    setUser(context,formdata){
      return  this.$axios.post('/accounts/login',formdata)
        .then(res=>{
            context.commit('setUser',res.data)
            // 把用户信息存入本地存储中
            localStorage.setItem('userinfo',JSON.stringify(res.data));
        })
    }
}