import { z } from 'zod';

// Definindo o esquema Zod para Mercado Pago
const SubDomainSchema = z.object({
  subdomain: z.string()
    .min(3, "O subdomínio deve ter no mínimo 3 caracteres.")
    .max(63, "O subdomínio deve ter no máximo 63 caracteres.")
    .regex(/^(?!-)[A-Za-z0-9-]{1,63}(?<!-)$/, "O subdomínio deve começar e terminar com uma letra ou número e pode conter apenas letras, números e hífens.")
    .regex(/^[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]$/, "O subdomínio deve começar e terminar com uma letra ou número."),
});

// Exportando o tipo inferido
export type SubDomainFormData = z.infer<typeof SubDomainSchema>;
export default SubDomainSchema;
