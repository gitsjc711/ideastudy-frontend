<template>  
    <div>  
      <h1 style="text-align: center;">课程表</h1>  
      <el-table  
        :data="courses"  
        style="width: 100%"  
        border  
        stripe  
      >  
        <el-table-column  
          prop="id"  
          label="课程ID"  
          width="180"  
        ></el-table-column>  
        <el-table-column  
          prop="name"  
          label="课程名称"  
          width="180"  
        ></el-table-column>  
        <el-table-column  
          prop="teacher.name"  
          label="任课教师"  
          width="180"  
        ></el-table-column>  
        <el-table-column  
          prop="description"  
          label="课程状态"  
          width="180"  
        ></el-table-column>  
      </el-table>  
    </div>  
  </template>
  <script>
  import axios from 'axios';
  
  export default {
    data() {
        return {
            courses: []
        };
    },
    async created() {
        const response = await axios.get('http://localhost:8080/courses');
        this.courses = response.data;
    }
  };
  </script>
  
  <style>
  table {
    margin: 0 auto;
    /* Center the table horizontally */
    width: 80%;
    /* Adjust the width of the table */
    font-size: 16px;
    /* Increase the font size for better readability */
  }
  
  th,
  td {
    padding: 10px;
    /* Add padding to the table cells */
    text-align: center;
    /* Center the content of the table cells */
  }
  
  h1 {
    text-align: center;
    /* Center the heading */
    font-size: 24px;
    /* Increase the font size for better visibility */
    margin-bottom: 20px;
    /* Add some space below the heading */
  }
  </style>