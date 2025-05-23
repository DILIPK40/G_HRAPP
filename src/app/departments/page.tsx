"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Edit2, Trash2 } from "lucide-react";
import type { Department } from "@/types";
import { DepartmentDialog } from "./components/department-dialog";
import { useToast } from "@/hooks/use-toast";

const initialMockDepartments: Department[] = [
  { id: 'DEP001', name: 'Engineering', managerName: 'Alice Wonderland', employeeCount: 25 },
  { id: 'DEP002', name: 'Product', managerName: 'Bob The Builder', employeeCount: 10 },
  { id: 'DEP003', name: 'Design', managerName: 'Charlie Brown', employeeCount: 8 },
  { id: 'DEP004', name: 'Marketing', employeeCount: 12 },
  { id: 'DEP005', name: 'HR', managerName: 'Edward Scissorhands', employeeCount: 5 },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>(initialMockDepartments);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const { toast } = useToast();

  const handleSaveDepartment = (data: { name: string; managerName?: string }) => {
    if (editingDepartment) {
      // Edit existing department
      setDepartments(departments.map(dep => 
        dep.id === editingDepartment.id ? { ...dep, ...data, employeeCount: dep.employeeCount } : dep
      ));
      toast({ title: "Department Updated", description: `Department "${data.name}" has been updated.`});
    } else {
      // Add new department
      const newDepartment: Department = {
        id: `DEP${String(departments.length + 1).padStart(3, '0')}`,
        name: data.name,
        managerName: data.managerName,
        employeeCount: 0, // New departments start with 0 employees
      };
      setDepartments([newDepartment, ...departments]);
      toast({ title: "Department Added", description: `Department "${data.name}" has been added.`});
    }
    setEditingDepartment(null);
  };

  const handleDeleteDepartment = (departmentId: string) => {
    // Basic delete, in real app, check for dependencies (employees in department)
    const depToDelete = departments.find(d => d.id === departmentId);
    setDepartments(departments.filter(dep => dep.id !== departmentId));
    if(depToDelete) {
      toast({ title: "Department Deleted", description: `Department "${depToDelete.name}" has been deleted.`, variant: "destructive"});
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Departments</h1>
          <p className="text-muted-foreground">Manage company departments and their details.</p>
        </div>
        <DepartmentDialog onSave={handleSaveDepartment} department={null}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Department
          </Button>
        </DepartmentDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department List</CardTitle>
          <CardDescription>Overview of all company departments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Employee Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>{dept.managerName || 'N/A'}</TableCell>
                  <TableCell>{dept.employeeCount}</TableCell>
                  <TableCell className="text-right">
                    <DepartmentDialog department={dept} onSave={handleSaveDepartment}>
                       <Button variant="ghost" size="icon" className="mr-2" onClick={() => setEditingDepartment(dept)}>
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                    </DepartmentDialog>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteDepartment(dept.id)} className="text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4" />
                       <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {departments.length === 0 && (
                 <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No departments found. Add one to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
