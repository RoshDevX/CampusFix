function About() {
  const aboutcard = [
    {
      id: 1,
      title: "Easy Reporting",
      description:
        "Submit a complaint through a quick 60-second wizard. No cumbersome administrative paperwork, no bureaucratic friction—just fast reporting.",
      icon: "fa-file-pen",
    },
    {
      id: 2,
      title: "Transparent Tracking",
      description:
        "Follow complaint progress with live visual milestones and precise timestamps. Know exactly which department and staff member is on the job.",
      icon: "fa-eye",
    },
    {
      id: 3,
      title: "Faster Communication",
      description:
        "Eliminate communication black holes. Automated status updates keep students, wardens, and repair technicians on the exact same page.",
      icon: "fa-comments",
    },
    {
      id: 4,
      title: "Better Campus Life",
      description:
        "Collaborate to upgrade everyday learning spaces, keep laboratories fully operational, and cultivate shared pride in campus facilities.",
      icon: "fa-face-smile",
    },
  ];
  return (
    <>
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-6">
        {aboutcard.map((card) => {
          return (
            <div
              className="group bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm
  transition-all duration-300 ease-in-out
  hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
              key={card.id}
            >
              <div className="mb-5">
                <span className="w-12 h-12 inline-flex items-center justify-center bg-teal-50 text-teal-600 text-xl rounded-xl transition-colors duration-300 group-hover:bg-teal-600 group-hover:text-white">
                  <i className={`fa-solid ${card.icon}`}></i>
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-2">{card.title}</h3>
              <p className="text-sm text-slate-500 leading-7">{card.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default About;
