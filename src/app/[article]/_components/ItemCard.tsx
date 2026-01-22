import { use } from "react"

interface ItemCardProps {
    item: string
}

const ItemCard: React.FC<ItemCardProps> = ({item}) => {
    
    const itemDatas = use(fetch(`/api/item?name=${item}`))

    return 

}