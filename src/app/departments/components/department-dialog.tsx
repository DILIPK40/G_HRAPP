"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Department } from "@/types"
import React from "react"

const departmentSchema = z.object({
  name: z.string().min(2, { message: "Department name must be at least 2 characters." }),
  managerName: z.string().optional(),
})

type DepartmentFormValues = z.infer<typeof departmentSchema>

interface DepartmentDialogProps {
  department?: Department | null;
  onSave: (department: DepartmentFormValues) => void;
  children: React.ReactNode; // For the trigger button
}

export function DepartmentDialog({ department, onSave, children }: DepartmentDialogProps) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: department?.name || "",
      managerName: department?.managerName || "",
    },
  })

  React.useEffect(() => {
    if (department) {
      form.reset({
        name: department.name,
        managerName: department.managerName || "",
      });
    } else {
      form.reset({ name: "", managerName: ""});
    }
  }, [department, form, open]);


  function onSubmit(data: DepartmentFormValues) {
    onSave(data);
    setOpen(false); // Close dialog on save
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{department ? "Edit Department" : "Add New Department"}</DialogTitle>
          <DialogDescription>
            {department ? "Make changes to the department details." : "Enter the details for the new department."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Engineering" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                {department ? "Save Changes" : "Add Department"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
