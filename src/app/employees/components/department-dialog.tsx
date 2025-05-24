"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Department } from "@/types"; // Assuming you have a Department type

interface DepartmentDialogProps {
  children: React.ReactNode;
  department: Department | null; // Null for adding, object for editing
  onSave: (data: { name: string; managerName?: string; description?: string }) => void;
  // Add props for loading and errors from parent if needed
  // isSaving?: boolean;
  // saveError?: string | null;
}

export function DepartmentDialog({
  children,
  department,
  onSave,
  // isSaving,
  // saveError,
}: DepartmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(department?.name || '');
  const [managerName, setManagerName] = useState(department?.managerName || '');
  const [description, setDescription] = useState(department?.description || '');

  // State for validation errors
  const [errors, setErrors] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (department) {
      setName(department.name);
      setManagerName(department.managerName || '');
      setDescription(department.description || '');
    } else {
      // Reset form for adding
      setName('');
      setManagerName('');
      setDescription('');
    }
    // Reset errors when dialog opens or department changes
    setErrors({ name: '', description: '' });
  }, [department, isOpen]); // Reset when department prop or isOpen changes

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', description: '' };

    if (!name.trim()) {
      newErrors.name = 'Department name is required.';
      isValid = false;
    }

    // Add more validation rules as needed, e.g., description length

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ name, managerName, description });
      setIsOpen(false); // Close dialog on successful save
    }
  };

  // Handle input changes and clear specific errors
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }
  };

  const handleManagerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManagerName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (errors.description) {
      setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{department ? 'Edit Department' : 'Add Department'}</DialogTitle>
          <DialogDescription>
            {department ? 'Edit the department details.' : 'Add a new department to your organization.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={handleNameChange}
                className="col-span-3"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm col-span-4 col-start-2">{errors.name}</p>}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="managerName" className="text-right">
                Manager
              </Label>
              <Input
                id="managerName"
                value={managerName}
                onChange={handleManagerNameChange}
                className="col-span-3"
              />
            </div>
            {/* No validation error for managerName based on prompt, but you can add it */}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                className="col-span-3"
              />
            </div>
             {errors.description && <p className="text-red-500 text-sm col-span-4 col-start-2">{errors.description}</p>}
          </div>
          {/* {saveError && <p className="text-red-500 text-sm text-center">{saveError}</p>} */} {/* Example of displaying API error */}
          <DialogFooter>
            <Button type="submit">
              {/* {isSaving ? 'Saving...' : (department ? 'Save Changes' : 'Add Department')} */} {/* Example of showing loading state */}
              {department ? 'Save Changes' : 'Add Department'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}