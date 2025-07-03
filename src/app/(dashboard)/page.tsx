import AnalyticsBrief from "@/components/dashboard/AnalyticsBrief";
import CommonDashboard from "@/components/dashboard/CommonDashboard";

export default function DashboardPage() {
  return (
    <div className="p-6 flex flex-col gap-6 mb-20">
      <AnalyticsBrief />

      <CommonDashboard />
    </div>
  );
}
