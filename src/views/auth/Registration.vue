<template>
  <!-- user(name, type=employer or worker or admin or company, image, password, mark),  -->
  <Layout>
    <div class="col-md-8 ps-md-0">
      <div class="auth-form-wrapper px-4 py-5">
        <a
          href="#"
          class="noble-ui-logo logo-light d-block mb-2"
        >backbencer</a>
        <h5 class="text-warning fw-normal mb-4">Create account.</h5>
        <form
          @submit.prevent="createUser"
          class="forms-sample"
        >
          <div class="mb-3">
            <label
              for="exampleInputUsername1"
              class="form-label text-info"
            >Name</label>
            <input
              type="text"
              v-model="form.name"
              class="form-control"
              id="exampleInputUsername1"
              autocomplete="Username"
              placeholder="Your name"
              name="name"
            />
            <p
              v-if="errors.name != undefined"
              class="text-danger"
            >
              {{ errors.name[0] }}
            </p>
          </div>
          <div class="mb-3">
            <label
              for="userEmail"
              class="form-label text-info"
            >Email</label>
            <input
              type="text"
              v-model="form.email"
              class="form-control"
              id="userEmail"
              placeholder="Phone number"
              name="phone"
            />
            <p
              v-if="errors.phone != undefined"
              class="text-danger"
            >
              {{ errors.email[0] }}
            </p>
          </div>
          <div
            class="mb-3"
            data-select2-id="7"
          >
            <label class="form-label">Select Type</label>
            <select
              class="js-example-basic-single form-select select2-hidden-accessible"
              data-width="100%"
              data-select2-id="1"
              tabindex="-1"
              aria-hidden="true"
              v-model="form.type"
            >
              <option
                value="1"
                data-select2-id="3"
              >Admin</option>
              <option
                value="2"
                data-select2-id="17"
              >User</option>
            </select>
            <p
              v-if="errors.type != undefined"
              class="text-danger"
            >
              {{ errors.type[0] }}
            </p>
          </div>
          <div class="mb-3">
            <label
              class="form-label text-info"
              for="formFile"
            >Image Upload</label>
            <input
              class="form-control"
              @input="form.image = $event.target.files[0]"
              name="image"
              type="file"
              id="formFile"
            />
            <p
              v-if="errors.image != undefined"
              class="text-danger"
            >
              {{ errors.image[0] }}
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
              v-if="errors.password != undefined"
              class="text-danger"
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
              class="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
            >
              Sign up
            </button>
          </div>
        </form>
        <router-link
          to="/"
          class="d-block mt-3 text-info"
        >Already a user? Sign in</router-link>
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
        name: "",
        email: "",
        type: "",
        password: "",
        image: null,
      },
      errors: [],
    };
  },
  components: {
    Layout,
  },
  methods: {
    createUser() {
      axios_client
        .postForm("/v1/user/register", this.form)
        .then(({ data }) => {
          if (data.token != undefined) {
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            this.$router.push("/user/dashboard");
          }
          this.$router.push("/");
        })
        .catch((errors) => {
          this.errors = errors.response.data.errors;
          console.log(errors.response.data.errors);
        });
    },
  },
};
</script>