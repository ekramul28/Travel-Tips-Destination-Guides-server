# Travel Tips & Destination Guides

## Project Overview

**Travel Tips & Destination Guides** is a platform for travel enthusiasts to share travel stories, exchange tips, and interact with other travelers. It features user authentication, profile management, content creation, and social interactions. Premium content is available via payment integration for exclusive features. This platform helps users discover new destinations and make informed travel decisions.

## Features

- **User Authentication:** Secure login, registration, and JWT-based session management.
- **Profile Management:** Customize profiles, upload photos, follow/unfollow users, and display followers/following.
- **Post Creation:** Create and share detailed travel guides with images. Posts can be categorized and tagged as Premium.
- **Voting System:** Upvote/downvote posts to highlight valuable content.
- **Commenting:** Leave comments on posts and participate in discussions.
- **Premium Content:** Unlock exclusive posts via Stripe or Aamarpay.
- **News Feed:** Dynamic feed with infinite scrolling and sorting options.
- **Admin Dashboard:** Manage users, content, and payments.
- **Responsive Design:** Seamless experience across devices.

## Tech Stack

- **Frontend:** React (or your chosen framework)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Payment Integration:** Stripe, Aamarpay
- **Rich Text Editor:** Quill.js / Draft.js / TinyMCE
- **Hosting:** [Your Hosting Provider]

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ekramul28/travel-tips-destination-guides.git
   cd travel-tips-destination-guides
   ```

npm install

#add .env file

```bash
NODE_ENV=development
PORT=3000
DB_URL=mongodb+srv://<username>:<password>@cluster0.ktxzlkz.mongodb.net/Travel-Tips-Destination?retryWrites=true&w=majority&appName=Cluster0
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_ACCESS_EXPIRES_IN=2h
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRES_IN=1d
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_secure_password
ADMIN_PROFILE_PHOTO=https://i.ibb.co/x6672BX/Pro2.jpg
ADMIN_MOBILE_NUMBER=your_mobile_number
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
AMR_PAY_URL=https://sandbox.aamarpay.com/jsonpost.php
AMR_PAY_ID=your_aamarpay_id
AMR_PAY_KEY=your_aamarpay_key
STRIPE_API_VERSION=2024-06-20
STRIPE_SECRET_KEY=your_stripe_secret_key
MEILISEARCH_HOST=your_meilisearch_host
MEILISEARCH_MASTER_KEY=your_meilisearch_master_key
SENDER_EMAIL=your_sender_email@example.com
SENDER_APP_PASS=your_email_app_password
```

npm start
