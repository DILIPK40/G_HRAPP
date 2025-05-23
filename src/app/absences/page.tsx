"use client"; // For managing state of absence requests

import React, { useState } from 'react';
import AbsenceRequestForm, { type AbsenceRequestFormValues } from './components/absence-request-form';
import AbsenceList from './components/absence-list';
import type { AbsenceRequest } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const initialMockAbsenceRequests: AbsenceRequest[] = [
  {
    id: 'ABS001',
    employeeName: 'Alice Wonderland',
    employeeId: 'EMP001',
    startDate: '2024-08-01',
    endDate: '2024-08-05',
    type: 'Vacation',
    reason: 'Annual leave',
    status: 'Approved',
  },
  {
    id: 'ABS002',
    employeeName: 'Alice Wonderland',
    employeeId: 'EMP001',
    startDate: '2024-07-20',
    endDate: '2024-07-20',
    type: 'Sick Leave',
    reason: 'Flu',
    status: 'Pending',
  },
];

export default function AbsenceManagementPage() {
  const [absenceRequests, setAbsenceRequests] = useState<AbsenceRequest[]>(initialMockAbsenceRequests);

  const handleNewRequest = (data: AbsenceRequestFormValues) => {
    const newRequest: AbsenceRequest = {
      id: `ABS${String(absenceRequests.length + 1).padStart(3, '0')}`,
      ...data,
      startDate: data.startDate.toISOString().split('T')[0],
      endDate: data.endDate.toISOString().split('T')[0],
      status: 'Pending', // New requests are initially pending
    };
    setAbsenceRequests(prevRequests => [newRequest, ...prevRequests]);
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Absence Management</h1>
        <p className="text-muted-foreground">Request time off and view your absence history.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Request Time Off</CardTitle>
              <CardDescription>Fill out the form below to request an absence.</CardDescription>
            </CardHeader>
            <CardContent>
              <AbsenceRequestForm onSubmitSuccess={handleNewRequest} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <AbsenceList requests={absenceRequests} />
        </div>
      </div>
    </div>
  );
}
