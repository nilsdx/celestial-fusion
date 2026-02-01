import { getQuestDatas } from "@/src/actions/get-quest.action";

interface QuestEnemyCountsProps {
    name: string
}

const QuestEnemyCounts: React.FC<QuestEnemyCountsProps> = async ({name}) => {

    const datas = await getQuestDatas(name);
    const areas = datas?.enemyCounts;

    if (areas == undefined) return (<></>)

    return (
        <>
            <h2>Enemy counts</h2>
            <div className="gap-2 flex flex-wrap">
                {areas.map((a, i) => (
                    <table key={`${a.area}-area-${i}`}>
                        <thead>
                            <tr>
                                <th colSpan={2}>{a.area}</th>
                            </tr>
                            <tr>
                                <th>
                                    Enemy
                                </th>
                                <th>
                                    Count
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {a.enemies.map((e, i) => (
                                <tr key={`$${e.name}-count-${i}`}>
                                    <td>
                                        {e.name}
                                    </td>
                                    <td>
                                        {e.count}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ))}
            </div>
        </>
    )
}

export default QuestEnemyCounts;