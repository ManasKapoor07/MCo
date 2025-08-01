import { FC } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Hasan Ahmed",
    role: "Adventure master",
    imageUrl: "/images/person1.jpg",
  },
  {
    name: "Hasan Ahmed",
    role: "Adventure master",
    imageUrl: "/images/person2.jpg",
  },
  {
    name: "Hasan Ahmed",
    role: "Adventure master",
    imageUrl: "/images/person3.jpg",
  },
  {
    name: "Hasan Ahmed",
    role: "Adventure master",
    imageUrl: "/images/person4.jpg",
  },
];

const TeamGrid: FC = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="text-center">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-[300px] object-cover"
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.role}</p>
              <div className="mt-2 flex justify-center space-x-4 text-gray-700">
                <a href="#"><FaFacebookF className="hover:text-blue-600" /></a>
                <a href="#"><FaTwitter className="hover:text-blue-400" /></a>
                <a href="#"><FaInstagram className="hover:text-pink-500" /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;
