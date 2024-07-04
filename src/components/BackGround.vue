<template>
    <div class="background">
      <video muted autoplay loop class="background-video">
        <source src="../assets/4.mp4" type="video/mp4" />
      </video>
      <div class="background-cover"></div>
    </div>
  </template>
   
  <script>
  export default {
    name: "BackGround",
  };    
  </script>
   
  <style scoped>
  .background {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    /* background-color: #c0e4f3; */
    z-index: -99999;
  }
  .background-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .background-cover {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
  }
  </style>
  <!-- <template>  
    <div class="background">  
      <img src="../assets/star.png" alt="Background Image" class="background-image">  

    </div>  
</template>  
  
<script>  
export default {  
  name: "BackGround",  
};  
</script>  
  
<style scoped>  
.background {  
  position: fixed;  
  top: 0;  
  bottom: 0;  
  left: 0;  
  right: 0;  
  width: 100%;  
  height: 100%;  

  z-index: -99999;  
  overflow: hidden; /* 防止图片溢出 */  
}  
  
.background-image {  
  width: 100%;  
  height: 100%;  
  object-fit: cover; /* 保持图片的宽高比，同时填充整个容器 */  
}   
</style> -->