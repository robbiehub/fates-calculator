<template>
    <TheUnitTable />
</template>

<script>
import TheUnitTable from '../components/unit/TheUnitTable.vue';

export default {
    components: {
        TheUnitTable
    },
    inject: ["avatar_info"]
}
</script>
