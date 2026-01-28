import { getItemDatas } from "@/src/actions/get-item.action"
import { ItemDatas } from "@/src/types/item";
import Image from "next/image";
import AvailableClasses from "./AvailableClasses";

interface ItemCardProps {
    item: string,
    category: string
}

const ItemCard: React.FC<ItemCardProps> = async ({item, category}) => {
    
    const itemDatas: ItemDatas|null = await getItemDatas(category, item);
    if (itemDatas == null) {
        return (<></>)
    }

    return (
        <div className="flex flex-col items-center m-4 bg-sky-950 p-4 text-slate-200 h-fit w-70">
            <p>{itemDatas.name}</p>
            <div className="flex flex-col items-center bg-sky-800 p-2 space-y-2">
                {itemDatas.image && (
                    <Image src={itemDatas.image} alt={`${itemDatas.name} image`} width={300} height={200}/>
                )}
                <p className="italic text-center text-sm">
                    {itemDatas.description}
                </p>
            </div>
            <p>Type : {itemDatas.type}</p>
            <p>Requirements : {itemDatas.requirement}</p>
            {itemDatas.grind !== undefined && (
                <p>Grind : {itemDatas.grind}</p>
            )}
            {itemDatas.special !== undefined && (
                <p>Special : {itemDatas.special}</p>
            )}
            {itemDatas.targets !== undefined && (
                <p>Targets : {itemDatas.targets}</p>
            )}
            {itemDatas.stats !== undefined && (
                <div className="flex space-x-3 flex-wrap">
                    {itemDatas.stats.map((ids) => (
                        <div className="text-center" key={`${ids.label}-stat`}>
                            <p>{ids.label}</p>
                            <p>{ids.value}</p>
                        </div>
                    ))}
                </div> 
            )}
            {itemDatas.resistances !== undefined && (
                <div className="flex space-x-3 flex-wrap">
                    <div className="text-center">
                        <p>EFR</p>
                        <p>{itemDatas.resistances.efr}</p>
                    </div>
                    <div className="text-center">
                        <p>ETH</p>
                        <p>{itemDatas.resistances.eth}</p>
                    </div>
                    <div className="text-center">
                        <p>EIC</p>
                        <p>{itemDatas.resistances.eic}</p>
                    </div>
                    <div className="text-center">
                        <p>EDK</p>
                        <p>{itemDatas.resistances.edk}</p>
                    </div>
                    <div className="text-center">
                        <p>ELT</p>
                        <p>{itemDatas.resistances.elt}</p>
                    </div>
                </div>
            )}
            <AvailableClasses classes={itemDatas.classes}/>
        </div>
    )

}

export default ItemCard;