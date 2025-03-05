import { PlusIcon } from "lucide-react";
import HeaderSection from "../../../components/commons/Header";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/datatable";
import { useGetRoles } from "../api/store";
import { columnsRoles } from "./RolesColumn";
import { useNavigate } from "react-router-dom";




export default function RolesPage() {

  const {data: roles = [], isLoading} = useGetRoles()
  

  const navigate = useNavigate()
    return(
      <>
      <div className="flex justify-between items-center">
        <HeaderSection
          title="Cargos"
          description="Gerencie os cargos dos seus sub-usuários"
        />
        <div className="flex justify-center mt-4 mb-4">
          <Button onClick={() => navigate('create')}>
            <PlusIcon className="w-5 h-5 mr-2 inline-block" />
            Novo Cargo
          </Button>
        </div>
      </div>
        <DataTable
          columns={columnsRoles}
          data={roles}
          link="/dashboard/subuser/roles/{id}"
          loading={isLoading}
        />
      </>
    )
}
