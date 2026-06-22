# Artifact Appendix

Paper title: **Cultivating a Tech-Safety Mindset using Game-Based Learning for Defending against Technology-Facilitated Abuse**

Requested Badge(s):

* [x] **Available**
* [x] **Functional**

## Description

This artifact accompanies the paper *"Cultivating a Tech-Safety Mindset using Game-Based Learning for Defending against Technology-Facilitated Abuse"* by Majed Almansoori et al. (PoPETs 2026).

The artifact consists of the source code and a publicly accessible browser-based deployment of **BeSafe**, the game-based learning intervention evaluated in the paper. BeSafe is grounded in Protection Motivation Theory (PMT) and is designed to cultivate a technology-safety mindset for defending against technology-facilitated abuse (TFA). Through a sequence of interactive scenarios, players encounter realistic digital safety and privacy risks and receive feedback intended to strengthen threat awareness and protective decision-making.

The artifact allows reviewers and researchers to inspect, run, and exercise the game implementation. It includes the frontend source code, backend source code, deployment configuration, and instructions for running the system. A hosted version is also provided for convenient evaluation.

The user-study dataset and statistical analysis materials are not included in this artifact. Therefore, we request the **Available** and **Functional** badges, but not the **Reproduced** badge.

### Artifact Repository

Source code:

https://github.com/majed-almansoori/BeSafe_Game/tree/main/Source%20code

Live deployment:

https://besafegame.vercel.app/

### Security/Privacy Issues and Ethical Concerns

The artifact is a browser-based educational application and presents no known security or privacy risks to the reviewer's system. It does not require installing browser extensions, disabling security mechanisms, or running privileged code.

The game contains scenarios related to technology-facilitated abuse and digital safety. Although the content is non-graphic and educational, some reviewers may find certain scenarios emotionally sensitive. The user study reported in the paper was conducted under an approved IRB protocol. No participant data is included in this artifact.

The hosted deployment asks users to enter a username so the game can track game progress and scores. Reviewers may use a pseudonym or arbitrary test username.

## Environment

### Accessibility

The artifact is publicly accessible at:

https://besafegame.vercel.app/

The source code is publicly available at:

https://github.com/majed-almansoori/BeSafe_Game/tree/main/Source%20code

The artifact can be accessed using a modern desktop or laptop browser, including recent versions of Chrome, Firefox, Safari, and Edge. No account creation or special permissions are required for the hosted version.

A complete playthrough typically takes approximately 20–30 minutes.

### Hardware Dependencies

No special hardware is required. A standard desktop or laptop computer with internet access is sufficient.

### Software Dependencies

For the hosted version, only a modern web browser is required.

For local execution, reviewers need:

* Node.js and npm
* Go
* PostgreSQL-compatible database
* Git

The backend can be connected to a local PostgreSQL instance or to a hosted PostgreSQL provider such as Supabase.

## Installation and Execution

### Option 1: Use the Hosted Deployment

1. Open:

   https://besafegame.vercel.app/

2. Enter a username when prompted.

3. Play through the available game scenarios.

4. Use the in-game navigation controls to move through the chapters.

5. Optional: open the menu to view the leaderboard, badges, and knowledge meter features.

This is the fastest way to exercise the artifact.

### Option 2: Run Locally

Clone the repository:

```bash
git clone https://github.com/majed-almansoori/BeSafe_Game.git
cd BeSafe_Game
```

Install frontend dependencies:

```bash
npm install
```

Run the frontend locally:

```bash
npm run dev
```

By default, the frontend development server runs at:

```text
http://localhost:5173
```

### Backend Setup

The backend is implemented in Go and expects a PostgreSQL database.

Create a `.env` file in the backend directory with the following variables:

```env
DATABASE_HOST=your_database_host
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=your_database_username
DATABASE_PASSWORD=your_database_password
PORT=8080
```

Run the backend:

```bash
cd backend
go mod download
go run main.go
```

The backend creates the required `users` table automatically if it does not already exist.

Confirm the backend is running by opening:

```text
http://localhost:8080/health
```

Expected output:

```text
The game is on
```

### Frontend Backend URL

For local development, the frontend uses:

```text
http://localhost:8080
```

For deployment, update the backend URL in `src/constants.ts` to point to the deployed backend service.

## Exercising the Artifact

Reviewers can exercise the main game functionality as follows:

1. Start the hosted or local version of the game.
2. Enter a username.
3. Select or begin a chapter.
4. Progress through the interactive scenario.
5. Answer quiz prompts.
6. Observe knowledge-meter updates after correct responses.
7. Complete chapters to receive badges.
8. Open the leaderboard to verify score tracking.
9. Continue or restart the game to verify local progress behavior.

The expected behavior is that the game loads in the browser, permits chapter navigation, records progress, awards badges after chapter completion, updates the knowledge score, and displays leaderboard entries.

## Badge Justification

### Available

The artifact is publicly available in a GitHub repository and includes source code relevant to the paper. A hosted deployment is also available for direct access.

### Functional

The artifact includes the key software components needed to run and exercise the BeSafe intervention: frontend, backend, database schema initialization, and deployment configuration. The repository provides instructions for running the frontend and backend and for connecting the backend to a PostgreSQL-compatible database.

## Notes on Reusability

The artifact is intended to support reuse by researchers studying technology-facilitated abuse, usable privacy and security, digital safety education, and game-based learning.

Researchers can use BeSafe as:

* A reference implementation of a PMT-based educational intervention.
* A benchmark intervention for comparative evaluations.
* An example of applying game-based learning to privacy, security, and safety education.
* A starting point for replication or adaptation in other populations, languages, cultural contexts, or threat models.

The educational design and scenario structure described in the paper may also inform future systems aimed at improving user preparedness for online safety and privacy threats. Researchers interested in collaboration or additional information are encouraged to contact the authors.
