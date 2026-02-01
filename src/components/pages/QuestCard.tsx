import { getQuestDatas } from "@/src/actions/get-quest.action"
import { QuestDatas } from "@/src/types/quest";
import Image from "next/image";
import AvailableClasses from "../AvailableClasses";
import Card from "../Card";

interface QuestCardProps {
    name: string
}

const ItemCard: React.FC<QuestCardProps> = async ({name}) => {
    
    const questDatas: QuestDatas|null = await getQuestDatas(name);
    if (questDatas == null) {
        return (<></>)
    }

    return (
        <Card>
            <div className="flex flex-col items-center p-2 h-fit w-70">
                <p>{questDatas.name}</p>
                <p>{questDatas.info}</p>
                <p>{questDatas.description}</p>
                <p>{questDatas.reward}</p>
                <p>Category: {questDatas.category}</p>
                <p>Author: {questDatas.author}</p>
            </div>
        </Card>
    )

}

export default ItemCard;