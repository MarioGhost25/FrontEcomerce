const RouteLoader = () => (
    <div className="flex min-h-screen flex-col items-center justify-center text-slate-700">
        <div className="relative mb-5 h-24 w-24">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-amber-800 border-r-amber-500" />
            <div className="absolute inset-[18px] animate-pulse rounded-full bg-amber-800/15" />
        </div>
        <p className="text-base font-semibold tracking-wide text-amber-800">Loading page...</p>
    </div>
);

export default RouteLoader;
