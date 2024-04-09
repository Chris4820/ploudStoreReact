import { useEffect, useState } from "react";
import { DataTable } from "../../ui/datatable"
import { BestProduct, columns } from "./columns"

async function getData(): Promise<BestProduct[]> {
  // Fetch data from your API here.
  return [
    // ...
  ]
}

export default function BestProductTable() {
    const [data, setData] = useState<BestProduct[]>([]);
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
