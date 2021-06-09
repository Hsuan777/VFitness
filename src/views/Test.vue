<template>
  <div class="home">
    <loading :active="isLoading"></loading>
    <input type="button" value="loading" @click="startLoading">
    <input type="button" value="alert" @click="startAlert">
    <Form v-slot="{ errors }">
      <Field id="email" name="email" type="email"
      class="form-control" :class="{ 'is-invalid': errors['email'] }"
      placeholder="請輸入 Email" rules="email|required" v-model="user.email"></Field>
      <error-message name="email" class="invalid-feedback"></error-message>
    </Form>
    <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1"
      data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown button
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      user: {
        email: '',
      },
      isLoading: false,
    };
  },
  methods: {
    startLoading() {
      this.isLoading = true;
      console.log(process.env.VUE_APP_API_URL);
      console.log(process.env.VUE_APP_API_PATH);
      setTimeout(() => {
        this.isLoading = false;
        this.$swal(`${'1'}`);
      }, 1000);
    },
  },
  name: 'Home',
};
</script>
