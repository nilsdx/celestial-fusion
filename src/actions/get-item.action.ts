import { promises as fs } from 'fs';
import path from 'path';
import { ItemDatas, QuestDatas, Resistances } from '../types/item';

/**
 * Gets datas of a given item from a given category
 * @param category parent folder
 * @param item json file name of the item
 */
export const getItemDatas = async (category: string, item: string ): Promise<ItemDatas | null> => {
    try {
        const filePath = path.join(process.cwd(), 'datas', category, `${item}.json`);
        
        const fileContent = await fs.readFile(filePath, 'utf8');
        const rawData = JSON.parse(fileContent);

        let resistances: Resistances | undefined = undefined;
        
        if (rawData.resistances && 'efr' in rawData.resistances) {
            resistances = {
                efr: rawData.resistances.efr,
                eth: rawData.resistances.eth,
                eic: rawData.resistances.eic,
                edk: rawData.resistances.edk,
                elt: rawData.resistances.elt
            };
        }

        return {
            name: rawData.name,
            icon: rawData.icon,
            image: rawData.image,
            type: rawData.type,
            requirement: rawData.requirement,
            classes: rawData.classes,
            description: rawData.description,
            
            grind: rawData.grind,
            targets: rawData.targets,
            stats: rawData.stats,
            angles: rawData.angles,

            resistances: resistances,

            special: rawData.special 
        };

    } catch (error) {
        return null;
    }
}

export const getQuestDatas = async ( name: string ): Promise<QuestDatas | null> => {
    try {
        const filePath = path.join(process.cwd(), 'datas', 'quests', `${name}.json`);
        
        const fileContent = await fs.readFile(filePath, 'utf8');
        const rawData = JSON.parse(fileContent);

        let resistances: Resistances | undefined = undefined;

        return {
            name: rawData.name,
            category: rawData.category,
            info: rawData.info,
            description: rawData.description,
            author: rawData.author
        };

    } catch (error) {
        return null;
    }
}