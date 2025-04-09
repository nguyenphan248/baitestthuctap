<template>
  <div class="attendance-container">
    <div class="card">
      <h2>📅 Chấm công</h2>
      <p class="date">🗓️ Ngày hiện tại: <strong>{{ today }}</strong></p>

      <button @click="checkIn" :disabled="hasCheckedIn" class="checkin-btn">
        ✅ Chấm công hôm nay
      </button>

      <p v-if="hasCheckedIn" class="success-msg">🎉 Bạn đã chấm công hôm nay.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today: new Date().toISOString().split('T')[0],
      hasCheckedIn: false,
      username: this.$route.params.username || 'Nguyễn Văn A',
    };
  },
  methods: {
    checkIn() {
      const attendanceEntry = {
        employeeName: this.username,
        position: 'Nhân viên',
        shift: 'Ca sáng',
        date: this.today,
        time: new Date().toLocaleTimeString()
      };

      const existing = JSON.parse(localStorage.getItem('attendance') || '[]');
      existing.push(attendanceEntry);
      localStorage.setItem('attendance', JSON.stringify(existing));
      localStorage.setItem(`checkin_${this.today}_${this.username}`, 'true');
      this.hasCheckedIn = true;
    },
    checkExisting() {
      const checked = localStorage.getItem(`checkin_${this.today}_${this.username}`);
      if (checked) this.hasCheckedIn = true;
    }
  },
  mounted() {
    this.checkExisting();
  }
}
</script>

<style scoped>
.attendance-container {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.card {
  background-color: #fff;
  padding: 30px 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 450px;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.date {
  font-size: 16px;
  margin-bottom: 25px;
  color: #555;
}

.checkin-btn {
  background-color: #28a745;
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkin-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.checkin-btn:hover:enabled {
  background-color: #218838;
}

.success-msg {
  margin-top: 20px;
  color: green;
  font-weight: 600;
}
</style>
