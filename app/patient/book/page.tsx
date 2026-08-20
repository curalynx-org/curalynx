import { Search, MapPin, Star, Calendar as CalendarIcon, ChevronRight } from "lucide-react";

export default function BookAppointmentPage() {
  return (
    <div className="px-6 py-8 sm:px-8 lg:px-10 max-w-6xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-bold tracking-tight text-[#18181A] mb-4">
          Book an Appointment
        </h1>
        <p className="text-base text-[#18181A]/60 font-medium">
          Find the right specialist, choose a convenient time, and get the care you need.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#18181A]/40" />
          <input 
            type="text" 
            placeholder="Search doctors, specialties, conditions..." 
            className="w-full h-14 rounded-2xl border border-[#18181A]/10 bg-white pl-12 pr-4 text-base font-medium focus:border-[#0B392A] focus:outline-none focus:ring-1 focus:ring-[#0B392A] transition-all shadow-sm"
          />
        </div>
        <select className="h-14 rounded-2xl border border-[#18181A]/10 bg-white px-4 text-sm font-bold text-[#18181A] focus:outline-none cursor-pointer shadow-sm md:w-48">
          <option>All Locations</option>
          <option>Oakland Clinic</option>
          <option>San Francisco HQ</option>
          <option>Telehealth</option>
        </select>
        <button className="h-14 px-8 bg-[#0B392A] text-white rounded-2xl font-bold shadow-sm hover:bg-[#0B392A]/90 transition-colors">
          Search
        </button>
      </div>

      {/* Specialties */}
      <div>
        <h2 className="text-lg font-bold text-[#18181A] mb-4">Browse by Specialty</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {["Primary Care", "Cardiology", "Dermatology", "Pediatrics", "Orthopedics", "Neurology"].map((spec) => (
            <button key={spec} className="flex-shrink-0 px-6 py-3 rounded-full border border-[#18181A]/10 bg-white text-sm font-bold text-[#18181A] hover:border-[#0B392A] hover:text-[#0B392A] transition-colors shadow-sm">
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Results */}
      <div>
        <h2 className="text-lg font-bold text-[#18181A] mb-6 border-b border-[#18181A]/10 pb-2">Available Providers</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          
          {[
            { name: "Dr. Sarah Chen", spec: "Primary Care", rating: "4.9", loc: "Oakland Clinic", next: "Tomorrow", img: "https://i.pravatar.cc/150?u=doc1" },
            { name: "Dr. James Wilson", spec: "Dermatology", rating: "4.8", loc: "San Francisco HQ", next: "Oct 28", img: "https://i.pravatar.cc/150?u=doc2" },
            { name: "Dr. Elena Rostova", spec: "Cardiology", rating: "5.0", loc: "Oakland Clinic", next: "Nov 02", img: "https://i.pravatar.cc/150?u=doc3" },
            { name: "Dr. Marcus Johnson", spec: "Primary Care", rating: "4.7", loc: "Telehealth", next: "Today", img: "https://i.pravatar.cc/150?u=doc4" },
          ].map((doc, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border border-[#18181A]/10 bg-white hover:shadow-md transition-shadow group">
              <img src={doc.img} alt={doc.name} className="size-20 rounded-2xl object-cover border border-[#18181A]/5 group-hover:border-[#0B392A]/30 transition-colors" />
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-serif font-bold text-xl text-[#18181A]">{doc.name}</h3>
                  <div className="flex items-center gap-1 bg-[#18181A]/5 px-2 py-0.5 rounded-md">
                    <Star className="size-3 fill-[#0B392A] text-[#0B392A]" />
                    <span className="text-xs font-bold text-[#18181A]">{doc.rating}</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#0B392A] mb-3">{doc.spec}</p>
                
                <div className="flex flex-col gap-1.5 mb-6">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#18181A]/60">
                    <MapPin className="size-3.5" /> {doc.loc}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#18181A]/60">
                    <CalendarIcon className="size-3.5" /> Next available: <span className="font-bold text-[#18181A]">{doc.next}</span>
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                  {/* Mock Time Slots */}
                  {["09:00 AM", "10:30 AM", "02:00 PM"].map((time) => (
                    <button key={time} className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-[#18181A]/10 text-xs font-bold text-[#18181A] hover:bg-[#0B392A] hover:text-white hover:border-[#0B392A] transition-colors">
                      {time}
                    </button>
                  ))}
                  <button className="flex-shrink-0 grid place-items-center px-3 py-1.5 rounded-lg border border-[#18181A]/10 text-[#18181A]/50 hover:bg-[#18181A]/5 transition-colors">
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
