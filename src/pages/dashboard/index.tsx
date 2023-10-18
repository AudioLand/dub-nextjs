import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";

import RouteShell from "~/components/RouteShell";
import { withAppProps } from "~/lib/props/with-app-props";

const DashboardContent = dynamic(
	() => import("~/components/dashboard/DashboardContent"),
	{
		ssr: false,
	},
);

const Dashboard = () => {
	return (
		<RouteShell title={"Dashboard"}>
			<DashboardContent />
		</RouteShell>
	);
};

export default Dashboard;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return await withAppProps(ctx);
}
