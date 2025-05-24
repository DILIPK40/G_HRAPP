"use client";

import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, Search, UserCheck, UserX, Clock } from "lucide-react";
import type { AttendanceRecord } from "@/types";
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from '@/lib/utils';

const mockAttendanceData: AttendanceRecord[] = [
  { id: 'ATT001', employeeId: 'EMP001', employeeName: 'Alice Wonderland', date: '2024-07-15', checkInTime: '09:02', checkOutTime: '17:35', status: 'Present' },
  { id: 'ATT002', employeeId: 'EMP002', employeeName: 'Bob The Builder', date: '2024-07-15', checkInTime: '09:15', checkOutTime: '17:50', status: 'Late' },
  { id: 'ATT003', employeeId: 'EMP003', employeeName: 'Charlie Brown', date: '2024-07-15', status: 'Absent' },
  { id: 'ATT004', employeeId: 'EMP004', employeeName: 'Diana Prince', date: '2024-07-15', checkInTime: '09:00', checkOutTime: '13:00', status: 'Half-Day' },
  { id: 'ATT005', employeeId: 'EMP001', employeeName: 'Alice Wonderland', date: '2024-07-14', checkInTime: '08:58', checkOutTime: '17:30', status: 'Present' },
];

const getStatusIcon = (status: AttendanceRecord['status']) => {
  switch (status) {
    case 'Present': return <UserCheck className="h-4 w-4 text-green-500" />;
    case 'Absent': return <UserX className="h-4 w-4 text-red-500" />;
    case 'Late': return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'Half-Day': return <Clock className="h-4 w-4 text-blue-500" />;
    default: return null;
  }
};

export default function AttendanceManagementPage() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter(record => {
      const dateMatch = selectedDate ? record.date === format(selectedDate, "yyyy-MM-dd") : true;
      const searchMatch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === 'all' ? true : record.status === statusFilter;
      return dateMatch && searchMatch && statusMatch;
    });
  }, [attendanceRecords, searchTerm, selectedDate, statusFilter]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Placeholder for file upload logic
    alert("File import functionality is a placeholder.");
    if (event.target.files && event.target.files[0]) {
      console.log("Uploaded file:", event.target.files[0].name);
      // Here you would parse the file and update attendanceRecords
    }
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Attendance Management</h1>
        <p className="text-muted-foreground">View and manage employee attendance records.</p>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Import Attendance Data</CardTitle>
          <CardDescription>Upload attendance data from your biometric device or other sources (CSV, Excel).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Input type="file" onChange={handleFileUpload} className="max-w-xs" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <UploadCloud className="mr-2 h-4 w-4" /> Import Data
            </Button>
          </div>
           <p className="text-xs text-muted-foreground mt-2">
             Supported formats: CSV, XLSX. <br />
             Required columns: <strong>EmployeeID</strong> (e.g., EMP001), <strong>Date</strong> (YYYY-MM-DD), <strong>CheckInTime</strong> (HH:MM, 24-hour), <strong>CheckOutTime</strong> (HH:MM, 24-hour).<br />
             Optional column: <strong>Status</strong> (Present, Absent, Late, Half-Day).
           </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance Log</CardTitle>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[200px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
                <SelectItem value="Half-Day">Half-Day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.employeeId}</TableCell>
                  <TableCell className="font-medium">{record.employeeName}</TableCell>
                  <TableCell>{format(new Date(record.date), "PP")}</TableCell>
                  <TableCell>{record.checkInTime || '-'}</TableCell>
                  <TableCell>{record.checkOutTime || '-'}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1 capitalize">
                      {getStatusIcon(record.status)}
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No attendance records found for the selected criteria.
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
