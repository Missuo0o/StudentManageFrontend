import Vue from "vue"
import VueRouter from "vue-router";
import Login from '../components/Login'
import StudentIndex from '../components/StudentIndex'
import FogetPassword from '../components/ForgetPassword'
import UpdatePassword from '../components/UpdatePassword'
import StudentInformation from "../components/StudentInformation";
import TeacherIndex from "@/components/TeacherIndex";
import TeacherInformation from "@/components/TeacherInformation";
import AdminIndex from "@/components/AdminIndex";
import AdminInformation from "@/components/AdminInformation";
import StudentInformationManage from "@/components/StudentInformationManage";
import TeacherInformationManage from "@/components/TeacherInformationManage";
import AdminInformationManage from "@/components/AdminInformationManage";
import StudentRecordManage from "@/components/StudentRecordManage";
import TeacherRecordManage from "@/components/TeacherRecordManage";
import StudentRecord from "@/components/StudentRecord";
import TeacherRecord from "@/components/TeacherRecord";
import StudentRegister from "@/components/StudentRegister";
import StudentHealth from "@/components/StudentHealth";
import TeacherHealth from "@/components/TeacherHealth";
import StudentHealthRecord from "@/components/StudentHealthRecord";
import TeacherHealthRecord from "@/components/TeacherHealthRecord";
import StudentHealthRecordTeacher from "@/components/StudentHealthRecordTeacher";
import StudentHealthRecordManage from "@/components/StudentHealthRecordManage";
import TeacherHealthRecordManage from "@/components/TeacherHealthRecordManage";
import StudentLeave from "@/components/StudentLeave";
import StudentLeaveRecordTeacher from "@/components/StudentLeaveRecordTeacher";
import StudentLeaveRecord from "@/components/StudentLeaveRecord";
import StudentLeaveRecordManage from "@/components/StudentLeaveRecordManage";
import StudentCourse from "@/components/StudentCourse";
import StudentAllCourse from "@/components/StudentAllCourse";
import StudentCourseManage from "@/components/StudentCourseManage";
import StudentMyDormitory from "@/components/StudentMyDormitory";
import StudentPay from "@/components/StudentPay";
import StudentDormitory from "@/components/StudentDormitory";
import StudentPayManage from "@/components/StudentPayManage";
import StudentDormitoryManage from "@/components/StudentDormitoryManage";

Vue.use(VueRouter)

// eslint-disable-next-line no-unused-vars
const router = new VueRouter({
        routes: [
            {
                path: '/',
                component: Login,
                meta: {title: '登录界面'}
            },
            {
                path: '/AdminIndex',
                component: AdminIndex,
                meta: {title: '管理员界面'},
                children: [
                    {path: '/', component: StudentInformationManage, meta: {title: '学生管理'}},
                    {path: 'UpdatePassword', component: UpdatePassword, meta: {title: '更新密码'}},
                    {path: 'MyInformation', component: AdminInformation, meta: {title: '我的信息'}},
                    {path: 'StudentInformationManage', component: StudentInformationManage, meta: {title: '学生管理'}},
                    {path: 'TeacherInformationManage', component: TeacherInformationManage, meta: {title: '辅导员界面'}},
                    {path: 'AdminInformationManage', component: AdminInformationManage, meta: {title: '管理员管理'}},
                    {path: 'StudentRecordManage', component: StudentRecordManage, meta: {title: "学生公告管理"}},
                    {path: 'TeacherRecordManage', component: TeacherRecordManage, meta: {title: "老师公告管理"}},
                    {
                        path: 'StudentHealthRecordManage',
                        component: StudentHealthRecordManage,
                        meta: {title: "学生申报管理"}
                    },
                    {
                        path: 'TeacherHealthRecordManage',
                        component: TeacherHealthRecordManage,
                        meta: {title: "老师申报管理"}
                    },
                    {path: 'StudentLeaveRecordManage', component: StudentLeaveRecordManage, meta: {title: '学生请假管理'}},
                    {path: 'StudentCourseManage', component: StudentCourseManage, meta: {title: '学生选课管理'}},
                    {path: 'StudentPayManage', component: StudentPayManage, meta: {title: '学生缴费管理'}},
                    {path: 'StudentDormitoryManage', component: StudentDormitoryManage, meta: {title: '学生缴费管理'}},
                ]
            },
            {
                path: '/StudentIndex',
                component: StudentIndex,
                meta: {title: '学生主页'},
                children: [
                    {path: '/', component: StudentRegister, meta: {title: '入校登记'}},
                    {path: 'UpdatePassword', component: UpdatePassword, meta: {title: '更新密码'}},
                    {path: 'MyInformation', component: StudentInformation, meta: {title: '我的信息'}},
                    {path: 'StudentRecord', component: StudentRecord, meta: {title: '我的公告'}},
                    {path: 'StudentRegister', component: StudentRegister, meta: {title: '入校登记'}},
                    {path: 'StudentHealth', component: StudentHealth, meta: {title: '每日申报'}},
                    {path: 'StudentHealthRecord', component: StudentHealthRecord, meta: {title: '我的申报'}},
                    {path: 'StudentLeave', component: StudentLeave, meta: {title: '我要请假'}},
                    {path: 'StudentLeaveRecord', component: StudentLeaveRecord, meta: {title: '我的请假'}},
                    {path: 'StudentCourse', component: StudentCourse, meta: {title: '校园选课'}},
                    {path: 'StudentAllCourse', component: StudentAllCourse, meta: {title: '我的课程'}},
                    {path: 'StudentMyDormitory', component: StudentMyDormitory, meta: {title: '我的宿舍'}},
                    {path: 'StudentDormitory', component: StudentDormitory, meta: {title: '选取宿舍'}},
                    {path: 'StudentPay', component: StudentPay, meta: {title: '支付'}},

                ]
            },
            {
                path: '/TeacherIndex',
                component: TeacherIndex,
                meta: {title: '辅导员主页'},
                children: [
                    {path: '/', component: StudentHealthRecordTeacher, meta: {title: '学生申报'}},
                    {path: 'UpdatePassword', component: UpdatePassword, meta: {title: '更新密码'}},
                    {path: 'MyInformation', component: TeacherInformation, meta: {title: '我的信息'}},
                    {path: 'TeacherRecord', component: TeacherRecord, meta: {title: '我的公告'}},
                    {path: 'TeacherHealth', component: TeacherHealth, meta: {title: '每日申报'}},
                    {path: 'TeacherHealthRecord', component: TeacherHealthRecord, meta: {title: '我的申报'}},
                    {path: 'StudentHealthRecordTeacher', component: StudentHealthRecordTeacher, meta: {title: '学生申报'}},
                    {path: 'StudentLeaveRecordTeacher', component: StudentLeaveRecordTeacher, meta: {title: '学生请假'}},


                ]
            },
            {
                path: '/forget',
                component: FogetPassword,
                meta: {title: '忘记密码'}
            },
        ],
    }
)

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
    if (to.path === '/' || to.path === '/forget') {
        next()
    } else if (to.path === '/AdminIndex' || to.path === '/AdminIndex/UpdatePassword' || to.path === '/AdminIndex/MyInformation' || to.path === '/AdminIndex/StudentInformationManage' || to.path === '/AdminIndex/TeacherInformationManage' || to.path === '/AdminIndex/AdminInformationManage' || to.path === '/AdminIndex/StudentRecordManage' || to.path === '/AdminIndex/TeacherRecordManage' || to.path === '/AdminIndex/StudentHealthRecordManage' || to.path === '/AdminIndex/TeacherHealthRecordManage' || to.path === '/AdminIndex/StudentLeaveRecordManage' || to.path === '/AdminIndex/StudentCourseManage' || to.path === '/AdminIndex/StudentPayManage' || to.path === '/AdminIndex/StudentDormitoryManage') {
        if (JSON.parse(localStorage.getItem('userdata')).identity === 3) {
            next();
        } else {
            location.href = "/"
        }
    } else if (to.path === '/StudentIndex' || to.path === '/StudentIndex/UpdatePassword' || to.path === '/StudentIndex/MyInformation' || to.path === '/StudentIndex/StudentRecord' || to.path === '/StudentIndex/StudentRegister' || to.path === '/StudentIndex/StudentHealth' || to.path === '/StudentIndex/StudentHealthRecord' || to.path === '/StudentIndex/StudentLeave' || to.path === '/StudentIndex/StudentLeaveRecord' || to.path === '/StudentIndex/StudentCourse' || to.path === '/StudentIndex/StudentAllCourse' || to.path === '/StudentIndex/StudentMyDormitory' || to.path === '/StudentIndex/StudentDormitory' ||to.path === '/StudentIndex/StudentPay') {
        if (JSON.parse(localStorage.getItem('userdata')).identity === 1) {
            next();
        } else {
            location.href = "/"
        }
    } else if (to.path === '/TeacherIndex' || to.path === '/TeacherIndex/UpdatePassword' || to.path === '/TeacherIndex/MyInformation' || to.path === '/TeacherIndex/TeacherRecord' || to.path === '/TeacherIndex/TeacherHealth' || to.path === '/TeacherIndex/TeacherHealthRecord' || to.path === '/TeacherIndex/StudentHealthRecordTeacher' || to.path === '/TeacherIndex/StudentLeaveRecordTeacher') {
        if (JSON.parse(localStorage.getItem('userdata')).identity === 2) {
            next();
        } else {
            location.href = "/"
        }
    } else {
        location.href = "/"
    }
})
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    document.title = to.meta.title
})

export default router
