<template>
  <div class="login-page">
    <div class="login-box">
      <h2>Đăng nhập</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            placeholder="Tên đăng nhập"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            placeholder="Mật khẩu"
            required
          />
        </div>
        <div class="form-group">
          <label>Vai trò:</label>
          <select v-model="role" required>
            <option disabled value="">-- Chọn vai trò --</option>
            <option value="admin">Admin</option>
            <option value="employee">Nhân viên</option>
          </select>
        </div>
        <button type="submit" class="btn-login">Đăng nhập</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <p v-if="role !== 'admin'" class="register-link">
        Bạn chưa có tài khoản?
        <router-link to="/register">Đăng ký ngay</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      role: '',
      error: ''
    }
  },
  methods: {
    handleLogin() {
      this.error = ''
      if (this.role === 'admin') {
        if (this.username === 'nguyenks' && this.password === '25251325Az') {
          this.$router.push('/admin')
        } else {
          this.error = 'Tài khoản admin không hợp lệ!'
        }
        return
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(
        u =>
          u.username === this.username &&
          u.password === this.password &&
          u.role === 'employee'
      )

      if (!user) {
        this.error = 'Sai thông tin nhân viên!'
        return
      }

      this.$router.push('/employee')
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #74ebd5, #9face6);
}

.login-box {
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

input,
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: 0.3s;
}

input:focus,
select:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.4);
}

.btn-login {
  width: 100%;
  padding: 12px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-login:hover {
  background: #357ab8;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.register-link {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.register-link a {
  color: #4a90e2;
  text-decoration: none;
  font-weight: bold;
}
</style>
