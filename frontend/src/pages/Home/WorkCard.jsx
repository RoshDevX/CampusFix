function WorkCard() {
  const workcard = [
    {
      id: 1,
      title: "Report an Issue",
      description:
        "Describe the problem, select a category, and tag the exact campus building and room. Attach photos right from your phone or laptop.",
      step: "01",
      icon: "fa-stopwatch",
      tag: "Takes under 60 seconds",
    },
    {
      id: 2,
      title: "Track Progress",
      description:
        "Watch your ticket move in real time. Know immediately when maintenance reviews the issue, assigns a technician, and begins onsite repairs.",
      step: "02",
      icon: "fa-bell",
      tag: "Live status notifications",
    },
    {
      id: 3,
      title: "Get It Resolved",
      description:
        "Inspect the completed maintenance, review before-and-after proof photos, and submit verification to confirm your issue is properly fixed.",
      step: "03",
      icon: "fa-circle-check",
      tag: "Student-approved sign off",
    },
  ];
  return (
    <>
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workcard.map((card) => {
          return (
            <div
              className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm
  transition-all duration-300 ease-in-out
  hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
              key={card.id}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-bold text-teal-600 tracking-tight">
                  {card.step}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-slate-500 leading-7">
                {card.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="bg-teal-50 inline-block text-xs text-teal-700 font-bold px-2 py-2 rounded-full ">
                  <i className={`fa-solid ${card.icon}`}></i> {card.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WorkCard;
