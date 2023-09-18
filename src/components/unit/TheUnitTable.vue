<template>
    <OptionBox label="Stat type" type="radio" :options="table_filters.stat_type" v-model="selected_filters.stat_type" />
    <OptionBox label="Generation" type="radio" :options="table_filters.generation" v-model="selected_filters.generation" />
    <OptionBox label="Route" type="radio" :options="table_filters.routes" v-model="selected_filters.route" />
    <br />
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Class</th>
                <th class="header-stat">HP</th>
                <th class="header-stat">Str</th>
                <th class="header-stat">Mag</th>
                <th class="header-stat">Skl</th>
                <th class="header-stat">Spd</th>
                <th class="header-stat">Lck</th>
                <th class="header-stat">Def</th>
                <th class="header-stat">Res</th>
                <th>Parent</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="unit in filteredUnits" :key="unit.id">
                <tr>
                    <td class="unit-name">{{ unit.name }}</td>
                    <td>
                        <select name="unit_class" id="unit-class" v-model="unit.selected_class">
                            <option v-for="unit_class in getUnitClasses(unit)" :key="unit_class.id" :value="unit_class.id">
                                {{ unit_class.name }}
                            </option>
                        </select>
                    </td>
                    <td class="unit-stat">{{ calculateValue(unit, "hp") }}</td>
                    <td class="unit-stat">{{ calculateValue(unit, "str") }}</td>
                    <td class="unit-stat">{{ calculateValue(unit, "mag") }}</td>
                    <td class="unit-stat">{{ calculateValue(unit, "skl") }}</td>
                    <td class="unit-stat">{{ calculateValue(unit, "spd") }}</td>
                    <td class="unit-stat">{{ calculateValue(unit, "lck") }}</td>
                    <td class="unit-stat">{{ calculateValue(unit, "def") }}</td>
                    <td class="unit-stat">{{ calculateValue(unit, "res") }}</td>
                    <td>
                        <select name="unit_class" id="unit-class" v-model="unit.parent_b" v-if="unit.gen == 2">
                            <option v-for="parent in getParents(unit)" :key="parent.id" :value="parent.id">
                                {{ parent.name }}
                            </option>
                        </select>
                        <span v-else>-</span>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script>
import units from "../../assets/units.json";
import classes from "../../assets/classes.json";
import OptionBox from "../input/OptionBox.vue";

import { getAvatarModifiers, getAvatarGrowths } from "../../utils/avatar_utils";

const MODE = {
    "GROWTH_RATES": 1,
    "MAX_STATS": 2
}

export default {
    components: { OptionBox },
    inject: ["avatar_info"],
    data() {
        let formatted_units = units.map(unit => {
            unit.selected_class = "none"
            unit.parent_b = null
            return unit
        })

        let formatted_classes = [
            {
                "id": "none",
                "name": "-"
            },
            ...classes
        ]

        let modes = [
            { "id": MODE.GROWTH_RATES, "label": "Growth Rates" },
            { "id": MODE.MAX_STATS, "label": "Maximum Stats" },
        ]

        return {
            units: formatted_units,
            classes: formatted_classes,
            modes: modes,
            table_filters: {
                stat_type: [...modes.map(mode => { return { ...mode, value: mode.id } })],
                generation: [
                    {
                        label: "All",
                        value: 0,
                    },
                    {
                        label: "1st Gen",
                        value: 1,
                    },
                    {
                        label: "2nd Gen",
                        value: 2,
                    },
                ],
                routes: [
                    {
                        label: "Revelation",
                        value: "revelation"
                    },
                    {
                        label: "Conquest",
                        value: "conquest"
                    },
                    {
                        label: "Birthright",
                        value: "birthright"
                    },
                ]
            },
            selected_filters: {
                stat_type: MODE.GROWTH_RATES,
                generation: 0,
                route: "revelation"
            }
        }
    },
    computed: {
        filteredUnits() {
            // if (this.selected_filters.generation == 0)
            //     return this.units
            // else {
            //     return this.units.filter(unit => unit.gen == this.selected_filters.generation)
            // }
            return this.units.filter(unit =>
                (this.selected_filters.generation > 0 ? unit.gen == this.selected_filters.generation : true) &&
                unit.routes.includes(this.selected_filters.route)
            )
        },
        filteredParents() {
            return this.units.filter(unit => unit.gen == 1)
        }
    },
    methods: {
        /**
         * Calculate the growth rate or modifier of the given unit and stat (example: avatar speed modifier)
         * @param {*} pUnit Unit object
         * @param {*} pStat The stat key (hp, str, mag, skl, spd, lck, def, res)
         */
        calculateValue(pUnit, pStat) {
            let unit_class = pUnit.selected_class === "none" ? null : this.classes.find(cl => cl.id === pUnit.selected_class)
            if (this.selected_filters.stat_type == MODE.GROWTH_RATES) {
                let unit_growth;
                if (pUnit.id == "avatar") {
                    unit_growth = pUnit.growth_rates[pStat] + this.avatarGrowths()[pStat]
                } else if (pUnit.gen == 2) {
                    unit_growth = this.getChildGrowths(pUnit)[pStat]
                } else {
                    unit_growth = pUnit.growth_rates[pStat]
                }

                return unit_growth + (unit_class ? unit_class.growth_rates[pStat] : 0)
            } else if (this.selected_filters.stat_type == MODE.MAX_STATS) {
                let class_stat = (unit_class ? unit_class.max_stats[pStat] : 0)
                // HP is not affected by modifiers
                if (pStat === "hp") return class_stat

                let unit_modifier
                if (pUnit.id == "avatar") {
                    unit_modifier = this.avatarModifiers()[pStat]
                } else if (pUnit.gen == 2) {
                    unit_modifier = this.getChildModifiers(pUnit)[pStat]
                } else {
                    unit_modifier = pUnit.modifiers ? pUnit.modifiers[pStat] : 0
                }

                return unit_modifier + class_stat
            }

            return 0
        },

        /**
         * Calculates the avatar's modifiers
         */
        avatarModifiers() {
            return getAvatarModifiers(this.avatar_info.boon, this.avatar_info.bane)
        },
        /**
         * Calculates the avatar's growth rates
         */
        avatarGrowths() {
            return getAvatarGrowths(this.avatar_info.boon, this.avatar_info.bane)
        },

        /**
         * Calculates the given child's modifiers
         * @param {*} pUnit 
         */
        getChildModifiers(pUnit) {
            let empty_mods = {
                str: 0,
                mag: 0,
                skl: 0,
                spd: 0,
                lck: 0,
                def: 0,
                res: 0
            }
            let parent_a_mods
            if (pUnit.parent == "avatar") {
                parent_a_mods = this.avatarModifiers()
            } else {
                parent_a_mods = this.units.find(unit => unit.id == pUnit.parent)?.modifiers ?? empty_mods
            }

            let parent_b_mods
            let apply_extra = true
            if (pUnit.parent_b == null) {
                parent_b_mods = empty_mods
            } else if (pUnit.parent_b == "avatar") {
                parent_b_mods = this.avatarModifiers()
            } else {
                let parent_b = this.units.find(unit => unit.id == pUnit.parent_b)
                if (parent_b) {
                    if (parent_b.gen == 2) {
                        parent_b_mods = this.getChildModifiers(parent_b)
                    } else {
                        parent_b_mods = parent_b.modifiers
                    }
                } else {
                    parent_b_mods = empty_mods
                }

                apply_extra = parent_b.gen == 1
            }

            let child_mods = { ...parent_a_mods }

            Object.keys(child_mods).findIndex(mod => {
                child_mods[mod] += parent_b_mods[mod] + (apply_extra ? 1 : 0)
                return false
            })

            return child_mods
        },

        /**
         * Calculates the given child's growth rates
         * @param {*} pUnit 
         */
        getChildGrowths(pUnit) {
            let empty_growths = {
                hp: 0,
                str: 0,
                mag: 0,
                skl: 0,
                spd: 0,
                lck: 0,
                def: 0,
                res: 0
            }

            let parent_b_growths
            if (pUnit.parent_b == null) {
                return pUnit.growth_rates
            } else if (pUnit.parent_b == "avatar") {
                parent_b_growths = this.avatarGrowths()
            } else {
                let parent_b = this.units.find(unit => unit.id == pUnit.parent_b)
                if (parent_b) {
                    if (parent_b.gen == 2) {
                        parent_b_growths = this.getChildGrowths(parent_b)
                    } else {
                        parent_b_growths = parent_b.growth_rates
                    }
                } else {
                    parent_b_growths = empty_growths
                }
            }

            let child_growths = {}

            Object.keys(pUnit.growth_rates).findIndex(mod => {
                child_growths[mod] = Math.floor((pUnit.growth_rates[mod] + parent_b_growths[mod]) / 2)
                return false
            })

            return child_growths
        },

        /**
         * Returns a filtered list of all the classes the given unit can change to
         * @param {*} pUnit 
         */
        getUnitClasses(pUnit) {
            let include_avatar = pUnit.id == "avatar" || pUnit.parent == "avatar" || pUnit.parent_b == "avatar";
            let include_wolf = pUnit.id == "keaton" || pUnit.parent == "keaton" || pUnit.parent_b == "keaton" || pUnit.parent_b == "velouria";
            let include_fox = pUnit.id == "kaden" || pUnit.parent == "kaden" || pUnit.parent_b == "kaden" || pUnit.parent_b == "selkie";
            let include_mozu = pUnit.id == "mozu" || pUnit.parent_b == "mozu";
            let filtered_classes = this.classes.filter(cla => {
                if (cla.remark == "azura" && pUnit.id == "azura")
                    return true
                if (cla.remark == "avatar" && include_avatar)
                    return true
                if (cla.remark == "wolf" && include_wolf)
                    return true
                if (cla.remark == "fox" && include_fox)
                    return true
                if (cla.remark == "mozu" && include_mozu)
                    return true

                let gender_check = pUnit.gender != 0 ? [0, pUnit.gender].includes(cla.gender_lock) : true

                return !cla.prf && gender_check
            })

            return filtered_classes
        },

        getParents(pUnit) {
            let filtered_parents = this.units.filter(unit => {
                let notParent = unit.id != pUnit.parent

                if (pUnit.id == "kana") {
                    return notParent && unit.id != pUnit.id
                } else if (unit.id == "avatar")
                    return true

                if (pUnit.id == "shigure") {
                    return unit.gender == 1 && unit.gen == 1 && !unit.mu_only
                }

                if (["siegbert", "forrest"].includes(pUnit.id) && ["camilla", "elise"].includes(unit.id)) {
                    return false
                }

                if (["shiro", "kiragi"].includes(pUnit.id) && ["hinoka", "sakura"].includes(unit.id)) {
                    return false
                }

                let same_nationality = (pUnit.routes.includes("conquest") && unit.routes.includes("conquest")) || (pUnit.routes.includes("birthright") && unit.routes.includes("birthright"))

                let parent_support = same_nationality || this.units.find(support_unit => support_unit.id == unit.id && support_unit.supports.includes(pUnit.parent))

                return notParent && unit.gender == 2 && parent_support && unit.gen == 1 && !unit.mu_only
            })

            return [
                {
                    id: null,
                    name: "-"
                },
                ...filtered_parents
            ]
        }
    }
}
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    /* background-color: #edbe7a; */
    /* background-color: #a7714b; */
}

thead tr {
    background-color: #e0af65;
    border-radius: 10px;
}

tbody tr {
    /* background-color: #e0af65; */
    background-color: #ead18f;
}

td,
th {
    border: 1px solid #a67243;
    border-top-width: 2px;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
}

td {
    text-align: center;
    padding: 5px;
}

.unit-name {
    color: #fdecb9;
    font-weight: bold;
    background: rgb(104, 87, 87);
    background: linear-gradient(180deg, rgba(104, 87, 87, 1) 0%, rgba(32, 48, 81, 1) 25%, rgba(32, 48, 81, 1) 75%, rgba(104, 87, 87, 1) 100%);
    border-radius: 8px;
}

.unit-stat {
    color: #fdecb9;
    border-radius: 8px;
    background-color: #c27026;
}
</style>
