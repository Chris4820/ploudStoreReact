import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../lib/reactquery/reactquery";
import { changeThemeReq, type UserInformationProps } from "../../../api/req/user";
import type { Theme } from "../../../layouts/providers/Theme";


export const UseUpdateTheme = () => {


  return useMutation({
    mutationFn: (theme: Theme) => changeThemeReq(theme),
    onMutate(theme) {
      const userDataCache = queryClient.getQueryData<UserInformationProps>(['user']);
      if(userDataCache) {
        queryClient.setQueryData(['user'], {
          ...userDataCache,
          theme,
          
        });
    }
  }
  }
  )


}