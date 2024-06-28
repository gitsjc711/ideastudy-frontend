<template>
  <div id="app">
     <router-view />
  </div>
</template>
<script>
export default  {
  name:  'App',
  created() {
    if(this.$router.path !== '/'){
      //this.$router.replace('/')
      this.$router.replace('/').catch(err => {  
        // 如果捕获到 NavigationDuplicated 错误，则忽略它  
        if (err.name === 'NavigationDuplicated') {  
          console.log('Ignored NavigationDuplicated: already on the desired route.')  
        } else {  
          // 对于其他错误，你可能想要重新抛出或进行其他处理  
          throw err  
        }  
      })  
    }
  }
}
</script>


<style lang="less">
html,body,h3,p{
  margin: 0;
  padding: 0;
}
</style>
