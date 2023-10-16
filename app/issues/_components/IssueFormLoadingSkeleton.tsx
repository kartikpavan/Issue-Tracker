import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueFormLoadingSkeleton = () => {
  return (
    <div className="max-w-xl">
      <Skeleton height={"2rem"} />
      <Skeleton height={"20rem"} />
      <Skeleton height={"2rem"} width={"10rem"} className="mt-8" />
    </div>
  );
};

export default IssueFormLoadingSkeleton;
