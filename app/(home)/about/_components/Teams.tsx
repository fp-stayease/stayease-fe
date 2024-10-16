import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logger from "@/utils/logger";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

const Teams: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=8");
        const data = await response.json();
        const formattedTeam = data.results.map(
          (member: any, index: number) => ({
            name: `${member.name.first} ${member.name.last}`,
            role: getRoleForIndex(index),
            avatar: member.picture.large,
          }),
        );
        setTeam(formattedTeam);
      } catch (error) {
        logger.error("Error fetching team data:", { error });
      }
    };

    fetchTeam();
  }, []);

  const getRoleForIndex = (index: number): string => {
    const roles = [
      "Founder & CEO",
      "Engineering Manager",
      "Product Manager",
      "Frontend Developer",
      "Backend Developer",
      "Product Designer",
      "UX Researcher",
      "Customer Success",
    ];
    return roles[index] || "Team Member";
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-950 mb-2">
          Meet our team
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Our philosophy is simple—bring together a diverse, passionate team and
          create a culture that lets everyone do their best work.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src={member?.avatar} alt="avatar" />
                <AvatarFallback className="text-4xl">
                  {member?.name[0]}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                {member.name}
              </h3>
              <p className="text-blue-600 text-xs md:text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
Teams.displayName = "Teams";
