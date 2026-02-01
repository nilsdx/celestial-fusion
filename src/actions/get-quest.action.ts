import path from "path";
import { QuestArea, QuestDatas } from "../types/quest";
import { promises as fs } from 'fs';

export const getQuestDatas = async ( name: string ): Promise<QuestDatas | null> => {
    try {
        const filePath = path.join(process.cwd(), 'datas', 'quests', `${name}.json`);
        
        const fileContent = await fs.readFile(filePath, 'utf8');
        const rawData = JSON.parse(fileContent);

        return {
            name: rawData.name,
            category: rawData.category,
            info: rawData.info,
            description: rawData.description,
            author: rawData.author,
            reward: rawData.reward,
            enemyCounts: rawData.enemyCounts,
            customEnemies: rawData.customEnemies
        };

    } catch (error) {
        return null;
    }
}