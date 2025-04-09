<template>
  <div class="salary-management">
    <h2>💰 Quản lý lương nhân viên</h2>

    <div class="form-area">
      <label for="salaryInput">💵 Mức lương theo ca:</label>
      <input id="salaryInput" type="number" v-model.number="salaryPerShift" placeholder="Nhập lương/ca" />
      <button @click="saveSalaryRate">💾 Lưu mức lương</button>
    </div>

    <h3>📅 Bảng lương tháng hiện tại</h3>
    <table v-if="salaryTable.length" class="salary-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Nhân viên</th>
          <th>Số ca làm</th>
          <th>Lương 1 ca</th>
          <th>Tổng lương</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in salaryTable" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ entry.employee }}</td>
          <td>{{ entry.shifts }}</td>
          <td>{{ formatCurrency(entry.salaryPerShift) }}</td>
          <td class="total">{{ formatCurrency(entry.totalSalary) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-data">Không có dữ liệu lương.</p>
  </div>
</template>

<script>
export default {
  name: 'ManageSalary',
  data() {
    return {
      salaryPerShift: 200000, // mặc định 200k
      salaryTable: []
    }
  },
  mounted() {
    const savedRate = localStorage.getItem('salaryPerShift')
    if (savedRate) this.salaryPerShift = parseInt(savedRate)
    this.generateSalaryTable()
  },
  methods: {
    formatCurrency(num) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(num)
    },
    saveSalaryRate() {
      localStorage.setItem('salaryPerShift', this.salaryPerShift)
      this.generateSalaryTable()
      alert('✅ Đã cập nhật mức lương!')
    },
    generateSalaryTable() {
      const attendance = JSON.parse(localStorage.getItem('attendance') || '[]')
      const map = {}

      attendance.forEach(entry => {
        if (!map[entry.employeeName]) {
          map[entry.employeeName] = 0
        }
        map[entry.employeeName] += 1
      })

      this.salaryTable = Object.entries(map).map(([employee, shifts]) => ({
        employee,
        shifts,
        salaryPerShift: this.salaryPerShift,
        totalSalary: shifts * this.salaryPerShift
      }))
    }
  }
}
</script>

<style scoped>
.salary-management {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.salary-management h2,
.salary-management h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-area {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

input[type="number"] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 160px;
}

button {
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #0056b3;
}

.salary-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.salary-table th,
.salary-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

.salary-table th {
  background-color: #f0f0f0;
  color: #444;
}

.salary-table .total {
  font-weight: bold;
  color: #28a745;
}

.no-data {
  text-align: center;
  color: #888;
  margin-top: 1rem;
}
</style>
