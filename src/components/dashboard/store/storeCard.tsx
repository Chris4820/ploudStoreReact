import { CgArrowRight } from "react-icons/cg";
import { StoreProps } from "../../../api/req/store";
import { FC, LiHTMLAttributes } from "react";

interface StoreCardComponentProps extends LiHTMLAttributes<HTMLLIElement> {
    store: StoreProps
    color: 'yellow' | 'blue' | 'pink'
}

const StoreCardComponent: FC<StoreCardComponentProps> = ({ store, color, ...otherProps }) => {
    return(
        <li {...otherProps} className="w-full group p-3 border rounded-md flex justify-between items-center hover:bg-gray-200 duration-700 cursor-pointer">
            <div className="flex gap-2">
                <div className={`w-10 h-10 rounded-md flex items-center justify-center bg-${color}-500`}>
                    {store.shortName}
                </div>
                <div>
                    <h1 className="font-semibold text-sm">{store.name}</h1>
                    <p className="text-[13px]">{store.subdomain}</p>
                </div>
            </div>
            <div>
                <div className="hidden group-hover:flex">
                    <CgArrowRight size={16} />
                </div>
            </div>
        </li>
    )
}
export default StoreCardComponent;