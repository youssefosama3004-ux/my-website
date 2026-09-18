# EmailJS contact-form setup

The contact form sends one EmailJS request. EmailJS delivers the inquiry to Youssef and then sends the linked automatic reply to the visitor.

## 1. Connect the delivery email

In EmailJS, create an email service connected to `youssefosama3004@gmail.com` and copy its service ID.

## 2. Create the main inquiry template

Use these settings:

- **To email:** `youssefosama3004@gmail.com`
- **Reply-to:** `{{email}}`
- **Subject:** `New project inquiry from {{name}}`

Use this body:

```text
Name: {{name}}
Email: {{email}}
Company: {{company}}
How they heard about you: {{source}}

Project details:
{{message}}
```

Copy the template ID.

## 3. Link the automatic reply

Create an EmailJS automatic-reply template, set **To email** to `{{email}}`, and set **Reply-to** to `youssefosama3004@gmail.com`.

Use this body:

```text
Hi {{name}},

Got your message — thanks for reaching out.

The next step is booking a quick call so we can talk through what you need:
{{calendly_link}}

Talk soon,
Youssef
