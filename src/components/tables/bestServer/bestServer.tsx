import { useEffect, useState } from "react";
import { DataTable } from "../../ui/datatable"
import { BestServer, columns } from "./columns"

async function getData(): Promise<BestServer[]> {
  // Fetch data from your API here.
  return [
    // ...
  ]
}

export default function BestServerTable() {
    const [data, setData] = useState<BestServer[]>([]);
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
