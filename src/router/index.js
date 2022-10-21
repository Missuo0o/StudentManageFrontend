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
Vue.use(VueRouter)


// eslint-disable-next-line no-unused-vars
export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/AdminIndex',
            component:AdminIndex,
            children:[
                { path: 'UpdatePassword',component: UpdatePassword},
                {path: 'MyInformation',component: AdminInformation},
                {path: 'StudentInformationManage',component: StudentInformationManage},
                {path: 'TeacherInformationManage',component: TeacherInformationManage}

            ]
        },
        {
            path: '/StudentIndex',
            component: StudentIndex,
            children: [
                { path: 'UpdatePassword', component: UpdatePassword},
                { path: 'MyInformation', component: StudentInformation},
            ]
        },
        {
            path: '/TeacherIndex',
            component: TeacherIndex,
            children: [
                { path: 'UpdatePassword', component: UpdatePassword},
                { path: 'MyInformation', component: TeacherInformation},
            ]
        },
        {
            path: '/forget',
            component: FogetPassword
        }
    ]
})
