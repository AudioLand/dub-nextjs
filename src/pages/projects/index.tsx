import { GetServerSidePropsContext } from "next";

import RouteShell from "~/components/RouteShell";
import ProjectsWrapper from "~/components/projects/ProjectsWrapper";
import { withAppProps } from "~/lib/props/with-app-props";

const Projects = () => {
  return (
    <RouteShell title={"Projects"}>
      <ProjectsWrapper />
    </RouteShell>
  );
};

export default Projects;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
