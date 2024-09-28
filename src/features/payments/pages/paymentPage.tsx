import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdFilterCenterFocus } from "react-icons/md";
import { columnsPayment } from "./paymentColumns";
import { useGetPayments } from "../api/store/payments";
import HeaderSection from "../../../components/commons/Header";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { DatePickerWithRange } from "../../../components/ui/datepickerWithRange";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/datatable";



export default function PaymentsPage() {

    const [searchParams] = useSearchParams();

    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;


    const [email, setEmail] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');

    const [filter, setFilter] = useState('recent');
    const [currentFilter, setCurrentFilter] = useState('recent');

    const [status, setStatus] = useState('none');
    const [currentStatus, setCurrentStatus] = useState('none');

    const [startDate, setStartDate] = useState();
    const [currentStartDate,] = useState();
    const [endDate, setEndDate] = useState();
    const [currentEndDate,] = useState();

    const {data: payments, isLoading} = useGetPayments(email, filter, status === 'none' ? '' : status, startDate, endDate, page);


    async function handleFilter() {
        setEmail(currentEmail);
        setFilter(currentFilter);
        setStatus(currentStatus);
        setStartDate(currentStartDate)
        setEndDate(currentEndDate);
    }

    function EnableButtonSearch() {
        return email === currentEmail && filter === currentFilter && status === currentStatus && startDate === currentStartDate && endDate === currentEndDate;
    }
    return(
        <>
            <HeaderSection title="Pedidos" description="Consulte os pedidos de sua loja!"/>
            <div className="flex gap-5 items-center flex-wrap">
                <div className="space-y-1">
                <Input onChange={(e) => setCurrentEmail(e.target.value)} placeholder="Search by Email" className="max-w-[250px] h-8"/>
                </div>

                <Select defaultValue={filter} onValueChange={(value) => setCurrentFilter(value)}>
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

                <Select defaultValue={status} onValueChange={(value) => setCurrentStatus(value)}>
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
                            <SelectItem value="none">
                            <div className="flex gap-2 items-center">
                                <div className="bg-purple-600 h-[9px] w-[9px] rounded-full"/>
                                <h1>Todos</h1>
                            </div>
                            </SelectItem>
                </SelectContent>
                </Select>

                <DatePickerWithRange/>

                <Button disabled={EnableButtonSearch()} onClick={() => handleFilter()}>Pesquisar</Button>
            </div>
            <div className="mt-5">
                <DataTable data={payments?.payments || []} loading={isLoading} meta={payments?.meta} columns={columnsPayment}/>
            </div>

        </>
    )
}