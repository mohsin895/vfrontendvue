<template>
    <div class="content">
        <div class="content-wrapper">
            <div class="heading"> {{ heading }} </div>
            <p>
                {{ content }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        heading: String,
        content: String
    }
}
</script>

<style lang="scss" scoped>
.content {
    margin: 20px 0;
}
.content-wrapper {
    margin-top: 60px;
    background: #f9f9f9;
    .heading {
        padding: 5px 0;
        text-align: center;
        background: #e6e6e6;
        font-size: 1.1rem;
        font-weight: 600;
    }
    p {
        padding: 50px 15px;
    }
}

</style>
