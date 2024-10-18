import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

const Projects = ({projects}) => {
    return (
        <div className={"grid md:grid-cols-2 lg:grid-cols-4 gap-4"}>
            {projects.map((project) => (
                <Card key={project.id}>
                    <Link href={`/projects/${project.id}`}>
                        <CardHeader>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                    </Link>
                </Card>
            ))}
        </div>
    );
};

export default Projects;