"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AsigneeSelect = async () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const { data } = await axios.get("/api/users");
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign User" className="text-black" />
      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => {
            return (
              <Select.Item key={user?.id} value={user?.name!}>
                {user?.name}
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AsigneeSelect;
