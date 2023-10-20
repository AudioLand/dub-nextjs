import { GetServerSidePropsContext } from "next";

import RouteShell from "~/components/RouteShell";
import ProjectsList from "~/components/projects/ProjectsList";
import { withAppProps } from "~/lib/props/with-app-props";

const Projects = () => {
  return (
    <RouteShell title={"Projects"}>
      <ProjectsList />
    </RouteShell>
  );
};

export default Projects;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
