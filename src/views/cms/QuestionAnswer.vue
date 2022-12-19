<template>
    <div class="all-law">
        <h4>প্রশ্নোত্তরে গ্রাম আদালত</h4>
        <h6>গ্রাম আদালত আইন, 2016 - Laws of Bangladesh</h6>
        <div class="accordion-wrapper">
            <a-collapse  
            v-model="activeKey" 
            :expand-icon-position="expandIconPosition"
            >
                <a-collapse-panel
                v-for="(questionInfo, index) in questionList"
                :key="(index + 1).toString()"
                :header="(++index+'। '+questionInfo.question) | banglaNumber"
                >
                    <p>{{ questionInfo.answer }}</p>
                </a-collapse-panel>
            </a-collapse>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            questionList:[],
           
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
        this.getQuestionList();
    },
    methods:{
      getQuestionList(){
            let url="frontend/get/question/list"

             this.$http.get(url)
             .then(response=>{
                this.questionList=response.data;
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
        h4,
        h6 {
            text-align: center;
        }
    }
</style>
