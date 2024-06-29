<template>  
    <el-tree  
        class="tree"  
        :data="data"  
        :props="defaultProps"  
        :highlight-current="true"  
        @node-click="handleNodeClick"  
    >  
        <template slot-scope="{ node, data }">  
            <div>   
                <i v-if="isFirstLevel(node)" class="el-icon-s-unfold"></i>
                <span>{{ node.label }}</span>  
            </div>  
        </template>  
    </el-tree>  
</template>  
<script>
export default {
    data() {
        return {
            data: [
                {
                    label: "一级 1",
                    number: 2,
                    children: [
                        {
                            label: "二级 1-1",
                            number: 2,
                            children: [
                                {
                                    label: "三级 1-1-1",
                                    number: 12,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "一级 2",
                    number: 23,
                    children: [
                        {
                            label: "二级 2-1",
                            number: 222,
                            children: [
                                {
                                    label: "三级 2-1-1",
                                    number: 21,
                                },
                            ],
                        },
                        {
                            label: "二级 2-2",
                            number: 1,
                            children: [
                                {
                                    label: "三级 2-2-1",
                                    number: 0,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "一级 3",
                    number: 12,
                    children: [
                        {
                            label: "二级 3-1",
                            number: 2,
                            children: [
                                {
                                    label: "三级 3-1-1",
                                    number: 234,
                                },
                            ],
                        },
                        {
                            label: "二级 3-2",
                            number: 2,
                            children: [
                                {
                                    label: "三级 3-2-1",
                                    number: 2,
                                },
                            ],
                        },
                    ],
                },
            ],
            defaultProps: {
                children: "children",
                label: "label",
            },
        };
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        isFirstLevel(node) {  
            // 假设根节点的 level 是 0，第一级子节点的 level 是 1  
            return node.level === 1;  
        },  
        // 注意：Element UI 的 el-tree 并没有直接提供节点展开/收起的监听事件  
        // 你可能需要通过其他方式（如递归遍历节点并设置状态）来模拟这个功能  
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