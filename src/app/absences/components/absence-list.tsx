"use client"

import type { AbsenceRequest } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Import Button component
import { format } from "date-fns";

interface AbsenceListProps {
  requests: AbsenceRequest[];
  onViewDetails: (requestId: string) => void;
  onApproveRequest: (requestId: string) => void;
  onRejectRequest: (requestId: string) => void;
  isApproving: boolean;
  isRejecting: boolean;
  onCancelRequest: (requestId: string) => void; // Added cancel handler prop
  isManager: boolean;
}

export default function AbsenceList({ requests }: AbsenceListProps) {
  if (requests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Absence Requests</CardTitle>
          <CardDescription>You have not submitted any absence requests yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Use the form above to request time off.</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadgeVariant = (status: AbsenceRequest['status']) => {
    switch (status) {
      case 'Pending': return 'outline'; // Uses border color
      case 'Approved': return 'default'; // Uses primary color (becomes green-like with custom theme)
      case 'Rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Absence Requests</CardTitle>
        <CardDescription>Here's a list of your past and current absence requests.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-muted/50"> {/* Added background color */}
            <TableRow className="hover:bg-transparent"> {/* Prevent row hover effect on header */}
              <TableHead>Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.type}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{format(new Date(request.startDate), "PPP")}</TableCell> {/* Styled dates */}
                <TableCell className="text-sm text-muted-foreground">{format(new Date(request.endDate), "PPP")}</TableCell> {/* Styled dates */}
                <TableCell className="py-2"> {/* Adjusted cell padding */}
                  <Badge variant={getStatusBadgeVariant(request.status)} className={
 request.status === "Approved" ? "bg-green-500/20 text-green-700 border-green-500/30 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20" :
                     request.status === "Pending" ? "bg-yellow-500/20 text-yellow-700 border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20" :
                     request.status === "Rejected" ? "bg-red-500/20 text-red-700 border-red-500/30 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" : ""
                  }>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{request.reason || 'N/A'}</TableCell> {/* Styled reason */}
                <TableCell className="text-right flex justify-end items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => onViewDetails(request.id)} className="p-1 h-auto"> {/* Adjusted button padding/height */}
                    View Details
                  </Button>
                  {/* Assuming you have a cancel function passed down, add it here */}
                   {request.status === 'Pending' && <Button variant="ghost" size="sm" className="p-1 h-auto text-destructive hover:text-destructive/80" onClick={() => onCancelRequest(request.id)}>Cancel</Button>} {/* Added Cancel button */}
                  {request.status === 'Pending' && (
                    <>
                      {/* Cancel button remains manual implementation */}
                      {isManager && (
                        <>
 <Button variant="outline" size="sm" className="ml-2" onClick={() => onApproveRequest(request.id)} disabled={isApproving}>Approve</Button>
                          <Button variant="destructive" size="sm" className="ml-2" onClick={() => console.log('Reject request', request.id)}>Reject</Button>
                        </>
                      )}
                    </>
                  )}
                  {/* Placeholder for actions like cancel or view details */}
                  {/* <Button variant="ghost" size="sm">View</Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
