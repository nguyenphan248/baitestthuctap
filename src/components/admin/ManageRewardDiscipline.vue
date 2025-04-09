<template>
  <div class="container">
    <h2>🏅 Quản lý Khen thưởng / Kỷ luật</h2>

    <form @submit.prevent="addEntry" class="form-box">
      <div class="form-group">
        <label>👤 Nhân viên:</label>
        <input v-model="form.employee" required placeholder="Nhập tên nhân viên" />
      </div>

      <div class="form-group">
        <label>📌 Loại:</label>
        <select v-model="form.type" required>
          <option value="Khen thưởng">Khen thưởng</option>
          <option value="Kỷ luật">Kỷ luật</option>
        </select>
      </div>

      <div class="form-group">
        <label>📝 Chi tiết:</label>
        <input v-model="form.description" required placeholder="Mô tả nội dung" />
      </div>

      <button type="submit" class="btn-save">➕ Thêm quyết định</button>
    </form>

    <h3>📋 Danh sách quyết định</h3>
    <table v-if="rewardList.length" class="styled-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Nhân viên</th>
          <th>Loại</th>
          <th>Chi tiết</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in rewardList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ entry.employee }}</td>
          <td :class="entry.type === 'Khen thưởng' ? 'reward' : 'discipline'">{{ entry.type }}</td>
          <td>{{ entry.description }}</td>
          <td>
            <button class="btn-delete" @click="deleteEntry(index)">🗑 Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-data">🚫 Chưa có quyết định nào.</p>
  </div>
</template>

<script>
export default {
  name: 'ManageRewardDiscipline',
  data() {
    return {
      form: {
        employee: '',
        type: 'Khen thưởng',
        description: ''
      },
      rewardList: []
    }
  },
  mounted() {
    const saved = localStorage.getItem('rewardDiscipline')
    if (saved) {
      this.rewardList = JSON.parse(saved)
    }
  },
  methods: {
    addEntry() {
      this.rewardList.push({ ...this.form })
      localStorage.setItem('rewardDiscipline', JSON.stringify(this.rewardList))
      this.form.employee = ''
      this.form.type = 'Khen thưởng'
      this.form.description = ''
    },
    deleteEntry(index) {
      this.rewardList.splice(index, 1)
      localStorage.setItem('rewardDiscipline', JSON.stringify(this.rewardList))
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

h2, h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

input, select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.btn-save {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: fit-content;
  align-self: flex-start;
}

.btn-save:hover {
  background-color: #0056b3;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
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

.reward {
  color: green;
  font-weight: bold;
}

.discipline {
  color: red;
  font-weight: bold;
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
