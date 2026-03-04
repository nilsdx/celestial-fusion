import { getQuestDatas } from "@/src/actions/get-quest.action"
import { QuestDatas } from "@/src/types/quest";
import Image from "next/image";
import Card from "../Card";
import LinkIcon from "../LinkIcon";

interface QuestCardProps {
    name: string
}

const QuestCard: React.FC<QuestCardProps> = async ({name}) => {
    
    const questDatas: QuestDatas|null = await getQuestDatas(name);
    if (questDatas == null) {
        return (<></>)
    }

    return (
        <Card>
            <div className="flex flex-col items-center p-2 h-fit w-70">
                <p className="flex items-center">
                    <LinkIcon href={`/quests/${name}`}/>
                    {questDatas.name}
                </p>
                <p className="italic">{questDatas.info}</p>
                <hr className="w-full border-sky-600 border rounded-full m-2"/>
                <p>Description: {questDatas.description}</p>
                <p>Reward: {questDatas.reward}</p>
                <p>Category: {questDatas.category}</p>
                <p>Author: {questDatas.author}</p>
            </div>
        </Card>
    )

}

export default QuestCard;