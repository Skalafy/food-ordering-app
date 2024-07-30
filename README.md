Pizza Ordering App
Welcome to the Pizza Ordering App, built with React Native, Supabase, and Expo. This application allows users to order pizza seamlessly with a rich set of features and an easy-to-use interface. Below you'll find details about the features, setup, and usage of the app.

Features
Shopping Cart: Users can add products to a shopping cart and manage their order before checkout.
Type-Safe Components: Utilizes TypeScript for type safety across all components, improving reliability and maintainability.
Expo Router: Efficient routing and navigation within the app using Expo Router.
Product Detail Screens: Detailed screens showcasing individual products with relevant information.
Admin Side:
Create Product: Admins can add new products to the inventory.
Update Product: Admins can update existing product details.
Delete Product: Admins can remove products from the inventory.
Authentication: Secure user authentication with Supabase.
Product CRUD: Full Create, Read, Update, and Delete (CRUD) functionality for products.
Orders CRUD: Manage orders with Create, Read, Update, and Delete functionalities.
Real-Time Data: Real-time data updates using subscriptions with Supabase.
Storage: Handling of media and other assets through Supabase Storage.
EAS Configuration: Configured with Expo Application Services (EAS) for build and deployment management.
Push Notifications: Integrated push notifications to alert users about updates and promotions.
Remote Push Notifications: Supports sending remote push notifications for real-time updates.
Getting Started
To get started with the Pizza Ordering App, follow the steps below:

Prerequisites
Node.js (>= 14.x)
Expo CLI
Yarn or npm
Supabase Account
TypeScript
Installation
Clone the Repository

bash
Copy code
git clone https://github.com//pizza-ordering-app.git
cd pizza-ordering-app
Install Dependencies

bash
Copy code
yarn install
# or
npm install
Set Up Supabase

Create a Supabase project.

Set up your database schema for products, orders, and authentication.

Configure Supabase environment variables in your project by creating a .env file and adding your Supabase URL and key:

env
Copy code
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
Configure EAS

Follow the Expo Application Services documentation to set up EAS for building and deploying your app.

Run the App

bash
Copy code
expo start
This will start the development server and open the app in Expo Go.

Usage
User Authentication: Users can sign up, log in, and manage their accounts.
Browse Products: Users can view available products, see details, and add them to the cart.
Order Management: Users can review their cart and place orders.
Admin Dashboard: Admins can log in to manage products and view orders.
Push Notifications
To configure push notifications, ensure you have followed the Expo push notifications guide and set up necessary credentials.


bash
Copy code
yarn test
# or
npm test
Deployment
For deployment, follow the instructions for building and deploying your app with EAS.



