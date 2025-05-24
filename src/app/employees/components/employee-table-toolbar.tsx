"use client"

import * as React from "react"; // Added this line
import type { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, ListFilter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Employee } from "@/types"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function EmployeeTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const departments = React.useMemo(() => {
    const departmentSet = new Set<string>()
    ;(table.getCoreRowModel().rows.map(row => row.original) as Employee[]).forEach(emp => departmentSet.add(emp.department))
    return Array.from(departmentSet)
  }, [table])

  const statuses = ["Active", "On Leave", "Inactive"]

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search employees..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-10 w-[150px] lg:w-[250px]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10">
              <ListFilter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {departments.map((department) => (
              <DropdownMenuCheckboxItem
                key={department}
                checked={table.getColumn("department")?.getFilterValue() === department}
                onCheckedChange={(value) => {
                  if (value) {
                    table.getColumn("department")?.setFilterValue(department)
                  } else {
                    // Allow unchecking to clear filter for this column
                    if (table.getColumn("department")?.getFilterValue() === department) {
                       table.getColumn("department")?.setFilterValue(undefined)
                    }
                  }
                }}
              >
                {department}
              </DropdownMenuCheckboxItem>
            ))}
             <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={table.getColumn("status")?.getFilterValue() === status}
                onCheckedChange={(value) => {
                   if (value) {
                    table.getColumn("status")?.setFilterValue(status)
                  } else {
                    if (table.getColumn("status")?.getFilterValue() === status) {
                       table.getColumn("status")?.setFilterValue(undefined)
                    }
                  }
                }}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-10 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* Add Employee Button Placeholder */}
      {/* <Button size="sm" className="h-10">Add employee</Button> */}
    </div>
  )
}
