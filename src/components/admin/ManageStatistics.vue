<template>
  <div class="statistics">
    <h2>📊 Thống kê Hệ thống</h2>

    <div class="stat-grid">
      <div class="card blue">
        <h3>Tổng số nhân viên</h3>
        <p>{{ totalEmployees }}</p>
      </div>

      <div class="card green">
        <h3>Tổng số lần chấm công</h3>
        <p>{{ totalAttendances }}</p>
      </div>

      <div class="card orange">
        <h3>Tổng tiền lương đã chi</h3>
        <p>{{ formatCurrency(totalSalaries) }}</p>
      </div>

      <div class="card yellow">
        <h3>Số lượt khen thưởng</h3>
        <p>{{ totalRewards }}</p>
      </div>

      <div class="card red">
        <h3>Số lượt kỷ luật</h3>
        <p>{{ totalDisciplines }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManageStatistics',
  data() {
    return {
      totalEmployees: 0,
      totalAttendances: 0,
      totalSalaries: 0,
      totalRewards: 0,
      totalDisciplines: 0
    }
  },
  mounted() {
    // Dữ liệu demo
    this.totalEmployees = 12
    this.totalAttendances = 320
    this.totalSalaries = 240000000
    this.totalRewards = 7
    this.totalDisciplines = 2
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('vi-VN') + ' VNĐ'
    }
  }
}
</script>

<style scoped>
.statistics {
  padding: 40px;
  max-width: 1000px;
  margin: auto;
  text-align: center;
}

.statistics h2 {
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  background-color: #f5f5f5;
  padding: 24px;
  border-radius: 16px;
  color: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.card h3 {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
}

.card p {
  font-size: 24px;
  font-weight: bold;
}

/* Màu sắc từng loại thống kê */
.card.blue {
  background: #007bff;
}

.card.green {
  background: #28a745;
}

.card.orange {
  background: #fd7e14;
}

.card.yellow {
  background: #ffc107;
  color: #000;
}

.card.red {
  background: #dc3545;
}
</style>
