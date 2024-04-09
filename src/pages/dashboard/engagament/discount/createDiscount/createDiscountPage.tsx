import { Input } from "../../../../../components/ui/input";
import { FiRefreshCcw } from "react-icons/fi";
import { useState } from "react";
import { nanoid } from 'nanoid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../components/ui/popover";
import { Button } from "../../../../../components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../../../../../components/ui/calendar";
import { cn } from "../../../../../lib/utils";
import { MdOutlineAddCircle } from "react-icons/md";
import BackComponent from "../../../../../components/commons/BackComponent";

const products = [
    "Produto 1",
    "Produto 2",
    "Produto 3",
    "Produto 4",
    "Produto 5",
    "Produto 6",
    "Produto 7",
    "Produto 8"
]

export default function CreateDiscountPage() {
    const [couponCode, setCouponCode] = useState('');
    const [discountType, setDiscountType] = useState('percentage');
    const [cupomUse, setCupomUse] = useState('all');
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    function handleGenerateDiscount() {
        const randomCoupon = nanoid(12);
        setCouponCode(randomCoupon);
    }

    return (
        <div className="p-5">
            <BackComponent toLink="../discount" text="Voltar"/>
            <form className="border rounded-lg p-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="couponCode" className="block font-medium mb-1">Código do Cupom <span className="text-sm text-muted-foreground">(Único)</span></label>
                        <div className="flex items-center">
                            <Input id="couponCode" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="rounded-r-none" />
                            <div className="h-10 flex items-center justify-center border bg-muted px-2 rounded-r-md">
                                <FiRefreshCcw onClick={handleGenerateDiscount} className="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="usageLimit" className="block font-medium mb-1">Limite de Usos <span className="text-sm text-muted-foreground">(0 para ilimitado)</span></label>
                        <Input defaultValue={0} id="usageLimit" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 mt-5 gap-5">
                    <div>
                        <label htmlFor="discountType" className="block font-medium mb-1">Tipo de Desconto</label>
                        <Select defaultValue="percentage" onValueChange={setDiscountType}>
                            <SelectTrigger className="min-w-[180px] w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="percentage">Percentagem (%)</SelectItem>
                                <SelectItem value="value">Quantia (Fixo)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label htmlFor="discountAmount" className="block font-medium mb-1">Desconto <span className="text-muted-foreground text-sm">{discountType === 'percentage' ? '(em percentagem)' : '(em valor)'}</span></label>
                        <Input type="number" placeholder={`Exemplo ${discountType === 'percentage' ? '15' : '15,99'}`} />
                    </div>

                    <div>
                        <label htmlFor="minValue" className="block font-medium mb-1">Valor Mínimo <span className="text-sm text-muted-foreground">(0 para ilimitado)</span></label>
                        <Input type="number" defaultValue={0} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 mt-5 gap-5">
                    <div>
                        <label className="block font-medium mb-1">Data de inicio</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "min-w-[240px] w-full justify-start text-left font-normal",
                                    !startDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>Data de inicio</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                                />
                            </PopoverContent>
                            </Popover>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Data de térmio</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "min-w-[240px] w-full justify-start text-left font-normal",
                                    !endDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP") : <span>Data de térmio</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                                />
                            </PopoverContent>
                            </Popover>
                    </div>

                    <div>
                    <label htmlFor="discountType" className="block font-medium mb-1">Aplicar cupom em:</label>
                        <Select defaultValue="all" onValueChange={setCupomUse}>
                            <SelectTrigger className="min-w-[180px] w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Loja toda</SelectItem>
                                <SelectItem value="categorie">Categorias</SelectItem>
                                <SelectItem value="product">Produtos</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                </div>

                {cupomUse === "categorie" && (
                        <div className="mt-5">
                            <label className="block font-medium mb-1">Escolher Categoria</label>
                            <Input/>
                        </div>
                    )}
                    {cupomUse === "product" && (
                        <div className="mt-5">
                            <label className="block font-demium mb-1">Productos</label>
                            <div className="w-full p-5 border rounded-md h-auto ">
                                <div className="flex items-center space-x-2">
                                    <Input className="h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" type="checkbox" id="terms" />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        Desmarcar todos
                                    </label>
                                </div>
                                <ul className="mt-5 flex flex-wrap gap-5">
                                {products.map((product, index) => (
                                    <li key={index} className="flex items-center space-x-2 w-[160px]"> {/* Defini a largura dos itens como 160px */}
                                    <Input
                                        className="h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                        type="checkbox"
                                        id={`terms-${index}`}
                                    />
                                    <label
                                        htmlFor={`terms-${index}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 break-words overflow-hidden"
                                    >
                                        {product}
                                    </label>
                                </li>
                                ))}
                                </ul>
                            </div>
                        </div>
                    )}

                <div className="flex justify-end w-full mt-5">
                    <Button className="gap-1 items-center">
                        <MdOutlineAddCircle className="mt[1px]" size={18}/>
                        Criar cupom
                    </Button>

                </div>
            </form>
        </div>
    );
}
