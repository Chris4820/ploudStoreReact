import { useEffect, useState } from "react";
import { DataTable } from "../../ui/datatable"
import { BestCostumer, columns } from "./columns"

async function getData(): Promise<BestCostumer[]> {
  // Fetch data from your API here.
  return [
    // ...
  ]
}

export default function BestCostumerTable() {
    const [data, setData] = useState<BestCostumer[]>([]);
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
