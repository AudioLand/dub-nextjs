// react
import { GetServerSidePropsContext } from "next";

// ui-components
import ProjectItem from "~/components/projects/ProjectItem";
import RouteShell from "~/components/RouteShell";
import Alert from "~/core/ui/Alert";
import ErrorBoundary from "~/core/ui/ErrorBoundary";

// hooks
import { withAppProps } from "~/lib/props/with-app-props";

// types
import { Project } from "~/lib/projects/types/project";

const ProjectPage: React.FC<{ projectId: WithId<Project>["id"] }> = ({ projectId }) => {
  return (
    <RouteShell title={"Project"}>
      <ErrorBoundary fallback={<Alert type={"error"}>Ops, an error occurred :(</Alert>}>
        <ProjectItem projectId={projectId} />
      </ErrorBoundary>
    </RouteShell>
  );
};

export default ProjectPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const appProps = await withAppProps(ctx);
  const projectId = ctx.query.id;

  if ("props" in appProps) {
    return {
      props: {
        ...(appProps.props ?? {}),
        projectId,
      },
    };
  }

  return appProps;
}
