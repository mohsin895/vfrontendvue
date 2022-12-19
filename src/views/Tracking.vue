<template>
    <div class="tracking">
        <h2>মামলার তথ্য :</h2>
        <form @submit.prevent="getCaseDetails()">
            <div class="case-no">
                <h5>মামলা নং :</h5>
                <input 
                type="text" 
                placeholder="মামলা  নাম্বরটি দিন"
                v-model="caseNo"
                required
                >
                <div class="random-code">
                    <div 
                    class="regenerate-btn" 
                    title="Regenerate"
                    @click="regenerate"
                    >
                        <b-icon icon="arrow-repeat"/>
                    </div>
                    <div class="code">
                        {{randomNumber}}
                    </div>
                </div>
                <input 
                type="text" 
                placeholder="ছবিতে পদর্শীত কোডটি দিন"
                v-model="validationCode"
                required
                >
                <div class="button-group">
                    <button class="btn-global-success" >
                        এগিয়ে যান
                    </button>
                    <button 
                    type="reset" 
                    class="btn-global-success"
                    @click="trackingResult = false"
                    >
                        বাতিল করুন
                    </button>
                </div>
            </div>
        </form>
        <div 
        class="tracking-page-result"
        v-if="trackingResult"
        >
            <table class="table text-center table-border">
                <thead>
                    <tr>
                         <th>মামলার নম্বর</th>
                        <th>মামলা গ্রহণের তারিখ</th>
                        <th>ইউনিয়ন,উপজেলা,জেলা</th>
                        <th>আবেদনকারীর নাম</th>
                        <th>প্রতিবাদীর নাম</th>
                        <th>সাক্ষীগণের নাম</th>
                        <th>বিরোধের বিষয়বস্তু</th>
                        <th>অপশনস</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                       <th>{{caseInfos.id | banglaNumber}}</th>
                        <td>{{caseInfos.created_at | formatDateBd}}</td>
                        <td>
                            <slot v-if="caseInfos.union_info!=null">
                                {{caseInfos.union_info.bn_name}}<br>
                            </slot>
                            <slot v-if="caseInfos.upazila_info!=null">
                                {{caseInfos.upazila_info.bn_name}}<br>
                            </slot>
                            <slot v-if="caseInfos.district_info!=null">
                                {{caseInfos.district_info.bn_name}}<br>
                            </slot>
                        </td>
                        <td>
                            <slot v-for="applicantInfo,applicantIndex in caseInfos.applicant_infos">
                                {{++applicantIndex | banglaNumber}}. {{applicantInfo.name}}<br>
                            </slot>
                        </td>
                        <td>
                            <slot v-for="oppositorInfo,oppositorIndex in caseInfos.oppositor_infos">
                                {{++oppositorIndex | banglaNumber}}. {{oppositorInfo.name}}<br>
                            </slot>
                        </td>
                        <td>
                            <slot v-for="witnessInfo,witnessIndex in caseInfos.witness_infos">
                                {{++witnessIndex | banglaNumber}}. {{witnessInfo.name}}<br>
                            </slot>
                        </td>
                        <td style="max-width:30px;">{{caseInfos.caseTitle}}</td>
                        <td>
                           <slot v-if="caseInfos.isOrdered==1">
                               আদেশ দেয়া হয়েছে
                           </slot>
                           <slot v-if="caseInfos.isDegreed==1">
                                অসম্পূর্ণ 
                           </slot>
                           <slot v-if="caseInfos.isMutual==1">
                               সমাধান হয় নাই 
                           </slot>
                           <slot v-if="caseInfos.isOngoing==1">
                               বিচারাধিন
                           </slot>
                           <slot v-if="caseInfos.isTransfer==1">
                               উচ্চ আদালতে পাঠানো হয়েছে
                           </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            randomNumber: null,
            numberArray: [1,3,4,5,0],
            validationCode: null,
            trackingResult: false,
            caseNo: null,
            caseInfos:[],
            
        }
    },
    methods: {
        async searchCase(){
            let url="frontend/search/case/info?dataId="+this.caseNo;

            await this.$http.get(url)
             .then(response=>{
                if(response.data.msgFlag==true){
                    this.caseInfos=response.data.dataInfo;
                     this.trackingResult = true;
                    toast.success({
                        position: 'topRight',
                        title: response.data.msg,
                    });
                }
                else{
                     this.trackingResult = false;
                    toast.warning({
                        position: 'topRight',
                        title: response.data.errMsg,
                    });
                }
               
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        regenerate() {
            let num = this.numberArray.sort(function(a, b){return 0.5 - Math.random()});
            this.randomNumber = num.join('');
        },
        getCaseDetails() {
            if (this.randomNumber === this.validationCode) {
                // this.trackingResult = true;
                // console.log(this.form);
                this.searchCase();
            } else {
                toast.error({
                    position: 'topRight',
                    title: 'আপনার কোডটি সঠিক নয়',
                });         
            }
        }
    },
    mounted() {
        this.regenerate();
    }
}
</script>

<style lang="scss" scoped>
.tracking {
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    h2 {
        text-align: center;
    }
    .case-no {
        width: fit-content;
        margin: auto;
        input {
            min-width: 300px;
            border: none;
            background: #bceebc;
            padding: 5px 10px;
            border-radius: 5px;
        }
        input:focus {
            outline: none;
        }
    }
    .random-code {
        min-width: 300px;
        margin: 20px 0;
        height: 100px;
        background: #bceebc;
        .regenerate-btn {
            cursor: pointer;
            float: right;
            background: white;
            padding: 2px 5px;
        }
        .code {
            height: inherit;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 3rem;
        }
    }
    .tracking-page-result {
        overflow-x: auto;
        margin: 30px 0;
        table tr {
            border: 1px solid black;
            td {
                white-space: nowrap;
                padding: 30px 10px;
            }
        }
        /*table tr:nth-child(1) {
            background: white;
        }
        table tr:nth-child(2) {
            background: #98e198;
            text-align: center;
        }
        */
    }
}
</style>
