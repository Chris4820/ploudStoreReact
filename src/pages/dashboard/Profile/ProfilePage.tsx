import { Link, useNavigate } from "react-router-dom";
import { useGetUserInformation } from "../../../api/store/user"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";




export default function ProfilePage() {
    const {data: user} = useGetUserInformation();
    return(
        <section className="m-5 lg:m-20">
        <Link to={'/dashboard'}>
            <h1>Voltar para o dashboard</h1>
        </Link>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 mt-2">
            <div className="col-span-1 p-5 rounded-lg gap-5 flex items-center justify-center bg-muted">
                <div>
                <Avatar className="w-full h-32">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </div>
                <div className="space-y-1 w-[50%]">
                    <h1 className="text-lg font-semibold">{user?.name}</h1>
                    <p className="text-base">{user?.email}</p>
                </div>
            </div>
            <div className="col-span-2 h-20 bg-red-500 rounded-lg">

            </div>
        </div>
        </section>
    )
}