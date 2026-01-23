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
    minDfp?: number,
    maxDfp?: number,
    minEvp?: number,
    maxEvp?: number,
    resistances?: Resistances
    classes: string,
    description: string
}