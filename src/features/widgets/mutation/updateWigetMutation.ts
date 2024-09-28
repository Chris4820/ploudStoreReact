import { useMutation } from '@tanstack/react-query';
import { updateWidget, type WidgetDefault, type WidgetsProps } from '../api/req/widgets';
import { useNavigate } from 'react-router-dom';
import queryClient from '../../../lib/reactquery/reactquery';
import { toast } from 'sonner';

export const useUpdateWidget = (widgetType: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: WidgetDefault) => updateWidget(data, widgetType),
    onSuccess: (data, variables) => {
      // Atualiza o cache do widget individualmente
      queryClient.setQueryData(['widget', widgetType], variables); // Atualiza o cache para o widgetType específico

      
      // Obtém os widgets existentes do cache
      const existingWidgets = queryClient.getQueryData<WidgetsProps[]>(['widgets']);

      if (existingWidgets) {
        // Verifica se o widget com o tipo widgetType já existe no cache
        const widgetExists = existingWidgets.some(widget => widget.widgetType === widgetType);
        
        let updatedWidgets;

        if (widgetExists) {
          // Se o widget existe, atualiza o widget existente
          updatedWidgets = existingWidgets.map(widget => {
            if (widget.widgetType === widgetType) {
              // Atualiza o widget correspondente
              return {
                ...widget,
                header: variables.header,
                visible: variables.visible,
              };
            }
            return widget; // Retorna o widget inalterado se não for o tipo que estamos atualizando
          });
        } else {
          // Se o widget não existe, adiciona um novo widget ao cache
          const newWidget: WidgetsProps = {
            id: data.widget.id, // Usa o id retornado no "data"
            header: variables.header,
            visible: variables.visible,
            widgetType: widgetType,
          };

          updatedWidgets = [...existingWidgets, newWidget];
        }

        // Atualiza o cache dos widgets com o widget alterado ou adicionado
        queryClient.setQueryData(['widgets'], updatedWidgets);

      }

      // Mensagem de sucesso e redirecionamento
      toast.success("Widget atualizado com sucesso!");
      navigate("../widgets"); // Redireciona para a página de widgets
    },
  });
};
