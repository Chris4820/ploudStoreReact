import { Switch } from "../../../components/ui/switch"



interface SwitchPermissionProps extends React.ComponentProps<typeof Switch> {
  text: string,
  check: boolean,
}

export default function SwitchPermissionComponent({text, check= false, ...props} : SwitchPermissionProps) {
  return(
    <div className="flex gap-2 items-center justify-between">
          <span>{text}</span>
          <Switch {...props} checked={check}/>
      </div>
  )
}