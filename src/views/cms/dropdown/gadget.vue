<template>
    <div class="media">
        <b-row class="text-center mt-5">
            <b-col cols="12">
                <h2>গ্রাম আদালত গেজেট, ২০১৬ - Laws of Bangladesh </h2>
            </b-col>
        </b-row>
        <table class="table text-center mt-5">
            <thead >
                <tr>
                    <th colspan="8"> <h5> গ্রাম আদালত গেজেট </h5></th>
                    
                </tr>
                <tr class="table-secondary">
                    <th colspan="1">প্রকাশের তারিখ </th>
                    <th colspan="6">বিবরন</th>
                    <th colspan="1">ডাউনলোড</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="(dataInfo,index) in gadgetList">
                    <th colspan="1">{{dataInfo.created_at | formatDateBd}}</th>
                    <th colspan="6">
                        {{dataInfo.title}}
                    </th>
                    <th style="font-size:25px" colspan="1"> 
                        <a :href="dataInfo.gadgetLink" target="_blank" download="pdf" > 
                            <b-icon icon="file-earmark-fill" variant="danger"></b-icon> 
                        </a> 
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
           gadgetList:[],
        }
    },
    beforeMount(){
        this.getGadgetList();
    },
    methods: {

         getGadgetList(){
        let url="frontend/get/gadget/list"

         this.$http.get(url)
         .then(response=>{
            this.gadgetList=response.data;
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