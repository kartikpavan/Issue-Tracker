import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingDetailIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="3" my="2">
        <Skeleton width={"5rem"} />
        <Skeleton width={"5rem"} />
      </Flex>
      <Card my="4" className="prose">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingDetailIssuePage;
