<template>
  <Layout>
    <div class="col-md-8 ps-md-0">
      <div class="auth-form-wrapper px-4 py-5">
        <a
          href="#"
          class="noble-ui-logo logo-light d-block mb-2"
        >backbencer</a>
        <h5 class="text-warning fw-normal mb-4">Login</h5>
        <h2
          class="text-danger"
          v-show="errors.warning"
        >
          {{ errors.warning }}
        </h2>
        <form
          class="forms-sample"
          @submit.prevent="login"
        >
          <div class="mb-3">
            <label
              for="userEmail"
              class="form-label text-info"
            >Email</label>
            <input
              type="text"
              v-model="form.email"
              class="form-control"
              id="phone"
              placeholder="Email"
              name="phone"
            />
            <p
              class="text-danger"
              v-if="errors.phone != undefined"
            >
              {{ errors.email[0] }}
            </p>
          </div>
          <div class="mb-3">
            <label
              for="userPassword"
              class="form-label text-info"
            >Password</label>
            <input
              type="password"
              v-model="form.password"
              class="form-control"
              id="userPassword"
              autocomplete="current-password"
              placeholder="Password"
              name="password"
            />
            <p
              class="text-danger"
              v-if="errors.password != undefined"
            >
              {{ errors.password[0] }}
            </p>
          </div>
          <div class="form-check mb-3">
            <input
              type="checkbox"
              class="form-check-input"
              id="authCheck"
            />
            <label
              class="form-check-label"
              for="authCheck"
            >
              Remember me
            </label>
          </div>
          <div>
            <button
              type="submit"
              class="btn btn-primary me-2 mb-2 mb-md-0 text-white"
            >
              Login
            </button>
          </div>
        </form>
        <router-link
          to="/auth/register"
          class="d-block mt-3 text-warning"
        >Not a user? Sign up</router-link>
      </div>
    </div>
  </Layout>
</template>
<script>
import axios_client from "../../axios-client";
import Layout from "./Layout.vue";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  components: {
    Layout,
  },
  methods: {
    login() {
      axios_client
        .post("/v1/user/login", this.form)
        .then(({ data }) => {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          this.$router.push("/user/dashboard");
        })
        .catch((errors) => {
          if (errors.response && errors.response.data.warning != undefined) {
            this.errors = errors.response.data;
            console.log(errors.response.data);
          } else {
            this.errors = errors.response.data.errors;
            console.log(errors.response.data);
          }
        });
    },
  },
};
</script>