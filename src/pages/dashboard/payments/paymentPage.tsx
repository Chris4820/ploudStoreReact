import HeaderSection from "../../../components/commons/Header";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { DatePickerWithRange } from "../../../components/ui/datepicker";
import { MdFilterCenterFocus } from "react-icons/md";
import { useState } from "react";
import PaymentTableBig from "../../../components/tables/payments/PaymentTableBig";




export default function PaymentsPage() {

    const [status, setStatus] = useState('success');
    const [filter, setFilter] = useState('recent');
    const [email, setEmail] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    async function fetchPaymentTable() {
        console.log([{
            "Status" : status,
            "Filter" : filter,
            "Email:" : email,
            "PaymentId": paymentId,
            "startDate" : startDate,
            "endDate" : endDate,
        }]);
    }
    
    
    return(
        <>
            <HeaderSection title="Pedidos" description="Consulte os pedidos de sua loja!"/>
            <div className="flex gap-5 items-center flex-wrap">
                <div className="space-y-1">
                <Input onChange={(e) => setEmail(e.target.value)} placeholder="Search by Email" className="max-w-[250px] h-8"/>
                </div>

                <div className="inline-flex rounded-l-md">
                    <div className="h-8 p-3 bg-muted flex items-center rounded-l-lg font-semibold">#</div>
                    <Input onChange={(e) => setPaymentId(e.target.value)} type="number" placeholder="Number Payment" className="rounded-l-none max-w-[250px] h-8"/>
                </div>

                <Select defaultValue={filter} onValueChange={(value) => setFilter(value)}>
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

                <Select defaultValue={status} onValueChange={(value) => setStatus(value)}>
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

                <Button onClick={() => fetchPaymentTable()}>Pesquisar</Button>
            </div>
            <div className="mt-5">
                <PaymentTableBig/>
            </div>

        </>
    )
}