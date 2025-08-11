import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Plus, BarChart3, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function Grades() {
  // Sample grade data
  const subjects = [
    {
      id: 1,
      name: "Advanced Mathematics",
      code: "MATH301",
      credits: 4,
      currentGrade: 87.5,
      targetGrade: 90,
      assignments: [
        { name: "Assignment 1", grade: 92, weight: 15, maxGrade: 100 },
        { name: "Assignment 2", grade: 85, weight: 15, maxGrade: 100 },
        { name: "Midterm Exam", grade: 88, weight: 30, maxGrade: 100 },
        { name: "Assignment 3", grade: null, weight: 15, maxGrade: 100 },
        { name: "Final Exam", grade: null, weight: 25, maxGrade: 100 },
      ]
    },
    {
      id: 2,
      name: "Computer Science",
      code: "CS205",
      credits: 3,
      currentGrade: 91.2,
      targetGrade: 95,
      assignments: [
        { name: "Project 1", grade: 95, weight: 25, maxGrade: 100 },
        { name: "Quiz 1", grade: 88, weight: 10, maxGrade: 100 },
        { name: "Project 2", grade: 92, weight: 25, maxGrade: 100 },
        { name: "Quiz 2", grade: null, weight: 10, maxGrade: 100 },
        { name: "Final Project", grade: null, weight: 30, maxGrade: 100 },
      ]
    },
    {
      id: 3,
      name: "Physics",
      code: "PHYS201",
      credits: 4,
      currentGrade: 83.7,
      targetGrade: 85,
      assignments: [
        { name: "Lab Report 1", grade: 86, weight: 20, maxGrade: 100 },
        { name: "Test 1", grade: 82, weight: 25, maxGrade: 100 },
        { name: "Lab Report 2", grade: 84, weight: 20, maxGrade: 100 },
        { name: "Test 2", grade: null, weight: 25, maxGrade: 100 },
        { name: "Final Exam", grade: null, weight: 10, maxGrade: 100 },
      ]
    },
    {
      id: 4,
      name: "Literature",
      code: "LIT101",
      credits: 3,
      currentGrade: 89.3,
      targetGrade: 90,
      assignments: [
        { name: "Essay 1", grade: 91, weight: 30, maxGrade: 100 },
        { name: "Essay 2", grade: 87, weight: 30, maxGrade: 100 },
        { name: "Presentation", grade: 92, weight: 20, maxGrade: 100 },
        { name: "Final Essay", grade: null, weight: 20, maxGrade: 100 },
      ]
    }
  ];

  const calculateGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;
    
    subjects.forEach(subject => {
      if (subject.currentGrade) {
        totalGradePoints += getGradePoints(subject.currentGrade) * subject.credits;
        totalCredits += subject.credits;
      }
    });
    
    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";
  };

  const getGradePoints = (percentage: number) => {
    if (percentage >= 97) return 4.0;
    if (percentage >= 93) return 3.7;
    if (percentage >= 90) return 3.3;
    if (percentage >= 87) return 3.0;
    if (percentage >= 83) return 2.7;
    if (percentage >= 80) return 2.3;
    if (percentage >= 77) return 2.0;
    if (percentage >= 73) return 1.7;
    if (percentage >= 70) return 1.3;
    if (percentage >= 67) return 1.0;
    return 0.0;
  };

  const getLetterGrade = (percentage: number) => {
    if (percentage >= 97) return "A+";
    if (percentage >= 93) return "A";
    if (percentage >= 90) return "A-";
    if (percentage >= 87) return "B+";
    if (percentage >= 83) return "B";
    if (percentage >= 80) return "B-";
    if (percentage >= 77) return "C+";
    if (percentage >= 73) return "C";
    if (percentage >= 70) return "C-";
    if (percentage >= 67) return "D+";
    if (percentage >= 65) return "D";
    return "F";
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-success";
    if (percentage >= 80) return "text-primary";
    if (percentage >= 70) return "text-warning";
    return "text-destructive";
  };

  const calculateCurrentWeightedGrade = (assignments: any[]) => {
    let totalWeightedPoints = 0;
    let totalWeight = 0;
    
    assignments.forEach(assignment => {
      if (assignment.grade !== null) {
        totalWeightedPoints += (assignment.grade / assignment.maxGrade) * assignment.weight;
        totalWeight += assignment.weight;
      }
    });
    
    return totalWeight > 0 ? (totalWeightedPoints / totalWeight) * 100 : 0;
  };

  const SubjectCard = ({ subject }: { subject: typeof subjects[0] }) => {
    const completedAssignments = subject.assignments.filter(a => a.grade !== null);
    const remainingAssignments = subject.assignments.filter(a => a.grade === null);
    const progressToTarget = Math.min((subject.currentGrade / subject.targetGrade) * 100, 100);

    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{subject.name}</CardTitle>
              <CardDescription>{subject.code} • {subject.credits} Credits</CardDescription>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${getGradeColor(subject.currentGrade)}`}>
                {subject.currentGrade.toFixed(1)}%
              </div>
              <Badge variant="outline">{getLetterGrade(subject.currentGrade)}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress to Target */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Target ({subject.targetGrade}%)</span>
              <span>{progressToTarget.toFixed(1)}%</span>
            </div>
            <Progress value={progressToTarget} className="h-2" />
          </div>

          {/* Assignments */}
          <div>
            <h4 className="font-medium mb-2">Assignments</h4>
            <div className="space-y-2">
              {subject.assignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div>
                    <span className="font-medium text-sm">{assignment.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">({assignment.weight}%)</span>
                  </div>
                  <div className="text-right">
                    {assignment.grade !== null ? (
                      <span className={`font-medium ${getGradeColor(assignment.grade)}`}>
                        {assignment.grade}/{assignment.maxGrade}
                      </span>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="font-semibold">{completedAssignments.length}/{subject.assignments.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">GPA Points</p>
              <p className="font-semibold">{getGradePoints(subject.currentGrade)}</p>
            </div>
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
          <h1 className="text-3xl font-bold">Grade Calculator</h1>
          <p className="text-muted-foreground">
            Track your academic progress and calculate your GPA
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Grade
        </Button>
      </div>

      {/* GPA Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Current GPA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-2">{calculateGPA()}</div>
            <p className="text-muted-foreground">Based on {subjects.length} courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">↑ 0.2</div>
            <p className="text-sm text-muted-foreground">From last semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">3.8</div>
            <p className="text-sm text-muted-foreground">Target GPA</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="subjects" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="calculator">Grade Calculator</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {subjects.map(subject => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What-If Grade Calculator</CardTitle>
              <CardDescription>
                Calculate what grades you need on remaining assignments to reach your target
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Grade calculator coming soon!</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This feature will help you calculate required grades for future assignments.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map(subject => (
                    <div key={subject.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{subject.name}</span>
                        <span className={getGradeColor(subject.currentGrade)}>
                          {subject.currentGrade.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={subject.currentGrade} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Highest Grade:</span>
                    <span className="font-semibold text-success">91.2% (CS205)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lowest Grade:</span>
                    <span className="font-semibold text-warning">83.7% (PHYS201)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Grade:</span>
                    <span className="font-semibold">{(subjects.reduce((sum, s) => sum + s.currentGrade, 0) / subjects.length).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Credits:</span>
                    <span className="font-semibold">{subjects.reduce((sum, s) => sum + s.credits, 0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}