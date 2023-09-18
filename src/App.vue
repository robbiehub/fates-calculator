<template>
    <TheHeader v-model="avatar_info" />

    <div class="wrapper">
        <RouterView />
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue';

export default {
    components: {
        TheHeader
    },
    data(){
        return {
            avatar_info: {
                boon: "hp",
                bane: "str",
                alternative_class: "cavalier"
            }
        }
    },
    provide(){
        return {
            avatar_info: this.avatar_info
        }
    }
}
</script>

<style scoped>
@media (min-width: 1024px) {
    .wrapper{
        margin: 0 25%;
        margin-top: 5px;
    }

}
</style>
