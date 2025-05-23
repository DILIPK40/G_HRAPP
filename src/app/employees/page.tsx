import { EmployeeDataTable } from "./components/employee-data-table";
import { columns } from "./components/employee-table-columns";
import { mockEmployees } from "./data/seed";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function EmployeeDirectoryPage() {
  // In a real app, you'd fetch this data
  const employees = mockEmployees;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Employee Directory</h1>
          <p className="text-muted-foreground">Manage and view all employees.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>
      <EmployeeDataTable columns={columns} data={employees} />
    </div>
  );
}
