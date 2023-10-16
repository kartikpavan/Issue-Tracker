"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiBugFill } from "react-icons/pi";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
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
            {status === "authenticated" && (
              // <Link href={"/api/auth/signout"}>Log out</Link>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar src={session.user?.image!} fallback="A" size="2" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text>{session.user?.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item
                    color="red"
                    className="hover:bg-red-500 hover:text-white duration-200 transition-all"
                  >
                    <Link href={"/api/auth/signout"}>Log out</Link>
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
