export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-400">How It Works</h1>
        <p className="text-zinc-400 text-lg">
          Everything you need to know about the Gielinor Scavenger League.
        </p>
      </section>

      {/* What is GSL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100">What is GSL?</h2>
        <p className="text-zinc-300 leading-relaxed">
          The Gielinor Scavenger League (GSL) is a fully automated, weekly scavenger
          hunt competition for Old School RuneScape. Each week, a new 5x5 bingo board
          is generated with 25 item drops to collect. Kill monsters, get the drops,
          and climb the leaderboard &mdash; all tracked automatically through RuneLite.
        </p>
      </section>

      {/* How to Play */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100">How to Play</h2>
        <ol className="space-y-4 text-zinc-300">
          <li className="flex gap-4">
            <span className="text-amber-400 font-bold text-lg shrink-0">1.</span>
            <div>
              <strong className="text-zinc-100">Install the RuneLite Plugin</strong>
              <p className="text-zinc-400 mt-1">
                Search for &quot;Gielinor Scavenger League&quot; in the RuneLite Plugin Hub
                and install it. That&apos;s it &mdash; no account creation needed.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-amber-400 font-bold text-lg shrink-0">2.</span>
            <div>
              <strong className="text-zinc-100">Play the Game</strong>
              <p className="text-zinc-400 mt-1">
                Just play OSRS normally! When you receive a drop that matches an item
                on the weekly board, the plugin automatically detects and submits it.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-amber-400 font-bold text-lg shrink-0">3.</span>
            <div>
              <strong className="text-zinc-100">Check the Leaderboard</strong>
              <p className="text-zinc-400 mt-1">
                Visit this website to see the live leaderboard, your progress on the
                board, and the real-time drop feed.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* Game Modes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100">Game Modes</h2>
        <p className="text-zinc-400 mb-4">
          Each season runs all three modes simultaneously. Compete in one or all!
        </p>
        <div className="grid gap-4">
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Points Mode</h3>
            <p className="text-zinc-300">
              Each tile has a point value based on rarity: Common (5), Uncommon (15),
              Rare (50). The player with the most points at the end of the week wins.
              Tiebreaker goes to whoever got their last tile first.
            </p>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Bingo Mode</h3>
            <p className="text-zinc-300">
              First player to complete a full row, column, or diagonal on the 5x5
              board wins Bingo Mode. Strategy matters &mdash; pick your line and hunt!
            </p>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Race Mode</h3>
            <p className="text-zinc-300">
              First player to complete the entire 25-tile board wins Race Mode.
              This is the ultimate test of efficiency and dedication.
            </p>
          </div>
        </div>
      </section>

      {/* Board Tiers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100">Drop Tiers</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-400">
                <th className="py-3 px-4 text-left">Tier</th>
                <th className="py-3 px-4 text-left">Points</th>
                <th className="py-3 px-4 text-left">Board Slots</th>
                <th className="py-3 px-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-zinc-700/50">
                <td className="py-3 px-4">
                  <span className="text-green-400">Free</span>
                </td>
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4 text-zinc-400">
                  Nearly guaranteed drops (Bones, Ashes, etc.)
                </td>
              </tr>
              <tr className="border-b border-zinc-700/50">
                <td className="py-3 px-4">
                  <span className="text-zinc-300">Common</span>
                </td>
                <td className="py-3 px-4">5</td>
                <td className="py-3 px-4">10</td>
                <td className="py-3 px-4 text-zinc-400">
                  Frequently found on monster drop tables (~1/1 to 1/25)
                </td>
              </tr>
              <tr className="border-b border-zinc-700/50">
                <td className="py-3 px-4">
                  <span className="text-blue-400">Uncommon</span>
                </td>
                <td className="py-3 px-4">15</td>
                <td className="py-3 px-4">10</td>
                <td className="py-3 px-4 text-zinc-400">
                  Slayer and mid-tier boss drops (~1/25 to 1/128)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">
                  <span className="text-purple-400">Rare</span>
                </td>
                <td className="py-3 px-4">50</td>
                <td className="py-3 px-4">4</td>
                <td className="py-3 px-4 text-zinc-400">
                  Boss drops and high-tier items (~1/128 to 1/1000)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Seasons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100">Season Schedule</h2>
        <p className="text-zinc-300 leading-relaxed">
          Seasons run exactly 7 days, from Sunday 00:00 UTC to Sunday 00:00 UTC.
          When a season ends, it&apos;s permanently archived with its leaderboard, winners,
          and full drop history. A new season with a fresh board starts immediately.
        </p>
      </section>

      {/* Rules */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100">Rules</h2>
        <ul className="space-y-2 text-zinc-300">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">-</span>
            Drops must be received while the GSL plugin is active in RuneLite
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">-</span>
            Only NPC loot drops count (no trading, no buying from GE)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">-</span>
            Each tile can only be completed once per player per season
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">-</span>
            Players are identified by their RuneScape display name (RSN)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">-</span>
            Rate limit: 20 drop submissions per minute
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-zinc-100 font-medium">Do I need to create an account?</h3>
            <p className="text-zinc-400 mt-1">
              No. Your RuneScape display name is your identity. Just install the plugin and play.
            </p>
          </div>
          <div>
            <h3 className="text-zinc-100 font-medium">What if I change my RSN mid-season?</h3>
            <p className="text-zinc-400 mt-1">
              Currently, a name change will be treated as a new player. Your progress from
              the old name will remain under that name.
            </p>
          </div>
          <div>
            <h3 className="text-zinc-100 font-medium">Can I play on multiple accounts?</h3>
            <p className="text-zinc-400 mt-1">
              Each RSN is tracked separately. Progress on one account doesn&apos;t transfer to another.
            </p>
          </div>
          <div>
            <h3 className="text-zinc-100 font-medium">How is the board generated?</h3>
            <p className="text-zinc-400 mt-1">
              Each season uses a random seed to deterministically select 25 items from a
              curated pool. The board is locked for the entire week and cannot be changed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
