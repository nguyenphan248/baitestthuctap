<template>
  <div class="dashboard">
    <h2>👋 Xin chào, Nhân viên</h2>
    <p>Chọn chức năng bên dưới để bắt đầu:</p>

    <div class="menu">
      <router-link to="/employee/attendance" class="card">
        <div class="icon">🕘</div>
        <div class="label">Chấm công</div>
      </router-link>

      <router-link to="/employee/profile" class="card">
        <div class="icon">👤</div>
        <div class="label">Thông tin cá nhân</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeDashboard'
}
</script>

<style scoped>
.dashboard {
  padding: 40px 20px;
  text-align: center;
  background: #f4f7fa;
  min-height: 100vh;
}

h2 {
  margin-bottom: 10px;
  font-size: 2rem;
  color: #333;
}

p {
  margin-bottom: 30px;
  color: #666;
}

.menu {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 30px 40px;
  border-radius: 16px;
  text-decoration: none;
  color: #333;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  width: 200px;
  transition: transform 0.2s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.label {
  font-size: 1.1rem;
  font-weight: 600;
}
</style>
