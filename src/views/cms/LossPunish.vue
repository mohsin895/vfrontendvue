<template>
    <div class="hide-related">
        <ContentManage
        :heading="steal.heading"
        :content="steal.details"
        />
    </div>
</template>

<script>
import ContentManage from '@/components/cms/CmsContent.vue';
export default {
    components: {
        ContentManage,
    },
    data() {
        return {
            steal: {
                heading: 'ক্ষতিসাধনের শাস্তি :',
                details: 'যদি কোন ব্যক্তি কাহারো ক্ষতি সাধন করে, তাহা হইলে উক্ত ব্যক্তি ৭৫০০০/-(পঁচাত্তর হাজার) টাকা পর্যন্ত দন্ডনীয় হইবে। ব্যাখ্যা : দন্ডবিধির ৪২৫ ধারায় অনিষ্টের সংজ্ঞ প্রদান করা হয়েছে। এই ধারায় উল্লেখ করা হয়েছে যে, যে ব্যক্তি জনসাধারণ বা কোন '
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
