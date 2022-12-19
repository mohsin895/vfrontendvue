<template>
    <div class="media">
        <table class="table text-center mt-5">
            <thead >
                <tr>
                    <th colspan="8"> <h5> নোটিশ বোর্ড </h5></th>
                    
                </tr>
                <tr class="table-secondary">
                    <th colspan="1">প্রকাশের তারিখ </th>
                    <th colspan="6">বিবরন</th>
                    <th colspan="1">ডাউনলোড</th>
                </tr>

            </thead>
            <tbody>
                <slot v-for="(dataInfo,index) in noticeList.data">
                    <tr >
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
                </slot>
            </tbody>
            <tfoot>
            <tr>
                <th colspan="8">
                    <paginate
                      :page-count="lastPage"
                      :click-handler="dataByPaginate"
                      :prev-text="'<'"
                      :next-text="'>'"
                      :container-class="'pagination justify-content-end'"
                      :page-class="'page-item'"
                      :page-link-class="'page-link'"
                      :prev-class="'page-item'"
                      :prev-link-class="'page-link'"
                      :next-class="'page-item'"
                      :next-link-class="'page-link'"
                      :first-last-button="true"
                      :first-button-text="'<<'"
                      :last-button-text="'>>'"
                     
                      >

                     <span slot="prevContent">Changed previous button</span>
                      <span slot="nextContent">Changed next button</span>
                      <span slot="breakViewContent">
                        <svg width="16" height="4" viewBox="0 0 16 4">
                          <circle fill="#999999" cx="2" cy="2" r="2" />
                          <circle fill="#999999" cx="8" cy="2" r="2" />
                          <circle fill="#999999" cx="14" cy="2" r="2" />
                        </svg>
                      </span>
                    </paginate>
                </th>
            </tr>
        </tfoot>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
           noticeList:[],
           lastPage:1,
           pageNo:1,
        }
    },
    beforeMount(){
        this.getNotice();
    },
    methods: {

         getNotice(){
            let url="frontend/get/notice/list?page="+this.pageNo;

             this.$http.get(url)
             .then(response=>{
                    this.noticeList=response.data;
                    this.lastPage=this.noticeList.last_page;
             })
             .catch(error=>{})
             .finally();
        },

        dataByPaginate(pageIndex){
         this.pageNo=pageIndex;
         this.getNotice();
        },
        
    }
}

</script>

<style lang="scss" scoped>
.table th, td {
    border: 1px solid rgb(63, 63, 63);

}

</style>