import { ItemDatas, Resistances } from "@/src/types/item";
import { promises as fs } from 'fs';
import path from 'path';

export const getItemDatas = async (item: string): Promise<ItemDatas | null> => {
    try {
        const filePath = path.join(process.cwd(), `datas/items/${item}.json`);
        
        const fileContent = await fs.readFile(filePath, 'utf8');
        const rawData = JSON.parse(fileContent);

        let resistances: Resistances | undefined = undefined;
        
        if ('efr' in rawData || 'eth' in rawData) {
            resistances = {
                efr: rawData.efr ?? 0,
                eth: rawData.eth ?? 0,
                eic: rawData.eic ?? 0,
                edk: rawData.edk ?? 0,
                elt: rawData.elt ?? 0
            };
        }

        const formattedData: ItemDatas = {
            name: rawData.name,
            icon: rawData.icon,
            image: rawData.image,
            stars: rawData.stars,
            type: rawData.type,
            requirement: rawData.requirement,
            classes: rawData.classes,
            description: rawData.description,
            
            grind: rawData.grind,
            targets: rawData.targets,
            stats: rawData.stats,
            angles: rawData.angles,

            minDfp: rawData.minDfp,
            maxDfp: rawData.maxDfp,
            minEvp: rawData.minEvp,
            maxEvp: rawData.maxEvp,

            resistances: resistances,

            special: rawData.special 
        };

        return formattedData;

    } catch (error) {
        console.error("Error fetching item data:", error);
        return null;
    }
}