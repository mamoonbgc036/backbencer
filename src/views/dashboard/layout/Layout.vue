<template>
  <BaseLayout>
    <nav class="sidebar">
      <div class="sidebar-header">
        <a
          href="#"
          class="sidebar-brand"
        >
          To Do App
        </a>
        <div class="sidebar-toggler not-active">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="sidebar-body ps ps--active-y">
        <ul class="nav">
          <li class="nav-item nav-category">Main</li>
          <li class="nav-item">
            <router-link
                to="/user/dashboard"
                class="nav-link"
            >
                  <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-box link-icon"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z">
                </path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line
                  x1="12"
                  y1="22.08"
                  x2="12"
                  y2="12"
                ></line>
              </svg>
              <span class="link-title">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item nav-category">web apps</li>
          <li class="nav-item">
              <ul class="nav sub-menu">
                <li class="nav-item">
                  <router-link
                    to="/user/dashboard"
                    class="nav-link"
                  >All Tasks</router-link>
                </li>
              </ul>
          </li>
        </ul>
        <div
          class="ps__rail-x"
          style="left: 0px; bottom: 0px;"
        >
          <div
            class="ps__thumb-x"
            tabindex="0"
            style="left: 0px; width: 0px;"
          ></div>
        </div>
        <div
          class="ps__rail-y"
          style="top: 0px; height: 565px; right: 0px;"
        >
          <div
            class="ps__thumb-y"
            tabindex="0"
            style="top: 0px; height: 454px;"
          ></div>
        </div>
      </div>
    </nav>

    <div class="page-wrapper">

      <nav class="navbar">
        <div class="navbar-content">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="profileDropdown"
                role="button"
                @click.prevent="toggleDropdown"
                :aria-expanded="isDropdownOpen ? 'true' : 'false'"
              >
                <img
                  class="wd-30 ht-30 rounded-circle"
                  src="/user.png"
                  alt="profile"
                >
              </a>
              <div
                class="dropdown-menu p-0"
                id="logout"
                :class="{ show: isDropdownOpen }"
                aria-labelledby="profileDropdown"
              >
                <div class="d-flex flex-column align-items-center border-bottom py-3">
                  <div class="mb-3">
                    <img
                      class="wd-80 ht-80 rounded-circle"
                      src="/user.png"
                      alt=""
                    >
                  </div>
                  <div class="text-center">
                    <p class="tx-16 fw-bolder">{{ user.name }}</p>
                    <p class="tx-12 text-muted">{{ user.email }}</p>
                  </div>
                </div>
                <ul class="list-unstyled p-1">
                  <li class="dropdown-item py-2">
                    <a
                      href="javascript:;"
                      @click.prevent="logout"
                      class="text-body ms-0"
                    >
                      <i
                        class="me-2 icon-md"
                        data-feather="log-out"
                      ></i>
                      <span>Log Out</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div class="page-content">
        <div class="d-flex justify-content-between align-items-center flex-wrap grid-margin">

          <slot></slot>
        </div>

      </div>

      <footer class="footer d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 border-top small">
        <p class="text-muted mb-1 mb-md-0">Copyright © 2022 <a
            href="https://www.nobleui.com"
            target="_blank"
          >Interactive</a>.</p>
        <p class="text-muted">Handcrafted With <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-heart mb-1 text-primary ms-1 icon-sm"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
            </path>
          </svg></p>
      </footer>
    </div>
  </BaseLayout>
</template>
<script>
import axios_client from "../../../axios-client";
import BaseLayout from "../../BaseLayout.vue";
export default {
  data() {
    return {
      user: [],
      isCollapsed: false,
      isDropdownOpen: false,
    };
  },
  components: {
    BaseLayout,
  },
  mounted() {
    this.user = this.$getUser()[1];
  },
  methods: {
    logout() {
      axios_client
        .post("/v1/user/logout")
        .then(({ data }) => {
          localStorage.clear();
          this.$router.push("/");
          console.log(data);
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
};
</script>
<style>
#table {
  width: 100%;
}

#logout {
  margin-top: 320px;
}
</style>