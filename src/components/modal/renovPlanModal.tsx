
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radioGroup';
import { CreditCard } from 'lucide-react';
import { BsPaypal } from 'react-icons/bs';
import { FaStripe } from 'react-icons/fa';

export default function PaymentDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-4">Assine Agora</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Escolha seu Plano</DialogTitle>
                </DialogHeader>
                <h1>Metodo de pagamento</h1>
                <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
                <label
                    htmlFor="card"
                    className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value="card" id="card" className="sr-only" />
                    <CreditCard className="mb-3 h-6 w-6" />
                    Card
                  </label>
                  <label
                        htmlFor="stripe"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
        <RadioGroupItem value="stripe" id="stripe" className="sr-only" />
        <FaStripe className="mb-3 h-6 w-6" />
        Stripe
      </label>
      <label
        htmlFor="apple"
        className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
      >
        <RadioGroupItem value="apple" id="apple" className="sr-only" />
        <BsPaypal className="mb-3 h-6 w-6" />
        PayPal
      </label>
                </RadioGroup>

                <DialogFooter>
                    <Button>Pagar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
