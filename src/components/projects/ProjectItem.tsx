import { useState, useEffect } from "react";

import PageLoadingIndicator from "~/core/ui/PageLoadingIndicator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "~/core/ui/Select";
import Alert from "~/core/ui/Alert";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import Button from "~/core/ui/Button";
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

  // TODO temporary added hardcoded media
  project.output =
    "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";
  project.input =
    "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

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
              <video className="w-full" controls src={project.output} />
            </TabsContent>
            <TabsContent value="origin" className="mt-6 w-full">
              <video className="w-full" controls src={project.input} />
            </TabsContent>
          </Tabs>
          <div className="flex flex-col md:flex-row border rounded-lg px-6 py-5">
            <div className="mb-3 md:mr-6 md:mb-0">
              <div className="text-[8px]">Name</div>
              <div>{project.name}</div>
            </div>
            <div className="mb-3 md:mr-6 md:mb-0">
              <div className="text-[8px]">Target language</div>
              <div>{project.language}</div>
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
