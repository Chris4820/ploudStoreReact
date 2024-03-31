

type NotificationComponentProps = {
    text: string,
    icon?: React.ElementType;
}

export default function NotificationComponent({ text, icon} : NotificationComponentProps) {
    const Icon = icon;

    return(
        <div className="flex container justify-between items-center border-b-2 bg-muted rounded-md p-4">
            {Icon && <Icon size={26} className="text-purple-600" />}
            <h1 className="font-semibold text-sm">{text}</h1>
        </div>
    )
}