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
import { motion } from "framer-motion";

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 max-w-4xl">
      {techStack.map(({ name, icon: Icon, iconColor }) => (
        <motion.div
          key={name}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex justify-center"
        >
          <Badge
            className="
              bg-gradient-to-r from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800
              text-white px-2 sm:px-3 py-1.5 sm:py-2
              rounded-full text-[10px] sm:text-xs font-mono 
              flex items-center gap-1.5 sm:gap-2
              border border-zinc-600 dark:border-zinc-500
              shadow-md transition-all duration-200
              hover:from-[#444] hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-500
              hover:border-zinc-400 dark:hover:border-zinc-300 
              hover:shadow-lg whitespace-nowrap
            "
          >
            <Icon size={12} className={`${iconColor} flex-shrink-0`} />
            <span className="truncate">{name}</span>
          </Badge>
        </motion.div>
      ))}
    </div>
  );
};

export default TechBadges;
