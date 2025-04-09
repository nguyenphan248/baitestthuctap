<template>
  <div class="admin-dashboard">
    <h2>👑 Admin Dashboard</h2>
    <nav>
      <ul>
        <li>
          <router-link to="/admin/employees">👥 Quản lý nhân sự</router-link>
        </li>
        <li>
          <router-link to="/admin/positions">🏷️ Quản lý chức vụ</router-link>
        </li>
        <li>
          <router-link to="/admin/working-hours">⏰ Quản lý giờ làm</router-link>
        </li>
        <li>
          <router-link to="/admin/attendance">📝 Quản lý chấm công</router-link>
        </li>
        <li>
          <router-link to="/admin/salaries">💰 Quản lý lương</router-link>
        </li>
        <li>
          <router-link to="/admin/rewards">🎖️ Khen thưởng / Kỷ luật</router-link>
        </li>
        <li>
          <router-link to="/admin/statistics">📊 Thống kê</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard'
}
</script>

<style scoped>
.admin-dashboard {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}

h2 {
  margin-bottom: 2rem;
  color: #333;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

nav li {
  background-color: #f7f9fc;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: background-color 0.2s, transform 0.2s;
}

nav li:hover {
  background-color: #e6f0ff;
  transform: translateY(-2px);
}

a {
  display: block;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  text-decoration: none;
  color: #007bff;
}

a:hover {
  color: #0056b3;
}
</style>
