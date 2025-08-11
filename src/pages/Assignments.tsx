import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Clock, Plus, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Assignments() {
  // Sample assignment data
  const assignments = [
    {
      id: 1,
      title: "Mathematics Assignment 3",
      subject: "Advanced Mathematics",
      description: "Solve calculus problems from Chapter 7",
      dueDate: "2024-01-10",
      priority: "high",
      status: "pending",
      estimatedTime: "2 hours"
    },
    {
      id: 2,
      title: "Computer Science Project Phase 1",
      subject: "Computer Science",
      description: "Implement basic data structures in Python",
      dueDate: "2024-01-12",
      priority: "high",
      status: "in-progress",
      estimatedTime: "8 hours"
    },
    {
      id: 3,
      title: "Literature Essay",
      subject: "Literature",
      description: "Analyze themes in Shakespeare's Hamlet",
      dueDate: "2024-01-15",
      priority: "medium",
      status: "pending",
      estimatedTime: "4 hours"
    },
    {
      id: 4,
      title: "Physics Lab Report",
      subject: "Physics",
      description: "Document results from pendulum experiment",
      dueDate: "2024-01-08",
      priority: "high",
      status: "completed",
      estimatedTime: "3 hours"
    },
    {
      id: 5,
      title: "History Research Paper",
      subject: "History",
      description: "Research World War II impact on society",
      dueDate: "2024-01-20",
      priority: "low",
      status: "pending",
      estimatedTime: "6 hours"
    }
  ];

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "in-progress": return "warning";
      case "pending": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "in-progress": return Clock;
      case "pending": return AlertTriangle;
      default: return Clock;
    }
  };

  const getDueDateText = (dueDate: string) => {
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return "Overdue";
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `Due in ${days} days`;
  };

  const filterAssignments = (status?: string) => {
    if (!status) return assignments;
    return assignments.filter(assignment => assignment.status === status);
  };

  const AssignmentCard = ({ assignment }: { assignment: typeof assignments[0] }) => {
    const StatusIcon = getStatusIcon(assignment.status);
    const daysUntil = getDaysUntilDue(assignment.dueDate);
    const isOverdue = daysUntil < 0;
    const isUrgent = daysUntil <= 1 && daysUntil >= 0;

    return (
      <Card className={`transition-all hover:shadow-md ${
        isOverdue ? 'border-destructive' : 
        isUrgent ? 'border-warning' : ''
      }`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{assignment.title}</CardTitle>
              <CardDescription className="mt-1">{assignment.subject}</CardDescription>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant={getPriorityColor(assignment.priority)}>
                {assignment.priority}
              </Badge>
              <Badge variant={getStatusColor(assignment.status)}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {assignment.status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {getDueDateText(assignment.dueDate)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {assignment.estimatedTime}
              </span>
            </div>
            
            {assignment.status !== 'completed' && (
              <Button size="sm" variant="outline">
                {assignment.status === 'pending' ? 'Start' : 'Continue'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Assignment Tracker</h1>
          <p className="text-muted-foreground">
            Stay on top of your academic deadlines
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Assignment
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{filterAssignments().filter(a => getDaysUntilDue(a.dueDate) < 0).length}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{filterAssignments().filter(a => getDaysUntilDue(a.dueDate) <= 1 && getDaysUntilDue(a.dueDate) >= 0).length}</p>
                <p className="text-sm text-muted-foreground">Due Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{filterAssignments('in-progress').length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="text-2xl font-bold">{filterAssignments('completed').length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {assignments
            .sort((a, b) => getDaysUntilDue(a.dueDate) - getDaysUntilDue(b.dueDate))
            .map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterAssignments('pending')
            .sort((a, b) => getDaysUntilDue(a.dueDate) - getDaysUntilDue(b.dueDate))
            .map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {filterAssignments('in-progress')
            .sort((a, b) => getDaysUntilDue(a.dueDate) - getDaysUntilDue(b.dueDate))
            .map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {filterAssignments('completed')
            .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
            .map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}