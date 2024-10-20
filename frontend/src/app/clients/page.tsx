import React from 'react';
import {Client} from "@/lib/types/client.type";
import TableComponent from "@/components/tables/TableComponent";
import {columns} from "@/app/clients/clientColumns";
import {dateFormater} from "@/lib/utils";
import {createClient} from "@/lib/actions/client.actions";
import FormDialog from "@/components/FormDialog";
import ClientForm from "@/app/clients/ClientForm";

const Page = async () => {
    const response = await fetch(`${process.env.API_URL}/clients`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            tags: ['clients']
        }
    });
    const data: Client[] = await response.json();
    const clients = data.map(client => {
        return {
            ...client,
            createdAt: dateFormater({dateString: client.createdAt.toString(), formatString: "dd/MM/yyyy HH:mm:ss"}),
            updatedAt: dateFormater({dateString: client.updatedAt.toString(), formatString: "dd/MM/yyyy HH:mm:ss"})
        }
    })

    return (
        <div>
            <h1 className="text-4xl font-bold">My clients</h1>
            <div className="mt-4">
                {/*<ClientFormDialog label={"Create new client"} callback={createClient}/>*/}
                <FormDialog label={"Create new client"} callback={createClient} FormComponent={ClientForm} data={null}/>
            </div>
            <TableComponent data={clients} columns={columns} filterId={"name"} filterName={"Name"} slug={"/clients/"}/>
        </div>
    );
};

export default Page;