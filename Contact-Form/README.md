📌 Project Title:

Simple Contact Form using React & Custom useForm Hook

📘 Project Description

TThis project is a simple and responsive Contact Form built with React and a custom useForm hook.

The form includes:

🧑 Name (required)

📧 Email (required + email format validation)

✍️ Message (required)

Purpose:
Demonstrate understanding of React hooks, form state management, validation, and basic UI styling.

🧩 Features

✅ Custom useForm hook

⚠️ Live validation errors

📨 Required fields check

📬 Email format validation

💻 Responsive and clean UI
### 🏠 Home (Initial View)

When the user first opens the Contact Form, the page looks like this:

- All fields are empty  
- No errors are displayed  
- The user can start typing their information

![alt text](image.png)

### ❗ Validation Errors (Empty Fields)

If the user clicks **Submit** without typing anything, the following errors appear:

- **Name is required**
- **Email is required**
- **Message is required**

Each error appears below its respective input field.

![alt text](image-1.png)

### ❌ Invalid Email Error

When the user enters an incorrect email format (example: "hello@" or "abc.com") and clicks Submit,  
the form displays:

**Invalid email format**

This error appears only under the Email field.

![alt text](image-2.png)

### ✅ Successful Submission

When all fields are filled correctly and the user clicks **Submit**, the form submits successfully.

What happens:

- All validation checks pass  
- No error messages are shown  
- A success alert appears (example: “Form submitted successfully!”)  
- The form data is logged in the console  
- The user confirms the form was sent

![alt text](image-3.png)

## 👤 Developer

```text
Name   : Abdi Debela
GitHub : Abdi0947
Email  : debelaabdi3@gmail.com
