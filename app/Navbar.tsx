"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PiBugFill } from "react-icons/pi";
import classnames from "classnames";
import { signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { LoadingSpinner } from "./components";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues/list" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <nav className="border mb-5 px-5 h-14">
      <Container>
        <Flex align="center" py="3" justify="between">
          <Flex align="center" gap="5">
            <Link href="/">
              <PiBugFill size={30} />
            </Link>
            <ul className="flex space-x-6">
              {navItems.map((item, idx) => {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={classnames({
                        "text-zinc-900": item.href === pathname,
                        "text-zinc-500": item.href !== pathname,
                        "hover:text-zinc-800 hover:underline hover:underline-offset-4 font-[500] transition-colors duration-150":
                          true,
                      })}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Flex>
          <Box>
            {status === "loading" && <LoadingSpinner />}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user?.image!}
                    fallback="A"
                    size="2"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text className="text-black">{session.user?.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item
                    color="red"
                    className="hover:bg-red-500 hover:text-white duration-200 transition-all"
                  >
                    <Text
                      onClick={() => {
                        signOut({ redirect: false }).then(() => {
                          router.push("/"); // Redirect to the dashboard page after signing out
                        });
                      }}
                    >
                      Log out
                    </Text>
                    {/* <Link href={"/api/auth/signout"}>Log out</Link> */}
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Button variant="outline">
                <Link href={"/api/auth/signin"}>Sign in</Link>
              </Button>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
