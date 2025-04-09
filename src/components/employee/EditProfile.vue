<template>
  <div class="edit-profile">
    <h2>📋 Thông tin cá nhân</h2>
    <form @submit.prevent="saveProfile">
      <div class="form-group">
        <label>👤 Họ tên:</label>
        <input v-model="profile.name" required placeholder="Nhập họ tên..." />
      </div>

      <div class="form-group">
        <label>📧 Email:</label>
        <input type="email" v-model="profile.email" required placeholder="Nhập email..." />
      </div>

      <div class="form-group">
        <label>📞 Số điện thoại:</label>
        <input v-model="profile.phone" required placeholder="Nhập số điện thoại..." />
      </div>

      <button type="submit">💾 Lưu thông tin</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: {
        name: '',
        email: '',
        phone: ''
      }
    };
  },
  methods: {
    saveProfile() {
      localStorage.setItem(`profile_${this.$route.params.username}`, JSON.stringify(this.profile));
      alert('Cập nhật thành công!');
    },
    loadProfile() {
      const saved = localStorage.getItem(`profile_${this.$route.params.username}`);
      if (saved) this.profile = JSON.parse(saved);
    }
  },
  mounted() {
    this.loadProfile();
  }
}
</script>

<style scoped>
.edit-profile {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #555;
}

input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
}

button {
  width: 100%;
  padding: 14px;
  background-color: #28a745;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #218838;
}
</style>
