"use client";
import { useState, useEffect } from 'react';
import { EmployeeDataTable } from "./components/employee-data-table";
import { columns } from "./components/employee-table-columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddEmployeeModal } from './components/add-employee-modal';
import { EditEmployeeModal } from './components/edit-employee-modal';

import type { SortingState } from '@tanstack/react-table';
import { Employee } from '@/types'; // Assuming Employee type is defined in types.ts
export default function EmployeeDirectoryPage() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEmployees = async () => {
  const [pagination, setPagination] = useState({
 pageIndex: 0,
 pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState<Array<{ id: string, value: string }>>([]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
 params.append('page', (pagination.pageIndex + 1).toString());
 params.append('pageSize', pagination.pageSize.toString());

 if (sorting.length > 0) {
 params.append('sortBy', sorting[0].id);
 params.append('sortDesc', sorting[0].desc.toString());
      }

 // Basic filtering - assuming single filter for now
 if (filtering.length > 0) {
 params.append('filterValue', filtering[0].value);
      }
      const res = await fetch(`/api/employees?${params.toString()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch employees');
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
 setError((err as Error).message || "Failed to load employees. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const handleEditEmployee = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setIsEditModalOpen(true);
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      const res = await fetch(`/api/employees?id=${employeeId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete employee');
      fetchEmployees(); // Re-fetch to update the list
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const [fetchError, setFetchError] = useState<string | null>(null);
    fetchEmployees();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const [fetchError, setFetchError] = useState<string | null>(null);
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

      {isLoading && <p>Loading employees...</p>}
      {fetchError && <p className="text-red-500">{fetchError}</p>}
      {!isLoading && !error && (
        <EmployeeDataTable
          data={employees}
 columns={columns}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
 onPaginationChange={setPagination}
 onSortingChange={setSorting}
 onFilteringChange={setFiltering}
 state={{ pagination, sorting }} // Pass state down to the table
        />
      )}

      <AddEmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onEmployeeAdded={fetchEmployees} />
      <EditEmployeeModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} employee={employeeToEdit} onEmployeeEdited={fetchEmployees} />
    </div>
  );
}
