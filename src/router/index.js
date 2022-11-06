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
                    {path: 'StudentHealthRecordManage', component: StudentHealthRecordManage, meta: {title: "学生申报管理"}},
                    {path: 'TeacherHealthRecordManage', component: TeacherHealthRecordManage, meta: {title: "老师申报管理"}},

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
                    {path: 'StudentLeave', component: StudentLeave, meta: {title: '我的请假'}},
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
router.afterEach((to, from) => {
    document.title = to.meta.title
})

export default router
