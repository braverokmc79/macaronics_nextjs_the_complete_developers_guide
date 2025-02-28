import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import EmployeesStats from "./components/employees/employees-stats";
import TeamsStats from "./components/teams/teams-stats";

const DashboardPage: React.FC = () => {
  return (
    <Tabs defaultValue="employees">
      <TabsList className="mb-4">
          <TabsTrigger value="employees">직원 상태</TabsTrigger>
          <TabsTrigger value="teams">팀 상태</TabsTrigger>
      </TabsList>

      <TabsContent value="employees">
          <h2>직원 상태</h2>
          <EmployeesStats />
      </TabsContent>

      <TabsContent value="teams">
          <h2>팀 상태</h2>
          <TeamsStats />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardPage;
