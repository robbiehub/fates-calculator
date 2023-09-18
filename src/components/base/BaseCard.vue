<template>
    <div class="card-main" :type="type">
        <slot></slot>
    </div>
</template>

<script>
export default{
    props: {
        type: {
            type: String,
        }
    }
}
</script>

<style scoped>
div.card-main, div.card-main[type="dialogue-box"]{
    background: rgb(231,197,125);
    background: radial-gradient(rgba(231,197,125,1) 15%,rgba(164,82,42,1) 100%);
    border: 2px solid #6f4328;
    color: #470b00;
    padding: 12px;
}

div.card-main[type="stat-screen"]{
    background: rgb(224,175,101);
    background: linear-gradient(90deg, rgba(224,175,101,1) 50%, rgba(166,92,42,1) 100%);
    border: 2px solid #6f4328;
    color: #470b00;
    padding: 12px;
}

div.card-main[type="option-box"]{
    background: rgb(245,187,129);
    background: linear-gradient(180deg, rgba(245,187,129,1) 0%, rgba(255,255,189,1) 25%, rgba(255,255,189,1) 75%, rgba(245,187,129,1) 100%);
    border: 2px solid #6f4328;
    color: #470b00;
    padding: 12px;
}
</style>