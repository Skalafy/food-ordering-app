# Pizza Ordering App

Welcome to the Pizza Ordering App, built with React Native, Supabase, and Expo. This application allows users to order pizza seamlessly with a rich set of features and an easy-to-use interface. Below you'll find details about the features, setup, and usage of the app.

## Features

- **Shopping Cart**: Users can add products to a shopping cart and manage their order before checkout.
- **Type-Safe Components**: Utilizes TypeScript for type safety across all components, improving reliability and maintainability.
- **Expo Router**: Efficient routing and navigation within the app using Expo Router.
- **Product Detail Screens**: Detailed screens showcasing individual products with relevant information.
- **Admin Side**:
  - **Create Product**: Admins can add new products to the inventory.
  - **Update Product**: Admins can update existing product details.
  - **Delete Product**: Admins can remove products from the inventory.
- **Authentication**: Secure user authentication with Supabase.
- **Product CRUD**: Full Create, Read, Update, and Delete (CRUD) functionality for products.
- **Orders CRUD**: Manage orders with Create, Read, Update, and Delete functionalities.
- **Real-Time Data**: Real-time data updates using subscriptions with Supabase.
- **Storage**: Handling of media and other assets through Supabase Storage.
- **EAS Configuration**: Configured with Expo Application Services (EAS) for build and deployment management.
- **Push Notifications**: Integrated push notifications to alert users about updates and promotions.
- **Remote Push Notifications**: Supports sending remote push notifications for real-time updates.

## Getting Started

To get started with the Pizza Ordering App, follow the steps below:

### Prerequisites

- Node.js (>= 14.x)
- Expo CLI
- Yarn or npm
- Supabase Account
- TypeScript

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/pizza-ordering-app.git
   cd pizza-ordering-app

2. **Install Dependencies**
    ```bash
   yarn install 
   or
   npm install

3. **Set Up Supabase**

 -Create a new project in Supabase.
 -Copy the supabaseUrl and -supabaseKey from your Supabase  project settings.
 -Create a .env file in the root of your project and add the following

    ```bash
  SUPABASE_URL=your_supabase_url
  SUPABASE_KEY=your_supabase_key 

3. **Run the App**


    ```bash
  npx expo start -c
