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
                    {path: 'UpdatePassword', component: UpdatePassword, meta: {title: '更新密码'}},
                    {path: 'MyInformation', component: AdminInformation, meta: {title: '我的信息'}},
                    {path: 'StudentInformationManage', component: StudentInformationManage, meta: {title: '学生管理'}},
                    {path: 'TeacherInformationManage', component: TeacherInformationManage, meta: {title: '辅导员界面'}},
                    {path: 'AdminInformationManage', component: AdminInformationManage, meta: {title: '管理员管理'}},
                    {path: 'StudentRecordManage', component: StudentRecordManage, meta: {title: "学生公告"}}
                ]
            },
            {
                path: '/StudentIndex',
                component: StudentIndex,
                meta: {title: '学生主页'},
                children: [
                    {path: 'UpdatePassword', component: UpdatePassword, meta: {title: '更新密码'}},
                    {path: 'MyInformation', component: StudentInformation, meta: {title: '我的信息'}},
                ]
            },
            {
                path: '/TeacherIndex',
                component: TeacherIndex,
                meta: {title: '辅导员主页'},
                children: [
                    {path: 'UpdatePassword', component: UpdatePassword, meta: {title: '更新密码'}},
                    {path: 'MyInformation', component: TeacherInformation, meta: {title: '我的信息'}},
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
