import Navbar from "../../components/Navbar";
import AuthCard from "./AuthCard";

function AuthPage() {
  const loginCard = [
    {
      id: 1,
      title: "Library Wi-Fi 5G",
      description: "North Wing · Zone A",
      bgColor: "bg-green-100",
      textColor: "text-green-900",
      icon: "fa-wifi",
      iconColor: "text-teal-600",
      tag: "RESOLVED",
    },
    {
      id: 2,
      title: "Room 304 Ceiling Fan",
      description: "Engineering Block B · 3rd Floor",
      bgColor: "bg-blue-100",
      textColor: "text-blue-900",
      icon: "fa-fan",
      iconColor: "text-orange-400",
      tag: "IN PROGRESS",
    },
    {
      id: 3,
      title: "Science Block Pipeline Leak",
      description: "Chemistry Lab Annex",
      bgColor: "bg-purple-100",
      textColor: "text-purple-900",
      icon: "fa-house-fire",
      iconColor: "text-red-400",
      tag: "#TICK-1042",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="pt-14">
        <div className="relative overflow-hidden bg-slate-50 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-4 sm:px-6 lg:px-12 xl:px-20 py-10 sm:py-14">
          <div className="w-full lg:w-1/2 max-w-2xl min-w-0 space-y-5">
            <p className="bg-teal-50 inline-block text-xs text-teal-700 font-bold tracking-wider px-4 py-2 rounded-full">
              <i className="fa-solid fa-calendar-check mr-2"></i> Collegiate
              Facilities Network
            </p>
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-slate-900">
              Welcome to Campus<span className="text-teal-700">Fix!</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-8 max-w-xl">
              Your campus, your voice. Report campus issues, track complaint
              updates, and help create a cleaner, safer, and better campus for
              everyone. Together, we can make a difference.
            </p>

            <div className="hidden lg:flex flex-wrap items-center gap-2 mt-4">
              <span className="bg-teal-50 inline-flex items-center gap-2 text-xs text-teal-700 font-semibold px-3 py-2 rounded-full">
                <i className="fa-solid fa-location-dot"></i> Location-based
                (Classrooms, Labs, Hostels)
              </span>
              <span className="bg-teal-50 inline-flex items-center gap-2 text-xs text-teal-700 font-semibold px-3 py-2 rounded-full">
                <i className="fa-solid fa-bell"></i> Live resolution tracking
              </span>
            </div>

            <div className="hidden lg:flex bg-teal-50/70 border border-teal-100 w-full p-4 flex-col gap-3 rounded-2xl">
              {loginCard.map((card) => {
                return (
                  <div
                    className="flex items-center p-3 sm:p-4 gap-3 bg-white border border-slate-100 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    key={card.id}
                  >
                    <div className={`${card.iconColor} text-xl shrink-0`}>
                      <i className={`fa-solid ${card.icon}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{card.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {card.description}
                      </p>
                    </div>
                    <span
                      className={`${card.bgColor} ${card.textColor} text-[10px] font-bold px-2 py-1 rounded-full shrink-0 whitespace-nowrap`}
                    >
                      {card.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-1/2 min-w-0 flex justify-center">
            <AuthCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
