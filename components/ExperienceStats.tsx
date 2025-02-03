import React from "react";

const ExperienceStats = () => {
  return (
    <div className="flex items-center flex-wrap justify-between gap-8">
      <div className="flex flex-col items-center text-center space-y-3 flex-1 min-w-[150px]">
        <p className="font-mono text-5xl font-bold text-zinc-900">4+</p>
        <p className="font-mono text-sm text-zinc-500">
          YEARS OF
          <br />
          DEVELOPMENT
        </p>
      </div>
      <div className="flex flex-col items-center text-center space-y-3 flex-1 min-w-[150px]">
        <p className="font-mono text-5xl font-bold text-zinc-900">$400K+</p>
        <p className="font-mono text-sm text-zinc-500">
          PRODUCT
          <br />
          IMPACT
        </p>
      </div>
      <div className="flex flex-col items-center text-center space-y-3 flex-1 min-w-[150px]">
        <p className="font-mono text-5xl font-bold text-zinc-900">AI-POWERED</p>
        <p className="font-mono text-sm text-zinc-500">
          WEB & CONTENT
          <br />
          SOLUTIONS
        </p>
      </div>
      <div className="flex flex-col items-center text-center space-y-3 flex-1 min-w-[150px]">
        <p className="font-mono text-5xl font-bold text-zinc-900">10+</p>
        <p className="font-mono text-sm text-zinc-500">
          DEVELOPERS
          <br />
          MENTORED
        </p>
      </div>
    </div>
  );
};

export default ExperienceStats;
