import type { Metadata } from "next";
import OrganizerHero from "@/components/organizations/OrganizerHero";
import OrganizerBenefits from "@/components/organizations/OrganizerBenefits";
import OrganizerFeatures from "@/components/organizations/OrganizerFeatures";
import OrganizerWorkflow from "@/components/organizations/OrganizerWorkflow";
import OrganizerFAQ from "@/components/organizations/OrganizerFAQ";
import OrganizerCTA from "@/components/organizations/OrganizerCTA";

export const metadata: Metadata = {
  title: "For Organizers",
  description:
    "Organize and manage your hackathons through one centralized platform. Create, publish, and track your events with Hacktrion.",
};

export default function OrganizationsPage() {
  return (
    <div>
      <OrganizerHero />
      <OrganizerBenefits />
      <OrganizerFeatures />
      <OrganizerWorkflow />
      <OrganizerFAQ />
      <OrganizerCTA />
    </div>
  );
}
