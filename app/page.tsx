import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default function Home() {
  return (
    <main>
      <LatestIssues />
      <IssueSummary />
    </main>
  );
}
export const dynamic = "force-dynamic";
