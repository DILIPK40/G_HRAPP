
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function MdCeoDashboardPage() {
  return (
    <div className="container mx-auto py-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
          <Briefcase className="mr-3 h-8 w-8 text-primary" /> MD / CEO Dashboard
        </h1>
        <p className="text-muted-foreground">Executive overview and strategic insights.</p>
      </header>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Executive Dashboard</CardTitle>
          <CardDescription>High-level company performance metrics, strategic planning tools, and key reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">Key performance indicators and strategic data will be presented here.</p>
          <ul className="mt-4 space-y-2 list-disc list-inside text-muted-foreground">
            <li>Overall Company Performance</li>
            <li>Financial Summaries</li>
            <li>Strategic Goal Tracking</li>
            <li>Market Analysis</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
