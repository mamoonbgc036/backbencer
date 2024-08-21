<template>
  <Layout>
    <div
      class="row"
      id="table"
    >
      <div class="col-md-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h2 class="text-warning text-center mb-2">Add Product</h2>
            <form @submit.prevent="updat_product">
              <div class="forms-sample">
                <div class="row mb-3">
                  <div class="col">
                    <label class="form-label">Name</label>
                    <input
                      v-model="form.title"
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      autocomplete="off"
                      placeholder="Product name"
                    >
                    <p
                      v-if="errors.title"
                      v-html="errors.title"
                      class="text-danger"
                    ></p>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Description</label>
                    <textarea
                      v-model="form.description"
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      autocomplete="off"
                      placeholder="Product description"
                    ></textarea>
                    <p
                      v-if="errors.description"
                      v-html="errors.description"
                      class="text-danger"
                    ></p>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <label class="form-label">Old Price</label>
                    <input
                      v-model="form.old_price"
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      autocomplete="off"
                      placeholder="Product Old Price"
                    >
                    <p
                      v-if="errors.old_price"
                      v-html="errors.old_price"
                      class="text-danger"
                    ></p>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Current Price</label>
                    <input
                      v-model="form.price"
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      autocomplete="off"
                      placeholder="Product Current Price"
                    >
                    <p
                      v-if="errors.price"
                      v-html="errors.price"
                      class="text-danger"
                    ></p>
                  </div>
                </div>
                <div
                  class="row mb-3"
                  data-select2-id="7"
                >
                  <label class="form-label">Select Category</label>
                  <select
                    v-model="form.category_id"
                    class="js-example-basic-single form-select select2-hidden-accessible"
                    data-width="100%"
                    data-select2-id="1"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <option
                      v-for="depart in category.data"
                      :key="depart.id"
                      :value="depart.id"
                      data-select2-id="3"
                      :selected="depart.id === form.category_id"
                    >{{ depart.name }}</option>
                  </select>
                  <p
                    v-if="errors.category_id"
                    v-html="errors.category_id"
                    class="text-danger"
                  ></p>
                </div>
                <div
                  class="row mb-3"
                  data-select2-id="7"
                >
                  <label class="form-label">Select Unit</label>
                  <select
                    v-model="form.unit"
                    class="js-example-basic-single form-select select2-hidden-accessible"
                    data-width="100%"
                    data-select2-id="1"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <option
                      value="pc"
                      data-select2-id="3"
                    >pc</option>
                  </select>
                  <p
                    v-if="errors.unit"
                    v-html="errors.unit"
                    class="text-danger"
                  ></p>
                </div>
                <!-- <div
                  class="row mb-3"
                  data-select2-id="7"
                >
                  <div
                    id="myId"
                    ref="imageDropzone"
                    class="dropzone"
                  ></div>
                </div> -->
                <div class="row mb-3 text-center">
                  <div class="col">
                    <button
                      class="btn btn-primary w-25"
                      type="submit"
                    >Update</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
<script>
import { onMounted } from "vue";
import Layout from "../Layout.vue";
// import { Dropzone } from "dropzone";
import axios_client from "../../../axios-client";
export default {
  setup() {
    // onMounted(() => {
    //   const dropzone = new Dropzone("div#myId", {
    //     url: "/file/post", // URL for uploading files
    //     maxFilesize: 2, // Maximum file size in megabytes
    //     addRemoveLinks: true, // Show remove links for uploaded files
    //     autoProcessQueue: false,
    //   });

    //   // You can add event listeners or handle events here if needed
    //   dropzone.on("success", (file, response) => {
    //     console.log("File uploaded:", file);
    //     console.log("Server response:", response);
    //   });

    //   dropzone.on("error", (file, errorMessage, xhr) => {
    //     console.error("Error uploading file:", errorMessage);
    //   });
    // });

    return {};
    // Rest of your code...
  },
  data() {
    return {
      form: {
        title: "",
        description: "",
        old_price: "",
        price: "",
        category_id: "",
        unit: "",
      },
      category: [],
      errors: [],
    };
  },
  components: {
    Layout,
  },
  mounted() {
    //     const dropzone = new Dropzone('div#myId', {
    //   url: '/file/post', // URL for uploading files
    //   maxFilesize: 2, // Maximum file size in megabytes
    //   addRemoveLinks: true, // Show remove links for uploaded files
    //   autoProcessQueue: false,
    // })
    this.getCategory();
    this.getProductInfo();
  },

  methods: {
    getCategory() {
      axios_client
        .get("/v1/category")
        .then(({ data }) => {
          this.category = data;
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    updat_product() {
      // const formData = new FormData();
      // let dataToUpdate = this.form;
      // let dropzone = this.$refs.imageDropzone.dropzone;
      // let files = dropzone.files;
      // for (let i = 0; i < files.length; i++) {
      //   const file = files[i];
      //   formData.append("images[]", file);
      // }

      // formData.append("productData", JSON.stringify(this.form));

      axios_client
        .put(`/v1/product/${this.$route.params.id}`, this.form)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/user/product/index");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          // console.log(error.response.data.errors.description);
        });
    },
    async getProductInfo() {
      try {
        let product = await axios_client.get(
          `/v1/product/${this.$route.params.id}`
        );

        const { title, description, old_price, price, category_id, unit } =
          product.data.data;

        this.form = { title, description, old_price, price, category_id, unit };

        // let images = product.data.data.images;
        // for (let index = 0; index < images.length; index++) {
        //   let imageUrl = images[index].url;

        //   // Fetch the image
        //   let response = await fetch(imageUrl, { mode: "cors" });
        //   let blob = await response.blob();

        //   // Extract the filename from the URL
        //   let filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

        //   // Use the MIME type from the response if possible
        //   const fileToAdd = new File([blob], filename, {
        //     type: blob.type || "image/jpeg",
        //   });

        //   // Add the file to the Dropzone instance
        //   this.dropzone.addFile(fileToAdd);
        // }
      } catch (error) {
        // Handle any errors that occurred during fetching or processing
        console.error("Error fetching the product information:", error);
      }
    },
  },
};
</script>
<style>
@import "https://unpkg.com/dropzone@5/dist/min/dropzone.min.css";
</style>