# MapMoji Landing Page

A beautiful full-screen Mapbox map with a centered contact form, featuring the Space Mono font from Google Fonts.

## Features

- 🌍 Full-screen Mapbox map with dark theme
- 📝 Centered contact form with glassmorphism design
- 🎨 Space Mono font from Google Fonts
- 📱 Responsive design
- 🎯 Navigation and geolocation controls
- ✨ Smooth animations and hover effects

## Setup

1. **Install Dependencies**

   ```bash
   bun install
   ```

2. **Get Mapbox Access Token**

   - Go to [Mapbox Account](https://account.mapbox.com/access-tokens/)
   - Create a new token or use an existing one
   - Copy the token

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token_here
   ```

4. **Run the Development Server**

   ```bash
   bun dev
   ```

5. **Visit the Page**
   Navigate to `/mapmoji` in your browser

## Components

- **MapMojiLandingPage**: Main component with full-screen map and form
- **Form Fields**: Name, email, and message inputs
- **Map Controls**: Navigation and geolocation controls

## Styling

- Uses Tailwind CSS for styling
- Space Mono font for all text elements
- Glassmorphism effect on the form overlay
- Gradient backgrounds and smooth transitions

## Form Handling

The form currently logs the submitted data to the console. You can extend the `handleSubmit` function to:

- Send data to an API endpoint
- Store in a database
- Send email notifications
- Integrate with a CRM system

## Customization

- **Map Style**: Change `mapStyle` prop to use different Mapbox styles
- **Initial Location**: Modify the `viewState` coordinates
- **Form Fields**: Add or remove form fields as needed
- **Colors**: Update Tailwind classes for different color schemes
