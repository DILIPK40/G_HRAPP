"use client"; // For managing state of absence requests

import React, { useState } from 'react';
import AbsenceRequestForm, { type AbsenceRequestFormValues } from './components/absence-request-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { AbsenceRequest } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';

import { useToast } from '@/hooks/use-toast';
import AbsenceList from './components/absence-list';
export default function AbsenceManagementPage() {
  const [absenceRequests, setAbsenceRequests] = useState<AbsenceRequest[]>([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
 const [selectedAbsenceRequest, setSelectedAbsenceRequest] = useState<AbsenceRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for filtering, sorting, and pagination
 const [filters, setFilters] = useState({ employeeId: '', type: '', status: '', reason: '' });
 const [sortBy, setSortBy] = useState('startDate'); // Default sort by start date
 const [sortOrder, setSortOrder] = useState('desc'); // Default sort order descending
 const [currentPage, setCurrentPage] = useState(1); // Start at page 1
 // const [totalItems, setTotalItems] = useState(0); // You'll need to get the total count from the API
 const [itemsPerPage, setItemsPerPage] = useState(10); // Or a sensible default

  const fetchAbsenceRequests = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();

      if (filters.employeeId) params.append('employeeId', filters.employeeId);
      if (filters.type) params.append('type', filters.type);
      if (filters.status) params.append('status', filters.status);
      if (filters.reason) params.append('reason', filters.reason);

      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);
      params.append('page', currentPage.toString());
      params.append('limit', itemsPerPage.toString());

      const url = `/api/absences?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch absence requests');
      }
      const data = await res.json();
      setAbsenceRequests(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching absence requests.');
    } finally {
      setIsLoading(false);
    }
  };

  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [approveError, setApproveError] = useState<string | null>(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectError, setRejectError] = useState<string | null>(null);
  const isManager = true; // Placeholder: Determine this based on user roles
  const { toast } = useToast();
  const handleNewRequest = () => {
  }; // This function is now triggered by form submission success, just needs to re-fetch

  const handleViewDetails = (absenceRequestId: string): void => {
    const request = absenceRequests.find(req => req.id === absenceRequestId);
    setSelectedAbsenceRequest(request || null);
    setIsDetailsModalOpen(true);
  };

  const handleCancelRequest = async (absenceRequestId: string) => {
    setIsCancelling(true);
    setCancelError(null);
    try {
      // Option 1: DELETE request
      // const res = await fetch(`/api/absences?id=${absenceRequestId}`, {
      //   method: 'DELETE',
      // });

      // Option 2: PUT request to update status to 'Canceled'
      const res = await fetch(`/api/absences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: absenceRequestId, status: 'Canceled' }),
      });

      if (!res.ok) {
        throw new Error('Failed to cancel absence request');
      }
      fetchAbsenceRequests(); // Refresh the list
      toast({ title: "Request Canceled", description: `Absence request ${absenceRequestId} has been canceled.` });
    } catch (err: any) {
      setCancelError(err.message || 'An error occurred while canceling the request.');
      toast({ title: "Cancellation Failed", description: err.message || 'Could not cancel the absence request.', variant: "destructive" });
    } finally {
      setIsCancelling(false);
    }
  };

  const handleApproveRequest = async (absenceRequestId: string) => {
    setIsApproving(true);
    setApproveError(null);
    try {
      const res = await fetch(`/api/absences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: absenceRequestId, status: 'Approved' }),
      });

      if (!res.ok) {
        throw new Error('Failed to approve absence request');
      }
      fetchAbsenceRequests(); // Refresh the list
    } catch (err: any) {
      setApproveError(err.message || 'An error occurred while approving the request.');
      toast({ title: "Approval Failed", description: err.message || 'Could not approve the absence request.', variant: "destructive" });
    } finally {
      setIsApproving(false);
    }
  };

  const handleRejectRequest = async (absenceRequestId: string) => {
    setIsRejecting(true);
    setRejectError(null);
    try {
      const res = await fetch(`/api/absences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: absenceRequestId, status: 'Rejected' }),
      });

      if (!res.ok) {
        throw new Error('Failed to reject absence request');
      }
      fetchAbsenceRequests(); // Refresh the list
    } catch (err: any) {
      setRejectError(err.message || 'An error occurred while rejecting the request.');
      toast({ title: "Rejection Failed", description: err.message || 'Could not reject the absence request.', variant: "destructive" });
    } finally {
      setIsRejecting(false);
    }
  };

  // Assume isManager is determined elsewhere, e.g., from authentication context
  useEffect(() => {
 fetchAbsenceRequests();
  }, [filters, sortBy, sortOrder, currentPage, itemsPerPage]); // Dependency array includes filter/sort/pagination states

  // Function to close the details modal
  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedAbsenceRequest(null); // Clear selected request on close
 };

  // Handlers for filter/sort/pagination changes
 const handleFilterChange = (field: keyof typeof filters, value: string) => {
 setFilters(prev => ({ ...prev, [field]: value }));
 setCurrentPage(1); // Reset to page 1 when filters change
  };


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <h1 className="text-2xl font-semibold">Absence Management</h1>
        {/* Add any top-level filter/sort controls here later if needed */}
      </header>

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
         {isLoading ? (
          <div className="lg:col-span-3 text-center">Loading absence requests...</div>
        ) : error ? (
          <div className="lg:col-span-3 text-center text-destructive">{error}</div>
        ) : (
          <>
            <div className="lg:col-span-1">
             <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Filter & Sort</CardTitle>
                  <CardDescription>Filter and sort the absence requests list.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="filterEmployeeId" className="block text-sm font-medium text-muted-foreground mb-1">Employee ID</label>
                    <Input
                      id="filterEmployeeId"
                      placeholder="Filter by Employee ID"
                      value={filters.employeeId}
                      onChange={(e) => handleFilterChange('employeeId', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="filterType" className="block text-sm font-medium text-muted-foreground mb-1">Type</label>
                    <Select
                      value={filters.type}
                      onValueChange={(value) => setFilters({ ...filters, type: value })}
 >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        <SelectItem value="Vacation">Vacation</SelectItem>
                        <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                        <SelectItem value="Personal">Personal Day</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="filterStatus" className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
                     <Select
                      value={filters.status}
 onValueChange={(value) => handleFilterChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="">All Statuses</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                        <SelectItem value="Canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Add filter by Reason if needed */}
                   <div>
                     <label htmlFor="sortBy" className="block text-sm font-medium text-muted-foreground mb-1">Sort By</label>
                      <Select
                         value={sortBy}
                         onValueChange={(value) => setSortBy(value)}
 >
                         <SelectTrigger>
                           <SelectValue placeholder="Sort by" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="startDate">Start Date</SelectItem>
                           <SelectItem value="employeeName">Employee Name</SelectItem> {/* Assuming employeeName is available/sortable */}
                           <SelectItem value="status">Status</SelectItem>
                         </SelectContent>
                       </Select>
                   </div>
                </CardContent>
              </Card>
             <Card>
                <CardHeader>
                  <CardTitle>Request Time Off</CardTitle>
                  <CardDescription>Fill out the form below to request an absence.</CardDescription>
                </CardHeader>
                <CardContent>
 <AbsenceRequestForm onSubmitSuccess={fetchAbsenceRequests} />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2 space-y-6">
              {cancelError && (
                <div className="text-destructive text-sm">{cancelError}</div>
              )}
              {isCancelling && (
                <div className="text-muted-foreground text-sm">Canceling request...</div>
              )}
               {approveError && (
                <div className="text-destructive text-sm">{approveError}</div>
              )}
              {rejectError && (
                <div className="text-destructive text-sm">{rejectError}</div>
              )}
              <AbsenceList
                requests={absenceRequests}
                onViewDetails={handleViewDetails}
                onCancelRequest={handleCancelRequest}
                onApproveRequest={handleApproveRequest}
                onRejectRequest={handleRejectRequest}
                isManager={isManager} // Pass the isManager prop
                // Pass pagination info for potential controls in the list component
                // totalItems={totalItems} // You'll need to get the total count from the API
                // itemsPerPage={itemsPerPage}
                // currentPage={currentPage}
                // onPageChange={setCurrentPage}
              />

              {/* Basic Pagination Controls (replace with a proper component later) */}
              <div className="flex items-center justify-between mt-4 px-4"> {/* Added px-4 for consistent padding */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                 <span>Page {currentPage}</span>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  // You'll need logic here to disable if it's the last page based on totalItems and itemsPerPage
                  className="px-4 py-2 border rounded"
                >
                  Next
                </button>
                 <div>
                  Items per page:
                  <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="ml-2 border rounded p-1 text-sm"> {/* Added p-1 text-sm */}
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Absence Details Modal/Dialog (Placeholder - Replace with your actual Modal/Dialog component)
{/*
 {isDetailsModalOpen && selectedAbsenceRequest && (
 // This is a placeholder structure, replace with your actual Modal/Dialog component
 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
 <div className="bg-background rounded-lg shadow-xl p-6 w-full max-w-md space-y-4">
 <h2 className="text-xl font-semibold border-b pb-2 mb-4">Absence Request Details</h2>
 <div className="space-y-2">
 <div>
 <p className="text-sm font-medium text-muted-foreground">Employee Name:</p>
 <p className="text-base">{selectedAbsenceRequest.employeeName}</p>
 </div>
 <div>
 <p className="text-sm font-medium text-muted-foreground">Employee ID:</p>
 <p className="text-base">{selectedAbsenceRequest.employeeId}</p>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <p className="text-sm font-medium text-muted-foreground">Start Date:</p>
 <p className="text-base">{format(new Date(selectedAbsenceRequest.startDate), "PPP")}</p>
 </div>
 <div>
 <p className="text-sm font-medium text-muted-foreground">End Date:</p>
 <p className="text-base">{format(new Date(selectedAbsenceRequest.endDate), "PPP")}</p>
 </div>
 </div>
 <div>
 <p className="text-sm font-medium text-muted-foreground">Type:</p>
 <p className="text-base">{selectedAbsenceRequest.type}</p>
 </div>
 {selectedAbsenceRequest.reason && (
 <div>
 <p className="text-sm font-medium text-muted-foreground">Reason:</p>
 <p className="text-base">{selectedAbsenceRequest.reason}</p>
 </div>
 )}
 <div>
 <p className="text-sm font-medium text-muted-foreground">Status:</p>
 <p className="text-base">
 <Badge variant={
 selectedAbsenceRequest.status === "Approved" ? "default" :
 selectedAbsenceRequest.status === "Pending" ? "outline" :
 selectedAbsenceRequest.status === "Rejected" ? "destructive" : "secondary"
 }>
 {selectedAbsenceRequest.status}
 </Badge>
 </p>
 </div>
 </div>
 <div className="flex justify-end pt-4 border-t">
 <button
 onClick={closeDetailsModal}
 className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
 >Close</button>
 </div>
 </div>
 </div>
 )}
*/}
