import type { Metadata } from "next";
import ParticipantHero from "@/components/participants/ParticipantHero";
import ParticipantBenefits from "@/components/participants/ParticipantBenefits";
import ParticipantDiscovery from "@/components/participants/ParticipantDiscovery";
import ParticipantRecommendations from "@/components/participants/ParticipantRecommendations";
import ParticipantWorkflow from "@/components/participants/ParticipantWorkflow";
import ParticipantCTA from "@/components/participants/ParticipantCTA";

export const metadata: Metadata = {
  title: "For Participants",
  description:
    "Discover hackathons, explore opportunities that match your interests, and participate easily with Hacktrion.",
};

export default function ParticipantsPage() {
  return (
    <div>
      <ParticipantHero />
      <ParticipantBenefits />
      <ParticipantDiscovery />
      <ParticipantRecommendations />
      <ParticipantWorkflow />
      <ParticipantCTA />
    </div>
  );
}
