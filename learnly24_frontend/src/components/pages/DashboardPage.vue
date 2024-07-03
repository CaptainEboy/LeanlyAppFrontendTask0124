<template>
    <layout-div>
       <div class="row justify-content-md-center">
         <div class="col-12">
             <nav class="navbar navbar-expand-lg navbar-light bg-light">
                 <div class="container-fluid">
                     <a class="navbar-brand" href="#">Dashboard</a>
                     <div class="d-flex">
                         <ul class="navbar-nav">
                             <li class="nav-item">
                                 <a @click="logoutAction()" class="nav-link " aria-current="page" href="#">Logout</a>
                             </li>
                         </ul>
                     </div>
                 </div>
             </nav>
             <h2 class="text-center mt-5">Welcome, {{user?.name}}!</h2  >
         </div>
       </div>
    </layout-div>

    <div class="input-group mb-3">
        <input type="text" v-model="searchTerm" placeholder="Search products" class="form-control">
        <button class="btn btn-outline-secondary" type="button" @click="fetchProducts">Search</button>
        <ul>
      <!-- <li v-for="product in products" :key="(name)">
        {{ product.name }}
      </li> -->
    </ul>

    
    </div>

 </template>
   
 <script>
 import axios from 'axios';
 import LayoutDiv from '../LayoutDiv.vue';
   
 export default {
   name: 'DashboardPage',
   components: {
     LayoutDiv,
   },
   data() {
     return {
       user: {},
       searchTerm: '',
     };
   },
   created() {
     this.getUser();
     if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
       this.$router.push('/')
     }else {
       this.getUser();
     }
  
   },
   methods: {
        fetchProducts() {
            // var myAuthToken = localStorage.getItem('token');
            // console.log(myAuthToken);
            var myHeaders = new Headers();
            myHeaders.append("x-auth-token", localStorage.getItem('token'));

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch("http://127.0.0.1:3000/api/products/phone", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        },


     getUser() {
         axios.get('/api/user', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
         .then((r) => {
            this.user = r.data;
            return r
         })
         .catch((e) => {
            return e
         });
     },
  
     logoutAction () {
       axios.post('/api/logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
       .then((r) => {
           localStorage.setItem('token', "")
           this.$router.push('/')
           return r
       })
       .catch((e) => {
         return e
       });
     }
  
   },
 };
 </script>