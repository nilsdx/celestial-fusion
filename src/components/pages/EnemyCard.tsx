import { getQuestDatas } from "@/src/actions/get-quest.action"
import { EnemyData, QuestDatas } from "@/src/types/quest";
import Image from "next/image";
import Card from "../Card";

interface EnemyCardProps {
    datas: EnemyData
}

const EnemyCard: React.FC<EnemyCardProps> = async ({datas}) => {
    return (
        <Card>
            <div className="flex flex-col items-center p-2 h-fit w-70">
                <p>{datas.name}</p>
                <p className="text-sm text-white/70">{datas.attribute}</p>
                {datas.image && (
                    <Image src={datas.image} alt={`${datas.name} image`} width={300} height={200}/>
                )}
                <div>
                    {datas.stats.map((s, i) => (
                        <p key={`${s.key}-${i}`}></p>
                    ))}
                </div>
            </div>
        </Card>
    )
}

export default EnemyCard;