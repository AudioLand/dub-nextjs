import { GetServerSidePropsContext } from "next";

import RouteShell from "~/components/RouteShell";
import ProjectsWrapper from "~/components/projects/ProjectsWrapper";
import { withAppProps } from "~/lib/props/with-app-props";
import FirebaseStorageProvider from "~/core/firebase/components/FirebaseStorageProvider";

const Projects = () => {
  return (
    <FirebaseStorageProvider>
      <RouteShell title={"Projects"}>
        <ProjectsWrapper />
      </RouteShell>
    </FirebaseStorageProvider>
  );
};

export default Projects;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
