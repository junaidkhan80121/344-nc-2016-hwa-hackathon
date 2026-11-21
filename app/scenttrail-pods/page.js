import Link from "next/link";

const FULL_TEXT =
  "ScentTrail Pods: All-Day Nosework, Built for How Dogs Think\nThe Problem With Everyday Dog Toys\nMost enrichment toys are emptied in 10 to 15 minutes. After that, your dog is left with 6 to 8 quiet hours of boredom, pacing, barking at windows, or chewing furniture.\n\nScentTrail Pods solves this by turning a single morning setup into a multi-room scent hunt that unfolds naturally across your entire workday — with no apps, no Wi-Fi, no cameras, and no charging cables.\n\nWhy Sniffing Works Better Than Running\nA dog's brain is wired for scent. Just 15 to 20 minutes of active sniffing burns as much mental energy as an hour-long walk, while naturally lowering stress and heart rate. Instead of overstimulating your dog with loud, erratic robotic toys, ScentTrail Pods taps into their calmest, most rewarding natural instinct: foraging.\n\nHow It Works for Your Dog (Step by Step)\n1. Set It & Forget It (30 Seconds in the Morning)\nBefore you leave, drop 2 to 3 of your dog's favorite treats into each pod, twist the simple mechanical timer dial (for example: 11:00 AM, 1:00 PM, and 3:00 PM), and place the three pods in different rooms — like the living room, hallway, and bedroom. While the timer counts down, each pod stays tightly sealed and completely silent.\n\n2. The Scent Trail Wakes Up\nAt 11:00 AM, Pod #1 quietly opens its top scent vent, releasing a gentle, dog-safe aroma (like Wild Forest & Grass, Roasted Peanut, Savory Broth, or Calm Chamomile). Your dog catches the scent from across the room and shifts immediately out of boredom and into focused search mode.\n\n3. Track, Nudge & Win\nFollowing their nose to the active pod, your dog nudges the soft, wide silicone nose pad on the front. The mechanical latch releases 2 to 3 treats into the wide, easy-to-reach catch opening — giving your dog the real satisfaction of a successful hunt.\n\n4. Quiet Lock & Satisfied Nap\nOnce the treats drop, the pod seals shut and goes quiet. With their foraging instinct satisfied, your dog naturally settles down for a calm, deep nap — until Pod #2 wakes up in another room two hours later.\n\nHow Fast Do Dogs Learn It?\nMost dogs pick it up in under 5 minutes on Day 1:\n\nPlace one pod on the floor with the scent vent open and a treat inside.\n\nTap the silicone nose pad once so your dog sees the treat drop.\n\nLet them nudge it once or twice while you are home. After that, their nose handles the rest.\n\nBuilt Safe for Unsupervised Solo Play\nChew-Proof & Tip-Proof: Heavy, weighted base with a smooth, rounded shell made from food-grade silicone and BPA-free plastic — no sharp corners, loose batteries, or small parts to chew off.\n\nZero Scary Noises: No loud motors, spinning wheels, or startling electronic chimes — ideal even for shy or sound-sensitive dogs.\n\nDog-Safe Natural Scents: Replaceable cartridges use gentle, pet-safe botanical and food-inspired aromas designed to intrigue dogs without overpowering your home.\n\nSized for Every Breed: Available in Small (S) for toy and small breeds, Medium (M) for everyday universal use, and Large (L) with an extra-heavy base for big dogs and enthusiastic noshers.\n\nWho It's Made For\nHome-Alone Dogs: Breaks up long 8-hour workdays into calm, predictable bursts of activity.\n\nSmart & High-Energy Breeds: Challenges dogs that solve standard puzzle boards in two minutes flat.\n\nAnxious or Restless Pups: Redirects nervous energy into soothing, stress-lowering sniffing (especially paired with Calm Chamomile).\n\nSenior Dogs & Puppies: Provides enriching, low-impact brain exercise that's gentle on joints.\n\nWhat's in the Box (Starter Set)\n3 A- ScentTrail Pods (weighted, tip-proof shells with mechanical timer dials, scent vents, nose pads, and wide treat compartments)\n\n3 A- Starter Scent Cartridges\n\n1 A- Resealable Treat Pouch";

export default function ScenttrailPodsPage() {
  return (
    <section className="section container">
      <div className="section-head">
        <div>
          <span className="eyebrow">The product</span>
          <h2>ScentTrail Pods: All-Day Nosework, Built for How Dogs Think</h2>
        </div>
      </div>
      <div className="bento">
        <div className="bento-card hero-main reveal">
          <div>
            <div style={{ whiteSpace: "pre-wrap", fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
              {FULL_TEXT}
            </div>
          </div>
        </div>
      </div>
      <Link href="/" className="text-link">
        ← Back to home
      </Link>
    </section>
  );
}
