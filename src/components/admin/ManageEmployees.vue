<template>
  <div class="employee-management">
    <h2>👥 Quản lý nhân sự</h2>

    <!-- Form thêm/sửa -->
    <form @submit.prevent="isEdit ? updateEmployee() : addEmployee()" class="form-box">
      <input v-model="form.username" placeholder="Tên đăng nhập" required />
      <input v-model="form.fullName" placeholder="Họ tên" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Mật khẩu" required />

      <div class="btn-group">
        <button type="submit" class="btn-save">
          {{ isEdit ? '💾 Cập nhật' : '➕ Thêm' }}
        </button>
        <button type="button" v-if="isEdit" @click="cancelEdit" class="btn-cancel">❌ Huỷ</button>
      </div>
    </form>

    <!-- Danh sách nhân viên -->
    <h3>📋 Danh sách nhân viên</h3>
    <table v-if="employees.length" class="styled-table">
      <thead>
        <tr>
          <th>Tên đăng nhập</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nv, index) in employees" :key="index">
          <td>{{ nv.username }}</td>
          <td>{{ nv.fullName }}</td>
          <td>{{ nv.email }}</td>
          <td>
            <button @click="editEmployee(index)" class="btn-edit">✏️ Sửa</button>
            <button @click="deleteEmployee(index)" class="btn-delete">🗑 Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-data">🚫 Chưa có nhân viên nào.</p>
  </div>
</template>

<script>
export default {
  name: 'ManageEmployees',
  data() {
    return {
      employees: [],
      form: {
        username: '',
        password: '',
        fullName: '',
        email: '',
        role: 'employee'
      },
      isEdit: false,
      editIndex: null
    }
  },
  mounted() {
    this.loadEmployees()
  },
  methods: {
    loadEmployees() {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      this.employees = users.filter(u => u.role === 'employee')
    },
    saveEmployees() {
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const nonEmployees = allUsers.filter(u => u.role !== 'employee')
      localStorage.setItem('users', JSON.stringify([...nonEmployees, ...this.employees]))
    },
    addEmployee() {
      const exists = this.employees.some(u => u.username === this.form.username)
      if (exists) {
        alert('⚠️ Tên đăng nhập đã tồn tại!')
        return
      }
      this.employees.push({ ...this.form })
      this.saveEmployees()
      this.resetForm()
    },
    editEmployee(index) {
      this.isEdit = true
      this.editIndex = index
      this.form = { ...this.employees[index] }
    },
    updateEmployee() {
      this.employees[this.editIndex] = { ...this.form }
      this.saveEmployees()
      this.resetForm()
    },
    deleteEmployee(index) {
      if (confirm('Bạn có chắc muốn xoá nhân viên này?')) {
        this.employees.splice(index, 1)
        this.saveEmployees()
      }
    },
    cancelEdit() {
      this.resetForm()
    },
    resetForm() {
      this.form = {
        username: '',
        password: '',
        fullName: '',
        email: '',
        role: 'employee'
      }
      this.isEdit = false
      this.editIndex = null
    }
  }
}
</script>

<style scoped>
.employee-management {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

h2, h3 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-box {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 2rem;
}

.form-box input {
  flex: 1 1 200px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.btn-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-save {
  background-color: #28a745;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.btn-save:hover {
  background-color: #218838;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.btn-cancel:hover {
  background-color: #5a6268;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.styled-table th,
.styled-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

.styled-table thead {
  background-color: #f0f0f0;
  font-weight: bold;
}

.btn-edit {
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  margin-right: 5px;
  cursor: pointer;
}
.btn-edit:hover {
  background-color: #0056b3;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.btn-delete:hover {
  background-color: #a71d2a;
}

.no-data {
  text-align: center;
  color: #999;
  margin-top: 1rem;
}
</style>
