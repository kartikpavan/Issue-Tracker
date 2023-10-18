"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import {
  HiMiniChevronDoubleRight,
  HiMiniChevronDoubleLeft,
  HiMiniChevronLeft,
  HiMiniChevronRight,
} from "react-icons/hi2";

interface Props {
  itemCount: number;
  itemsPerPage: number;
  currentPage: number;
}

const Pagination = ({ itemCount, currentPage, itemsPerPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(itemCount / itemsPerPage); // 100 items / 5 items per page = 20 total Pages
  if (totalPages <= 0) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString()); // convert number to string
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2" mt="5">
      {/* Label */}
      <Text size="2">
        Page {currentPage || 1} of {totalPages}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <HiMiniChevronDoubleLeft size={18} />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <HiMiniChevronLeft size={18} />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        <HiMiniChevronRight size={18} />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === totalPages}
        onClick={() => changePage(totalPages)}
      >
        <HiMiniChevronDoubleRight size={18} />
      </Button>
    </Flex>
  );
};

export default Pagination;
