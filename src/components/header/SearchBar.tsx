import { Search } from 'lucide-react';
import Form from 'next/form'

const SearchBar = () => {
    return (
        <Form action="/search" className="my-1 border border-white p-2 space-x-2 flex items-center w-fit self-end rounded-lg">
            <Search size={16}/>
            <input name="query" className="w-64" placeholder="Search an article..."/>
            <button type="submit" className="cursor-pointer">Search</button>
        </Form>
    )
}

export default SearchBar;