# 🎯 Gielinor Scavenger League (GSL)

**The first fully automated, drop-verified competition platform for Old School RuneScape.**

> No accounts. No screenshots. No manual submissions. Just play.

---

## 🎮 What is GSL?

GSL is a **weekly scavenger hunt competition** for OSRS players. Install the RuneLite plugin, and your item drops are automatically tracked and submitted to a live leaderboard. Compete against other players in three simultaneous game modes every week.

### Quick Overview

- 📅 **Weekly Seasons**: New competition starts every Sunday at 00:00 UTC
- 🎲 **Random Boards**: Each season features 25 unique items on a 5×5 grid
- 🔄 **Automatic Tracking**: RuneLite plugin captures drops in real-time
- 🏆 **Three Ways to Win**: Bingo, Race, or Points mode
- 📊 **Live Leaderboard**: Watch your rank change as you compete
- 👥 **Zero Friction**: No accounts, no logins—just your RSN

---

## 🏆 Game Modes

Every season runs **three competitions simultaneously** with the same 25-item board:

### 🎯 Bingo Mode

**Goal**: First player to complete any row, column, or diagonal  
**Winner**: Earliest completion timestamp

### 🏃 Race Mode

**Goal**: First player to collect all 25 items on the board  
**Winner**: Speed runner who completes the full board first

### 💯 Points Mode

**Goal**: Collect the highest point total from board items  
**Winner**: Player with most points when season ends  
**Scoring**: Rare items = more points

---

## 🚀 How to Play

### Step 1: Install the Plugin

1. Download the **GSL RuneLite Plugin** (see Releases)
2. Place the `.jar` file in your RuneLite plugins folder:
   - **Windows**: `%USERPROFILE%\.runelite\plugins\`
   - **macOS/Linux**: `~/.runelite/plugins/`
3. Restart RuneLite
4. Enable "Gielinor Scavenger League" in your plugin list

### Step 2: Start Playing

1. Log into OSRS with RuneLite
2. Check the live board to see which 25 items are active this season
3. Kill NPCs, complete activities, and collect board items
4. Your drops are **automatically submitted** when you receive them
5. Watch the leaderboard to track your progress

**That's it!** No account creation, no manual screenshots, no forms to fill out.

---

## 📊 Features

### For Players

- **Drop Verification**: Plugin-verified drops eliminate cheating
- **Live Feed**: Watch drops happen in real-time across all players
- **Historical Seasons**: View past competitions and winners
- **No Commitment**: Play as much or as little as you want
- **Fair Competition**: Everyone gets the same board and time window

### Technical Highlights

- **Fully Automated Seasons**: New competitions start automatically every Sunday
- **Immutable History**: All drops and completions are permanently recorded
- **Rate-Limited API**: Prevents spam and abuse
- **Open Architecture**: Web app + plugin design for transparency

---

## 🛡️ Trust & Verification

### How Drop Verification Works

1. **Plugin-Only Submissions**: Drops can only be submitted via the RuneLite plugin (not by web forms or API calls)
2. **Server-Side Validation**: API checks that item is on the current season's board
3. **Timestamp Verification**: Drops must occur within the active season window
4. **NPC Tracking**: Plugin captures which NPC dropped the item
5. **Immutable Logs**: Every drop is permanently recorded with full metadata

### Anti-Cheat Measures

- Rate limiting (max 20 drops per minute per player)
- Duplicate detection (can't submit the same tile twice)
- Season boundary enforcement (drops outside season window are rejected)
- Public audit trail (all drops visible in live feed)

---

## 📅 Season Schedule

| Attribute            | Value                      |
| -------------------- | -------------------------- |
| **Duration**         | 7 days (Sunday to Sunday)  |
| **Start Time**       | Sunday 00:00 UTC           |
| **End Time**         | Following Sunday 00:00 UTC |
| **Board Generation** | Random seed per season     |
| **Item Count**       | 25 items per board         |

Seasons run **continuously** with no breaks. When one season ends, the next begins immediately.

---

## 🎲 Item Rarity Tiers

Board items are categorized by difficulty, with rarer items worth more points:

| Tier           | Point Value | Examples                 |
| -------------- | ----------- | ------------------------ |
| **Common**     | 10 pts      | Bones, Basic herbs       |
| **Uncommon**   | 25 pts      | Herbs, Seeds             |
| **Rare**       | 50 pts      | Rare seeds, Gems         |
| **Ultra Rare** | 100 pts     | Unique drops, Boss items |

---

## 🌐 Live Platform

Visit the GSL web platform to:

- 📋 View the current season's board
- 🏆 Check live leaderboards (all three modes)
- 📡 Watch the live drop feed
- 📜 Browse historical seasons and past winners
- ⏱️ See the countdown to next season

---

## 🔒 Privacy & Data

### What We Collect

- Your **RuneScape display name (RSN)** only
- Item drops (item ID, NPC ID, timestamp, world)
- Completion status for board tiles

### What We DON'T Collect

- No passwords
- No email addresses
- No account information
- No personal data
- No IP addresses (stored)

**Your RSN is your only identifier.** If you change your RSN in-game, you'll appear as a new player in GSL.

---

## ❓ FAQ

**Q: Is this approved by Jagex?**  
A: GSL is a third-party tool. Use at your own discretion per Jagex's third-party client guidelines.

**Q: Does this work on any world?**  
A: Yes! F2P and P2P worlds are both supported.

**Q: What if I get the same item multiple times?**  
A: Only the first drop counts for Bingo/Race. Additional drops still add to your Points total.

**Q: Can I compete in multiple game modes?**  
A: Yes! Every drop you submit counts toward all three modes simultaneously.

**Q: What happens when a season ends?**  
A: The season is archived, winners are locked in, and a new season with a fresh board starts immediately.

**Q: Can I see my drop history?**  
A: Not yet, but this feature is planned for future updates.

---

## 🏗️ Technical Stack

This project is built with:

- **RuneLite Plugin**: Java (Gradle)
- **Web Platform**: Next.js 16 (React 19, TypeScript)
- **Database**: PostgreSQL (via Neon)
- **ORM**: Prisma
- **Hosting**: Vercel
- **Drop Verification**: RuneLite EventBus system

---

## 📜 License

Copyright © 2026 GSL Team. All Rights Reserved.

This project is proprietary and source-available for transparency purposes only. See [LICENSE](LICENSE) for details.

**You may NOT:**

- Use this code for commercial purposes
- Fork or redistribute this code
- Create derivative works
- Run your own instance of this platform

**You may:**

- View the source code for educational purposes
- Submit bug reports or suggestions (via Issues)
- Use the public GSL platform and plugin as a player

---

## 📞 Contact & Support

- **Issues**: Please use GitHub Issues for bug reports
- **Suggestions**: Open a GitHub Discussion for feature ideas
- **General**: Check the live platform for announcements

---

## 🙏 Credits

Built with passion for the OSRS community.

Special thanks to:

- The **RuneLite** team for providing the plugin framework
- **Jagex** for creating Old School RuneScape
- All GSL players for participating and providing feedback

---

**Ready to compete? Download the plugin and join the current season!** 🏆
