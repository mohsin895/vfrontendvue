<template>
    <div class="hide-related">
        
        <p v-html="content"></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
           content:null,
        }
    },
    beforeMount(){
        this.getFormList();
    },
    methods: {

    getFormList(){
        let dataId=this.$route.params.dataId;
        let url="frontend/get/dewyani/service/info?dataId="+dataId;

         this.$http.get(url)
         .then(response=>{
            this.content=response.data;
         })
         .catch(error=>{})
         .finally();
    },
        
    }
}

</script>

<style lang="scss" scoped>

</style>
