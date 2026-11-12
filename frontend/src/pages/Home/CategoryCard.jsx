function CategoryCard() {
  const categories = [
    {
      id: 1,
      title: "Electrical Issues",
      description:
        "Broken fans, flicking tube lights, tripped circuit breakers, and faulty switches in classrooms or hallways.",
      icon: "fa-bolt",
      tags: ["Fans", "Lighting", "Power Sockets"],
    },
    {
      id: 2,
      title: "Classroom Maintenance",
      description:
        "Damaged lecture desks, broken chairs, misaligned projectors, cracked whiteboards, and loose podiums.",
      icon: "fa-door-open",
      tags: ["Furniture", "Podium", "Projectors"],
    },
    {
      id: 3,
      title: "Water Supply",
      description:
        "Leaking taps, broken sanitary pipes, dry drinking fountains, low pressure, and purifier service needs.",
      icon: "fa-droplet",
      tags: ["Drinking Water", "Restrooms", "Pipes"],
    },
    {
      id: 4,
      title: "Internet & Wi-Fi",
      description:
        "Slow network throughput, hostel access point dropouts, DNS hiccups, and captive portal authentication errors.",
      icon: "fa-wifi",
      tags: ["Campus Wi-Fi", "Lab Ethernet", "Portal"],
    },
    {
      id: 5,
      title: "Cleanliness & Hygiene",
      description:
        "Unattended washrooms, overflowing waste bins, cafeteria litter, and common area sanitation requirements.",
      icon: "fa-broom",
      tags: ["Sanitation", "Waste Bins", "Cafeteria"],
    },
    {
      id: 6,
      title: "Other Facilities",
      description:
        "Any other issues impacting student life: dormitory keys, sports turf lighting, path illumination, or campus safety.",
      icon: "fa-circle-question",
      tags: ["Hostel", "Safety", "Sports Turf"],
    },
  ];
  return (
    <>
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          return (
            <div
              className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm
  transition-all duration-300 ease-in-out
  hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
              key={category.id}
            >
              <div className="mb-5">
                <span className="w-12 h-12 inline-flex items-center justify-center bg-teal-50 text-teal-600 text-xl rounded-xl transition-colors duration-300 group-hover:bg-teal-600 group-hover:text-white">
                  <i className={`fa-solid ${category.icon}`}></i>
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-2">
                {category.title}
              </h3>
              <p className="text-sm text-slate-500 leading-7">
                {category.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="bg-teal-50 inline-block text-xs text-teal-700 font-bold px-2 py-2 rounded-full ">
                  {category.tags[0]}
                </span>
                <span className="bg-teal-50 inline-block text-xs text-teal-700 font-bold px-4 py-2 rounded-full ">
                  {category.tags[1]}
                </span>
                <span className="bg-teal-50 inline-block text-xs text-teal-700 font-bold px-4 py-2 rounded-full ">
                  {category.tags[2]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CategoryCard;
