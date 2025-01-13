
# [Booking App](https://booking-room-app.netlify.app/)

## Description

This is a **Booking App** built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Appwrite**. The application allows users to book meeting or conference rooms for team meetings. It provides functionality for managing rooms, viewing booking details, and user authentication.

## Features

- **Home Page**: Displays the main landing page.
- **Login and Register Pages**: Allow users to log in or register to access the booking system.
- **Sign Out**: Logs out the user and redirects them to the login page.
- **All Rooms List Page**: Displays a list of available rooms for booking.
- **Add Room Page**: Allows admins to add new rooms to the system.
- **Booking List Page**: Displays a list of all bookings made by the user.
- **My Rooms Page**: Displays the rooms managed by the user.
- **View Room Details**: View detailed information about a specific room.
- **View Booking Details**: View detailed information about a specific booking.
- **Page Not Found**: Handles 404 errors when a user navigates to an unknown page.
- **No Data Found**: Displays a message when no data is available.
- **Loading Page**: Displays a loading screen while the data is being fetched.

## Tech Stack

- **Next.js**: A React framework for building server-rendered applications.
- **TypeScript**: Adds static typing to JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs.
- **Appwrite**: A backend-as-a-service platform for managing user authentication and data storage.
- **Luxon**: A date-time library for handling time zones and formatting.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vishu-agarwal/booking-app.git
   cd booking-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up **Appwrite**:

   - Create an **Appwrite** project and get the necessary API keys.
   - Set up your Appwrite client in the project, including configuring authentication and database collections.

4. Set up environment variables:

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```bash
   NEXT_PUBLIC_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=<your-appwrite-project-id>
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=<your-appwrite-database-id>
   NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=<your-user-collection-id>
   NEXT_PUBLIC_APPWRITE_ROOM_COLLECTION_ID=<your-room-collection-id>
   NEXT_PUBLIC_APPWRITE_BOOKING_COLLECTION_ID=<your-booking-collection-id>
   ```

## Scripts

- **dev**: Starts the development server with turbopack:

  ```bash
  npm run dev
  ```

- **build**: Builds the application for production:

  ```bash
  npm run build
  ```

- **start**: Starts the production server:

  ```bash
  npm run start
  ```

- **lint**: Lints the project:

  ```bash
  npm run lint
  ```

## File Structure

- **/pages**: Contains all the page components for routing.
  - `/login`, `/register`, `/home`, `/rooms`, `/bookings`, `/bookings/[id]`, `/my-rooms`, `/rooms/add`, `/rooms/[id]`, etc.
- **/components**: Contains reusable components for the app.
  - Subcomponents for rooms, bookings, forms, and UI elements.
- **/utils**: Contains helper functions and utility files like `helper.ts` and `types.ts`.
- **/context**: Contains the `AuthContext` for managing authentication states and user sessions.
- **/actions**: Contains the logic for interacting with Appwrite, including authentication and database operations.
- **/middleware**: Contains the logic for protecting routes based on authentication status.

## Authentication

The application uses **Appwrite** for managing user authentication. The `AuthContext` is used to track whether the user is authenticated or not. Middleware ensures that only authenticated users can access protected routes such as booking and room management pages.

## Middleware

- The **middleware** file is used to handle route protection. It checks whether the user is authenticated and redirects them to the login page if necessary.
- Public routes like `/login`, `/register`, and `/` are accessible without authentication.
- Protected routes like `/bookings`, `/rooms/add`, and `/my-rooms` require the user to be authenticated.

## Components

The app is built using **Server** and **Client** components in Next.js. Some components are shared across multiple pages and are reusable, such as:

- `RoomCard`: Displays a preview of a room.
- `BookingCard`: Displays a preview of a booking.
- `BookingForm`: Fill booking details.
- `Header`: Displays the navigation bar with links to different pages.
- `Footer`: Displays the footer of the app.

## Deployment

1. **Vercel**: The app can be deployed to Vercel by connecting the repository and following the deployment instructions.
2. **Appwrite**: Make sure your Appwrite instance is deployed and accessible from your Vercel app.

## Contributing

Feel free to open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy building your room booking app! 🚀
