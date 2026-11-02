import { siteConfig } from "@/lib/config";

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-cream text-center text-[0.7rem] md:text-xs tracking-label py-2 px-4">
      {siteConfig.announcementBar}
    </div>
  );
}
