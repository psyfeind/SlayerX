'use client';

export default function SchedulePage() {
  const schedule = [
    { day: 'Monday', title: 'Chainsaw Man S2', time: '21:00' },
    { day: 'Tuesday', title: 'Jujutsu Kaisen', time: '20:30' },
    { day: 'Wednesday', title: 'Solo Leveling', time: '22:00' },
    { day: 'Thursday', title: 'Attack on Titan', time: '19:45' },
    { day: 'Friday', title: 'My Hero Academia', time: '21:15' },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Schedule</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Weekly premiere lineup.</h1>
        <p className="max-w-2xl text-gray-400 mt-3">Plan your anime nights with the latest airing schedule and exclusive drop alerts.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {schedule.map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-black/50 p-8 shadow-xl shadow-purple-900/5 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-300">{item.day}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-gray-400">Premieres at {item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
