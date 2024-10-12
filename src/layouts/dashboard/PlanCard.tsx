import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import type { StorePlanProps } from "../../features/home/api/req/req";
import { useNavigate } from "react-router-dom";
import { Clock, TrendingUp } from "lucide-react";

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
      const timeDiff = overdueDate.getTime() - currentDate.getTime();
      const diffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setDaysLeft(diffInDays);
    }
  }, [plan]);

  if (planLoading || (plan?.plan !== "basic" && daysLeft > 5)) {
    return null;
  }

  const isBasic = plan?.plan === "basic";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {isBasic ? (
            <TrendingUp className="text-violet-600 dark:text-violet-400" size={24} />
          ) : (
            <Clock className="text-yellow-600 dark:text-yellow-400" size={24} />
          )}
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {isBasic ? "Melhore seu plano" : "Renove seu plano"}
          </h2>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {isBasic
          ? "Melhore seu plano para obter novos benefícios"
          : `Faltam ${daysLeft} dias para o plano expirar. Renove agora!`
        }
      </p>
      <Button
        onClick={() => navigate("/dashboard/plan")}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white"
      >
        {isBasic ? "Melhorar plano" : "Renovar plano"}
      </Button>
    </div>
  );
}