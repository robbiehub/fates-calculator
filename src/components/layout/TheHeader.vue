<template>
    <section>
        Fire Emblem Fates Calculator
        <div></div>
    </section>
    <base-card type="option-box" class="settings-main">
        <strong>Avatar settings: </strong>
        <!-- Boon -->
        <div class="settings-control">
            <label for="header-boon">Boon</label>
            <select name="boon" id="header-boon" v-model="modelValue.boon">
                <option v-for="stat in stats" :key="stat.value" :value="stat.value" :disabled="isDisabled(stat.value, 'bane')">{{ stat.label }}</option>
            </select>
        </div>
        <!-- Bane -->
        <div class="settings-control">
            <label for="header-bane">Bane</label>
            <select name="bane" id="header-bane" v-model="modelValue.bane">
                <option v-for="stat in stats" :key="stat.value" :value="stat.value" :disabled="isDisabled(stat.value, 'boon')">{{ stat.label }}</option>
            </select>
        </div>
        <!-- Class... Coming Soon™ -->
        <!-- <div class="settings-control">
            <label for="header-class">Class</label>
            <select name="class" id="header-class" v-model="modelValue.alternative_class">
                <option v-for="alt_class in baseClasses" :key="alt_class.value" :value="alt_class.id">{{ alt_class.name }}</option>
            </select>
        </div> -->
    </base-card>
</template>

<script>
import classes from '../../assets/classes.json'

export default{
    props: ["modelValue"],
    emits: ["update:modelValue"],
    data(){
        return {
            stats: [
                {label: "HP", value: "hp"},
                {label: "Str", value: "str"},
                {label: "Mag", value: "mag"},
                {label: "Skl", value: "skl"},
                {label: "Spd", value: "spd"},
                {label: "Lck", value: "lck"},
                {label: "Def", value: "def"},
                {label: "Res", value: "res"}
            ],
            classes: classes
        }
    },
    computed: {
        baseClasses(){
            return this.classes.filter(cla => cla.tier == 1 && !cla.prf)
        }
    },
    methods: {
        isDisabled(pStat, pCompare){
            return this.modelValue[pCompare] == pStat
        }
    }
}
</script>

<style scoped>
section{
    background: rgb(231,197,125);
    opacity: 0.8;
    background: radial-gradient(rgba(231,197,125,1) 0%, rgba(164,82,42,1) 100%);
    border: 2px solid #6f4328;
    text-align: center;
    padding: 20px 0;
    font-size: xx-large;
    font-weight: bold;
    color: #470b00;
}

.settings-main{
    display: flex;
    justify-content: center;
    align-items: center;
}

.settings-title{}

:deep(.settings-control){
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
}
:deep(.settings-control label){
    margin-right: 3px;
}
</style>