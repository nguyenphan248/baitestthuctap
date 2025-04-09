<template>
  <div class="attendance-management">
    <h2>📝 Quản lý chấm công</h2>

    <table v-if="attendanceList.length" class="styled-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Nhân viên</th>
          <th>Chức vụ</th>
          <th>Ca làm</th>
          <th>Ngày</th>
          <th>Giờ chấm</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in attendanceList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ entry.employeeName }}</td>
          <td>{{ entry.position }}</td>
          <td>{{ entry.shift }}</td>
          <td>{{ entry.date }}</td>
          <td>{{ entry.time }}</td>
          <td>
            <button @click="deleteEntry(index)" class="btn-delete">🗑 Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-data">🚫 Chưa có lượt chấm công nào.</p>
  </div>
</template>

<script>
export default {
  name: 'ManageAttendance',
  data() {
    return {
      attendanceList: []
    }
  },
  mounted() {
    this.loadAttendance()
  },
  methods: {
    loadAttendance() {
      this.attendanceList = JSON.parse(localStorage.getItem('attendance') || '[]')
    },
    deleteEntry(index) {
      if (confirm('Bạn có chắc muốn xoá lượt chấm công này?')) {
        this.attendanceList.splice(index, 1)
        localStorage.setItem('attendance', JSON.stringify(this.attendanceList))
      }
    }
  }
}
</script>

<style scoped>
.attendance-management {
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fafafa;
  font-size: 0.95rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

.styled-table thead {
  background-color: #f0f0f0;
  font-weight: bold;
}

.styled-table tbody tr:hover {
  background-color: #f9f9f9;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.btn-delete:hover {
  background-color: #b02a37;
}

.no-data {
  text-align: center;
  margin-top: 2rem;
  color: #888;
  font-style: italic;
}
</style>
