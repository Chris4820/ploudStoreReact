import { useEffect, useState } from "react";
import { DataTable } from "../../ui/datatable"
import { Payment, columns } from "./columns"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Christophe",
      cupom: "Nenhum",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      createdAt: "25/03/2002",
    },
    {
        id: "728efff",
        name: "Beatrix",
        cupom: "CHRIS25",
        amount: 100,
        status: "pending",
        email: "m@example.com",
        createdAt: "25/03/2002",
      },
      {
        id: "728efff",
        name: "Beatrix",
        cupom: "CHRIS25",
        amount: 100,
        status: "pending",
        email: "m@example.com",
        createdAt: "25/03/2002",
      },
      {
        id: "728efff",
        name: "Beatrix",
        cupom: "CHRIS25",
        amount: 100,
        status: "pending",
        email: "m@example.com",
        createdAt: "25/03/2002",
      },
      {
        id: "728efff",
        name: "Beatrix",
        cupom: "CHRIS25",
        amount: 100,
        status: "pending",
        email: "m@example.com",
        createdAt: "25/03/2002",
      },
    // ...
  ]
}

export default function RecentPaymentTable() {
    const [data, setData] = useState<Payment[]>([]);
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
