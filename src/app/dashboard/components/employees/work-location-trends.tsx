"use client";
import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  { name: "1월", office: 82, wfh: 44 },
  { name: "2월", office: 80, wfh: 40 },
  { name: "3월", office: 83, wfh: 42 },
  { name: "4월", office: 50, wfh: 50 },
  { name: "5월", office: 40, wfh: 60 },
  { name: "6월", office: 60, wfh: 40 },
  { name: "7월", office: 55, wfh: 55 },
  { name: "8월", office: 49, wfh: 61 },
  { name: "9월", office: 44, wfh: 70 },
  { name: "10월", office: 40, wfh: 40 },
  { name: "11월", office: 50, wfh: 50 },
  { name: "12월", office: 50, wfh: 50 },
];

const fontStyle = {
  fontFamily: "'Noto Sans KR', sans-serif",
  fontSize: "14px",
  fill: "#fff",
};

const WorkLocationTrends: React.FC = () => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart data={data} className="[&_.recharts-tooltip-cursor]:fill-gray-300 dark:[&_.recharts-tooltip-cursor]:fill-gray-800">
        <XAxis dataKey="name" stroke="#888" tick={{ ...fontStyle }} />
        <YAxis stroke="#888" tick={{ ...fontStyle }} />
        <Tooltip
          cursor={{ fill: "transparent" }}
          separator=": "
          wrapperClassName="!text-sm dark:!bg-black !bg-white !text-black dark:!text-white 
          !         rounded-md dark:!border-gray-700 border-gray-300"
          labelFormatter={(label) => `📅 ${label}`}
          formatter={(value, name) => {
            return name === "office" ? [value, "사무실 근무"] : [value, "재택 근무"];
          }}
        />
        <Legend
          iconType="circle"
          formatter={(value) => (value === "office" ? "사무실 근무" : "재택 근무")}
        />
        <Bar dataKey="office" stackId="1" fill="#ec4889" name="사무실 근무" />
        <Bar dataKey="wfh" stackId="1" fill="#6b7280" radius={[4, 4, 0, 0]} name="재택 근무" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WorkLocationTrends;
