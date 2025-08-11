import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Plus } from "lucide-react";

export default function Timetable() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  // Sample class data
  const classes = {
    "Monday": [
      { 
        id: 1, 
        time: "09:00", 
        duration: 2, 
        subject: "Advanced Mathematics", 
        room: "Room 301", 
        instructor: "Dr. Smith",
        color: "bg-primary text-primary-foreground"
      },
      { 
        id: 2, 
        time: "14:00", 
        duration: 1, 
        subject: "Literature", 
        room: "Room 205", 
        instructor: "Prof. Johnson",
        color: "bg-accent text-accent-foreground"
      }
    ],
    "Tuesday": [
      { 
        id: 3, 
        time: "10:00", 
        duration: 1, 
        subject: "Computer Science", 
        room: "Lab 105", 
        instructor: "Dr. Brown",
        color: "bg-success text-success-foreground"
      },
      { 
        id: 4, 
        time: "15:00", 
        duration: 2, 
        subject: "Physics Lab", 
        room: "Lab 301", 
        instructor: "Dr. Wilson",
        color: "bg-warning text-warning-foreground"
      }
    ],
    "Wednesday": [
      { 
        id: 5, 
        time: "09:00", 
        duration: 1, 
        subject: "History", 
        room: "Room 102", 
        instructor: "Prof. Davis",
        color: "bg-destructive text-destructive-foreground"
      }
    ],
    "Thursday": [
      { 
        id: 6, 
        time: "11:00", 
        duration: 2, 
        subject: "Chemistry", 
        room: "Lab 201", 
        instructor: "Dr. Taylor",
        color: "bg-primary text-primary-foreground"
      }
    ],
    "Friday": [
      { 
        id: 7, 
        time: "13:00", 
        duration: 1, 
        subject: "Economics", 
        room: "Room 401", 
        instructor: "Prof. Anderson",
        color: "bg-accent text-accent-foreground"
      }
    ]
  };

  const getCurrentDay = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return days.includes(today) ? today : null;
  };

  const currentDay = getCurrentDay();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Weekly Timetable</h1>
          <p className="text-muted-foreground">
            Manage your class schedule and study sessions
          </p>
        </div>
        <Button className="sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Class
        </Button>
      </div>

      {/* Week Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Week of January 8-12, 2024
          </CardTitle>
          <CardDescription>Current academic week</CardDescription>
        </CardHeader>
      </Card>

      {/* Timetable Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Mobile-friendly stacked view for small screens */}
          <div className="block lg:hidden space-y-4">
            {days.map((day) => (
              <Card key={day} className={currentDay === day ? "ring-2 ring-primary" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {day}
                    {currentDay === day && (
                      <Badge variant="default">Today</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {classes[day]?.length > 0 ? (
                    classes[day].map((cls) => (
                      <div 
                        key={cls.id}
                        className={`p-4 rounded-lg ${cls.color}`}
                      >
                        <h4 className="font-semibold">{cls.subject}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm opacity-90">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {cls.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {cls.room}
                          </span>
                        </div>
                        <p className="text-sm mt-1 opacity-80">{cls.instructor}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No classes scheduled</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop grid view */}
          <div className="hidden lg:block">
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-6 min-h-[600px]">
                  {/* Time column */}
                  <div className="border-r border-border">
                    <div className="h-12 border-b border-border flex items-center justify-center font-medium bg-muted">
                      Time
                    </div>
                    {timeSlots.map((time) => (
                      <div 
                        key={time} 
                        className="h-16 border-b border-border flex items-center justify-center text-sm text-muted-foreground"
                      >
                        {time}
                      </div>
                    ))}
                  </div>

                  {/* Day columns */}
                  {days.map((day) => (
                    <div key={day} className="border-r border-border last:border-r-0 relative">
                      <div className={`h-12 border-b border-border flex items-center justify-center font-medium ${
                        currentDay === day ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {day}
                        {currentDay === day && (
                          <Badge variant="secondary" className="ml-2">Today</Badge>
                        )}
                      </div>
                      
                      {/* Time slots */}
                      {timeSlots.map((time, timeIndex) => (
                        <div 
                          key={time} 
                          className="h-16 border-b border-border relative"
                        >
                          {/* Render classes */}
                          {classes[day]?.map((cls) => {
                            const classStartIndex = timeSlots.indexOf(cls.time);
                            if (classStartIndex === timeIndex) {
                              return (
                                <div
                                  key={cls.id}
                                  className={`absolute inset-x-1 rounded p-2 ${cls.color} z-10`}
                                  style={{
                                    height: `${cls.duration * 64 - 8}px`,
                                    top: '4px'
                                  }}
                                >
                                  <h4 className="font-semibold text-sm">{cls.subject}</h4>
                                  <p className="text-xs opacity-90">{cls.room}</p>
                                  <p className="text-xs opacity-80">{cls.instructor}</p>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold">Add Study Session</h3>
            <p className="text-sm text-muted-foreground">Block time for focused study</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-3 text-accent" />
            <h3 className="font-semibold">Set Reminder</h3>
            <p className="text-sm text-muted-foreground">Never miss a class</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-success" />
            <h3 className="font-semibold">Find Classroom</h3>
            <p className="text-sm text-muted-foreground">Get directions to your classes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}