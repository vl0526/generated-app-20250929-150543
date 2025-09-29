# EdgeScape: The Minimalist 3D City Builder

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/vl0526/generated-app-20250929-150543)

A visually stunning, minimalist 3D city-building game where you create and manage your own metropolis on the edge.

EdgeScape is an immersive, browser-based 3D city-building game designed with a focus on minimalist aesthetics and a relaxing, creative user experience. Players start with an empty grid and can place various types of buildings—residential, commercial, and utility—to grow their city. The game leverages a modern 3D rendering engine to create a beautiful, low-poly world with ambient lighting and smooth camera controls.

## ✨ Key Features

-   **Minimalist 3D Graphics:** Beautiful, low-poly aesthetic for a clean and focused experience.
-   **Interactive City Building:** Place residential, commercial, and utility buildings on a 3D grid.
-   **Intuitive UI:** Unobtrusive, semi-transparent UI panels keep the focus on your creation.
-   **Smooth Camera Controls:** Easily pan, zoom, and rotate to view your city from any angle.
-   **Real-time State Management:** Built with Zustand for efficient, decoupled state management.
-   **Relaxing Gameplay:** A creative sandbox experience with no pressure.

## 🛠️ Technology Stack

-   **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/)
-   **3D Rendering:** [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [@react-three/drei](https://github.com/pmndrs/drei)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
-   **Animation:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/)

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/edgescape.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd edgescape
    ```
3.  Install the dependencies using Bun:
    ```bash
    bun install
    ```

## 💻 Development

To start the local development server, run the following command. This will launch the application, typically on `http://localhost:3000`.

```bash
bun run dev
```

The server supports hot-reloading, so any changes you make to the source code will be reflected in the browser instantly.

## ☁️ Deployment

This project is configured for seamless deployment to Cloudflare's global network.

To deploy the application, simply run the deploy script:

```bash
bun run deploy
```

This command will build the application and deploy it using the Wrangler CLI to your Cloudflare account.

Alternatively, you can deploy directly from your GitHub repository with a single click:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/vl0526/generated-app-20250929-150543)

## 📂 Project Structure

-   `src/`: Contains all the frontend React application code.
    -   `components/`: Reusable UI and game components.
    -   `lib/`: Utilities, constants, and the Zustand store.
    -   `pages/`: Main application pages.
-   `worker/`: Contains the Cloudflare Worker server-side code.
-   `public/`: Static assets that are served directly.