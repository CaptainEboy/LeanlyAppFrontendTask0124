<!-- <template>
    <form @submit.prevent="login">
      <input type="text" v-model="email" placeholder="Username">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  </template> -->


<template>
    <layout-div>
         <div class="row justify-content-md-center mt-5">
             <div class="col-4">
                 <div class="card">
                     <div class="card-body">
                         <h5 class="card-title mb-4">Sign In</h5>
                         <form>
                             <!-- <p v-if="Object.keys(validationErrors).length != 0" class='text-center '><small class='text-danger'>Incorrect Email or Password</small></p> -->
                            
                             <div class="mb-3">
                                 <label 
                                     htmlFor="email"
                                     class="form-label">
                                         Email address
                                 </label>
                                 <input 
                                     v-model="email"
                                     type="email"
                                     class="form-control"
                                     id="email"
                                     name="email"
                                 />
                             </div>
                             <div class="mb-3">
                                 <label 
                                     htmlFor="password"
                                     class="form-label">Password
                                 </label>
                                 <input 
                                     v-model="password"
                                     type="password"
                                     class="form-control"
                                     id="password"
                                     name="password"
                                 />
                             </div>
                             <div class="d-grid gap-2">
                                 <button 
                                     @click="loginAction()"
                                     type="button"
                                     class="btn btn-primary btn-block">Login</button>
                                 <p class="text-center">Don't have account? 
                                     <router-link to="/register">Register here </router-link>
                                 </p>
                             </div>
                         </form>
                     </div>
                 </div>
             </div>
         </div>
          
    </layout-div>
 </template>
   
 <script>
//  import axios from 'axios';
 import LayoutDiv from '../LayoutDiv.vue';
   
 export default {
   name: 'LoginPage',
   components: {
     LayoutDiv,
   },
   data() {
     return {
         email:'',
         password:'',
         validationErrors:{},
        //  isSubmitting:false,
     };
   },
   //Check the token before the component mounts
   created() {
     if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
         this.$router.push('/dashboard')
     }
   },
   methods: {
      loginAction(){
        

        //  this.isSubmitting = true
        //  let payload = {
        //      email: this.email,
        //      password: this.password,
        //  }
         var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", this.email);
        urlencoded.append("password", this.password);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        // const apiUrl = process.env.API_URL;
        // fetch(`${apiUrl}/login`, requestOptions)
         fetch("http://127.0.0.1:3000/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem('token', result.token)
            this.$router.push('/dashboard')
            return result
        })
        .catch(error => console.log('error', error));


        //  axios.post('/api/login', payload)
        //    .then(response => {
        //      localStorage.setItem('token', response.data.token)
        //      this.$router.push('/dashboard')
        //      return response
        //    })
        //    .catch(error => {
        //      this.isSubmitting = false
        //     if (error.response.data.errors != undefined) {
        //          this.validationErrors = error.response.data.errors
        //      }
        //      if (error.response.data.error != undefined) {
        //          this.validationErrors = error.response.data.error
        //      }
        //      return error
        //    });

      }
   },


 };
 </script>