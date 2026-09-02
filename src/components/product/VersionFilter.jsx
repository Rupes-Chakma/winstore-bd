import React from "react";

export default function VersionFilter({ selectedVersion, setSelectedVersion }) {
  const versions = [
    { id: "all", name: "সব ভার্সন" },
    { id: "win11", name: "Windows 11" },
    { id: "win10", name: "Windows 10" },
    { id: "win7", name: "Windows 7" },
    { id: "win-server", name: "Windows Server" },
    { id: "office", name: "MS Office" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 my-8">
      {versions.map((ver) => (
        <button
          key={ver.id}
          onClick={() => setSelectedVersion(ver.id)}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
            selectedVersion === ver.id
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
              : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50"
          }`}
        >
          {ver.name}
        </button>
      ))}
    </div>
  );
}
