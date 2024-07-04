<!-- <template>
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
  </style> -->
  <template>  
    <div class="background">  
      <img src="../assets/background.png" alt="Background Image" class="background-image">  
      <!-- 如果你希望保留一个空的 div 作为覆盖层，可以保留下面的 div，但通常对于图片背景来说这不是必需的 -->  
      <!-- <div class="background-cover"></div> -->  
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
  /* 如果需要，可以取消注释以设置背景色，但现在我们有图片了 */  
  /* background-color: #c0e4f3; */  
  z-index: -99999;  
  overflow: hidden; /* 防止图片溢出 */  
}  
  
.background-image {  
  width: 100%;  
  height: 100%;  
  object-fit: cover; /* 保持图片的宽高比，同时填充整个容器 */  
}  
  
/* 如果保留了 .background-cover，并且想给它一些样式，可以在这里添加 */  
/* .background-cover {  
  /* 样式 */  
/* } */  
</style>