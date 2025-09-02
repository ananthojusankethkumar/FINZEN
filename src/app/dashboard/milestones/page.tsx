
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Trophy, PlusCircle, Trash2, CheckCircle, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface Milestone {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  completed: boolean;
}

export default function MilestonesPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState({ name: "", targetAmount: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddMilestone = () => {
    if (newMilestone.name && newMilestone.targetAmount) {
      setMilestones([
        ...milestones,
        {
          id: Date.now(),
          name: newMilestone.name,
          targetAmount: Number(newMilestone.targetAmount),
          currentAmount: 0,
          completed: false,
        },
      ]);
      setNewMilestone({ name: "", targetAmount: "" });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteMilestone = (id: number) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };
  
  const handleUpdateProgress = (id: number, amount: number) => {
    setMilestones(milestones.map(m => {
        if (m.id === id) {
            const newCurrentAmount = Math.min(m.targetAmount, Math.max(0, m.currentAmount + amount));
            const completed = newCurrentAmount >= m.targetAmount;
            return { ...m, currentAmount: newCurrentAmount, completed };
        }
        return m;
    }));
  };

  const formatCurrency = (value: number) => `INR ${value.toLocaleString("en-IN")}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight font-headline flex items-center gap-2">
            <Trophy className="h-7 w-7 text-primary" />
            Gamified Milestones
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Milestone
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Financial Milestone</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="milestone-name">Milestone Name</Label>
                    <Input id="milestone-name" placeholder="e.g., Downpayment for a Car" value={newMilestone.name} onChange={(e) => setNewMilestone({...newMilestone, name: e.target.value})} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="milestone-target">Target Amount (INR)</Label>
                    <Input id="milestone-target" type="number" placeholder="e.g., 200000" value={newMilestone.targetAmount} onChange={(e) => setNewMilestone({...newMilestone, targetAmount: e.target.value})} />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddMilestone}>Add Milestone</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {milestones.map((milestone) => (
          <Card key={milestone.id} className={milestone.completed ? "border-green-500" : ""}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{milestone.name}</CardTitle>
                {milestone.completed ? <CheckCircle className="h-6 w-6 text-green-500" /> : <Award className="h-6 w-6 text-accent" />}
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold">{formatCurrency(milestone.currentAmount)} / <span className="text-base font-medium text-muted-foreground">{formatCurrency(milestone.targetAmount)}</span></p>
              </div>
              <Progress value={(milestone.currentAmount / milestone.targetAmount) * 100} />
              {!milestone.completed && (
                <div className="flex gap-2">
                     <Button size="sm" variant="outline" onClick={() => handleUpdateProgress(milestone.id, 5000)}>+ INR 5k</Button>
                     <Button size="sm" variant="outline" onClick={() => handleUpdateProgress(milestone.id, 10000)}>+ INR 10k</Button>
                     <Button size="sm" variant="outline" onClick={() => handleUpdateProgress(milestone.id, 25000)}>+ INR 25k</Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => handleDeleteMilestone(milestone.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {milestones.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
            <p>You haven't set any milestones yet.</p>
            <p>Click "Add New Milestone" to get started!</p>
        </div>
      )}
    </div>
  );
}
