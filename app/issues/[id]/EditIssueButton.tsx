import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { HiOutlinePencilAlt } from "react-icons/hi";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <HiOutlinePencilAlt size={18} />
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
