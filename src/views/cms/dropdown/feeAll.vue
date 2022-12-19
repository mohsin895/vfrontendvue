<template>
    <div class="media">
        <b-row class="text-center mt-5">
            <b-col cols="12">
                <h5>গ্রাম আদালতের ফি সমুহ </h5>
            </b-col>
        </b-row>
        <b-row class="text-center mt-1">
            <b-col cols="12">
                <h2>গ্রাম আদালত গেজেট, ২০১৬ - Laws of Bangladesh </h2>
            </b-col>
        </b-row>
        
         <b-row class="mt-4">
            <b-col cols="12">
                <p v-html="feesText"></p>
            </b-col>
        </b-row>
    </div>
</template>

<script>

export default {
    data() {
        return {
           feesText:null,
        }
    },
    beforeMount(){
        this.getFormList();
    },
    methods: {

        getFormList(){
        let url="frontend/get/fess/info"

         this.$http.get(url)
         .then(response=>{
            this.feesText=response.data;
         })
         .catch(error=>{})
         .finally();
    },
        
    }
}

</script>

<style lang="scss" scoped>
.table th, td {
    border: 1px solid rgb(63, 63, 63);

}

</style>