import { Flex, Heading, Text } from "@radix-ui/themes";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  return (
    <Flex gap="5" mt="3">
      <div className="bg-red-100/20 p-4 rounded-md border-2 border-red-400/60 shadow-sm">
        <Heading size="3">Open Issues</Heading>
        <Text className="font-semibold" color="red">
          {open}
        </Text>
      </div>
      <div className="bg-violet-100/20 p-4 rounded-md border-2 border-violet-400/60 shadow-sm">
        <Heading size="3">In-Progress Issues</Heading>
        <Text className="font-semibold" color="violet">
          {inProgress}
        </Text>
      </div>
      <div className="bg-green-100/20 p-4 rounded-md border-2 border-green-400/60 shadow-sm">
        <Heading size="3">Closed Issues</Heading>
        <Text className="font-semibold" color="green">
          {closed}
        </Text>
      </div>
    </Flex>
  );
};

export default IssueSummary;
