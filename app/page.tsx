import { Text } from "@radix-ui/themes";
import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <main>
      <Text>Hello world</Text>
      <Pagination
        itemCount={20}
        itemsPerPage={5}
        currentPage={parseInt(searchParams.page)}
      />
    </main>
  );
}
