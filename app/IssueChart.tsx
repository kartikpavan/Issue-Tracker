"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, closed, inProgress }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "Closed", value: closed },
    { label: "In-Progress", value: inProgress },
  ];

  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={50} style={{ fill: "#00a2c7" }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
