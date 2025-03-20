import { ProjectTimeline } from "@/components/project-timeline"

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Project Timeline</h1>
        <ProjectTimeline />
      </div>
    </main>
  )
}

