import React from "react";

const ExperienceStats = () => {
  return (
    <div className="flex items-center flex-wrap justify-between gap-8">
      <div className="flex flex-col items-center text-center space-y-3 flex-1 min-w-[150px]">
        <p className="font-mono text-5xl font-bold text-zinc-900 dark:text-white">5+</p>
        <p className="font-mono text-sm text-zinc-500 dark:text-white">
          YEARS OF
          <br />
          DEVELOPMENT
        </p>
      </div>
      <div className="flex flex-col items-center text-center space-y-3 flex-1 min-w-[150px]">
        <p className="font-mono text-5xl font-bold text-zinc-900 dark:text-white">$400K+</p>
        <p className="font-mono text-sm text-zinc-500 dark:text-white">
          PRODUCT
          <br />
          IMPACT
        </p>
      </div>
      <div className="flex flex-col items-center text-center space-y-3 flex-1 min-w-[150px]">
        <p className="font-mono text-5xl font-bold text-zinc-900 dark:text-white">AI-POWERED</p>
        <p className="font-mono text-sm text-zinc-500 dark:text-white">
          WEB & CONTENT
          <br />
          SOLUTIONS
        </p>
      </div>
      <div className="flex flex-col items-center text-center space-y-3 flex-1 min-w-[150px]">
        <p className="font-mono text-5xl font-bold text-zinc-900 dark:text-white">10+</p>
        <p className="font-mono text-sm text-zinc-500 dark:text-white">
          DEVELOPERS
          <br />
          MENTORED
        </p>
      </div>
    </div>
  );
};

export default ExperienceStats;
