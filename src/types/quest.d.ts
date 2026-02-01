export type QuestEnemy = {
    name: string,
    count: number
}

export type QuestArea = {
    area: string,
    enemies: QuestEnemy[]
}

export type QuestDatas = {
    name: string,
    category: string,
    info: string,
    description: string,
    author: string,
    reward: string,
    enemyCounts?: QuestArea[]
}