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
        <div className="border flex flex-col items-center">
            <p>{itemDatas.name}</p>
            {itemDatas.image && (
                <Image src={itemDatas.image} alt={`${itemDatas.name} image`} width={300} height={200}/>
            )}
            <p>Type : {itemDatas.type}</p>
            <p>Requirements : {itemDatas.requirement}</p>
        </div>
    )

}

export default ItemCard;