// Boon/Bane	Str	Mag	Skl	Spd	Lck	Def	Res
const avatar_modifiers = {
    hp: {
        boon: {
            str: 1, mag: 1, skl: 0, spd: 0, lck: 2, def: 2, res: 2
        },
        bane: {
            str: 1, mag: 1, skl: 0, spd: 0, lck: 1, def: 1, res: 1
        }
    },
    str: {
        boon: {
            str: 4, mag: 0, skl: 2, spd: 0, lck: 0, def: 2, res: 0
        },
        bane: {
            str: 3, mag: 0, skl: 1, spd: 0, lck: 0, def: 1, res: 0
        }
    },
    mag: {
        boon: {
            str: 0, mag: 4, skl: 0, spd: 2, lck: 0, def: 0, res: 2
        },
        bane: {
            str: 0, mag: 3, skl: 0, spd: 1, lck: 0, def: 0, res: 1
        }
    },
    skl: {
        boon: {
            str: 2, mag: 0, skl: 4, spd: 0, lck: 0, def: 2, res: 0
        },
        bane: {
            str: 1, mag: 0, skl: 3, spd: 0, lck: 0, def: 1, res: 0
        }
    },
    spd: {
        boon: {
            str: 0, mag: 0, skl: 2, spd: 4, lck: 2, def: 0, res: 0
        },
        bane: {
            str: 0, mag: 0, skl: 1, spd: 3, lck: 1, def: 0, res: 0
        }
    },
    lck: {
        boon: {
            str: 2, mag: 2, skl: 0, spd: 0, lck: 4, def: 0, res: 0
        },
        bane: {
            str: 1, mag: 1, skl: 0, spd: 0, lck: 3, def: 0, res: 0
        }
    },
    def: {
        boon: {
            str: 0, mag: 0, skl: 0, spd: 0, lck: 2, def: 4, res: 2
        },
        bane: {
            str: 0, mag: 0, skl: 0, spd: 0, lck: 1, def: 3, res: 1
        }
    },
    res: {
        boon: {
            str: 0, mag: 2, skl: 0, spd: 2, lck: 0, def: 0, res: 4
        },
        bane: {
            str: 0, mag: 1, skl: 0, spd: 1, lck: 0, def: 0, res: 3
        }
    },
}

const avatar_growths = {
    hp: {
        boon: {
            hp: 15, str: 0, mag: 0, skl: 0, spd: 0, lck: 0, def: 5, res: 5
        },
        bane: {
            hp: 10, str: 0, mag: 0, skl: 0, spd: 0, lck: 0, def: 5, res: 5
        }
    },
    str: {
        boon: {
            hp: 0, str: 15, mag: 0, skl: 5, spd: 0, lck: 0, def: 5, res: 0
        },
        bane: {
            hp: 0, str: 10, mag: 0, skl: 5, spd: 0, lck: 0, def: 5, res: 0
        }
    },
    mag: {
        boon: {
            hp: 0, str: 0, mag: 20, skl: 0, spd: 5, lck: 0, def: 0, res: 5
        },
        bane: {
            hp: 0, str: 0, mag: 15, skl: 0, spd: 5, lck: 0, def: 0, res: 5
        }
    },
    skl: {
        boon: {
            hp: 0, str: 5, mag: 0, skl: 25, spd: 0, lck: 0, def: 5, res: 0
        },
        bane: {
            hp: 0, str: 5, mag: 0, skl: 20, spd: 0, lck: 0, def: 5, res: 0
        }
    },
    spd: {
        boon: {
            hp: 0, str: 0, mag: 0, skl: 5, spd: 15, lck: 5, def: 0, res: 0
        },
        bane: {
            hp: 0, str: 0, mag: 0, skl: 5, spd: 10, lck: 5, def: 0, res: 0
        }
    },
    lck: {
        boon: {
            hp: 0, str: 5, mag: 5, skl: 0, spd: 0, lck: 25, def: 0, res: 0
        },
        bane: {
            hp: 0, str: 5, mag: 5, skl: 0, spd: 0, lck: 20, def: 0, res: 0
        }
    },
    def: {
        boon: {
            hp: 0, str: 0, mag: 0, skl: 0, spd: 0, lck: 5, def: 10, res: 5
        },
        bane: {
            hp: 0, str: 0, mag: 0, skl: 0, spd: 0, lck: 5, def: 10, res: 5
        }
    },
    res: {
        boon: {
            hp: 0, str: 0, mag: 5, skl: 0, spd: 5, lck: 0, def: 0, res: 10
        },
        bane: {
            hp: 0, str: 0, mag: 5, skl: 0, spd: 5, lck: 0, def: 0, res: 10
        }
    }

}

export const getAvatarModifiers = (pBoon, pBane) => {
    let modifiers = {
        str: 0,
        mag: 0,
        skl: 0,
        spd: 0,
        lck: 0,
        def: 0,
        res: 0,
    }

    Object.keys(modifiers).findIndex(mod => {
        modifiers[mod] = avatar_modifiers[pBoon].boon[mod] - avatar_modifiers[pBane].bane[mod]
        return false
    })

    return modifiers
}

export const getAvatarGrowths = (pBoon, pBane) => {
    let growths = {
        hp: 0,
        str: 0,
        mag: 0,
        skl: 0,
        spd: 0,
        lck: 0,
        def: 0,
        res: 0,
    }

    Object.keys(growths).findIndex(mod => {
        growths[mod] = avatar_growths[pBoon].boon[mod] - avatar_growths[pBane].bane[mod]
        return false
    })


    return growths
}