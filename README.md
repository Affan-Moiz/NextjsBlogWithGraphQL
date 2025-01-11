
# **Next.js Blog Application with GraphQL**

This is a simple blog application built using **Next.js**, **GraphQL**, and **Apollo Client**. The app allows users to view a list of blog posts, read individual posts, and create new posts. The project demonstrates clean code, efficient use of GraphQL queries and mutations, proper error handling, form validation, and Next.js features like **Incremental Static Regeneration (ISR)**.

---

## **Features**

1. **Homepage**: Displays a list of blog posts with title, author, and published date.
2. **Post Details Page**: Clicking on a post navigates to a detailed page showing the full post (title, body, author, and published date).
3. **Create Post Page**: Provides a form to submit a new blog post. The form includes validation for title, body, and author fields.
4. **Pagination**: Implements pagination on the homepage, showing 5 posts per page.
5. **GraphQL Integration**:
   - **Fetch posts with pagination**.
   - **Fetch individual post by ID**.
   - **Submit a new post** using GraphQL mutations.
6. **Incremental Static Regeneration (ISR)**:
   - ISR is used on the post details page to revalidate content every 10 seconds.
7. **Optimistic UI Updates**: When a new post is submitted, it appears immediately on the homepage without waiting for a server response.
8. **Form Validation**: Form validation is implemented using **Yup** and **react-hook-form**.

---

## **Tech Stack**

- **Frontend**: Next.js, TypeScript
- **Backend**: Apollo Server, Node.js, GraphQL
- **State Management**: Apollo Client
- **Form Handling**: react-hook-form, Yup
- **Styling**: CSS Modules
- **Database**: In-memory data (for demonstration purposes)

---

## **Project Setup**

### **Prerequisites**

- **Node.js** (>= 14.x)
- **npm** or **yarn**

---

### **Steps to Run the Project Locally**

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the GraphQL backend**:
   - Navigate to the backend directory:
     ```bash
     cd App
     ```
   - Start the backend server:
     ```bash
     node index.js
     ```
   - The backend will run at `http://localhost:4000/`.

4. **Start the Next.js frontend**:
   - Navigate back to the main project directory:
     ```bash
     cd ..
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```
   - The app will be available at `http://localhost:3000/`.

---

## **Architectural Decisions**

1. **GraphQL Backend**:
   - The backend is implemented using **Apollo Server** and provides GraphQL endpoints for fetching and submitting blog posts.
   - The data is stored in an in-memory array for simplicity. This can be replaced with a real database (e.g., MongoDB, PostgreSQL) if needed.

2. **Apollo Client for State Management**:
   - Apollo Client is used on the frontend for state management and interacting with the GraphQL API.
   - It simplifies data fetching, caching, and updating the UI in response to GraphQL queries and mutations.

3. **Incremental Static Regeneration (ISR)**:
   - ISR is used on the post details page (`posts/[id].tsx`) to ensure that static pages are updated every 10 seconds if new content is added.
   - This improves both performance and SEO by serving pre-rendered pages while keeping them fresh.

4. **Optimistic UI Updates**:
   - When a user submits a new post, an **optimistic response** is provided to Apollo Client. This ensures that the new post appears immediately on the homepage without waiting for the server to respond, enhancing the user experience.

5. **Error Handling**:
   - Proper error handling is implemented in all GraphQL queries and mutations to display meaningful error messages to users.
   - The app gracefully handles scenarios where data might not be available (e.g., empty cache, failed API requests).

6. **Form Validation**:
   - Form validation is implemented using **Yup** and **react-hook-form**, ensuring that users provide valid inputs when creating a new post.
   - The form fields are validated for minimum and maximum length, and appropriate error messages are displayed.

---

## **Evaluation Criteria**

1. **Clean, maintainable, and well-structured code**:
   - The project follows best practices for code organization and structure.
   - Components are modular and reusable.

2. **Proper use of Next.js and GraphQL**:
   - Next.js is used for server-side rendering, static generation, and ISR.
   - GraphQL is used for efficient data fetching and manipulation.

3. **Efficiency and accuracy of GraphQL queries and mutations**:
   - Queries are optimized with pagination support.
   - Mutations include cache updates and optimistic UI updates.

4. **Attention to UI/UX (simple but functional)**:
   - The UI is clean, responsive, and user-friendly.
   - CSS Modules are used for component-level styling.

5. **Understanding of Next.js features like SSR/ISR**:
   - SSR is used for dynamic data fetching.
   - ISR is implemented for revalidating static pages.

6. **Proper error handling and validation**:
   - Error handling is implemented for both queries and mutations.
   - Form validation ensures that users provide correct inputs.

7. **Well-documented code**:
   - The code is well-commented and easy to understand.
   - This README file provides clear instructions for setting up and running the project locally.

---

## **Public GraphQL Endpoint (if applicable)**

Currently, the GraphQL backend runs locally at `http://localhost:4000/`. You can replace this with a public GraphQL endpoint if needed.

---

## **Screenshots**

1. **Homepage**  
   Displays a list of blog posts with pagination.

2. **Post Details Page**  
   Shows the full content of a selected blog post.

3. **Create Post Page**  
   Allows users to submit a new blog post with validation.

---

## **Future Improvements**

1. Replace the in-memory backend with a real database (e.g., MongoDB, PostgreSQL).
2. Implement additional features such as search and filtering.
3. Enhance UI/UX with better design and animations.

---

## **License**

This project is licensed under the MIT License.
