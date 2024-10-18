import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const Projects = ({projects}) => {
    return (
        <div className={"grid md:grid-cols-2 lg:grid-cols-4 gap-4"}>
            {projects.map((project) => (
                <Card key={project.id}>
                    <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
};

export default Projects;