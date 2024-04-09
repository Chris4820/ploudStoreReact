import HeaderSection from "../../../components/commons/Header";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { DatePickerWithRange } from "../../../components/ui/datepicker";
import { MdFilterCenterFocus } from "react-icons/md";
import { useState } from "react";
import CodeEditor from "../../../components/codeEditor";




export default function PaymentsPage() {
    const [code, setCode] = useState('');

    /*const [searchParams, setSearchParams] = useSearchParams();


    async function setNewParams() {
        setSearchParams(searchParams => {
            searchParams.set("c", "4");
            return searchParams;
          });
    }*/
    
    
    return(
        <>
            <HeaderSection title="Pedidos" description="Consulte os pedidos de sua loja!"/>
            <div className="flex gap-5 items-center flex-wrap">
                <div className="space-y-1">
                <Input placeholder="Search by Email" className="max-w-[250px] h-8"/>
                </div>

                <div className="inline-flex rounded-l-md">
                    <div className="h-8 p-3 bg-muted flex items-center rounded-l-lg font-semibold">#</div>
                    <Input type="number" placeholder="Number Payment" className="rounded-l-none max-w-[250px] h-8"/>
                </div>

                <Select defaultValue="recent">
                    <SelectTrigger  className="h-8 w-[180px]">
                        <div className="flex items-center gap-2">
                        <MdFilterCenterFocus className="h-4 w-4 opacity-50" />
                        <h1 className="text-muted-foreground">|</h1>
                        <SelectValue/>
                        </div>
                    </SelectTrigger>
                <SelectContent>
                        <SelectItem value="recent">Mais recente</SelectItem>
                        <SelectItem value="oldest">Mais antigo</SelectItem>
                        <SelectItem value="expensive">Mais caros</SelectItem>
                </SelectContent>
                </Select>

                <Select defaultValue="success">
                    <SelectTrigger className="h-8 w-[180px]">
                        <SelectValue/>
                    </SelectTrigger>
                <SelectContent>
                        <SelectItem value="success">
                            <div className="flex gap-2 items-center">
                                <div className="bg-green-500 h-[9px] w-[9px] rounded-full"/>
                                <h1>Success</h1>
                            </div>
                            </SelectItem>
                        <SelectItem value="pending">
                            <div className="flex gap-2 items-center">
                                <div className="bg-yellow-500 h-[9px] w-[9px] rounded-full"/>
                                <h1>Pending</h1>
                            </div>
                            </SelectItem>
                        <SelectItem value="failed">
                            <div className="flex gap-2 items-center">
                                <div className="bg-red-500 h-[9px] w-[9px] rounded-full"/>
                                <h1>Failed</h1>
                            </div>
                            </SelectItem>
                </SelectContent>
                </Select>
                <DatePickerWithRange/>
                <Button>Pesquisar</Button>
            </div>
            {/*<h1>Filter: {searchParams.get('filter')}</h1>
            <h1>Filter por paymentID: {searchParams.get('paymentID')}</h1>
            <h1>Filter por page: {searchParams.get('page')}</h1>
            */}

        </>
    )
}