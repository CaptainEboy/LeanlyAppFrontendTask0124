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

    <!-- <form @submit.prevent="addProduct">
        <input type="text" v-model="productName" placeholder="Product Name">
        <input type="text" v-model="productDescription" placeholder="Product Description">
        <button type="submit">Add Product</button>
    </form> -->

    <div class="row justify-content-md-center mt-5">
             <div class="col-4">
                <div class="input-group mb-3">
                    <input type="text" v-model="searchTerm" placeholder="Search products" class="form-control">
                    <button class="btn btn-outline-secondary" type="button" @click="fetchProducts">Search</button>
                    <div>
                        {{ myApiResult }}
                    </div>
                </div>
                 <div class="card">
                     <div class="card-body">
                         <h5 class="card-title mb-4">Add New Products</h5>
                         <form>
                             <div class="mb-3">
                                 <label 
                                     htmlFor="productName"
                                     class="form-label">
                                     Product Name
                                 </label>
                                 <input 
                                     v-model="productName"
                                     type="text"
                                     class="form-control"
                                     id="productName"
                                     name="productName"
                                 />
                             </div>

                             <div class="mb-3">
                                 <label 
                                     htmlFor="productDescription"
                                     class="form-label">Product Description
                                 </label>
                                 <input 
                                     v-model="productDescription"
                                     type="text"
                                     class="form-control"
                                     id="productDescription"
                                     name="productDescription"
                                 />
                             </div>

                             <div class="mb-3">
                                 <label 
                                     htmlFor="productPrice"
                                     class="form-label"> Product Price
                                 </label>
                                 <input 
                                     v-model="productPrice"
                                     type="number"
                                     class="form-control"
                                     id="productPrice"
                                     name="productPrice"
                                 />
                             </div>


                             <div class="mb-3">
                                 <label 
                                     htmlFor="productimageURL"
                                     class="form-label"> Image URL
                                 </label>
                                 <input 
                                     v-model="productimageURL"
                                     type="url"
                                     class="form-control"
                                     id="productimageURL"
                                     name="productimageURL"
                                 />
                             </div>
                             
                             <div class="d-grid gap-2">
                                 <button 
                                     @click="addNewProducts()"
                                     type="button"
                                     class="btn btn-primary btn-block">Add New Products</button>
                             </div>
                         </form>
                     </div>
                 </div>
             </div>
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
       myApiResult: null, 
       productName: '',
       productDescription: '',
       productPrice:  0, // or any other default numeric value
       productimageURL: ''

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
        addNewProducts() {
            // alert("button working");
            var myHeaders = new Headers();
            myHeaders.append("x-auth-token", localStorage.getItem('token'));
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("name", this.productName);
            urlencoded.append("description", this.productDescription);
            urlencoded.append("price", this.productPrice);
            urlencoded.append("imageURL", this.productimageURL);

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };

            fetch("http://127.0.0.1:3000/products", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                alert("Product Added Successfuly . Search for product to find it");
            })
            .catch(error => console.log('error', error));
            },


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

            var mySearch= this.searchTerm;
            fetch(`http://127.0.0.1:3000/api/products/${mySearch}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                this.myApiResult = result

            })
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