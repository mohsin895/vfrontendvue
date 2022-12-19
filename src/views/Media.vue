<template>
    <div class="media">
        <table class="table text-center mt-3">
            <thead class="table-secondary">
                <tr>
                    <th>
                        <h4>মেডিয়া গ্যালারী</h4>
                    </th>
                </tr>
            </thead>

        </table>
        
        <div>
            <div class=" mt-5">
                <div>
                    <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" fade indicators
                        img-width="1024" img-height="480">
                    <slot v-if="mediaInfo.media_slider_infos.length>0">
                        <slot v-for="sliderInfo in mediaInfo.media_slider_infos">
                            <b-carousel-slide  :caption="sliderInfo.sliderName" :img-src="sliderInfo.sliderUrl" >
                            </b-carousel-slide>
                        </slot>
                    </slot>
                    </b-carousel>
                </div>
                <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
            </div>
            <b-row class="iconlike mt-2">
                <b-col cols="1">
                   <!--  <b-icon icon="share-fill"></b-icon> -->
                </b-col>
                <b-col style="margin-left:750px;" cols="3">
                   <a href="#" v-on:click="likeCount(2)" style="color:red;"> <b-icon icon="hand-thumbs-down"></b-icon> </a>{{mediaInfo.disLikeCount |banglaNumber}} 
                    <a href="#" v-on:click="likeCount(1)" style="color:blue;"><b-icon icon="hand-thumbs-up"> </b-icon></a> {{mediaInfo.likeCount |banglaNumber}} 
                    <b-icon icon="eye" style="color:green;"> </b-icon> {{mediaInfo.viewCount |banglaNumber}}
                </b-col>
            </b-row>
            <div class="separate mt-1"></div>
            <div class="details mt-4">
                <h3>{{mediaInfo.title}}</h3>
                <p v-html="mediaInfo.details"></p>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                mediaInfo:{
                    media_slider_infos:[]
                },
                slide: 0,
                sliding: null
            }
        },
        beforeMount(){
            this.getMediaInfo();
        },
        methods: {
            async likeCount(status){
                let dataId=this.$route.params.dataId;
                let url="frontend/media/like/count?dataId="+dataId+"&status="+status;

                await this.$http.get(url)
                 .then(response=>{
                    if(response.data.msgFlag==true){
                        toast.success({
                            position: 'topRight',
                            title: response.data.msg,
                        });
                    }
                    else{
                        toast.warning({
                            position: 'topRight',
                            title: response.data.errMsg,
                        });
                    }

                    this.getMediaInfo();
                 })
                 .catch(error=>{console.dir(error)})
                 .finally();
            },

           async  getMediaInfo(){
                let dataId=this.$route.params.dataId;
                let url="frontend/get/media/info?dataId="+dataId;

                await this.$http.get(url)
                 .then(response=>{
                    this.mediaInfo=response.data;
                 })
                 .catch(error=>{console.dir(error)})
                 .finally();
            },
            onSlideStart(slide) {
                this.sliding = true
            },
            onSlideEnd(slide) {
                this.sliding = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .separate {
        width: 100%;
        height: 2px;
        background-color: #008600;
    }

    .iconlike {
        font-size: 20px;
        cursor: pointer;

    }

    .iconlike b-row,
    b-col:hover {
        color: red;
    }
</style>