function StatisticsCard({ issues, loading, error }) {
  const totalIssues = issues.length;

  const pendingCount = issues.filter(
    (issue) => issue.status === "Pending",
  ).length;

  const inProgressCount = issues.filter(
    (issue) => issue.status === "In Progress",
  ).length;

  const resolvedCount = issues.filter(
    (issue) => issue.status === "Resolved",
  ).length;

  const statistics = [
    {
      title: "Total Issues",
      count: totalIssues,
      label: "All time",
      icon: "fa-folder-open",
      color: "bg-teal-50 text-teal-600",
      countColor: "text-slate-900",
    },
    {
      title: "Pending",
      count: pendingCount,
      label: "Awaiting Review",
      icon: "fa-clock",
      color: "bg-amber-50 text-amber-600",
      countColor: "text-amber-700",
    },
    {
      title: "In Progress",
      count: inProgressCount,
      label: "Dispatched",
      icon: "fa-rotate",
      color: "bg-blue-50 text-blue-600",
      countColor: "text-blue-700",
    },
    {
      title: "Resolved",
      count: resolvedCount,
      label: "Fixed",
      icon: "fa-circle-check",
      color: "bg-emerald-50 text-emerald-600",
      countColor: "text-emerald-700",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statistics.map((item) => {
        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-600">{item.title}</p>

              <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${item.color}`}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
            </div>

            <div className="mt-3 flex items-end justify-between gap-2">
              <h2 className={`text-3xl font-bold tracking-tight ${item.countColor}`}>
                {loading ? "—" : error ? "!" : item.count}
              </h2>

              <span
                className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${item.color}`}
              >
                {item.label}
              </span>
            </div>
          </div>
        );
      })}
      {error && <p className="col-span-full rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">{error}</p>}
    </section>
  );
}

export default StatisticsCard;
