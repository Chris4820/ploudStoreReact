import { PermissionTypes } from "./PermissionType";

export const permissionsData = [
  {
    category: "Categorias",
    permissions: [
      { label: "Ver categorias", value: PermissionTypes.LIST_CATEGORY },
      { label: "Criar categorias", value: PermissionTypes.CREATE_CATEGORY },
      { label: "Atualizar categorias", value: PermissionTypes.UPDATE_CATEGORY },
      { label: "Deletar categorias", value: PermissionTypes.DELETE_CATEGORY },
    ],
  },
  {
    category: "Produtos",
    permissions: [
      { label: "Ver produtos", value: PermissionTypes.LIST_PRODUCT },
      { label: "Criar produtos", value: PermissionTypes.CREATE_PRODUCT },
      { label: "Atualizar produtos", value: PermissionTypes.UPDATE_PRODUCT },
      { label: "Deletar produtos", value: PermissionTypes.DELETE_PRODUCT },
    ],
  },
  {
    category: "Coupons",
    permissions: [
      { label: "ver coupons", value: PermissionTypes.LIST_COUPON },
      { label: "Criar coupons", value: PermissionTypes.CREATE_COUPON },
      { label: "Atualizar coupons", value: PermissionTypes.UPDATE_COUPON },
      { label: "Deletar coupons", value: PermissionTypes.DELETE_COUPON },
    ],
  },
  {
    category: "Variáveis",
    permissions: [
      { label: "Visualizar variáveis", value: PermissionTypes.LIST_VARIABLE },
      { label: "Criar variáveis", value: PermissionTypes.CREATE_VARIABLE },
      { label: "Editar variáveis", value: PermissionTypes.UPDATE_VARIABLE },
      { label: "Eliminar variáveis", value: PermissionTypes.DELETE_VARIABLE },
    ],
  },
  {
    category: "Equipa",
    permissions: [
      { label: "Ver membros", value: PermissionTypes.LIST_MEMBERS },
      { label: "Convidar membro da equipe", value: PermissionTypes.INVITE_TEAM_MEMBER },
      { label: "Remover membro da equipe", value: PermissionTypes.REMOVE_TEAM_MEMBER },
      { label: "Editar membro da equipe", value: PermissionTypes.EDIT_TEAM_MEMBER },
    ],
  },
  {
    category: "Templates",
    permissions: [
      { label: "Ver templates", value: PermissionTypes.VIEW_TEMPLATE },
      { label: "Criar templates", value: PermissionTypes.CREATE_TEMPLATE },
      { label: "Editar templates", value: PermissionTypes.EDIT_TEMPLATE },
      { label: "Remover templates", value: PermissionTypes.REMOVE_TEMPLATE },
    ],
  },
  {
    category: "Definições",
    permissions: [
      { label: "Editar definições gerais", value: PermissionTypes.EDIT_SETTINGS },
      { label: "Editar definições checkout", value: PermissionTypes.EDIT_CHECKOUT_SETTINGS },
      { label: "Editar domínio", value: PermissionTypes.EDIT_DOMAIN },
      { label: "Editar SubDomínio", value: PermissionTypes.EDIT_SUBDOMAIN },
      { label: "Gerenciar integrações", value: PermissionTypes.EDIT_SERVER },
    ],
  },
];