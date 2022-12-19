<template>
  <div class="home">
    <div class="slider-menu-wrapper">
      <!-- carousel -->
      <div class="carousel-wrapper">
        <carousel 
        :per-page="1"
        :mouse-drag="true"
        :autoplay="true"
        :autoplayTimeout="3000"
        :navigationEnabled="true"
        :paginationEnabled="true"
        :navigationNextLabel="nextBtn"
        :navigationPrevLabel="prevBtn"
        :paginationPosition="'bottom-overlay'"
        >
          <slide
          v-for="sliderInfo,index in sliderList"
          :key="index"
          >
            <!-- <img src="@/assets/images/sliderFirst.png" alt=""> -->
            <img :src="sliderInfo.sliderUrl" :alt="sliderInfo.altName">
          </slide>
        </carousel>
      </div>
      <!-- carouserl right part menus -->
      <div class="right-menus-wrapper">
        <div 
        class="single-item"
        v-for="(menu,index) in menus"
        :Key="index"
        :style="{ backgroundImage: 'url(' + menu.backgroundImage + ')' }"
        >
          <router-link :to="menu.routeName">
            <icon :name="menu.iconName" style="margin-left: 20px" size="25px"/>
            <div class="item-text" style="margin-left: 10px">
              {{menu.name}}
            </div>
          </router-link>
        </div>
      </div> 
    </div>
    <!-- notice board -->

    <div class="notice-board">
      <div class="heading">
       
        
            <router-link :to="{name:'layout.newsBoard'}">
              <div class="marq"> 
                <marquee behavior="scroll" direction="left"
                  onmouseover="this.stop();"
                  onmouseout="this.start();">{{notice}}
                </marquee> 
              </div>
              
            <div class="allnotice"> 
              
              <p>সকল নিউজ</p>
            </div>
           </router-link>
      </div>
      
      <div class="services">
        <h6>গ্রাম আদালতের উল্লেখযোগ্য সেবা সমূহ:</h6>
        <div class="services-wrapper">
          <b-tabs fills content-class="mt-2" style="margin:auto;" justified >
              <b-tab  class="" title="ফৌজদারি" active>
                <div class="left-part">
                  
                  <div class="content">
                    <div 
                    class="single-content"
                    v-for="(fouzdariServiceInfo,fouzdariServiceIndex) in fouzdariServiceList"
                    :key="fouzdariServiceIndex"
                    >
                    <router-link :to="{name:'layout.fouzdariService',params:{dataId:fouzdariServiceInfo.id}}">
                      <img :src="fouzdariServiceInfo.iconUrl" :alt="fouzdariServiceInfo.title">
                      <p>
                        {{fouzdariServiceInfo.title}}
                      </p>
                      </router-link>
                    </div>
                  </div>
                </div>
            </b-tab>
            <b-tab title="দেওয়ানী">
              <div class="right-part">

                <div class="content">
                    <div 
                    class="single-content"
                    v-for="(dewyaniServiceInfo,dewyaniServiceIndex) in dewyaniServiceList"
                    :key="dewyaniServiceIndex"
                    >
                    <router-link :to="{name:'layout.dewyaniServiceInfo',params:{dataId:dewyaniServiceInfo.id}}">
                      <img :src="dewyaniServiceInfo.iconUrl" :alt="dewyaniServiceInfo.title">
                      <p>
                        {{dewyaniServiceInfo.title}}
                      </p>
                      </router-link>
                    </div>
                  </div>
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
    
    <!-- working court -->
    <div class="working-court-wrapper">
      
      <div 
      class="single-item"
      v-for="(item,index) in workingCourts"
      :key="index"
      >
        <div class="circle">
          {{item.count|banglaNumber }}+
        </div>
        <p>
          {{item.title}}
        </p>
      </div>
    </div>

    <!-- media gallary -->
    <div class="media-gallary">
      <h4 style="color:green; font-weight:900">
        মেডিয়া গ্যালারী
      </h4>
      <div class="gallary-content">
        <div 
        class="single-gallary-item"
        v-for="(mediaInfo, mediaIndex) in mediaList"
        :key="mediaIndex" v-if="mediaIndex<4"
        >
        
        <slot v-if="mediaInfo.media_slider_info!=null">
          <img :src="mediaInfo.media_slider_info.sliderUrl" :alt="mediaInfo.title">
        </slot>
          <p>
            {{mediaInfo.title}}
          </p>
          <router-link  :to="{name:'layout.media',params:{dataId:mediaInfo.id}}">
          <div class="details-btn">
            বিস্তারিত
            <b-icon icon="arrow-right-circle-fill"/>
          </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- services area -->
   

    <h6>আমাদের সেবার এলাকা:</h6>
    <div class="working-court-wrapper">
      
     
      <div 
      class="single-item-default"
      v-for="(area,index) in servericeAreas"
      :key="index"
      >
        <div class="count">
          {{area.count}}
        </div>
        <p>
          {{area.title}}
        </p>
      </div>
    </div>
    <!-- Extra gallary -->
    <div class="media-gallary">
      <div class="gallary-content">
        <div 
        class="single-gallary-item"
        v-for="(mediaInfo, mediaIndex) in mediaList"
        :key="mediaIndex" v-if="mediaIndex>3"
        >
        <slot v-if="mediaInfo.media_slider_info!=null">
          <img :src="mediaInfo.media_slider_info.sliderUrl" :alt="mediaInfo.title">
        </slot>
          <p>
            {{mediaInfo.title}}
          </p>
          <router-link  :to="{name:'layout.media',params:{dataId:mediaInfo.id}}">
          <div class="details-btn">
            বিস্তারিত
            <b-icon icon="arrow-right-circle-fill"/>
          </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      questionList:[],
      mediaList:[],
      fouzdariServiceList:[],
      dewyaniServiceList:[],
      sliderList:[],
      noticeList:[],
      notice:null,

      nextBtn: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg>`,
      prevBtn: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
      </svg>`,
      // slider right menu content
      menus: [
        {
          iconName: 'comment',
          name: 'গ্রাম আদালতের ফরম সমূহ',
          routeName: '/all-form',
          backgroundImage:'https://bangladesh.gov.bd/sites/default/files/files/bangladesh.gov.bd/graphical_result_button/48de805b_74e3_46d8_8166_3209afc9e078/Tamplate_Apps_bn%20(5).png'
        },
        {
          iconName: 'balance-scale',
          name: 'গ্রাম আদালতের আইন সমুহ',
          routeName: '/all-law',
         backgroundImage:'https://bangladesh.gov.bd/sites/default/files/files/bangladesh.gov.bd/graphical_result_button/48de805b_74e3_46d8_8166_3209afc9e078/Tamplate_Apps_bn%20(5).png'
        },
        {
          iconName: 'briefcase',
          name: 'গ্রাম আদালতের গেজেট',
          routeName: '/all-gadget',
          backgroundImage:'https://bangladesh.gov.bd/sites/default/files/files/bangladesh.gov.bd/graphical_result_button/48de805b_74e3_46d8_8166_3209afc9e078/Tamplate_Apps_bn%20(5).png'
        },
        {
          iconName: 'dollar-sign',
          name: 'গ্রাম আদালতের ফি সমুহ',
          routeName: '/feeAll',
          backgroundImage:'https://bangladesh.gov.bd/sites/default/files/files/bangladesh.gov.bd/graphical_result_button/48de805b_74e3_46d8_8166_3209afc9e078/Tamplate_Apps_bn%20(5).png'
        },
        {
          iconName: 'calendar-week',
          name: 'উচ্চ আদালত থেকে প্রেরিত মামলা',
          routeName: '/all-HigherCaseArrive',
          backgroundImage:'https://bangladesh.gov.bd/sites/default/files/files/bangladesh.gov.bd/graphical_result_button/48de805b_74e3_46d8_8166_3209afc9e078/Tamplate_Apps_bn%20(5).png'
        },
        {
          iconName: 'calendar-week',
          name: 'অন্যান্য',
          routeName: '/otherOption',
          backgroundImage:'https://bangladesh.gov.bd/sites/default/files/files/bangladesh.gov.bd/graphical_result_button/48de805b_74e3_46d8_8166_3209afc9e078/Tamplate_Apps_bn%20(5).png'
        },
        {
          iconName: 'people-arrows', 
          name: 'আদালতের সদস্য',
          routeName: '/union-member',
          backgroundImage:'https://bangladesh.gov.bd/sites/default/files/files/bangladesh.gov.bd/graphical_result_button/48de805b_74e3_46d8_8166_3209afc9e078/Tamplate_Apps_bn%20(5).png'
        },
        {
          iconName: 'calendar-week',
          name: 'নোটিস বোর্ড',
          routeName: '/all-NoticeBoard',
          backgroundImage : 'url(@/assets/images/sidemenubg3.png)'
        }
      ],
      servericeAreas:[],
      workingCourts: [
       
      ],
      // gallary
      gallary: [
       
      ]
    }
  },
  watch:{

  },
  beforeMount(){
        this.getWorkAndServiceSummery();
        this.getSliderList();
        this.getNotice();
        this.getFouzdariServiceList();
        this.getDewyaniServiceList();
        this.getMediaList();
        this.getQuestionList();
    },
    methods:{
      getWorkAndServiceSummery(){

        let url="frontend/work/and/service/count"

         this.$http.get(url)
         .then(response=>{
            this.servericeAreas=response.data.servericeAreas;
            this.workingCourts=response.data.workingCourts;
         })
         .catch(error=>{})
         .finally();
      },
         getQuestionList(){
            let url="frontend/get/question/list"

             this.$http.get(url)
             .then(response=>{
                this.questionList=response.data;
             })
             .catch(error=>{})
             .finally();
        }, 

         getMediaList(){
            let url="frontend/get/media/list"

             this.$http.get(url)
             .then(response=>{
                this.mediaList=response.data;
             })
             .catch(error=>{})
             .finally();
        }, 

         getFouzdariServiceList(){
            let url="frontend/get/fouzdari/service/list"

             this.$http.get(url)
             .then(response=>{
                this.fouzdariServiceList=response.data;
             })
             .catch(error=>{})
             .finally();
        }, 

         getDewyaniServiceList(){
            let url="frontend/get/dewyani/service/list"

             this.$http.get(url)
             .then(response=>{
                this.dewyaniServiceList=response.data;
             })
             .catch(error=>{})
             .finally();
        },
         getSliderList(){
            let url="frontend/get/slider/list"

             this.$http.get(url)
             .then(response=>{
                this.sliderList=response.data;
             })
             .catch(error=>{})
             .finally();
        },
         getNotice(){
            let url="frontend/get/notice/for/board"

             this.$http.get(url)
             .then(response=>{
                this.noticeList=response.data;
                this.noticeList.forEach((noticeInfo,index)=>{
                  if(index==0)
                    this.notice=noticeInfo.title;
                  else
                    this.notice=this.notice+",            "+noticeInfo.title;
                });
             })
             .catch(error=>{})
             .finally();
        },
    }

}
</script>

<style lang="scss" scoped>
router-link{
    text-decoration: none !important;
}

.home {
  
    display: grid;
    grid: auto-flow / 100%;
    row-gap: 20px;
  }

  .slider-menu-wrapper {
    display: grid;
    grid: auto-flow / calc(75% - 7.5px) calc(25% - 7.5px);
    column-gap: 15px;
    
    .carousel-wrapper {
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    .right-menus-wrapper {
      display: flex;
      flex-flow: column;
      row-gap: 10px;
      
      .single-item {
        background-image: url('@/assets/images/sidemenubg2.png');
        a {
         color: #ba31e0;
          display: flex;
          font-weight: 500;
          column-gap: 10px;
          align-items: center;
          padding: 10px 0 10px 10px;
          text-decoration: none;
          &:hover {
            background: #e1f3e4;
            color: #490a5a;
          }
        }
      }
    }
  }
  h6 {
        font-family: 'Kalpurush', sans-serif !important;
        text-align: center;
        margin: 10px auto;
        font-weight: 700;
        font-size: 30px;
        color: #000;
      }
  .notice-board {
    .heading {
      width: 100%;
      height: 60px;
      margin: auto;
      background: #fff;
      text-align: center;
      font-weight: bold;
      box-shadow: 0px 1px 10px 0.1px rgb(202, 202, 202);
      border-radius: 5px;
      .marq{
        font-family: 'sans serif bangali', sans-serif !important;
        margin-top:5px;
        margin-left:5px;
        margin-right: -5px;
        float: left;
        width:89% ;
        height:50px;
        color: rgb(110, 110, 110);
        padding: 15px 10px;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #cacaca;

      }
      .allnotice{
        margin-top:5px;
        margin-right: 10px;
        float: right;
        width:10% ;
        height:50px;
        color: #fff;
        padding: 15px 10px;
        background-color: #198754;
        cursor: pointer;
        border-radius: 5px;
        transition: 0.5s;
      }
      .allnotice:hover{
        background-color: #02b461;
      }
    }
    
    .services {
      margin-top: 30px;
      margin-left: -100px;
     
      h6 {
        font-family: 'Kalpurush', sans-serif !important;
        text-align: center;
        margin: 10px auto;
        font-weight: 700;
        font-size: 30px;
        color: #000;
      }

      .services-wrapper {
        
        margin-top: 40px;
        display: grid;
        grid: auto-flow / repeat(1, 1fr);
        .title{
        // margin: auto;
        // // width:100% ;
        // // height: 35px;
        // // color: #198754;
        // padding: 5px 10px;
        // font-weight: 800;
        // border: 1px solid #198754;
        // background-color: #ffffff;
        // border-radius: 50px;
        // transition: 0.2s;
        
        }
        .title:hover{
          // background-color: #198754;
          // color: #ffffff;

        }
        :is(.left-part, .right-part) .title {
          text-align: center;
          padding-bottom: 5px;
          margin-bottom: 20px;
          
          
        }
        .left-part {
          // .content{
          //   border-right: 1px solid var(--primaryColor);
          //   margin-left: auto;
            
          // }
        }
        :is(.left-part, .right-part) .content {
          display: grid;
          grid: auto-flow / repeat(4, [col-start] 26.7% [col-end]);
          column-gap: 10px;
          padding-left: 0px;
          
          
          .single-content {
            border: 1px solid #e0e0e0;
            border-radius: 9px;
            margin: 5px;
            
            img {
              width: 50px;
              height: 50px;
              object-fit: contain;
              display: block;
              margin: 10px auto 20px auto;
            }
            p {
              font-size: 0.8rem;
              text-align: center;
              color:#7e7e7e;
              margin: 10px 10px 10px 10px;
            }
            p:hover{
              color:#198754;
            }
          }
        }
      }
    }
  }
  .working-court-wrapper {
    background-color: #f0f0f0;
    display: grid;
    grid: auto-flow / repeat(5, 1fr);
    column-gap: 5px;
    padding: 15px;
    .view-all {
      
      h4 {
        display: inline-block;
        color: var(--primaryColor);
        text-align: center;
        margin-bottom: 35px;
      }
      h4.default {
        display: inline-block;
        color: var(--primaryColor);
        text-align: center;        
        margin-bottom: 10px;
      }
    }
    .single-item {
      padding: 10px;
      width: 90%;
      background-color: #fff;
      display: flex;
      flex-flow: column;
      align-items: center;
      .circle {
        
        // height: 50px;
        //border-radius: 50%;
        //border: 1px solid var(--primaryColor);
        // background-image: url(@/assets/images/Untitled-4.png);
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 1.6rem;
        color: #000;
      }
      p {
        color: #198754;
        font-weight: 800;
        text-align: center;
      }
    }
    .single-item-default {
      background-color: #fff;
      display: flex;
      flex-flow: column;
      align-items: center;
      .count {
        margin-top: 10px;
        font-weight: bold;
        font-size: 1.6rem;
        color: var(--primaryColor);
        border-bottom: 2px solid var(--primaryColor);
      }
      p {
        margin-top: 5px;
        color: #616461;
        text-align: center;
        font-weight: 500;
        font-size: 1.1rem;
      }      
    }
  }
  .media-gallary {
    width: 180%;
    margin-left:-360px;
    background-color:#F0F8F3;
   
    
    h4 {
      
      font-family: 'Kalpurush', sans-serif !important;
        text-align: center;
        margin: 10px auto;
        margin-left:-200px;
        font-weight: 700;
        font-size: 30px;
        color: #000 !important;
    }
    .gallary-content {
      float: left;
      margin: auto;
      padding: 15px;
      margin-left: 350px;
      width: 1200px;
      display: grid !important;
      grid: auto-flow / repeat(4, 1fr) !important;
      gap: 15px;
      .single-gallary-item {
        img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
        .details-btn {
          width: 35%;
          text-align: center;
          padding:5px  5px;
          border: 1px solid #adadaded;
          border-radius: 10px;
          color: rgb(168, 1, 1);
          background-color:#fff;
          cursor: pointer;
          .butn{
            
          }
          &:hover{
                color: #fff;
                background-color:#006747;
            }
      
        }
      }
    }
  }

  @media (max-width: 1000px) {
    .working-court-wrapper {
      grid: auto-flow / repeat(4, 1fr);
    }
  }
  @media (max-width: 768px) {
    .slider-menu-wrapper {
      grid: auto-flow / 100%;
      .right-menus-wrapper {
        margin-top: 20px;
      }
    }
    .notice-board {
      .services {
        .services-wrapper {
          grid: auto-flow / 100%;
          .right-part {
            margin-top: 20px;
          }
          :is(.left-part, .right-part) .content {
            padding-left: unset;
          }
          .left-part {
            .content{
              border-right: none;
            }
          }
        }
      }
    }
    .working-court-wrapper {
      grid: auto-flow / repeat(3, 1fr);
    }
    .media-gallary {
      .gallary-content {
        display: grid;
        grid: auto-flow / repeat(2, 1fr);
        gap: 15px;
      }
    }
  }
  @media (max-width: 500px) {
    .working-court-wrapper {
      grid: auto-flow / repeat(1, 1fr);
      .view-all {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
        h4 {
          margin-bottom: 10px;
        }
      }
    }
    .media-gallary {
      .gallary-content {
        display: grid;
        grid: auto-flow / repeat(1, 1fr);
        gap: 15px;
      }
    }
  }
</style>
