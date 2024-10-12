import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import HeaderSection from "../../../components/commons/Header";
import { DataTable } from "../../../components/ui/datatable";
import { useGetSubUsers } from "../api/store/store";
import { columnsSubUsers } from "./SubUserColumn";
import {UserPlus } from "lucide-react";
import { BsEnvelope } from "react-icons/bs";
import { Badge } from "../../../components/ui/badge";

export default function SubUserPage() {
  const { data, isLoading } = useGetSubUsers();
  const navigate = useNavigate();

  const invitesCount = data?.invitesCount ?? 0;

  console.log(data);
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <HeaderSection title="Sub-usuários" description="Adicione novos membros aqui na sua loja" />
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <BsEnvelope className="h-4 w-4" />
                  {invitesCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                      {invitesCount}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{invitesCount} convites pendentes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button onClick={() => navigate('create')}>
            <UserPlus className="mr-2 h-4 w-4" /> Sub-Usuário
          </Button>
        </div>
      </div>

      <DataTable columns={columnsSubUsers} data={data?.subuser || []} loading={isLoading} />
    </>
  );
}