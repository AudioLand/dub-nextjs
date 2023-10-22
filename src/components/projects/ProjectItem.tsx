import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import Alert from "~/core/ui/Alert";
import Button from "~/core/ui/Button";
import PageLoadingIndicator from "~/core/ui/PageLoadingIndicator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/core/ui/Tabs";

import useFetchProject from "~/lib/projects/hooks/use-fetch-project";

const ProjectItem: React.FC<{
  projectId: string;
}> = ({ projectId }) => {
  const { data: project, status } = useFetchProject(projectId);

  if (status === "loading") {
    return <PageLoadingIndicator>Loading Project...</PageLoadingIndicator>;
  }

  if (status === "error") {
    return (
      <Alert type={"error"}>
        Sorry, we encountered an error while fetching your project.
      </Alert>
    );
  }

  return (
    <div>
      <div className={"flex flex-1"}>
        <div className={"absolute"}>
          <Button size={"small"} color={"transparent"} href={"/projects"}>
            <ArrowLeftIcon className={"mr-2 h-4"} />
            Back
          </Button>
        </div>
        <div className={"max-w-xs"}></div>
      </div>
      <div className={"flex justify-center"}>
        <div className={"flex flex-1 flex-col space-y-0.5 max-w-4xl"}>
          <Tabs defaultValue="translated" className="flex flex-col items-center mb-6">
            <TabsList>
              <TabsTrigger value="translated">Translated</TabsTrigger>
              <TabsTrigger value="origin">Origin</TabsTrigger>
            </TabsList>
            <TabsContent value="translated" className="mt-6 w-full">
              <video className="w-full" controls src={project.translatedFileLink} />
            </TabsContent>
            <TabsContent value="origin" className="mt-6 w-full">
              <video className="w-full" controls src={project.originalFileLink} />
            </TabsContent>
          </Tabs>
          <div className="flex flex-col md:flex-row border rounded-lg px-6 py-5">
            <div className="mb-3 md:mr-6 md:mb-0">
              <div className="text-[8px]">Name</div>
              <div>{project.name}</div>
            </div>
            <div className="mb-3 md:mr-6 md:mb-0">
              <div className="text-[8px]">Target language</div>
              <div>{project.targetLanguage}</div>
            </div>
            <div>
              <div className="text-[8px]">Created at</div>
              <div>{project.createdAt.toDate().toDateString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
