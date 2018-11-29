
<template>
    <section>
        <!-- <h1>Create a Cheer and Invite Your Friends!</h1> -->
        <section calss="add-form">
            <h5>STEP 2 OF 3</h5>
            <h1>What will you talk about?</h1>
            <input v-model="categoryTxt"
                   type="text"
                   placeholder="Search for a topic"
                   @input="getCategories">
            <div class="categories-holder flex flex-wrap">
                <div class="category-select" v-for="category in categories" :key="category.name">{{category.name}}</div>
            </div>
        </section>

        
    </section>
</template>

<script>

import categoriesService from '../../services/categories-service.js';

export default {
    data() {
        return {
            categoryTxt: '',
            categories: []
        }
    },
    methods: {
        getCategories() {
            categoriesService.query(this.categoryTxt)
        .then(res => {
            console.log('categories', res);
            
            this.categories = res
        });
        }
    },
    created() {
        this.getCategories()
    }
}
</script>

<style>
    
    .category-select {

        padding: 10px;
        margin: 10px;
        border: 1px lightgrey solid;
        border-radius: 20px;
        cursor: pointer;
    }

    .category-select:hover {
        background-color: rgba(211, 211, 211, 0.249) 
    }

    input {
        width: 500px;
        height: 50px;
        border-radius: 30px;
    }

    .add-form {
        margin: 15px;
    }
</style>
