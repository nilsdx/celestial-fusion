interface HeaderBoxProps {
    type?: string
}

const HeaderBox: React.FC<HeaderBoxProps> = ({ type }: { type?: string }) => {
    switch (type) {
        case 'gm':
            return (
                <div className="border-l-4 border-red-500 bg-red-900/30 p-4 my-4 rounded-r-md">
                    <p className="text-red-400 font-bold m-0 flex items-center gap-2">
                        GM Exclusive content
                    </p>
                    <p className="text-sm text-red-100/80 mt-1 mb-0">
                        This article refers content that is exclusive to Game Masters.
                    </p>
                </div>
            )
        case 'discontinued':
            return (
                <div className="border-l-4 border-red-500 bg-red-900/30 p-4 my-4 rounded-r-md">
                    <p className="text-red-400 font-bold m-0 flex items-center gap-2">
                        Discontinued content
                    </p>
                    <p className="text-sm text-red-100/80 mt-1 mb-0">
                        This article refers content that is now discontinued, or come from previous events and are no longer available through regular means.
                    </p>
                </div>
            )
        case 'wip':
            return (
                <div className="border-l-4 border-sky-500 bg-sky-900/30 p-4 my-4 rounded-r-md">
                    <p className="text-sky-400 font-bold m-0 flex items-center gap-2">
                        Work in progress
                    </p>
                    <p className="text-sm text-sky-100/80 mt-1 mb-0">
                        This article lacks a lot of information and will be updated later.
                    </p>
                </div>
            );
        default:
            return null;
    }
};

export default HeaderBox;