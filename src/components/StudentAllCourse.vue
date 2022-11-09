<template>
  <div id="coursesTable"></div>
</template>

<script>
import Timetables from 'timetables';

export default {
  name: 'StudentAllCourse',
  mounted() {

    this.selectAll();


  },
  methods: {
    selectAll() {
      this.axios({
        method: "get",
        url: "/student/course/selectAlready",
      }).then(resp => {
        if (resp.data.code == 200) {
          this.courseList = resp.data.data;
        } else if (resp.data.code == 404) {
          this.$message.error("查询失败");
        } else {
          this.$message.error(resp.data.msg);
        }
      })
    }
  },
  watch: {
    courseList: {
      handler() {
        this.timetables = new Timetables({
          el: '#coursesTable',
          timetables: this.courseList,
          week: this.week,
          timetableType: this.timetableType,
          highlightWeek: this.highlightWeek,
          styles: this.styles
        });
      },
      deep: true
    }
  },
  data() {
    return {
      courseList: [
        []
      ],

      timetableType: [
        [{index: '1', name: '8:30'}, 1],
        [{index: '2', name: '9:30'}, 1],
        [{index: '3', name: '10:30'}, 1],
        [{index: '4', name: '11:30'}, 1],
        [{index: '5', name: '12:30'}, 1],
        [{index: '6', name: '14:30'}, 1],
        [{index: '7', name: '15:30'}, 1],
        [{index: '8', name: '16:30'}, 1],
        [{index: '9', name: '17:30'}, 1],
        [{index: '10', name: '18:30'}, 1],
        [{index: '11', name: '19:30'}, 1],
        [{index: '12', name: '20:30'}, 1]
      ],
      week: ['周一', '周二', '周三', '周四', '周五'],
      highlightWeek: new Date().getDay(),
      styles: {
        Gheight: 50,
        leftHandWidth: 50,
        palette: ['#ff6633', '#843737']
      }
    };
  },
};
</script>

<style>
</style>
