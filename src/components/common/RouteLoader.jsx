const RouteLoader = () => (
    <div className="flex min-h-screen flex-col items-center justify-center text-slate-700">
        <div className="relative mb-5 h-24 w-24">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-teal-600 border-r-amber-500" />
            <div className="absolute inset-[18px] animate-pulse rounded-full bg-teal-600/15" />
        </div>
        <p className="text-base font-semibold tracking-wide text-teal-700">Loading page...</p>
    </div>
);

export default RouteLoader;
