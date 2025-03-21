"use client";
import { useEffect, useState } from "react";
import { Check, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { TimelineData } from "@/lib/timelineState";

export function ProjectTimeline() {
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

  // Calculate the completion percentage for the timeline
  // If current sprint is completed, include its full width in the progress bar
  const calculateCompletedWidth = () => {
    let completedSprintCount = 0;

    // Count completed sprints
    for (let i = 0; i <= timelineData.currentSprint; i++) {
      if (i < timelineData.currentSprint || timelineData.sprints[i].completed) {
        completedSprintCount++;
      }
    }

    return `${(completedSprintCount / (milestones.length - 1)) * 100}%`;
  };

  const milestones = [
    {
      date: "Week 1",
      subDate: "Mon-Wed",
      title: "Sprint 1",
      description: "Initial Landing Page",
      status: timelineData.sprints[0].completed
        ? "completed"
        : timelineData.currentSprint === 0
        ? "in-progress"
        : "upcoming",
      icon: "rocket",
      current: timelineData.currentSprint === 0,
      tasks: [
        "Initial Landing Page design",
        "Establish color scheme (black and blue)",
        "Create responsive base structure",
      ],
      taskStatus: timelineData.sprints[0].tasks,
    },
    {
      date: "Week 1",
      subDate: "Wed-Fri",
      title: "Sprint 2",
      description: "Login & Registration",
      status: timelineData.sprints[1].completed
        ? "completed"
        : timelineData.currentSprint === 1
        ? "in-progress"
        : "upcoming",
      icon: "check",
      current: timelineData.currentSprint === 1,
      tasks: [
        "Finalize Landing Page with value proposition",
        "Implement basic Login and Registration forms",
        "Create static map visualization of locations",
      ],
      taskStatus: timelineData.sprints[1].tasks,
    },
    {
      date: "Week 2",
      subDate: "Fri-Wed",
      title: "Sprint 3",
      description: "Search & Payments",
      status: timelineData.sprints[2].completed
        ? "completed"
        : timelineData.currentSprint === 2
        ? "in-progress"
        : "upcoming",
      icon: "check",
      current: timelineData.currentSprint === 2,
      tasks: [
        "Develop search filter components (City, Activities, Distance)",
        "Implement interaction simulation for location selection",
        "Create payment methods simulation screen",
      ],
      taskStatus: timelineData.sprints[2].tasks,
    },
    {
      date: "Week 2",
      subDate: "Wed-Fri",
      title: "Sprint 4",
      description: "Final Adjustments",
      status: timelineData.sprints[3].completed
        ? "completed"
        : timelineData.currentSprint === 3
        ? "in-progress"
        : "upcoming",
      icon: "check",
      current: timelineData.currentSprint === 3,
      tasks: [
        "Finalize profile creation flow simulation",
        "Polish responsive design for all devices",
        "Conduct navigation testing and final adjustments",
      ],
      taskStatus: timelineData.sprints[3].tasks,
    },
  ];

  const completedWidth = calculateCompletedWidth();

  return (
    <div className="relative pb-20">
      {/* Main timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-12 left-0 right-0 h-2 bg-blue-100 rounded-full"></div>

        {/* Completed line with animation */}
        <motion.div
          className="absolute top-12 h-2 bg-emerald-500 rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: completedWidth,
            left: 0,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* In progress line with pulse animation - only show if current sprint is not completed */}
        {timelineData.currentSprint < milestones.length - 1 &&
          !timelineData.sprints[timelineData.currentSprint].completed && (
            <motion.div
              className="absolute top-12 h-2 bg-emerald-500 rounded-full"
              style={{
                left: `${
                  (timelineData.currentSprint / (milestones.length - 1)) * 100
                }%`,
                width: `${(1 / (milestones.length - 1)) * 100}%`,
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}

        {/* Milestones */}
        <div className="flex justify-between relative">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex flex-col items-center relative"
              style={{ width: `${100 / milestones.length}%` }}
            >
              {/* Milestone icon with animation */}
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                  milestone.status === "completed"
                    ? "bg-emerald-500"
                    : milestone.status === "in-progress"
                    ? "bg-emerald-500 bg-opacity-70"
                    : "bg-blue-100"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                {milestone.icon === "rocket" ? (
                  <Rocket className="h-5 w-5 text-white" />
                ) : (
                  <Check className="h-5 w-5 text-white" />
                )}
              </motion.div>

              {/* Date with animation */}
              <motion.div
                className="mt-4 text-sm font-medium text-gray-700"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
              >
                {milestone.date}
              </motion.div>

              <motion.div
                className="text-xs text-gray-500"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
              >
                {milestone.subDate}
              </motion.div>

              {/* Title with animation */}
              <motion.div
                className="mt-1 text-sm font-semibold text-center"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
              >
                {milestone.title}
              </motion.div>

              {/* Description with animation */}
              <motion.div
                className="mt-1 text-xs text-gray-500 text-center max-w-[120px]"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
              >
                {milestone.description}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks for each milestone with animations */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className={`border rounded-lg p-4 ${
              milestone.status === "completed"
                ? "border-emerald-500"
                : milestone.status === "in-progress"
                ? "border-emerald-300"
                : "border-gray-200"
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center mb-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                  milestone.status === "completed"
                    ? "bg-emerald-500"
                    : milestone.status === "in-progress"
                    ? "bg-emerald-500 bg-opacity-70"
                    : "bg-blue-100"
                }`}
              >
                {milestone.icon === "rocket" ? (
                  <Rocket className="h-3 w-3 text-white" />
                ) : (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <div className="font-semibold">{milestone.title}</div>
            </div>
            <ul className="text-sm space-y-2">
              {milestone.tasks.map((task, taskIndex) => (
                <motion.li
                  key={taskIndex}
                  className="flex items-start"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.7 + index * 0.1 + taskIndex * 0.1,
                    duration: 0.5,
                  }}
                >
                  <motion.div
                    className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 ${
                      milestone.taskStatus[taskIndex]
                        ? "bg-emerald-500"
                        : "bg-gray-200"
                    }`}
                    animate={
                      milestone.taskStatus[taskIndex]
                        ? { scale: [1, 1.3, 1] }
                        : {}
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <Check
                      className={`h-2.5 w-2.5 ${
                        milestone.taskStatus[taskIndex]
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    />
                  </motion.div>
                  <span
                    className={`text-gray-700 ${
                      milestone.taskStatus[taskIndex] ? "text-gray-500" : ""
                    }`}
                  >
                    {task}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
