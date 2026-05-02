import { Search } from 'lucide-react';
import Form from 'next/form'

const SearchBar = () => {
    return (
        <Form action="/search" className="my-2 bg-gray-800 p-2 space-x-2 flex items-center w-fit self-end text-white">
            <Search size={16}/>
            <input name="query" className="w-64" placeholder="Search an article..."/>
            <button type="submit" className="cursor-pointer">Search</button>
        </Form>
    )
}

export default SearchBar;