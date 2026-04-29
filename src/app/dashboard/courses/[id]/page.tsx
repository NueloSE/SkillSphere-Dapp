"use client";

import React, { useState } from "react";
import OverviewTabContent from "@/components/dashboard/OverviewTabContent";
import SummaryTabContent from "@/components/dashboard/SummaryTabContent";
import ResourcesTabContent from "@/components/dashboard/ResourcesTabContent";
import TaskTabContent from "@/components/dashboard/TaskTabContent";
import CourseContentTrackerSidebar from "@/components/dashboard/CourseContentTrackerSidebar";
import CourseLearningHeader from "@/components/dashboard/CourseLearningHeader";
import image1 from "../../../../../public/Image (1).png";

type TabId = "overview" | "resources" | "tasks" | "summary";

interface Params {
  id: string;
}

const COURSE_DATA: Record<
  string,
  {
    title: string;
    currentLesson: string;
    image: string;
    overview: string;
    learningPoints: string[];
    targetAudience: string[];
    summary: string;
    keyTakeaways: string[];
    courseOutcomes: string[];
  }
> = {
  "1": {
    title: "Become a Web3 Developer: A beginners approach",
    currentLesson: "Intro to Digital Technology",
    image: image1.src,
    overview:
      "This comprehensive course introduces you to Web3 development fundamentals. Learn blockchain concepts, smart contracts, and decentralized application development from industry experts.",
    learningPoints: [
      "Understand blockchain architecture and consensus mechanisms",
      "Write and deploy smart contracts",
      "Build decentralized applications (dApps)",
      "Work with Web3 libraries and frameworks",
      "Implement security best practices in blockchain",
    ],
    targetAudience: [
      "Developers interested in blockchain and Web3 technologies",
      "Software engineers looking to transition into decentralized systems",
      "Entrepreneurs building blockchain-based products",
      "Technology enthusiasts wanting to understand Web3 deeply",
    ],
    summary:
      "This course provides a complete pathway from blockchain fundamentals to building production-ready Web3 applications. Through hands-on projects, you will gain practical experience and industry insights.",
    keyTakeaways: [
      "Master blockchain technology and its applications",
      "Develop smart contracts with Solidity",
      "Build full-stack dApps",
      "Understand Web3 security and best practices",
      "Deploy projects to live networks",
    ],
    courseOutcomes: [
      "Successfully build Web3 applications",
      "Understand blockchain ecosystems",
      "Implement secure smart contracts",
      "Deploy and manage decentralized systems",
      "Join Web3 developer communities",
    ],
  },
  "2": {
    title: "Design made simple",
    currentLesson: "Fundamentals of Visual Design",
    image: image1.src,
    overview:
      "A complete guide to modern interface design principles and practices. Learn how to create beautiful, functional, and user-centered digital experiences.",
    learningPoints: [
      "Master design fundamentals and color theory",
      "Create wireframes and prototypes",
      "Implement responsive design principles",
      "Understand user experience and user interface design",
      "Use industry-standard design tools effectively",
    ],
    targetAudience: [
      "Aspiring UX/UI designers",
      "Web developers wanting design skills",
      "Product managers improving design literacy",
      "Anyone interested in digital design",
    ],
    summary:
      "Learn modern design practices that create exceptional user experiences. From concept to implementation, master the tools and techniques used by leading design teams.",
    keyTakeaways: [
      "Design thinking and problem-solving",
      "Visual hierarchy and composition",
      "Prototyping and user testing",
      "Design systems and components",
      "Accessibility and inclusive design",
    ],
    courseOutcomes: [
      "Create professional design portfolio pieces",
      "Understand design thinking methodology",
      "Build responsive designs",
      "Conduct user research",
      "Lead design projects",
    ],
  },
};

export default function CourseDetailsPage({ params }: { params: Params }) {
  const courseData = COURSE_DATA[params.id];
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  if (!courseData) {
    return (
      <div className="text-center text-white py-12">
        <h1 className="text-2xl font-bold">Course not found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <CourseLearningHeader
            courseTitle={courseData.title}
            currentLesson={courseData.currentLesson}
          />

          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-900">
            <img
              src={courseData.image}
              alt={courseData.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-2 border-b border-[#1D1D1C] overflow-x-auto mt-2">
            {[
              { id: "overview" as const, label: "Overview" },
              { id: "resources" as const, label: "Resources" },
              { id: "tasks" as const, label: "Tasks" },
              { id: "summary" as const, label: "Summary" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-white text-white"
                    : "border-transparent text-white/60 hover:text-white/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div>
            {activeTab === "overview" && (
              <OverviewTabContent
                overview={courseData.overview}
                learningPoints={courseData.learningPoints}
                targetAudience={courseData.targetAudience}
              />
            )}
            {activeTab === "resources" && <ResourcesTabContent />}
            {activeTab === "tasks" && <TaskTabContent />}
            {activeTab === "summary" && (
              <SummaryTabContent
                courseSummary={courseData.summary}
                keyTakeaways={courseData.keyTakeaways}
                courseOutcomes={courseData.courseOutcomes}
              />
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <CourseContentTrackerSidebar />
        </div>
      </div>
    </div>
  );
}
