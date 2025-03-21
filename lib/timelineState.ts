// Path: lib/timelineState.ts

// Define the timeline data type
export interface TimelineData {
    currentSprint: number;
    sprints: {
      completed: boolean;
      tasks: boolean[];
    }[];
  }
  
  // Default data for the timeline
  export const defaultTimelineData: TimelineData = {
    currentSprint: 2, // 0-based index, so this is Sprint 3
    sprints: [
      {
        completed: true,
        tasks: [true, true, true], // All tasks completed
      },
      {
        completed: true,
        tasks: [true, true, true], // All tasks completed
      },
      {
        completed: false,
        tasks: [true, true, false], // First two tasks completed
      },
      {
        completed: false,
        tasks: [false, false, false], // No tasks completed
      },
    ],
  };
  
  // In a production app, this would be stored in a database
  // For simplicity, we'll use a global variable that persists while the server is running
  let globalTimelineData: TimelineData | null = null;
  
  export function getTimelineData(): TimelineData {
    if (!globalTimelineData) {
      globalTimelineData = { ...defaultTimelineData };
    }
    return globalTimelineData;
  }
  
  export function updateTimelineData(data: TimelineData): TimelineData {
    globalTimelineData = { ...data };
    return globalTimelineData;
  }