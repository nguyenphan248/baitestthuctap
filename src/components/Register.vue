<template>
  <div class="register-container">
    <h2>🔐 Đăng ký tài khoản</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <input v-model="username" placeholder="👤 Tên đăng nhập" required />
      </div>
      <div class="form-group">
        <input v-model="password" type="password" placeholder="🔒 Mật khẩu" required />
      </div>
      <div class="form-group">
        <input v-model="fullName" placeholder="📝 Họ và tên" required />
      </div>
      <div class="form-group">
        <input v-model="email" type="email" placeholder="✉️ Email" required />
      </div>
      <button type="submit" class="btn">Đăng ký</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <p class="login-link">Đã có tài khoản? <router-link to="/">Đăng nhập</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      fullName: '',
      email: '',
      error: ''
    }
  },
  methods: {
    register() {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const userExists = users.find(u => u.username === this.username)

      if (userExists) {
        this.error = 'Tên đăng nhập đã tồn tại!'
        return
      }

      const newUser = {
        username: this.username,
        password: this.password,
        fullName: this.fullName,
        email: this.email,
        role: 'employee'
      }

      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      alert('Đăng ký thành công!')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus {
  border-color: #007bff;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 0.5rem;
}

.login-link {
  margin-top: 1rem;
}
</style>
