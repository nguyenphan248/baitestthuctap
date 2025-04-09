<template>
  <div class="position-management">
    <h2>🏷️ Quản lý chức vụ</h2>

    <!-- Form thêm/sửa chức vụ -->
    <form @submit.prevent="isEdit ? updatePosition() : addPosition()" class="form-box">
      <input v-model="form.name" placeholder="Nhập tên chức vụ..." required />
      <button type="submit" class="btn-save">{{ isEdit ? '💾 Cập nhật' : '➕ Thêm' }}</button>
      <button v-if="isEdit" @click="cancelEdit" type="button" class="btn-cancel">❌ Huỷ</button>
    </form>

    <!-- Danh sách chức vụ -->
    <h3>📋 Danh sách chức vụ</h3>
    <table v-if="positions.length" class="styled-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên chức vụ</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pos, index) in positions" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ pos.name }}</td>
          <td>
            <button @click="editPosition(index)" class="btn-edit">✏️ Sửa</button>
            <button @click="deletePosition(index)" class="btn-delete">🗑 Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-data">🚫 Chưa có chức vụ nào.</p>
  </div>
</template>

<script>
export default {
  name: 'ManagePositions',
  data() {
    return {
      positions: [],
      form: { name: '' },
      isEdit: false,
      editIndex: null
    }
  },
  mounted() {
    this.loadPositions()
  },
  methods: {
    loadPositions() {
      this.positions = JSON.parse(localStorage.getItem('positions') || '[]')
    },
    savePositions() {
      localStorage.setItem('positions', JSON.stringify(this.positions))
    },
    addPosition() {
      const exists = this.positions.some(p => p.name.trim().toLowerCase() === this.form.name.trim().toLowerCase())
      if (exists) {
        alert('⚠️ Chức vụ đã tồn tại!')
        return
      }
      this.positions.push({ ...this.form })
      this.savePositions()
      this.resetForm()
    },
    editPosition(index) {
      this.isEdit = true
      this.editIndex = index
      this.form = { ...this.positions[index] }
    },
    updatePosition() {
      this.positions[this.editIndex] = { ...this.form }
      this.savePositions()
      this.resetForm()
    },
    deletePosition(index) {
      if (confirm('Bạn có chắc muốn xoá chức vụ này?')) {
        this.positions.splice(index, 1)
        this.savePositions()
      }
    },
    cancelEdit() {
      this.resetForm()
    },
    resetForm() {
      this.form = { name: '' }
      this.isEdit = false
      this.editIndex = null
    }
  }
}
</script>

<style scoped>
.position-management {
  max-width: 700px;
  margin: auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

h2, h3 {
  text-align: center;
  color: #333;
  margin-bottom: 1.2rem;
}

.form-box {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.form-box input {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
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
  background-color: #fafafa;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.styled-table th,
.styled-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.styled-table thead {
  background-color: #f0f0f0;
}

.btn-edit {
  background-color: #007bff;
  color: white;
  padding: 6px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.btn-edit:hover {
  background-color: #0056b3;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  padding: 6px 10px;
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
