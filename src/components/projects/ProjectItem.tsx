import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import { ChangeEvent, useContext, useState } from "react";
import { SidebarContext } from "~/core/contexts/sidebar";
import Alert from "~/core/ui/Alert";
import Button from "~/core/ui/Button";
import Divider from "~/core/ui/Divider";
import PageLoadingIndicator from "~/core/ui/PageLoadingIndicator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/core/ui/Tabs";
import Textarea from "~/core/ui/Textarea";

import useFetchProject from "~/lib/projects/hooks/use-fetch-project";

const ProjectItem: React.FC<{
  projectId: string;
}> = ({ projectId }) => {
  const { data: project, status } = useFetchProject(projectId);
  const { collapsed, setCollapsed } = useContext(SidebarContext);
  const [newOriginalTranscription, setNewOriginalTranscription] = useState<string>("");
  const [newTranslatedTranscription, setNewTranslatedTranscription] = useState<string>("");

  const transcriptionTexts = {
    original: "",
    translated: "",
  };

  const isRedubButtonDisabled =
    transcriptionTexts.original === newOriginalTranscription &&
    transcriptionTexts.translated === newTranslatedTranscription;

  const openTranscript = () => {
    setCollapsed(!collapsed);
  };

  const changeOriginalTranscription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewOriginalTranscription(event.target.value);
  };

  const changeTranslatedTranscription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTranslatedTranscription(event.target.value);
  };

  if (status === "loading") {
    return <PageLoadingIndicator>Loading Project...</PageLoadingIndicator>;
  }

  if (status === "error") {
    return (
      <Alert type={"error"}>Sorry, we encountered an error while fetching your project.</Alert>
    );
  }

  return (
    <div className={"flex flex-1"}>
      <div className={collapsed ? "w-2/5 mr-10" : "w-full"}>
        <div className={"flex-0"}>
          <div className={"absolute"}>
            <Button size={"small"} color={"transparent"} href={"/projects"}>
              <ArrowLeftIcon className={"mr-2 h-4"} />
              Back
            </Button>
          </div>
          <div className={"max-w-xs"}></div>
        </div>
        <div className={"flex-0 justify-center"}>
          <div className={"flex flex-col space-y-0.5 max-w-4xl"}>
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
            <div className={"inline-flex flex-row-reverse p-2"}>
              <Button size={"default"} color={"transparent"} onClick={openTranscript}>
                Transcript
              </Button>
            </div>
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

      {/* transcript */}
      {collapsed && (
        <div className={"flex flex-col w-3/5 h-4/5 gap-10"}>
          <div className="flex w-full h-full gap-5">
            <div className={"flex flex-0 flex-col w-full h-full gap-2"}>
              <div className="font-bold">Original Language</div>
              <Textarea
                id="original"
                name="Original Language"
                className={"bg-transparent w-full h-full border-none resize-none"}
                onChange={changeOriginalTranscription}
              >
                {newOriginalTranscription}
              </Textarea>
            </div>
            <div className={"flex flex-0 flex-col w-full h-full gap-2"}>
              <div className="font-bold">{project.targetLanguage}</div>
              <Textarea
                id="translate"
                name="Translated Language"
                className={"bg-transparent w-full h-full border-none resize-none"}
                onChange={changeTranslatedTranscription}
              >
                {newTranslatedTranscription}
              </Textarea>
            </div>
          </div>
          <Button
            className="flex"
            size={"default"}
            color={"transparent"}
            disabled={isRedubButtonDisabled}
          >
            Redub
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectItem;
