import { useEffect, useState } from "react";
import { DataTable } from "../../ui/datatable"
import { BestCategorie, columns } from "./columns"

async function getData(): Promise<BestCategorie[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "VIPS",
      purchase: 45,
      amount: 65.54
    },
    {
        id: "728ed52f",
        name: "VIPS",
        purchase: 45,
        amount: 65.54
      },
      {
        id: "728ed52f",
        name: "VIPS",
        purchase: 45,
        amount: 65.54
      },
      {
        id: "728ed52f",
        name: "VIPS",
        purchase: 45,
        amount: 65.54
      },
      {
        id: "728ed52f",
        name: "VIPS",
        purchase: 45,
        amount: 65.54
      },
    // ...
  ]
}

export default function BestCategorieTable() {
    const [data, setData] = useState<BestCategorie[]>([]);
    useEffect(() => {
        async function fetchData() {
          const fetchedData = await getData();
          setData(fetchedData);
        }
    
        fetchData();
      }, []);

  return (
        <DataTable columns={columns} data={data}/>
  )
}
