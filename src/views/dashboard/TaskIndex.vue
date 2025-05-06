<template>
  <Layout>
    <div class="container py-5">
    <div class="card shadow rounded-4">
      <div class="card-header bg-primary text-white rounded-top-4">
        <h4 class="mb-0">📝 My Tasks</h4>
      </div>

      <!-- Pop-up Form -->
    <transition name="fade-slide">
      <div
        v-if="editTaskData != null || updateErrors.length > 0"
        class="position-fixed top-50 start-50 translate-middle bg-dark text-white rounded shadow p-4"
        style="width: 100%; max-width: 400px; z-index: 1051;"
      >
        <!-- Close Button -->
        <span
          class="position-absolute top-0 end-0 text-danger fs-4 fw-bold me-3 mt-2"
          style="cursor: pointer;"
          @click="editTaskData = null"
        >
          ❌
        </span>

        <h5 class="mb-3">Edit Task</h5>

        <form @submit.prevent="updateTask">
          <div class="mb-3">
            <label class="form-label text-white">Title</label>
            <input v-model="editTaskData.title" type="text" class="form-control bg-light text-dark" />
            <small v-if="updateErrors.title" class="text-danger">{{ updateErrors.title[0] }}</small>
          </div>

          <div class="mb-3">
            <label class="form-label text-white">Body</label>
            <textarea v-model="editTaskData.body" class="form-control bg-light text-dark"></textarea>
            <small v-if="updateErrors.body" class="text-danger">{{ updateErrors.body[0] }}</small>
          </div>

          <button type="submit" class="btn btn-success w-100">Update</button>
        </form>
      </div>
    </transition>
      <div class="card-body">

        <!-- Add Task Form -->
        <form @submit.prevent="addTask" class="mb-4">
          <div class="row g-2">
            <div class="col-md-5">
              <input type="text" v-model="newTask.title" class="form-control" placeholder="Task Title">
              <small v-if="errors.title" class="text-danger">{{ errors.title[0] }}</small>
            </div>
            <div class="col-md-5">
              <input type="text" v-model="newTask.body" class="form-control" placeholder="Task Description">
              <small v-if="errors.body" class="text-danger">{{ errors.body[0] }}</small>
            </div>
            <div class="col-md-2">
              <button type="submit" class="btn btn-success w-100">Add Task</button>
            </div>
          </div>
        </form>

        <!-- Task List -->
        <ul class="list-group" v-if="tasks.length">
          <li
            v-for="task in tasks"
            :key="task.id"
            class="list-group-item d-flex justify-content-between align-items-center"
            :class="{ 'list-group-item-success': task.is_completed }"
          >
            <div>
              <input
                type="checkbox"
                @change="toggleComplete(task)"
                class="form-check-input me-2"
              />
              <strong :class="{ 'text-decoration-line-through': task.is_completed }">
                {{ task.title }}
              </strong>
              <p class="mb-0 small text-muted">{{ task.body }}</p>
            </div>
            <div>
              <button @click="editTask(task)" class="btn btn-sm btn-outline-primary me-2">✏️</button>
              <button @click="deleteTask(task.id)" class="btn btn-sm btn-outline-danger">🗑️</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </Layout>
</template>
<script>
import axios_client from '../../axios-client';
import Layout from "./layout/Layout.vue";
import Swal from "sweetalert2";
export default {
  name: 'TaskList',
  data() {
    return {
      showForm : false,
      tasks: [],
      newTask: { title: '', body: '' },
      editTaskData: null,
      errors: {},
      updateErrors : {},
    };
  },
  components : {
    Layout
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      const res = await axios_client.get('/v1/tasks');
      this.tasks = res.data;
    },
    async addTask() {
      try {
        const res = await axios_client.post('/v1/tasks', this.newTask);
        this.tasks.unshift(res.data);
        this.newTask = { title: '', body: '' };
        this.errors = {};
      } catch (err) {
        this.errors = err.response.data.errors || {};
      }
    },
    editTask(task) {
      this.editTaskData = task;
    },
    async updateTask() {
      try{
        const res = await axios_client.put(`/v1/tasks/${this.editTaskData.id}`, this.editTaskData);
        const index = this.tasks.findIndex(t => t.id === res.data.id);
        this.tasks[index] = res.data;
        this.editTaskData = null;
      } catch(err){
        this.updateErrors = err.response.data.errors || {};
      }
      
    },
     deleteTask(id) {
      // Use SweetAlert2 to confirm deletion
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios_client.delete(`/v1/tasks/${id}`);
          this.fetchTasks();
        }
      });
    },
    async toggleComplete(task) {
      await axios_client.patch(`/v1/tasks/${task.id}`, {
        is_completed: !task.is_completed
      });
      this.fetchTasks();
    }
  }
};
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>