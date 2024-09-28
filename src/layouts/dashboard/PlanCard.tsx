import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import type { StorePlanProps } from "../../features/home/api/req/req";
import { useNavigate } from "react-router-dom";

type PlanInfo = {
  plan: StorePlanProps | undefined,
  planLoading: boolean,
}


export default function PlanInfo({ plan, planLoading }: PlanInfo) {
  const [daysLeft, setDaysLeft] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (plan?.overdueDate) {
      const currentDate = new Date();
      const overdueDate = new Date(plan.overdueDate);
      
      // Calculate the difference in milliseconds
      const timeDiff = overdueDate.getTime() - currentDate.getTime(); // Convert Date to milliseconds
      
      // Calculate the difference in days
      const diffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setDaysLeft(diffInDays);
    }
  }, [plan]);

  // Verifica se está carregando ou se o plano não deve ser exibido
  if (planLoading || (plan?.plan !== "basic" && daysLeft > 5)) {
    return null; // Não renderiza o componente se essas condições forem verdadeiras
  }

  return (
    <div className="absolute bottom-0 right-0 left-0 lg:right-4 lg:left-4 p-4">
      <div className="border-2 rounded-md shadow-md p-5 bg-card">
        {plan?.plan === "basic" ? (
          <>
            <h1 className="text-base font-bold">Melhore seu plano</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Melhore seu plano para obter novos benefícios
            </p>
          </>
        ) : (
          <>
            <h1 className="text-base font-bold">Renove seu plano</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Faltam <span className="font-bold">{daysLeft}</span> dias para o plano expirar.
              Renove agora!
            </p>
          </>
        )}
        <Button onClick={() => navigate("/dashboard/plan")} className="w-full mt-4">
          {plan?.plan === "basic" ? "Melhorar" : "Renovar"}
        </Button>
      </div>
    </div>
  );
}
