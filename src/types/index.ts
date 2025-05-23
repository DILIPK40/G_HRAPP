export type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  avatarUrl?: string;
  joiningDate: string; // YYYY-MM-DD
};

export type AbsenceRequest = {
  id: string;
  employeeName: string;
  employeeId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  type: 'Vacation' | 'Sick Leave' | 'Personal' | 'Other';
  reason?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type CompanyPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string; // YYYY-MM-DD
  imageUrl?: string;
  category: 'Announcement' | 'News' | 'Event';
};

export type Department = {
  id: string;
  name: string;
  managerName?: string; 
  employeeCount: number;
};

export type AttendanceRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string; // YYYY-MM-DD
  checkInTime?: string; // HH:mm
  checkOutTime?: string; // HH:mm
  status: 'Present' | 'Absent' | 'Late' | 'Half-Day';
};
