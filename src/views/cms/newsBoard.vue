<template>
    <div class="media">
        <table class="table text-center mt-5">
            <thead >
                <tr>
                    <th colspan="8"> <h5> নিউজ বোর্ড </h5></th>
                    
                </tr>
                <tr class="table-secondary">
                    <th colspan="1">প্রকাশের তারিখ </th>
                    <th colspan="6">বিবরন</th>
                    <th colspan="1">ডাউনলোড</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="(dataInfo,index) in noticeList">
                    <th colspan="1">{{dataInfo.publishDate | formatDateBd}}</th>
                    <th colspan="6">
                        {{dataInfo.title}}
                    </th>
                    <th style="font-size:25px" colspan="1"> 
                        <a :href="dataInfo.noticeLink" target="_blank" download="pdf" > 
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
           noticeList:[],
        }
    },
    beforeMount(){
        this.getNotice();
    },
    methods: {

         getNotice(){
        let url="frontend/get/notice/for/board"

         this.$http.get(url)
         .then(response=>{
            this.noticeList=response.data;
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