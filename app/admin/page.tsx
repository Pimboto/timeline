"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  RefreshCcw,
} from "lucide-react";
import Link from "next/link";
import { TimelineData, defaultTimelineData } from "@/lib/timelineState";

export default function AdminPage() {
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);

  useEffect(() => {
    // Fetch timeline data from API instead of localStorage
    const fetchTimelineData = async () => {
      try {
        const response = await fetch("/api/timeline");
        if (response.ok) {
          const data = await response.json();
          setTimelineData(data);
        }
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };

    fetchTimelineData();
  }, []);

  if (!timelineData) return <div>Loading...</div>;

  // Function to update the timeline data through the API
  const updateTimelineData = async (newData: TimelineData) => {
    try {
      const response = await fetch("/api/timeline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setTimelineData(updatedData);
      }
    } catch (error) {
      console.error("Error updating timeline data:", error);
    }
  };

  const advanceSprint = () => {
    if (timelineData.currentSprint < 3) {
      const newData = { ...timelineData };

      // Mark current sprint as completed
      newData.sprints[newData.currentSprint].completed = true;
      newData.sprints[newData.currentSprint].tasks = newData.sprints[
        newData.currentSprint
      ].tasks.map(() => true);

      // Advance to next sprint
      newData.currentSprint += 1;

      updateTimelineData(newData);
    }
  };

  const goBackSprint = () => {
    if (timelineData.currentSprint > 0) {
      const newData = { ...timelineData };

      // Mark current sprint as not completed
      newData.sprints[newData.currentSprint].completed = false;

      // Go back to previous sprint
      newData.currentSprint -= 1;

      updateTimelineData(newData);
    }
  };

  const toggleTask = (sprintIndex: number, taskIndex: number) => {
    const newData = { ...timelineData };

    // Toggle the task completion status
    newData.sprints[sprintIndex].tasks[taskIndex] =
      !newData.sprints[sprintIndex].tasks[taskIndex];

    // If all tasks are completed, mark the sprint as completed
    const allTasksCompleted = newData.sprints[sprintIndex].tasks.every(
      (task: boolean) => task
    );
    if (allTasksCompleted) {
      newData.sprints[sprintIndex].completed = true;
    } else {
      newData.sprints[sprintIndex].completed = false;
    }

    updateTimelineData(newData);
  };

  const resetTimeline = () => {
    const resetData = {
      currentSprint: 0,
      sprints: [
        { completed: false, tasks: [false, false, false] },
        { completed: false, tasks: [false, false, false] },
        { completed: false, tasks: [false, false, false] },
        { completed: false, tasks: [false, false, false] },
      ],
    };
    updateTimelineData(resetData);
  };

  const sprintNames = ["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4"];
  const sprintTasks = [
    [
      "Initial Landing Page design",
      "Establish color scheme (black and blue)",
      "Create responsive base structure",
    ],
    [
      "Finalize Landing Page with value proposition",
      "Implement basic Login and Registration forms",
      "Create static map visualization of locations",
    ],
    [
      "Develop search filter components (City, Activities, Distance)",
      "Implement interaction simulation for location selection",
      "Create payment methods simulation screen",
    ],
    [
      "Finalize profile creation flow simulation",
      "Polish responsive design for all devices",
      "Conduct navigation testing and final adjustments",
    ],
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Timeline Admin</h1>
          <Link href="/">
            <Button variant="outline">View Timeline</Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Timeline Controls</CardTitle>
            <CardDescription>
              Advance or go back in the project timeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-emerald-500 mr-2" />
                <span className="font-medium">
                  Current: {sprintNames[timelineData.currentSprint]}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goBackSprint}
                  disabled={timelineData.currentSprint === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous Sprint
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={advanceSprint}
                  disabled={timelineData.currentSprint === 3}
                >
                  Next Sprint <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="destructive" size="sm" onClick={resetTimeline}>
              <RefreshCcw className="h-4 w-4 mr-1" /> Reset Timeline
            </Button>
          </CardFooter>
        </Card>

        <Tabs defaultValue="sprint1">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="sprint1">Sprint 1</TabsTrigger>
            <TabsTrigger value="sprint2">Sprint 2</TabsTrigger>
            <TabsTrigger value="sprint3">Sprint 3</TabsTrigger>
            <TabsTrigger value="sprint4">Sprint 4</TabsTrigger>
          </TabsList>

          {[0, 1, 2, 3].map((sprintIndex) => (
            <TabsContent key={sprintIndex} value={`sprint${sprintIndex + 1}`}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {sprintNames[sprintIndex]}
                    {timelineData.sprints[sprintIndex].completed && (
                      <span className="ml-2 text-xs bg-emerald-500 text-white rounded-full px-2 py-0.5">
                        Completed
                      </span>
                    )}
                    {timelineData.currentSprint === sprintIndex &&
                      !timelineData.sprints[sprintIndex].completed && (
                        <span className="ml-2 text-xs bg-blue-500 text-white rounded-full px-2 py-0.5">
                          In Progress
                        </span>
                      )}
                  </CardTitle>
                  <CardDescription>
                    Manage tasks for this sprint
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {sprintTasks[sprintIndex].map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`w-8 h-8 p-0 mr-3 ${
                            timelineData.sprints[sprintIndex].tasks[taskIndex]
                              ? "bg-emerald-500 text-white hover:bg-emerald-600"
                              : "bg-white"
                          }`}
                          onClick={() => toggleTask(sprintIndex, taskIndex)}
                        >
                          {timelineData.sprints[sprintIndex].tasks[
                            taskIndex
                          ] && <Check className="h-4 w-4" />}
                        </Button>
                        <span
                          className={`${
                            timelineData.sprints[sprintIndex].tasks[taskIndex]
                              ? "line-through text-gray-500"
                              : "text-gray-900"
                          }`}
                        >
                          {task}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
