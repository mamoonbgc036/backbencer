<template>
  <BaseLayout>
    <div class="page-wrapper full-page">
      <div class="page-content d-flex align-items-center justify-content-center">
        <div class="row w-100 mx-0 auth-page">
          <div class="col-md-8 col-xl-6 mx-auto">
            <div class="card">
              <div class="row">
                <div class="col-md-4 pe-md-0">
                  <div class="auth-side-wrapper">
                    <img
                      src="/login.png"
                      alt="login"
                      id="login_image"
                    />
                  </div>
                </div>
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
<script>
import BaseLayout from "../BaseLayout.vue";
export default {
  components: {
    BaseLayout,
  },
};
</script>

<style>
#login_image {
  height: 100%;
  width: 100%;
}
</style>