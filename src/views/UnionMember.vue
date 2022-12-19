<template>
    <div class="member">
        <h6>ইউনিয়ন পরিষদের কর্মকর্তা ও সদস্য বৃন্দ</h6>
        <hr>
       
        <div class="normal-member">
            <!-- <h6>ইউনিয়ন পরিষদের সদস্য বৃন্দ</h6> -->
            <div class="memeber-table">
                <table style="width:100%;">
                    <thead>
                        <tr>
                            <th colspan="2">
                                <v-select :options="divisionList" :reduce="divisionList => divisionList.id" label="bn_name" v-model="division" @input="filterDistrictList">
                                    <template v-slot:option="option">
                                        {{option.bn_name}}
                                    </template>
                                 </v-select>
                            </th>
                             <th colspan="2">
                                <v-select :options="districtList" :reduce="districtList => districtList.id" label="bn_name" v-model="district" @input="filterUpazilaList">
                                    <template v-slot:option="option">
                                        {{option.bn_name}}
                                    </template>
                                 </v-select>
                            </th>
                            <th colspan="2">
                                <v-select :options="upazilaList" :reduce="upazilaList => upazilaList.id" label="bn_name" v-model="upazila" @input="filterUnionList">
                                    <template v-slot:option="option">
                                        {{option.bn_name}}
                                    </template>
                                 </v-select>
                            </th>
                             <th colspan="2">
                                <v-select :options="unionList" :reduce="unionList => unionList.id" label="bn_name" v-model="union" @input="getMemberListByUnion">
                                    <template v-slot:option="option">
                                        {{option.bn_name}}
                                    </template>
                                 </v-select>
                            </th>
                        </tr>
                        <tr>
                            <th>ছবি</th>
                            <th>শিরোনাম</th>
                            <th>পদবী</th>
                            <th>মোবাইল নং</th>
                            <th>বিভাগ</th>
                            <th>জেলা</th>
                            <th>উপজেলা</th>
                            <th>ইউনিয়ন</th>
                            <th>ওয়ার্ড</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="memberInfo,memberIndex in memberList" :key="memberIndex">
                            <td>
                                <img :src="memberInfo.avatar" :alt="memberInfo.name">
                            </td>
                            <td>{{memberInfo.name}}</td>
                            <td>{{memberInfo.designation}}</td>
                            <td>{{memberInfo.phone | banglaNumber}}</td>
                            <td>
                                <slot v-if="memberInfo.division_info!=null">
                                    {{memberInfo.division_info.bn_name}}
                                </slot>
                            </td>
                            <td>
                                <slot v-if="memberInfo.district_info!=null">
                                    {{memberInfo.district_info.bn_name}}
                                </slot>
                            </td>
                            <td>
                                <slot v-if="memberInfo.upazila_info!=null">
                                    {{memberInfo.upazila_info.bn_name}}
                                </slot>
                            </td>
                            <td>
                                <slot v-if="memberInfo.union_info!=null">
                                    {{memberInfo.union_info.bn_name}}
                                </slot>
                            </td>
                            <td>{{memberInfo.wordNo}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            memberList:[],
            divisionList:[],
            districtList:[],
            upazilaList:[],
            unionList:[],
            division:'',
            district:'',
            upazila:'',
            union:'',
        }
    },
    beforeMount(){
        // this.getMemberList();
        this.getDivisionList();
    },
    methods:{
        filterDistrictList(){
            this.districtList=[];
            
            let url="frontend/get/active/district/list?division="+this.division;

             this.$http.get(url)
             .then(response=>{
                this.districtList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        filterUpazilaList(){
            this.upazilaList=[];
            

            let url="frontend/get/active/upazila/list?district="+this.district;

             this.$http.get(url)
             .then(response=>{
                this.upazilaList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        filterUnionList(){
            this.unionList=[];
            
            let url="frontend/get/active/union/list?upazila="+this.upazila;

             this.$http.get(url)
             .then(response=>{
                this.unionList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
         getDivisionList(){

            let url="frontend/get/active/division/list";

             this.$http.get(url)
             .then(response=>{
                this.finalDivisionList=response.data;
                this.divisionList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        getMemberListByUnion(){

            let url="frontend/get/active/member/list?union="+this.union;

             this.$http.get(url)
             .then(response=>{
                this.memberList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        async getMemberList(){
            let url="frontend/get/active/member/list"

            await this.$http.get(url)
             .then(response=>{
                this.memberList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
    }
}
</script>

<style lang="scss" scoped>
.member {
    /* width: 1170px;*/
    margin: 0 auto;
    h6 {
        text-align: center;
    }
    .u-member {
        .details {
            cursor: pointer;
        }
        img {
            width: 150px;
            height: 150px;
            object-fit: contain;
        }
    }
    .memeber-table {

        overflow-x: auto;
       /* width:100% ! important;*/
        min-height:500px;
        table {
            margin: auto;
            tr {
                border: 1px solid black;
                img {
                    width: 100px;
                    height: 100px;
                    object-fit: contain;
                }
                th , td {
                    padding: 5px 10px;
                    text-align: center;
                }
                // th:not(th:last-child), td:not(td:last-child) {
                //     border-right: 1px solid black;
                // }
            }
        }
    }
    .female-box {
        margin: 15px 0;
        .image {
            img {
                width: 150px;
                height: 150px;
                object-fit: contain;
            }
        }
    }
}
@media (max-width: 1200px) {
    .member {
        width: 100%;
        padding: 0 15px;
    }
}
@media (max-width: 500px) {
    .member {
        .female-box {
            text-align: center;
            padding-bottom: 10px;
            .image {
                display: flex;
                justify-content: center;
            }
        }
    }
}
</style>
