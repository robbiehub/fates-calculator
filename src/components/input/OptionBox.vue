<template>
    <base-card type="option-box" class="action-box">
        <span class="option-title">
            {{ label }}
        </span>

        <section class="option-control">
            <label class="option-values selected" v-for="option in options" :key="option.value">
                <!-- <label :for="option.value">{{ option.label }}</label> -->
                <input type="radio" :name="label + '-option'" :id="option.value" :value="option.value" @change="onChange" :checked="isChecked(option.value)">
                <div class="option-wrapper">{{ option.label }}</div>
                <!-- <input type="checkbox" name="" id=""> -->
            </label>
        </section>

    </base-card>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        modelValue: {

        }
    },
    emits: ["update:modelValue"],
    methods: {
        onChange(pEvent){
            this.$emit("update:modelValue", pEvent.target.value)
        },
        isChecked(pValue){
            return pValue == this.modelValue
        }
    }
}
</script>

<style scoped>
.action-box {
    border-radius: 10px;
    display: flex;
}

.option-title {
    font-size: 1.25em;
    font-weight: bold;
    flex: 1 1 50%;
    align-self: center;
}

.option-control {
    flex: 1 1 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

input[type="radio"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    appearance: none;
    /* For iOS < 15 to remove gradient background */
    background-color: #fff;
    /* Not removed via appearance */
    margin: 0;
    position: absolute;
}


/* input[type="radio"]:checked {
    color: #fdecb9;
    background: rgb(233, 96, 55);
    background: linear-gradient(180deg, rgba(233, 96, 55, 1) 0%, rgba(249, 113, 84, 1) 25%, rgba(249, 113, 84, 1) 75%, rgba(233, 96, 55, 1) 100%);
    border: 1px solid #831c0b;
    border-radius: 3px;
    padding: 5px;
} */

input[type=radio]:checked+.option-wrapper {
    color: #fdecb9;
    background: rgb(233, 96, 55);
    background: linear-gradient(180deg, rgba(233, 96, 55, 1) 0%, rgba(249, 113, 84, 1) 25%, rgba(249, 113, 84, 1) 75%, rgba(233, 96, 55, 1) 100%);
    border: 1px solid #831c0b;
    border-radius: 3px;
    padding: 5px;
}
</style>