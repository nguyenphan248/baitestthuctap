import { createRouter, createWebHistory } from 'vue-router'

// Import các component
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import AdminDashboard from '../components/admin/Dashboard.vue'
import ManageEmployees from '../components/admin/ManageEmployees.vue'
import ManagePositions from '../components/admin/ManagePositions.vue'
import ManageWorkingHours from '../components/admin/ManageWorkingHours.vue'
import ManageAttendance from '../components/admin/ManageAttendance.vue'
import ManageSalary from '../components/admin/ManageSalary.vue'
import ManageRewardDiscipline from '../components/admin/ManageRewardDiscipline.vue'
import ManageStatistics from '../components/admin/ManageStatistics.vue'
import EmployeeDashboard from '../components/employee/EmployeeDashboard.vue'
import Attendance from '../components/employee/Attendance.vue'
import EditProfile from '../components/employee/EditProfile.vue'


//import AdminDashboard from '@/components/admin/Dashboard.vue'
//import EmployeeDashboard from '@/components/employee/Dashboard.vue'

// Khai báo các route
const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/admin', component: AdminDashboard },
    { path: '/admin/employees', component: ManageEmployees },
    { path: '/admin/positions', component: ManagePositions },
    { path: '/admin/working-hours', component: ManageWorkingHours },
    { path: '/admin/attendance', component: ManageAttendance },
    { path: '/admin/salaries', component: ManageSalary },
    { path: '/admin/rewards', component: ManageRewardDiscipline },
    { path: '/admin/statistics', component: ManageStatistics },
    {
        path: '/employee',
        component: EmployeeDashboard
    },
    {
        path: '/employee/attendance',
        component: Attendance
    },
    {
        path: '/employee/profile',
        component: EditProfile
    },

    // { path: '/admin', name: 'AdminDashboard', component: AdminDashboard },
    // { path: '/employee', name: 'EmployeeDashboard', component: EmployeeDashboard },
]

// Tạo router instance
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
