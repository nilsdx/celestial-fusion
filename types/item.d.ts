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
    value: number
}

export type ItemDatas = {
    name: string,
    icon: "hu"|"ra"|"fo"|"frame"|"barrier"|"item",
    stars: number,
    type: string,
    requirement: string,
    grind?: number,
    targets?: number,
    special?: number,
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