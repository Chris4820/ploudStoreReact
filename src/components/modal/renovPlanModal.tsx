import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radioGroup";
import { CreditCard } from "lucide-react";
import { BsPaypal } from "react-icons/bs";
import { FaStripe } from "react-icons/fa";
import axiosStore from "../../lib/axios/axiosStore";
import { toast } from "sonner";
import SubmitButton from "../commons/buttons/SubmitButtonComponent";

type PaymentDialogProps = {
  children: React.ReactNode;
  plan: string;
  price: number;
};

export default function PaymentDialog({ children, plan, price }: PaymentDialogProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [selectedRecurrence, setSelectedRecurrence] = useState("monthly");
  const [subTotal, setSubTotal] = useState(price);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(price);
  const [time, setTime] = useState("1 mês"); // Variável para armazenar o tempo


  const [loading, setLoading] = useState(false);

  const handleRecurrenceChange = (recurrence: string) => {
    setSelectedRecurrence(recurrence);

    let newSubTotal = price;
    let newDiscount = 0;
    let newTime = ""; // Nova variável para armazenar o tempo

    // Cálculo do subtotal e desconto com base na recorrência
    if (recurrence === "quarterly") {
      newSubTotal = price * 3; // Trimestral: 3 meses
      newDiscount = 0.15 * newSubTotal; // 15% de desconto
      newTime = "3 meses"; // Define o tempo correspondente
    } else if (recurrence === "annual") {
      newSubTotal = price * 12; // Anual: 12 meses
      newDiscount = 0.25 * newSubTotal; // 25% de desconto
      newTime = "12 meses"; // Define o tempo correspondente
    } else {
      newSubTotal = price; // Mensal
      newDiscount = 0; // Sem desconto
      newTime = "1 mês"; // Define o tempo correspondente
    }

    // Atualiza o subtotal, desconto e total
    const newTotalPrice = newSubTotal - newDiscount;
    setSubTotal(newSubTotal);
    setDiscount(newDiscount);
    setTotalPrice(newTotalPrice);
    setTime(newTime); // Atualiza o tempo
  };


  async function createOrder(time: string, plan: string, totalPrice: number) {
    try {
      setLoading(true);
      const response = await axiosStore.post("/order", {
        time,
        plan,
        totalPrice,
      })
      if(response) {
        toast("Sucesso");
        console.log(response);
      }
    } catch (error) {
      console.log("Erro no front: ", error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{plan}</DialogTitle>
        </DialogHeader>

        <section className="mt-3">
          <h1 className="font-semibold text-lg">Método de pagamento</h1>
          <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-5 mt-3">
            <label
              htmlFor="card"
              className={`flex cursor-pointer flex-col items-center justify-between rounded-md p-4 border-2 ${
                selectedPaymentMethod === "card" ? "border-primary bg-accent" : "border-muted bg-popover"
              }`}
              onClick={() => setSelectedPaymentMethod("card")}
            >
              <CreditCard className="mb-3 h-6 w-6" />
              <span className="text-sm">Cartão</span>
            </label>
            <label
              htmlFor="stripe"
              className={`flex cursor-pointer flex-col items-center justify-between rounded-md p-4 border-2 ${
                selectedPaymentMethod === "stripe" ? "border-primary bg-accent" : "border-muted bg-popover"
              }`}
              onClick={() => setSelectedPaymentMethod("stripe")}
            >
              <FaStripe className="mb-3 h-6 w-6 " />
              <span className="text-sm">Stripe</span>
            </label>
            <label
              htmlFor="paypal"
              className={`flex cursor-pointer flex-col items-center justify-between rounded-md p-4 border-2 ${
                selectedPaymentMethod === "paypal" ? "border-primary bg-accent" : "border-muted bg-popover"
              }`}
              onClick={() => setSelectedPaymentMethod("paypal")}
            >
              <BsPaypal className="mb-3 h-6 w-6" />
              <span className="text-sm">PayPal</span>
            </label>
          </RadioGroup>
        </section>

        <section className="mt-3">
          <h1 className="font-semibold text-lg">Recorrência de pagamento</h1>
          <RadioGroup className="grid grid-cols-3 gap-4 mt-3" onValueChange={handleRecurrenceChange}>
            <label
              className={`flex cursor-pointer flex-col items-center justify-between rounded-md p-4 border-2 ${
                selectedRecurrence === "monthly" ? "border-primary bg-accent" : "border-muted bg-popover"
              }`}
              onClick={() => handleRecurrenceChange("monthly")}
            >
              <div className="flex gap-1 items-end">
                <h1 className="text-base font-semibold">Mensal</h1>
              </div>
              <p className="text-sm text-muted-foreground">A cada mês</p>
            </label>

            <label
              className={`flex cursor-pointer flex-col items-center justify-between rounded-md p-4 border-2 ${
                selectedRecurrence === "quarterly" ? "border-primary bg-accent" : "border-muted bg-popover"
              }`}
              onClick={() => handleRecurrenceChange("quarterly")}
            >
              <div className="flex gap-1 items-end">
                <h1 className="text-base font-semibold">Trimestral</h1>
                <span className="text-violet-600 font-bold text-sm mb-0.5">(-15%)</span>
              </div>
              <p className="text-sm text-muted-foreground">A cada 3 meses</p>
            </label>

            <label
              className={`flex cursor-pointer flex-col items-center justify-between rounded-md p-4 border-2 ${
                selectedRecurrence === "annual" ? "border-primary bg-accent" : "border-muted bg-popover"
              }`}
              onClick={() => handleRecurrenceChange("annual")}
            >
              <div className="flex gap-1 items-end">
                <h1 className="text-base font-semibold">Anual</h1>
                <span className="text-violet-600 font-bold text-sm mb-0.5">(-25%)</span>
              </div>
              <p className="text-sm text-muted-foreground">A cada 12 meses</p>
            </label>
          </RadioGroup>
        </section>

        <section className="mt-3">
          <h1 className="font-semibold text-lg">Detalhes do checkout</h1>
          <div className="flex justify-between items-center">
            <h1 className="text-base font-medium">Subtotal:</h1>
            <p>{subTotal.toFixed(2)}€</p>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-base font-medium">Desconto:</h1>
            <p>{discount.toFixed(2)}€</p>
          </div>
        </section>

        <hr />

        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Valor total</h1>
          <p>{totalPrice.toFixed(2)}€</p>
        </div>
        <DialogFooter>
          <div className="grid grid-cols-2 gap-5">
            <DialogClose asChild>
              <Button variant={"outline"}>Fechar</Button>
            </DialogClose>
              <SubmitButton
               isLoading={loading} 
               text={`Pagar {totalPrice.toFixed(2)}€`} 
               onClick={() => createOrder(plan,time, totalPrice)}>
              </SubmitButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
