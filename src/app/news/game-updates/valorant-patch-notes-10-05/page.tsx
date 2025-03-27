import Link from "next/link";
import Image from "next/image";

export default function PatchNotesPage() {
  return (
    <div className="min-h-screen bg-valorant-light">
      {/* Hero Section */}
      <section className="bg-valorant-dark py-12 md:py-20 relative overflow-hidden">
        <div className="valorant-container relative z-10">
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-2/5 mb-8 md:mb-0">
              <div className="text-valorant-red font-din uppercase text-sm mb-2">GAME UPDATES</div>
              <h1 className="font-tungsten text-white text-6xl md:text-8xl uppercase tracking-wide mb-2">
                VALORANT PATCH NOTES 10.05
              </h1>
              <div className="text-white/70 text-sm font-din">03/18/2025</div>
              <div className="mt-6 text-white/90 space-y-4">
                <p className="font-din text-lg">
                  Ranked Rollbacks are now live along with some minor bug fixes.
                </p>
              </div>
            </div>
            <div className="md:w-3/5 relative h-full min-h-[240px] md:min-h-[320px]">
              <Image
                src="/images/news/patch-10-05.jpg"
                alt="VALORANT Patch Notes 10.05"
                fill
                className="object-cover object-center rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-valorant-light">
        <div className="valorant-container">
          <div className="max-w-4xl mx-auto">
            {/* Ranked Rollbacks */}
            <div className="mb-12">
              <h2 className="font-tungsten text-4xl uppercase mb-4">COMPETITIVE UPDATES</h2>
              <div className="bg-white p-6 rounded-md shadow-sm">
                <h3 className="font-din uppercase text-xl font-bold text-valorant-red mb-4">RANKED ROLLBACKS ARE LIVE!</h3>
                <div className="space-y-4 font-din text-gray-700">
                  <p>
                    If you lost RR due to a match against a confirmed cheater in the last week, you will be eligible for an RR refund!
                  </p>
                  <p className="font-bold">Here's how it works:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>You will get a pop-up notification showing the exact amount of RR being refunded.</li>
                    <li>To apply the refunded RR, you must complete <span className="font-bold">one</span> Competitive match.</li>
                    <li>Once you finish that match, the refunded RR will be reflected in your End of Game summary screen—win or lose, the refund still gets added to your total RR for that game.</li>
                  </ul>
                  <p className="font-bold">Important:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Ranked Rollbacks are only valid within the current Act and there is a cap per Act.</li>
                    <li>If you qualify for a refund, be sure to play a game before the Act ends to claim it!</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bug Fixes */}
            <div className="mb-12">
              <h2 className="font-tungsten text-4xl uppercase mb-4">BUG FIXES</h2>
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="space-y-4 font-din text-gray-700">
                  <ul className="list-disc pl-5 space-y-3">
                    <li>Fixed a bug where the crosshair preview was not displaying correctly in the Crosshair settings menu.</li>
                    <li>Fixed a bug that caused incorrect Agent portraits to display in the Agent select screen for some players.</li>
                    <li>Fixed a bug that caused inconsistent audio cues for Spike defusing.</li>
                    <li>Fixed a rare crash that could occur when rapidly switching between Agents in the Collection tab.</li>
                    <li>Fixed a visual issue with Waylay's Prism ability when used near certain wall textures on Bind.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Known Issues */}
            <div className="mb-12">
              <h2 className="font-tungsten text-4xl uppercase mb-4">KNOWN ISSUES</h2>
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="space-y-4 font-din text-gray-700">
                  <ul className="list-disc pl-5 space-y-3">
                    <li>We're aware of an issue where Premier matches occasionally don't reward the correct amount of Tournament Points. We're monitoring this and working on a fix.</li>
                    <li>Some users may experience longer than usual queue times during off-peak hours. We're investigating optimizations to our matchmaking system.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Back to News */}
            <div className="mt-12">
              <Link
                href="/news"
                className="flex items-center text-valorant-red hover:underline font-din uppercase font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to News
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
