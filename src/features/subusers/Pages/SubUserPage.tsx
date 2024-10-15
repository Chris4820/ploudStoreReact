import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/datatable";
import { useGetInvites, useGetSubUsers } from "../api/store/store";
import { columnsSubUsers } from "./SubUserColumn";
import {UserPlus, X } from "lucide-react";
import { BsEnvelope } from "react-icons/bs";
import { Badge } from "../../../components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import HeaderSection from "../../../components/commons/Header";

export default function SubUserPage() {
  const { data, isLoading } = useGetSubUsers();
  const { data: invites } = useGetInvites();
  const navigate = useNavigate();

  const invitesCount = data?.invitesCount ?? 0;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <HeaderSection title="Sub-usuários" description="Adicione novos membros aqui na sua loja" />
        <div className="flex items-center space-x-4">
          <Popover>
                <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <BsEnvelope className="h-4 w-4" />
                  {invitesCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                      {invitesCount}
                    </Badge>
                  )}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Convites Pendentes</h3>
                {invites && invites.length > 0 ? (
                  invites.map((invite) => (
                    <div 
                      key={invite.id} 
                      className="flex hover:bg-muted/50 cursor-pointer items-center justify-between p-2 rounded-md"
                      onClick={() => navigate(`invite/${invite.id}`)}
                    >
                      <div>
                        <p className="font-medium">{invite.user.name}</p>
                        <p className="text-sm">Cargo: {invite.role.name}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhum convite pendente</p>
                )}
              </div>
            </PopoverContent>
            </Popover>
          <Button onClick={() => navigate('create')}>
            <UserPlus className="mr-2 h-4 w-4" /> Sub-Usuário
          </Button>
        </div>
      </div>

      <DataTable columns={columnsSubUsers} data={data?.subuser || []} loading={isLoading} />
    </>
  );
}