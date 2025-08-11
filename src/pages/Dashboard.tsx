import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckSquare, Calculator, BookOpen, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-academic.jpg";

export default function Dashboard() {
  // Sample data
  const upcomingClasses = [
    { subject: "Mathematics", time: "10:00 AM", room: "Room 301" },
    { subject: "Computer Science", time: "2:00 PM", room: "Lab 205" },
  ];

  const urgentAssignments = [
    { title: "Math Assignment 3", due: "Tomorrow", subject: "Mathematics" },
    { title: "CS Project Phase 1", due: "In 3 days", subject: "Computer Science" },
  ];

  const recentGrades = [
    { subject: "Physics", grade: "A-", assignment: "Lab Report 2" },
    { subject: "Literature", grade: "B+", assignment: "Essay Analysis" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent p-8 text-white">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome back, Student!</h1>
            <p className="text-lg opacity-90 mb-6">
              Your personalized academic dashboard to stay organized and succeed in your studies.
            </p>
            <div className="flex gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/timetable">View Timetable</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/assignments">Check Assignments</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src={heroImage} 
              alt="Academic tools illustration" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Classes</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">3</span>
              <Clock className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Tasks</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">7</span>
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
          </CardHeader>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall GPA</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">3.7</span>
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </CardHeader>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Study Hours</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">42</span>
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your upcoming classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((cls, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{cls.subject}</p>
                  <p className="text-sm text-muted-foreground">{cls.room}</p>
                </div>
                <span className="text-sm font-medium text-primary">{cls.time}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link to="/timetable">View Full Timetable</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Urgent Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-warning" />
              Urgent Assignments
            </CardTitle>
            <CardDescription>Tasks due soon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {urgentAssignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div>
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                </div>
                <span className="text-sm font-medium text-warning">{assignment.due}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link to="/assignments">View All Assignments</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-success" />
              Recent Grades
            </CardTitle>
            <CardDescription>Latest academic performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                <div>
                  <p className="font-medium">{grade.assignment}</p>
                  <p className="text-sm text-muted-foreground">{grade.subject}</p>
                </div>
                <span className="text-sm font-bold text-success">{grade.grade}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link to="/grades">View Grade Calculator</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}