import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Plus, Search, Filter, Download, Share, FileText, Image, Link, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Notes() {
  // Sample notes data
  const notes = [
    {
      id: 1,
      title: "Calculus Chapter 7 - Integration Techniques",
      subject: "Advanced Mathematics",
      type: "notes",
      lastModified: "2024-01-08",
      size: "2.3 MB",
      shared: true,
      tags: ["calculus", "integration", "exam-prep"]
    },
    {
      id: 2,
      title: "Data Structures Implementation Guide",
      subject: "Computer Science",
      type: "document",
      lastModified: "2024-01-07",
      size: "1.8 MB",
      shared: false,
      tags: ["programming", "python", "algorithms"]
    },
    {
      id: 3,
      title: "Physics Lab - Pendulum Experiment",
      subject: "Physics",
      type: "lab-report",
      lastModified: "2024-01-06",
      size: "950 KB",
      shared: true,
      tags: ["physics", "lab", "mechanics"]
    },
    {
      id: 4,
      title: "Shakespeare's Hamlet - Character Analysis",
      subject: "Literature",
      type: "essay",
      lastModified: "2024-01-05",
      size: "1.2 MB",
      shared: false,
      tags: ["literature", "shakespeare", "analysis"]
    },
    {
      id: 5,
      title: "World War II Timeline",
      subject: "History",
      type: "research",
      lastModified: "2024-01-04",
      size: "3.1 MB",
      shared: true,
      tags: ["history", "wwii", "timeline"]
    },
    {
      id: 6,
      title: "Chemistry Formula Sheet",
      subject: "Chemistry",
      type: "reference",
      lastModified: "2024-01-03",
      size: "650 KB",
      shared: true,
      tags: ["chemistry", "formulas", "reference"]
    }
  ];

  const subjects = [...new Set(notes.map(note => note.subject))];
  const noteTypes = [...new Set(notes.map(note => note.type))];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "notes": return FileText;
      case "document": return BookOpen;
      case "lab-report": return FileText;
      case "essay": return FileText;
      case "research": return Search;
      case "reference": return BookOpen;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "notes": return "default";
      case "document": return "secondary";
      case "lab-report": return "success";
      case "essay": return "warning";
      case "research": return "destructive";
      case "reference": return "outline";
      default: return "default";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const NoteCard = ({ note }: { note: typeof notes[0] }) => {
    const TypeIcon = getTypeIcon(note.type);

    return (
      <Card className="transition-all hover:shadow-md cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
              <CardDescription className="mt-1">{note.subject}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getTypeColor(note.type)}>
                <TypeIcon className="w-3 h-3 mr-1" />
                {note.type}
              </Badge>
              {note.shared && (
                <Badge variant="outline">
                  <Share className="w-3 h-3 mr-1" />
                  Shared
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {note.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(note.lastModified)}
              </span>
              <span>{note.size}</span>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Download className="w-3 h-3 mr-1" />
                Download
              </Button>
              <Button size="sm" variant="outline">
                <Share className="w-3 h-3 mr-1" />
                Share
              </Button>
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
          <h1 className="text-3xl font-bold">Notes & Resources</h1>
          <p className="text-muted-foreground">
            Organize and share your study materials
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Image className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Note
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search notes, subjects, or tags..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{notes.length}</p>
                <p className="text-sm text-muted-foreground">Total Notes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Share className="w-5 h-5 text-success" />
              <div>
                <p className="text-2xl font-bold">{notes.filter(n => n.shared).length}</p>
                <p className="text-sm text-muted-foreground">Shared</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              <div>
                <p className="text-2xl font-bold">{subjects.length}</p>
                <p className="text-sm text-muted-foreground">Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">
                  {notes.reduce((total, note) => total + parseFloat(note.size), 0).toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">MB Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes Organization */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Notes</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes
              .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
              .slice(0, 6)
              .map(note => (
                <NoteCard key={note.id} note={note} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes
              .filter(note => note.shared)
              .map(note => (
                <NoteCard key={note.id} note={note} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          {subjects.map(subject => (
            <div key={subject}>
              <h3 className="text-lg font-semibold mb-4">{subject}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes
                  .filter(note => note.subject === subject)
                  .map(note => (
                    <NoteCard key={note.id} note={note} />
                  ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Link className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold">Add Web Link</h3>
            <p className="text-sm text-muted-foreground">Save important articles and resources</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Image className="w-8 h-8 mx-auto mb-3 text-accent" />
            <h3 className="font-semibold">Scan Document</h3>
            <p className="text-sm text-muted-foreground">Convert physical notes to digital</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Share className="w-8 h-8 mx-auto mb-3 text-success" />
            <h3 className="font-semibold">Study Groups</h3>
            <p className="text-sm text-muted-foreground">Collaborate with classmates</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}