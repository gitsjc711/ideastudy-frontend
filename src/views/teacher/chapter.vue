<template>  
    <el-tree  
        class="tree"  
        :data="data"  
        :props="defaultProps"  
        :highlight-current="true"  
        @node-click="handleNodeClick"  
    >  
        <template slot-scope="{ node }">  <!--可以变成{node,data}来访问data数据-->
            <div>   
                <i v-if="isFirstLevel(node)" class="el-icon-s-unfold"></i>
                <span>{{ node.label }}</span>
            </div>  
        </template>  
    </el-tree>  
</template>  
<script>
 import { mapState,mapMutations} from 'vuex';
export default {
    computed:{
 ...mapState(["account","baseUrl","uid","courseId"]),
},
    data() {
        return {
            data: [],
            defaultProps: {
                children: "children",
                label: "label",
            },
        };
    },
    created(){
      this.findChapter()
    },
    methods: {
        
        findChapter(){
            this.$axios.post(this.baseUrl+"/chapter/findChapter",{
                id:this.courseId
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.data=res.data
                }
            ).catch(error=>{console.error(error);})
        },
        handleNodeClick(data) {
            console.log(data);
        },
        isFirstLevel(node) {    
            return node.level === 1;  
        },  
    },
};
</script>
<style scoped>
.el-tree {
    background: #ffffff;
    color: #333333;
    width: 600px;
}
/* 节点样式 */
::v-deep .el-tree-node__content {
    height: 55px !important;
    border-left: 4px solid #ffffff !important;
}
/* 点击后的样式 */
::v-deep .el-tree-node:focus > .el-tree-node__content {
    background-color: #e4f5ee !important;
    border-left: 4px solid #21af73 !important;
}
/* 高亮 */
::v-deep .el-tree-node.is-current > .el-tree-node__content {
    background-color: #e4f5ee !important;
    border-left: 4px solid #21af73 !important;
}
 
/*  */
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
/* 每个节点后面内容样式 */

</style>