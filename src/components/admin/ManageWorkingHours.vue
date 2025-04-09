<template>
  <div class="working-hours-management">
    <h2>⏰ Quản lý giờ làm</h2>

    <!-- Form thêm/sửa ca -->
    <form @submit.prevent="isEdit ? updateShift() : addShift()">
      <input v-model="form.name" placeholder="Tên ca (ví dụ: Ca sáng)" required />
      <input type="time" v-model="form.startTime" required />
      <input type="time" v-model="form.endTime" required />

      <div class="form-actions">
        <button type="submit" class="btn primary">{{ isEdit ? 'Cập nhật' : 'Thêm' }}</button>
        <button v-if="isEdit" type="button" @click="cancelEdit" class="btn cancel">Huỷ</button>
      </div>
    </form>

    <!-- Danh sách ca làm -->
    <table class="shift-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên ca</th>
          <th>Bắt đầu</th>
          <th>Kết thúc</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(shift, index) in shifts" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ shift.name }}</td>
          <td>{{ shift.startTime }}</td>
          <td>{{ shift.endTime }}</td>
          <td>
            <button @click="editShift(index)" class="btn small edit">Sửa</button>
            <button @click="deleteShift(index)" class="btn small delete">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ManageWorkingHours',
  data() {
    return {
      shifts: [],
      form: {
        name: '',
        startTime: '',
        endTime: ''
      },
      isEdit: false,
      editIndex: null
    }
  },
  mounted() {
    this.loadShifts()
  },
  methods: {
    loadShifts() {
      this.shifts = JSON.parse(localStorage.getItem('shifts') || '[]')
    },
    saveShifts() {
      localStorage.setItem('shifts', JSON.stringify(this.shifts))
    },
    addShift() {
      const duplicate = this.shifts.some(s => s.name === this.form.name)
      if (duplicate) {
        alert('Tên ca đã tồn tại!')
        return
      }
      this.shifts.push({ ...this.form })
      this.saveShifts()
      this.resetForm()
    },
    editShift(index) {
      this.isEdit = true
      this.editIndex = index
      this.form = { ...this.shifts[index] }
    },
    updateShift() {
      this.shifts[this.editIndex] = { ...this.form }
      this.saveShifts()
      this.resetForm()
    },
    deleteShift(index) {
      if (confirm('Bạn có chắc muốn xoá ca làm này?')) {
        this.shifts.splice(index, 1)
        this.saveShifts()
      }
    },
    cancelEdit() {
      this.resetForm()
    },
    resetForm() {
      this.form = {
        name: '',
        startTime: '',
        endTime: ''
      }
      this.isEdit = false
      this.editIndex = null
    }
  }
}
</script>

<style scoped>
.working-hours-management {
  max-width: 800px;
  margin: 40px auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

form input {
  flex: 1 1 250px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

table.shift-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.shift-table th,
.shift-table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

.shift-table thead {
  background-color: #f5f5f5;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn.primary {
  background-color: #007bff;
  color: #fff;
}

.btn.cancel {
  background-color: #6c757d;
  color: #fff;
}

.btn.small {
  padding: 6px 12px;
  font-size: 14px;
}

.btn.edit {
  background-color: #ffc107;
  color: #000;
}

.btn.delete {
  background-color: #dc3545;
  color: #fff;
}

.btn:hover {
  opacity: 0.9;
}
</style>
