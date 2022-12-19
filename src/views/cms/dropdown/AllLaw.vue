<template>
    <div class="all-law">
        <h4>গ্রাম আদালত আইন, 2016 - Laws of Bangladesh</h4>
        <h5>ধারাসমূহ</h5>
        
        <div class="accordion-wrapper">
            <a-collapse  
            v-model="activeKey" 
            :expand-icon-position="expandIconPosition"
            >
                <a-collapse-panel
                v-for="(lawInfo, index) in lawList"
                :key="(index + 1).toString()"
                :header="(++index+'। '+lawInfo.question) | banglaNumber"
                >
                    <p>{{ lawInfo.law }}</p>
                </a-collapse-panel>
            </a-collapse>
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            lawList:[],
                          
            activeKey: '1',
            expandIconPosition: 'right'
        }
    },
      watch: {
        activeKey(key) {
            // console.log(key);
        },
    },
    beforeMount(){
        this.getLawList();
    },
    methods:{
     async getLawList(){
            let url="frontend/get/law/list"

            await this.$http.get(url)
             .then(response=>{
                this.lawList=response.data;
             })
             .catch(error=>{})
             .finally();
        }, 
    }
}
</script>

<style lang="scss" scoped>
    .all-law {
        padding: 20px 0;
        h4 {
            text-align: center;
        }
    }
</style>
