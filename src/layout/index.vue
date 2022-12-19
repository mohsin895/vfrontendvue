<template>
    <div class="layout">
        <header>
            <div class="head-top">
                Bangladesh Village Court
            </div>
            <div class="head-bottom">
             <router-link to="/home" >
                    <div class="logo-part">
                        <img src="@/assets/images/mainlogo.png" alt="">
                        <span style="font-size:25px; font-weight:700; margin:20px">গ্রাম আদালত</span>
                    </div>
                </router-link>
                <div class="menu-part" >
                    <router-link
                    v-for="(menu,index) in manus"
                    :key="index"
                     :to="menu.route"
                     >
                        <div class="menu-text">
                            {{menu.routeName}}
                        </div>
                    </router-link>
                </div>
                <div class="undp">
                    <!-- <img src="@/assets/images/undplogo.png" alt=""> -->
                </div>
                <div 
                class="mobile-menu-switch"
                v-b-toggle.my-sidebar 
                >
                    <icon name="bars"/>
                </div>
            </div>
        </header>
        <section class="gram-adalot-container">
            <router-view/>
        </section>
        <footer>
            <div class="footer-top">
                <b-row cols="1" cols-sm="2" cols-lg="3">
                    <b-col>
                        <h6>
                            ইউনিয়ন পরিষদ
                            যোগাযোগ
                        </h6>
                        <div class="hr"></div>
                        <p>
                            আমার মেয়াদকালের মধ্যেই তেঁতুলঝোড়া ইউনিয়নবাসীর সকল 
                            নাগরিক সুযোগ-সুবিধা নিশ্চিত করার সর্বাত্মক চেষ্টা করব।
                            তেঁতুলঝোড়া ইউনিয়নকে ডিজিটাল ও মডেল ইউনিয়ন হিসেবে
                            গড়ে তুলতে অদম্য গতিতে দিন রাত কাজ করে যাবো
                        </p>
                        <p>
                            Mobile :০১৭১৬৭১৪৫৯৮ <br><br>
                            Phone : -01775086266 <br><br>
                            E-mail :tetuljhoraup10@gmail.com <br><br>
                            Web site : www.tetuljhoraup.com
                        </p>
                    </b-col>
                    <b-col>
                        <h6>
                            সাধারণ প্রশ্ন সমূহ
                        </h6>
                        <div class="hr"></div>
                        <p>
                           <slot v-for="(questionInfo,index) in questionList" v-if="index<7">
                               {{(++index) | banglaNumber}}।  {{questionInfo.question}} <br><br>
                           </slot>
                        </p> <br>
                        <router-link to="/question-answer">
                        <div class="details-btn">
                                 আরো প্রশ্ন দেখুন 
                            <b-icon icon="arrow-right-circle-fill"/>
                        </div>
                        </router-link>
                    </b-col>
                    <b-col>
                        <h6>
                            অভিযোগ বক্স
                        </h6>
                        <input type="text" placeholder="Full Name" v-model="name">
                        <input type="email" placeholder="E-mail" v-model="email">
                        <textarea placeholder="Message" cols="30" rows="10" v-model="msg"></textarea>
                        <button class="btn btn-info btn-sm" v-on:click="complainSubmit">Submit</button>
                    </b-col>
                </b-row>
            </div>
            <div class="footer-bottom text-center" style="margin:auto; color:#fff;">
                <b-row cols="12" cols-sm="12" rows="1">
                    <b-col cols="6"> Copyright © 2020-2022   LOYEL IT CORPORATION</b-col>
                    <b-col cols="6"> Design & Developed by : LOYEL IT CORPORATION</b-col>
                </b-row>
               
               
            </div>
        </footer>
        <!-- canvas menu for mobile view -->
        <b-sidebar id="my-sidebar" title="Menu" shadow>
        <ul>
            <li><a href="/home">হোম</a>  </li>
            <li> <a href="/case-application"> মামলা আবেদন অনলাইন </a></li>
            <li><a href="/case-tracking"> মামলা ট্র্যাকিং </a></li>
            <li><a href="/case-slip">  মামলার স্লিপ </a></li>
            <li> <a href="/case-slip">  সদস্য মনোনয়ন</a> </li>
        </ul>
        </b-sidebar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name:'',
            email:'',
            msg:'',
            questionList:[],
            manus: [
                {
                    route: '/home',
                    routeName: 'হোম'
                },
                {
                    route: '/case-application',
                    routeName: 'মামলা আবেদন অনলাইন'
                },
                {
                    route: '/case-tracking',
                    routeName: 'মামলা ট্র্যাকিং'
                },
                {
                    route: '/case-slip',
                    routeName: 'মামলার স্লিপ'
                },
                {
                    route: '/nomminator-add',
                    routeName: 'সদস্য মনোনয়ন'
                },
            ]
        }
    },
    beforeMount(){
        this.getQuestionList();
    },
    methods:{
    resetForm(){
        this.name='';
        this.email='';
        this.msg='';
    },
    formValidation(){
        if(this.msg!='' && this.email!='' && this.name!=''){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)){
                return true;
            }
            else{
                toast.warning({
                        position: 'topRight',
                        title: "Please Enter Valid Email Address.",
                    });
                return false;
            }
        }
        else
            if(this.name==''){
                toast.warning({
                        position: 'topRight',
                        title: "Please Enter Your Name First.",
                    });
                return false;
            }
        else
            if(this.email==''){
                toast.warning({
                        position: 'topRight',
                        title: "Please Enter Your Email Address.",
                    });
                return false;
            }
        else
            if(this.msg==''){
                toast.warning({
                        position: 'topRight',
                        title: "Please Write Your Complain.",
                    });
                return false;
            }
    },
    async complainSubmit(){
        if(this.formValidation()){
        let url="frontend/complain/submit"
        let formData=new FormData();
        formData.append("name",this.name);
        formData.append("email",this.email);
        formData.append("msg",this.msg);

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
                    toast.warning({
                        position: 'topRight',
                        title: response.data.errMsg,
                    });
                }
             })
             .catch(error=>{console.dir(error)})
             .finally();
        }
    },
      getQuestionList(){
            let url="frontend/get/question/list"

             this.$http.get(url)
             .then(response=>{
                this.questionList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        }, 
    }
}

</script>
<style lang="scss" scoped>
    @import '../assets/css/style.css';
    .layout{
        font-family: 'Kalpurush', sans-serif !important;
    }
    header {
        background: linear-gradient(to right,white, #d3ffdc);
        box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.1);
        top: 0;
        position: sticky;
        z-index: 100;
        .head-top {
            background: #585050;
            color: white;
            font-size: 0.9rem;
            font-style: italic;
            text-align: center;
            padding: 5px 0;
        }
        .head-bottom {
            width: 1170px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .logo-part {
                padding: 5px 0;
                color: #000000;
                img {
                    width: 75px;
                    object-fit: contain;
                }
                &:hover {
                        color: #888888;
                        font-weight: 700;
                    }
            }
            .menu-part {
                display: flex;
                column-gap: 10px;
                margin-left: -120px;
                padding: 5px 0 10px 30px;
                a {
                    padding: 5px 10px;
                    margin-top: 20px;
                    font-size: 14px;
                    font-weight: 600;
                    color: rgb(0, 0, 0);
                    text-decoration: none;
                    transition: all 0.3s ease;
                    &:hover {
                        color: #058120;
                        font-weight: 700;
                    }
                }
                a.router-link-active {
                   color: #058120;
                   font-weight: 700;
                }
            }
            .undp{
                padding: 5px 0;
                img{
                    width: 120px;
                    object-fit: contain;

                }
            }
            .mobile-menu-switch {
                display: none;
            }
        }
    }
    footer {
        font-family: 'Kalpurush', sans-serif !important;
        background: linear-gradient(to bottom,white, #d3ffdc);
        box-shadow: 0px 0px 1px 1px rgba(255, 255, 255, 0.1);
        $padding-x: 30px;
        $padding-y: 5px;
        background: #198754;
        margin-top: 50px;
        // color: rgb(0, 0, 0);
        color: #fff !important;
        h6 {
            display: inline-block;
            padding-bottom: 8px;
            border-bottom: 3px solid rgb(255, 221, 68);
            color: rgb(255, 232, 103) !important;
            // color: rgb(0, 0, 0);
            font-weight: 800;
        }
        .footer-top {
            width: 1230px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            min-height: 100px;
            padding: $padding-y $padding-x;

            .details-btn {
            color: #ffffff;
            // cursor: pointer;
            &:hover{
                color: #eb111c;
            }
        }
        }
        .footer-bottom {
            background: #000000;
            min-height: 25px;
        }
        :is(input[type="email"],input[type="text"],textarea) {
            display: block;
            width: 100%;
            margin-bottom: 10px;
            padding-left: 10px;
            border: 1px solid rgb(255, 255, 255);
            background: transparent;
            border-radius: 4px;
            color: rgb(255, 255, 255);
            &:focus {
                outline: 1px solid dodgerblue;
            }
            &::placeholder {
                color: #424242;
            }
        }
    }

    #my-sidebar {
        ul {
            padding: 0;
            margin-top: 20px;
            li {
                display: block;
                padding: 5px 10px;
                color: white;
                background: #ae3ccf;
                transition: all 0.3s ease;
                margin-bottom: 10px;
                cursor: pointer;
                &:hover {
                    background: #570c6b;
                }
            }
        }
    }
    @media (max-width: 1200px) {
        header {
            .head-bottom {
                width: 100%;
                padding: 0 15px;
            }
        }
    }
    @media (max-width: 768px) {
        header {
            .head-bottom {
                display: flex;
                justify-content: space-between;
                .menu-part {
                    display: none;
                }
                .undp{
                    display: none;
                }
                .mobile-menu-switch {
                    display: block;
                    display: flex;
                    padding: 0 10px;
                    align-items: center;
                    cursor: pointer;
                }
            }
        }
    }
</style>
