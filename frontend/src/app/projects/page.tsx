import TableComponent from "@/components/tables/TableComponent";
import {columns} from "@/app/projects/projectColumns";
import {dateFormater} from "@/lib/utils";
import {Project} from "@/lib/types/project.type";
import FormDialog from "@/components/FormDialog";
import {createProject} from "@/lib/actions/project.actions";
import ProjectForm from "@/app/projects/[id]/components/ProjectForm";

const Page = async () => {
    const response = await fetch(`${process.env.API_URL}/projects/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            tags: ['projects']
        }
    });
    const data: Project[] = await response.json();
    const projects = data.map(project => {
        return {
            ...project,
            createdAt: dateFormater({dateString: project.createdAt.toString(), formatString: "dd/MM/yyyy HH:mm:ss"}),
            updatedAt: dateFormater({dateString: project.updatedAt.toString(), formatString: "dd/MM/yyyy HH:mm:ss"})
        }
    })

    return (
        <div>
            <h1 className="text-4xl font-bold">My projects</h1>
            <div className="mt-4">
                <FormDialog data={null} callback={createProject} label={"Add new project"} FormComponent={ProjectForm}/>
            </div>
            <TableComponent data={projects} columns={columns} filterId={"name"} filterName={"Name"} slug={"/projects/"}/>
        </div>
    );
};

export default Page;