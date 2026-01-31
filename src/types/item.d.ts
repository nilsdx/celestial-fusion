export type Resistances = {
    efr: number,
    eth: number,
    eic: number,
    edk: number,
    elt: number
}

export type Angles = {
    hdist: number,
    hangle: number,
    vdist: number,
    vangle: number
}

export type StatBoost = {
    label: string,
    value: string
}

export type ItemDatas = {
    name: string,
    icon: "hu"|"ra"|"fo"|"frame"|"barrier"|"item",
    image?: string
    type: string,
    requirement: string,
    grind?: number,
    targets?: number,
    special?: string,
    stats?: StatBoost[],
    angles?: Angles,
    resistances?: Resistances
    classes: string,
    description: string
}

export type EnemyData = {
    name: string,
    attribute: string,
    image: string,
    stats: StatBoost[]
}

export type QuestDatas = {
    name: string,
    category: string,
    info: string,
    description: string,
    author: string
}