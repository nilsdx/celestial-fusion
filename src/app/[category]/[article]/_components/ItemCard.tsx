import { getItemDatas } from "@/src/actions/get-item.action"
import { ItemDatas } from "@/src/types/item";
import Image from "next/image";

interface ItemCardProps {
    item: string
}

const ItemCard: React.FC<ItemCardProps> = async ({item}) => {
    
    const itemDatas: ItemDatas|null = await getItemDatas(item);
    if (itemDatas == null) {
        return (<></>)
    }

    return (
        <div className="flex flex-col items-center m-4 bg-amber-200 absolute right-0 w-64">
            <p>{itemDatas.name}</p>
            {itemDatas.image && (
                <Image src={itemDatas.image} alt={`${itemDatas.name} image`} width={300} height={200}/>
            )}
            <p>Type : {itemDatas.type}</p>
            <p>Requirements : {itemDatas.requirement}</p>
            {itemDatas.grind && (
                <p>Grind : {itemDatas.grind}</p>
            )}
        </div>
    )

}

export default ItemCard;