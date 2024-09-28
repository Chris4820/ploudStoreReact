import { z } from 'zod';

// Definindo o esquema Zod para Mercado Pago
const MercadoPagoSchema = z.object({
  id: z.number().optional(),  // ID opcional, geralmente para referência no banco de dados
  // Objeto de configuração para Mercado Pago
  config: z.object({
    clientId: z.string()
      .min(32, "Client ID deve ter pelo menos 32 caracteres.")
      .max(64, "Client ID não pode exceder 64 caracteres.")
      .regex(/^[A-Za-z0-9-_]+$/, "Client ID deve conter apenas caracteres alfanuméricos, hífens ou underscores."),
    
    tokenId: z.string()
      .min(32, "Token ID deve ter pelo menos 32 caracteres.")
      .max(64, "Token ID não pode exceder 64 caracteres.")
      .regex(/^[A-Za-z0-9-_]+$/, "Token ID deve conter apenas caracteres alfanuméricos, hífens ou underscores."),
  }),
  // Ativar ou desativar o gateway
  active: z.boolean(),
  taxType: z.enum(['PERCENTAGE', 'VALUE', 'NONE']),
  taxValue: z.number().min(0, "0 ou Acima")
});

// Exportando o tipo inferido
export type MercadoPagoFormData = z.infer<typeof MercadoPagoSchema>;
export default MercadoPagoSchema;
