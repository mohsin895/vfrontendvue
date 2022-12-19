<template>
    <div class="slip">
        <!-- heading -->
        <div class="heding">
            <p>ফরম-১১</p>
            <p>[বিধি ১৪ (৩)  দ্রষ্টব্য]</p>
            <h5>মামলার স্লিপ</h5>
        </div>
        <!-- search -->
        <div class="search-bar">
            <label for="search">Search</label>
            <input type="text" id="search" v-model="caseNo" placeholder="Case No">
            <input type="text" id="phone" v-model="phone" placeholder="Your Phone Number">
            <button class="btn-global-success" @click="searchCase">Submit</button>
        </div>
        <!-- table -->
        <div class="case-slip-table">
            
        </div>
        <!-- slip form -->
        <div class="case-slip" id="printForm" v-if="trackingResult">
            <div class="page-two" >
                <h3>আবেদনকারীর মনোনয়ন ফরম -১</h3>
                <p>সবিনয়ে আপনার অবগতির জন্য জানাইতেছি যে, <br>
                আবেদনকারী <input v-model="applicantName" type="text" readonly> বনাম প্রতিবাদী <input type="text" readonly v-model="oppositorName"> ধরন
                <input type="text" readonly v-model="crimeTitle"> 
                সংক্রান্ত বিরোধের প্রেক্ষিতে গঠিতব্য গ্রাম আদালতে আমার পক্ষে নিম্নেবণিত ব্যক্তিগনকে সদস্য হিসেবে 
                মনোনীত করিলাম
                </p>
                
                <b-row cols="1" cols-lg="2" v>
                    <b-col>
                        <h6>ইউনিয়ন পরিষদের সদস্য</h6>
                        <div class="mb-3">
                            <label for="member_name" class="form-label"><strong>নাম:*</strong></label>
                            <!-- <input type="text" v-model="unionMember.name" class="form-control" id="member_name" required> -->
                         <v-select :options="memberList" :reduce="memberList => memberList.id" label="name" v-model="unionMember.id" @input="setMemberSelected">
                            <template v-slot:option="option">
                                {{option.name}}
                            </template>
                         </v-select>
                         <input type="hidden" v-model="unionMember.name">
                        </div>
                        <div class="mb-3">
                            <label for="m_g_name" class="form-label"><strong>পিতা/স্বামী:*</strong></label>
                            <input type="text" v-model="unionMember.g_name" class="form-control" id="m_g_name" required>
                        </div>
                        <div class="mb-3">
                            <label for="m_village" class="form-label"><strong>গ্রাম:*</strong></label>
                            <input type="text" v-model="unionMember.village" class="form-control" id="m_village" required>
                        </div>
                        <div class="mb-3">
                            <label for="m_ward" class="form-label"><strong>ওয়াড নং:*</strong></label>
                            <!-- <input type="number" v-model="unionMember.wardNo" class="form-control" id="m_ward" required> -->
                            <select class="form-control" required v-model="unionMember.wardNo">
                                <option value="১ নং ওয়াড"> ১ নং ওয়াড</option>
                                <option value="২ নং ওয়াড"> ২ নং ওয়াড</option>
                                <option value="৩ নং ওয়াড"> ৩ নং ওয়াড</option>
                                <option value="৪ নং ওয়াড"> ৪ নং ওয়াড</option>
                                <option value="৫ নং ওয়াড"> ৫ নং ওয়াড</option>
                                <option value="৬ নং ওয়াড"> ৬ নং ওয়াড</option>
                                <option value="৭ নং ওয়াড"> ৭ নং ওয়াড</option>
                                <option value="৮ নং ওয়াড"> ৮ নং ওয়াড</option>
                                <option value="৯ নং ওয়াড"> ৯ নং ওয়াড</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="m_post" class="form-label"><strong>ডাকঘর:*</strong></label>
                            <input type="text" v-model="unionMember.post" class="form-control" id="m_post" required>
                        </div>
                        
                    </b-col>
                    <b-col>
                        <h6>স্থানীয় ব্যক্তি</h6>
                        <div class="mb-3">
                            <label for="local_member_name" class="form-label"><strong>নাম:*</strong></label>
                            <input type="text" v-model="localPerson.name" class="form-control" id="local_member_name" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_g_name" class="form-label"><strong>পিতা/স্বামী:*</strong></label>
                            <input type="text" v-model="localPerson.g_name" class="form-control" id="local_m_g_name" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_village" class="form-label"><strong>গ্রাম:*</strong></label>
                            <input type="text" v-model="localPerson.village" class="form-control" id="local_m_village" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_ward" class="form-label"><strong>ওয়াড নং:*</strong></label>
                            <!-- <input type="number" v-model="localPerson.wardNo" class="form-control" id="local_m_ward" required> -->
                            <select class="form-control" required v-model="localPerson.wardNo">
                                <option value="১ নং ওয়াড"> ১ নং ওয়াড</option>
                                <option value="২ নং ওয়াড"> ২ নং ওয়াড</option>
                                <option value="৩ নং ওয়াড"> ৩ নং ওয়াড</option>
                                <option value="৪ নং ওয়াড"> ৪ নং ওয়াড</option>
                                <option value="৫ নং ওয়াড"> ৫ নং ওয়াড</option>
                                <option value="৬ নং ওয়াড"> ৬ নং ওয়াড</option>
                                <option value="৭ নং ওয়াড"> ৭ নং ওয়াড</option>
                                <option value="৮ নং ওয়াড"> ৮ নং ওয়াড</option>
                                <option value="৯ নং ওয়াড"> ৯ নং ওয়াড</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_post" class="form-label"><strong>ডাকঘর:*</strong></label>
                            <input type="text" v-model="localPerson.post" class="form-control" id="local_m_post" required>
                        </div>
                                               
                    </b-col>
                </b-row>
                <div class="button-group">
                   
                    <button class="btn-global-success" :disabled="countDown>0" @click="addNomminator">সাবমিট করুন</button>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
    components: {
        VueHtml2pdf
    },
    data() {
        return {
            memberList:[],
            countDown:0,
            applicantName:'',
            oppositorName:'',
            nomminatorType:'',
            crimeTitle:'',
            caseNo:'',
            phone:'',
            caseInfos:[],
            dataInfo:[],
            trackingResult:false,
            unionMember: {
                    id: null,
                    name: null,
                    g_name: null,
                    village: null,
                    wardNo: null,
                    post: null,
                   
                },
                localPerson: {
                    name: null,
                    g_name: null,
                    village: null,
                    wardNo: null,
                    post: null,
                },
        }
    },
    methods: {
        async addNomminator(){
            let formData=new FormData();
            formData.append("caseId",this.caseInfos.id);
            formData.append("localNomminatorName",this.localPerson.name);
            formData.append("localNomminatorGuardian",this.localPerson.g_name);
            formData.append("localNomminatorVillage",this.localPerson.village);
            formData.append("localNomminatorWardNo",this.localPerson.wardNo);
            formData.append("localNomminatorPostOffice",this.localPerson.post);
            formData.append("localNomminatorUnion",this.localPerson.union);
            formData.append("localNomminatorDistrict",this.localPerson.district);
            formData.append("nomminatorType",this.nomminatorType);

            formData.append("unionNomminatorId",this.unionMember.id);
            formData.append("unionNomminatorName",this.unionMember.name);
            formData.append("unionNomminatorGuardian",this.unionMember.g_name);
            formData.append("unionNomminatorVillage",this.unionMember.village);
            formData.append("unionNomminatorWardNo",this.unionMember.wardNo);
            formData.append("unionNomminatorPostOffice",this.unionMember.post);
            formData.append("unionNomminatorUnion",this.unionMember.union);
            formData.append("unionNomminatorDistrict",this.unionMember.district);

            let url="frontend/set/nomminator/for/case";

            await this.$http.post(url,formData)
             .then(response=>{
                if(response.data.msgFlag==true){
                    toast.success({
                        position: 'topRight',
                        title: response.data.msg,
                    });

                   this.resetForm();
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
        setMemberSelected(){
            this.memberList.forEach(memberInfo=>{
                if(this.unionMember.id==memberInfo.id){
                    this.unionMember.name=memberInfo.name;
                    this.unionMember.g_name=memberInfo.guardian;
                    this.unionMember.village=memberInfo.village;
                    this.unionMember.wardNo=memberInfo.wordNo;
                    this.unionMember.post=memberInfo.postOffice;
                    this.unionMember.union=memberInfo.unionId;
                    this.unionMember.district=memberInfo.districtId;
                }
            })
        },
        checkReasonsExists(reasonId){
            if(this.caseInfos.case_slip_info!=null){
              if(this.caseInfos.case_slip_info.reasons.includes(reasonId))
                return true;
              else
                return false;
            }
            else
                return false;

         },
        async searchCase(){
            let url="frontend/get/case/for/nomminator?dataId="+this.caseNo+"&phone="+this.phone;

            await this.$http.get(url)
             .then(response=>{
                if(response.data.msgFlag==true){
                    this.caseInfos=response.data.dataInfo;
                    this.memberList=response.data.memberList;
                    this.nomminatorType=response.data.nomminatorType;
                     this.trackingResult = true;
                    toast.success({
                        position: 'topRight',
                        title: response.data.msg,
                    });

                    if(this.caseInfos.applicant_info!=null)
                        this.applicantName=this.caseInfos.applicant_info.name;
                    if(this.caseInfos.oppositor_info!=null)
                        this.oppositorName=this.caseInfos.oppositor_info.name;
                    if(this.caseInfos!=null){
                        this.crimeTitle=this.caseInfos.caseTitle;
                        this.localPerson.district=this.caseInfos.districtId;
                        this.localPerson.union=this.caseInfos.unionId;
                    }
                    
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
        print() {
            // write your printing work
        }
    }
}
</script>

<style lang="scss" scoped>
    .slip {
        padding-top: 40px;
        input {
            border: none;
            background: #e4e4e4;
            padding: 4px;
            &:focus {
                outline: none;
            }
        }
        .heding {
            text-align: center;
        }
        .search-bar {
            display: flex;
            justify-content: flex-end;
            column-gap: 10px;
            align-items: center;
            label {
                font-size: 1.2rem;
                color: #59513a;
            }
            input {
                border: none;
                background: #e4e4e4;
                padding: 4px;
                &:focus {
                    outline: none;
                }
            }
        }
        .case-slip-table {
            overflow-x: auto;
            margin: 30px auto;
            table {
                margin: auto;
            }
            table tr {
                border: 1px solid black;
                td {
                    white-space: nowrap;
                    padding: 30px 10px;
                }
            }
            table tr:nth-child(1) {
                background: white;
            }
            table tr:nth-child(2) {
                background: #98e198;
                text-align: center;
            }
        }
        .case-slip {
            width: fit-content;
            margin: 40px auto;
            padding: 20px 50px;
            box-shadow: 1px 1px 4px 3px rgba(0,0,0,0.1);
            .applicant,
            .opponent {
                display: grid;
                grid: auto-flow / 20% calc(80% - 10px);
                column-gap: 10px;
                .label {
                    text-align: right;
                }
                input {
                    width: 100%;
                    margin-bottom: 15px;
                }
            }
            .case-date {
                display: flex;
                column-gap: 10px;
                align-items: center;
            }
            .all-options {
                margin: 20px 0;
                accent-color: #59513a;
            }
            .honor-signature {
                margin: 80px 0 50px auto;
                text-align: center;
                width: 250px;
                input {
                    width: 120px;
                    text-align: center;
                }
            }
            .print {
                display: flex;
                justify-content: flex-end;
                & > * {
                    cursor: pointer;
                }
            }
        }
    }
</style>