import { useNavigate } from "react-router-dom"



type GatewayCard = {
  name: string,
  description: string,
  imageUrl: string,
  link: string,
}


export default function GatewayCard({ name, description, imageUrl, link } : GatewayCard) {
  const navigate = useNavigate();
  
  return(
    <div className="p-5 rounded-lg border shadow-lg hover:bg-muted/50 cursor-pointer duration-300" onClick={() => navigate(link)}>
        <div className="flex justify-center h-28 p-5">
          <img className="object-contain rounded-md" src={imageUrl} alt={`${name} Logo`}/>
        </div>
        <div className="mt-5 flex justify-between items-center gap-5">
          <div>
            <h1 className="font-bold text-lg">{name}</h1>
            <p>{description}</p>
          </div>
        </div>
    </div>
  )
}