import { ItemDatas, Resistances } from "@/src/types/item";
import { promises as fs } from 'fs';
import path from 'path';

export const getItemDatas = async (item: string): Promise<ItemDatas | null> => {
    try {
        const filePath = path.join(process.cwd(), `datas/items/${item}.json`);
        
        const fileContent = await fs.readFile(filePath, 'utf8');
        const rawData = JSON.parse(fileContent);

        let resistances: Resistances | undefined = undefined;
        
        // if there's efr, then there must be the rest
        if ('efr' in rawData.resistances) {
            resistances = {
                efr: rawData.resistances.efr,
                eth: rawData.resistances.eth,
                eic: rawData.resistances.eic,
                edk: rawData.resistances.edk,
                elt: rawData.resistances.elt
            };
        }

        const formattedData: ItemDatas = {
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

        return formattedData;

    } catch (error) {
        return null;
    }
}