import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios';
import moment  from 'moment';
// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import Paginate from 'vuejs-paginate';
Vue.component('paginate', Paginate);

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect);

import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';


// carousel
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);



//svg icons
import icons from "v-svg-icons";
Vue.component("icon", icons);
// toaster
import toastCss from '../../node_modules/izitoast/dist/css/iziToast.min.css';
import toastJs from '../../node_modules/izitoast/dist/js/iziToast';
window.toast = toastJs;

const base = axios.create({
	baseURL: "http://localhost/villagecourt/public/api/"
  	// baseURL: "https://gramadalot.com.bd/max8483/api"

});

Vue.prototype.$http = base;


//ant design 
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);



Vue.filter("formatDateBd", function(value) {
  if (value) {
     let date=moment(String(value)).format("DD/MM/YYYY");
     let enDate=String(date);
     let bnDate='';
     for(var i=0;i<enDate.length;i++){
          if(enDate[i]==0)
            bnDate=bnDate+'০';
          else
            if(enDate[i]==1)
            bnDate=bnDate+'১';
          else
            if(enDate[i]==2)
            bnDate=bnDate+'২';
          else
            if(enDate[i]==3)
            bnDate=bnDate+'৩';
          else
            if(enDate[i]==4)
            bnDate=bnDate+'৪';
          else
            if(enDate[i]==5)
            bnDate=bnDate+'৫';
          else
            if(enDate[i]==6)
            bnDate=bnDate+'৬';
          else
            if(enDate[i]==7)
            bnDate=bnDate+'৭';
          else
            if(enDate[i]==8)
            bnDate=bnDate+'৮';
          else
            if(enDate[i]==9)
            bnDate=bnDate+'৯';
          else
            if(enDate[i]==' ')
              bnDate=bnDate+' ';
          else
            bnDate=bnDate+enDate[i];
     }
     return bnDate;
     
  }
});
Vue.filter("formatTimeBd", function(value) {
  if (value) {
     let date=moment(String(value)).format("hh:m A");
     let enDate=String(date);
     let bnDate='';
     for(var i=0;i<enDate.length;i++){
          if(enDate[i]==0)
            bnDate=bnDate+'০';
          else
            if(enDate[i]==1)
            bnDate=bnDate+'১';
          else
            if(enDate[i]==2)
            bnDate=bnDate+'২';
          else
            if(enDate[i]==3)
            bnDate=bnDate+'৩';
          else
            if(enDate[i]==4)
            bnDate=bnDate+'৪';
          else
            if(enDate[i]==5)
            bnDate=bnDate+'৫';
          else
            if(enDate[i]==6)
            bnDate=bnDate+'৬';
          else
            if(enDate[i]==7)
            bnDate=bnDate+'৭';
          else
            if(enDate[i]==8)
            bnDate=bnDate+'৮';
          else
            if(enDate[i]==9)
            bnDate=bnDate+'৯';
          else
            if(enDate[i]==' ')
            bnDate=bnDate+' ';
          else
            bnDate=bnDate+enDate[i];
     }
     return bnDate;
     
  }
}); 

Vue.filter("getImageUrl", function(value) {
  return 'https://picsum.photos'+value;
  // return 'https://picsum.photos'+value;
});

Vue.filter("formatDateTime", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY hh:mm A");
  }
});

Vue.filter("formatTime", function(value) {
  if (value) {
    return moment(String(value)).format("hh:mm A");
  }
});

Vue.filter("formatYear", function(value) {
  if (value) {
    return moment(String(value)).format("YYYY");
  }
});

Vue.filter("banglaNumber", function(value) {
  let enValue=String(value);
     let bnValue='';
     for(var i=0;i<enValue.length;i++){
          if(enValue[i]==' ')
                bnValue=bnValue+' ';
          else
          if(enValue[i]==0)
            bnValue=bnValue+'০';
          else
            if(enValue[i]==1)
            bnValue=bnValue+'১';
          else
            if(enValue[i]==2)
            bnValue=bnValue+'২';
          else
            if(enValue[i]==3)
            bnValue=bnValue+'৩';
          else
            if(enValue[i]==4)
            bnValue=bnValue+'৪';
          else
            if(enValue[i]==5)
            bnValue=bnValue+'৫';
          else
            if(enValue[i]==6)
            bnValue=bnValue+'৬';
          else
            if(enValue[i]==7)
            bnValue=bnValue+'৭';
          else
            if(enValue[i]==8)
            bnValue=bnValue+'৮';
          else
            if(enValue[i]==9)
            bnValue=bnValue+'৯';
          else
            bnValue=bnValue+enValue[i];
     }
     return bnValue;
});
