import { Input } from "../../../components/ui/input";




export default function CheckOutForm() {
    return(
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Input/>
            <Input/>
        </form>
    )
}