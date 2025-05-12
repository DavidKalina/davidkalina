import { Badge } from "@/components/ui/badge";
import {
  SiAnthropic,
  SiDocker,
  SiExpress,
  SiGit,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTypescript,
} from "react-icons/si";

const techStack = [
  {
    name: "TYPESCRIPT",
    icon: SiTypescript,
    iconColor: "text-blue-400",
  },
  {
    name: "REACT",
    icon: SiReact,
    iconColor: "text-blue-300",
  },
  {
    name: "NODE.JS",
    icon: SiNodedotjs,
    iconColor: "text-emerald-400",
  },
  {
    name: "DOCKER",
    icon: SiDocker,
    iconColor: "text-blue-300",
  },
  {
    name: "EXPRESS",
    icon: SiExpress,
    iconColor: "text-zinc-300",
  },
  {
    name: "PSQL",
    icon: SiPostgresql,
    iconColor: "text-blue-300",
  },
  {
    name: "REDIS",
    icon: SiRedis,
    iconColor: "text-red-300",
  },
  {
    name: "NEXT.JS",
    icon: SiNextdotjs,
    iconColor: "text-zinc-300",
  },
  {
    name: "PYTHON",
    icon: SiPython,
    iconColor: "text-blue-300",
  },
  {
    name: "OPENAI",
    icon: SiOpenai,
    iconColor: "text-blue-300",
  },
  {
    name: "GIT",
    icon: SiGit,
    iconColor: "text-red-300",
  },
  {
    name: "Anthropic",
    icon: SiAnthropic,
    iconColor: "text-blue-300",
  },
];

const TechBadges = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {techStack.map(({ name, icon: Icon, iconColor }) => (
        <Badge
          key={name}
          className="
            bg-[#333] dark:bg-zinc-700 
            text-white px-3 sm:px-4 py-2
            rounded-full text-[10px] sm:text-xs font-mono 
            flex items-center gap-2 
            border border-zinc-600 dark:border-zinc-500
            shadow-md transition-all duration-200
            hover:bg-[#444] dark:hover:bg-zinc-600 
            hover:border-zinc-400 dark:hover:border-zinc-300 
            hover:shadow-lg w-min
          "
        >
          <Icon size={14} className={iconColor} />
          {name}
        </Badge>
      ))}
    </div>
  );
};

export default TechBadges;
