import { CgSpinner } from "react-icons/cg";




export default function LoadingComponent() {

    return(
        <div className="w-full flex justify-center items-center">
            <CgSpinner className="animate-spin" size={56}/>
        </div>
    )
}