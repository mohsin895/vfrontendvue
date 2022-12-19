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
            <input type="text" id="search" v-model="caseNo">
            <button class="btn-global-success" @click="searchCase">Submit</button>
        </div>
        <!-- table -->
        <div class="case-slip-table">
            
        </div>
        <!-- slip form -->
        <div class="case-slip" id="printForm" v-if="trackingResult">
            <div class="heding">
                <p>ফরম-১১</p>
                <p>[বিধি ১৪ (৩)  দ্রষ্টব্য]</p>
                <h5>মামলার স্লিপ</h5>
            </div>
            <p>
                <input type="text" :value="caseInfos.union_info.bn_name" readonly> 
                ইউনিয়ন/গ্রাম আদালত
            </p>
            <p>
                মামলা নং
                <input type="text" :value="caseInfos.id | banglaNumber" readonly>
                দায়েরের তারিখ:
                <input type="text" :value="caseInfos.created_at | formatDateBd" readonly>
            </p>
            <div class="applicant">
                <div class="label">
                    আবেদনকারী
                </div>
                <div class="value">
                    <slot v-for="applicantInfo,applicantIndex in caseInfos.applicant_infos">
                        <input type="text" :value="applicantInfo.name" readonly>
                    </slot>
                </div>
            </div>
            <div class="opponent">
                <div class="label">
                    প্রতিবাদী
                </div>
                <div class="value">
                    <slot v-for="oppositorInfo,oppositorIndex in caseInfos.oppositor_infos">
                        <input type="text" :value="oppositorInfo.name" readonly>
                    </slot>
                </div>
            </div>
            <div class="case-date">
                <div class="label">
                    মামলার আগামী তারিখ:
                </div>
                <slot v-if="caseInfos.next_date_info!=null">
                    <input type="text" :value="caseInfos.next_date_info.attendDate" readonly>
                </slot>
                <slot v-else>
                    <input type="text" readonly>
                </slot>
            </div>
            <!-- case option selection -->
            <div class="all-options">
                <b-row>
                    <b-col>
                        <div class="checkbox">
                            <label for="opponentone">
                                <input type="checkbox" id="opponentone" :checked="checkReasonsExists(1)">
                                প্রতিবাদীর জবাব প্রদানের জন্য
                            </label>
                        </div>
                        <div class="checkbox">
                            <label for="solve">
                                <input type="checkbox" id="solve" :checked="checkReasonsExists(2)">
                                আপোষ-নিষ্পত্তির জন্য
                            </label>
                        </div>
                        <div class="checkbox">
                            <label for="decision">
                                <input type="checkbox" id="decision" :checked="checkReasonsExists(3)">
                                সিদ্ধান্ত গ্রহনের জন্য
                            </label>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="checkbox">
                            <label for="present">
                                <input type="checkbox" id="present" :checked="checkReasonsExists(4)">
                                সাক্ষ্য গ্রহনের জন্য
                            </label>
                        </div>
                        <div class="checkbox">
                            <label for="Hearing">
                                <input type="checkbox" id="Hearing" :checked="checkReasonsExists(5)">
                                শুনানীর জন্য
                            </label>
                        </div>
                    </b-col>
                </b-row>
            </div>
            <div class="honor-signature">
                <hr>
                <p>
                    আদালত সহকারী/সচিব <br>
                    <input type="text" :value="caseInfos.union_info.bn_name" readonly> ইউনিয়ন পরিষদ
                </p>
            </div>
            <div 
            class="print" 
            @click="generateReport()"
            >
                <b-icon icon="printer" scale="1.5"/>
            </div>
        </div>
    
    <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="false"
          :preview-modal="true"
          :paginate-elements-by-height="2480"
          filename="hee hee"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="800px"
          @beforeDownload="beforeDownload($event)"
          @progress="onProgress($event)"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          ref="html2Pdf"
      >
       <section slot="pdf-content" class="pdfrmargin">
          <!-- PDF Content Here -->

          <div class="case-slip" id="printForm" v-if="trackingResult">
            <div class="heding">
                <p>ফরম-১১</p>
                <p>[বিধি ১৪ (৩)  দ্রষ্টব্য]</p>
                <h5>মামলার স্লিপ</h5>
            </div>
            <p>
                <input type="text" :value="caseInfos.union_info.bn_name" readonly> 
                ইউনিয়ন/গ্রাম আদালত
            </p>
            <p>
                মামলা নং
                <input type="text" :value="caseInfos.id | banglaNumber" readonly>
                দায়েরের তারিখ:
                <input type="text" :value="caseInfos.created_at | formatDateBd" readonly>
            </p>
            <div class="applicant">
                <div class="label">
                    আবেদনকারী
                </div>
                <div class="value">
                    <slot v-for="applicantInfo,applicantIndex in caseInfos.applicant_infos">
                        <input type="text" :value="applicantInfo.name" readonly>
                    </slot>
                </div>
            </div>
            <div class="opponent">
                <div class="label">
                    প্রতিবাদী
                </div>
                <div class="value">
                    <slot v-for="oppositorInfo,oppositorIndex in caseInfos.oppositor_infos">
                        <input type="text" :value="oppositorInfo.name" readonly>
                    </slot>
                </div>
            </div>
            <div class="case-date">
                <div class="label">
                    মামলার আগামী তারিখ:
                </div>
                <slot v-if="caseInfos.next_date_info!=null">
                    <input type="text" :value="caseInfos.next_date_info.attendDate" readonly>
                </slot>
                <slot v-else>
                    <input type="text" readonly>
                </slot>
            </div>
            <!-- case option selection -->
            <div class="all-options">
                <b-row>
                    <b-col>
                        <div class="checkbox">
                            <label for="opponentone">
                                <input type="checkbox" id="opponentone" :checked="checkReasonsExists(1)">
                                প্রতিবাদীর জবাব প্রদানের জন্য
                            </label>
                        </div>
                        <div class="checkbox">
                            <label for="solve">
                                <input type="checkbox" id="solve" :checked="checkReasonsExists(2)">
                                আপোষ-নিষ্পত্তির জন্য
                            </label>
                        </div>
                        <div class="checkbox">
                            <label for="decision">
                                <input type="checkbox" id="decision" :checked="checkReasonsExists(3)">
                                সিদ্ধান্ত গ্রহনের জন্য
                            </label>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="checkbox">
                            <label for="present">
                                <input type="checkbox" id="present" :checked="checkReasonsExists(4)">
                                সাক্ষ্য গ্রহনের জন্য
                            </label>
                        </div>
                        <div class="checkbox">
                            <label for="Hearing">
                                <input type="checkbox" id="Hearing" :checked="checkReasonsExists(5)">
                                শুনানীর জন্য
                            </label>
                        </div>
                    </b-col>
                </b-row>
            </div>
                <div class="honor-signature">
                    <hr>
                    <p>
                        আদালত সহকারী/সচিব <br>
                        <input type="text" :value="caseInfos.union_info.bn_name" readonly> ইউনিয়ন পরিষদ
                    </p>
                </div>
            </div>
       </section>
      </vue-html2pdf>
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
            caseNo:null,
            caseInfos:[],
            trackingResult:false,
        }
    },
    methods: {
        async beforeDownload(){},
        onProgress(){},
        generateReport() {
            this.$refs.html2Pdf.generatePdf();
            // this.printCaseSlip();
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
            let url="frontend/get/case/slip?dataId="+this.caseNo;

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